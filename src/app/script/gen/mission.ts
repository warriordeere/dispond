import { MissionInterface, NamesFile, callerObject, missionObject } from "@/app/shared/types/types";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import { GeometryData } from "@/app/shared/types/types";
import { LngLatLike } from "@tomtom-international/web-sdk-maps";
import tt from "@tomtom-international/web-sdk-services";
import * as turf_bbox from '@turf/bbox';
import * as turf_boolean_point_in_polygon from '@turf/boolean-point-in-polygon';
import * as turf_random from '@turf/random'
import * as truf_helpers from "@turf/helpers";
import { MissionEmitter } from "@/app/emitter";
import { API_KEY } from "@/app/page";

export async function generateMissionData(area: GeometryData): Promise<MissionInterface> {
    async function randomMission(): Promise<missionObject> {
        const missionObject = JSON.parse(`${await readTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/missions.json', { dir: BaseDirectory.Document })}`);
        const missionArray = missionObject[Math.floor(Math.random() * missionObject.length)];
        const mission = missionArray[Math.floor(Math.random() * missionArray.length)]
        return { specific: mission.specific, type: mission.type };
    }

    async function randomCaller(): Promise<callerObject> {
        // const callerObject = JSON.parse(`${await readTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/names.json', { dir: BaseDirectory.Document })}`);
        const callerObject: NamesFile = await fetch('api/data/file?path=misc/names.json')
            .then((r) => {
                return r.json() as unknown as NamesFile;
            })
            .catch((e) => {
                throw new Error(e);
            });

        const firstName = callerObject.first_names[Math.floor(Math.random() * callerObject.first_names.length)]
        const lastName = callerObject.last_names[Math.floor(Math.random() * callerObject.last_names.length)]
        return { first_name: firstName, last_name: lastName }
    }

    async function createMissionLocation(data: GeometryData): Promise<LngLatLike> {
        let fp: LngLatLike | undefined;

        while (!fp) {
            const p = truf_helpers.polygon(data.features[0].geometry.coordinates);
            const b = turf_bbox.bbox(p);
            const rp = turf_random.randomPosition(b) as number[];
            const bp = turf_boolean_point_in_polygon.booleanPointInPolygon(rp, p);
            fp = bp ? (rp as LngLatLike) : undefined;
        }

        return fp;
    }

    const lcd = await createMissionLocation(area);
    const rev = tt.services.reverseGeocode({ key: API_KEY!, position: lcd })
        .then((r) => {
            return r.addresses[0].address;
        });
    const geo_result = await rev;

    return {
        id: crypto.randomUUID(),
        caller: await randomCaller(),
        location: {
            coords: lcd,
            free_address: geo_result.freeformAddress,
            municapality: geo_result.municipality,
            postal_code: geo_result.postalCode,
            street_n_number: geo_result.streetNameAndNumber
        },
        mission: await randomMission(),
        time: Date.now()
    }
}

export class Mission {
    data: MissionInterface

    constructor(mission: MissionInterface) {
        this.data = {
            id: mission.id,
            caller: mission.caller,
            location: mission.location,
            mission: mission.mission,
            time: mission.time
        }
        MissionEmitter.emit('EVENT_MISSION_CREATE', mission);
    }
}