import { MissionInterface, NamesFile, callerObject } from "@/app/shared/types/types";
import { GeometryData } from "@/app/shared/types/types";
import { LngLatLike } from "@tomtom-international/web-sdk-maps";
import tt from "@tomtom-international/web-sdk-services";
import * as turf_bbox from '@turf/bbox';
import * as turf_boolean_point_in_polygon from '@turf/boolean-point-in-polygon';
import * as turf_random from '@turf/random'
import * as truf_helpers from "@turf/helpers";
import { MissionEmitter } from "@/app/emitter";
import { API_KEY } from "@/app/page";
import { MissionFileObject, MissionTypeOptions } from "@/app/shared/types/missions.types";

export async function generateMissionData(area: GeometryData): Promise<MissionInterface> {
    async function randomMission(): Promise<MissionTypeOptions> {
        const missionList = await fetch('/api/list?dir=missions&type=json')
            .then((r: any) => {
                return r.json() as String[];
            })
            .catch((e) => {
                throw new Error(e);
            });

        const msfl = missionList[Math.floor(Math.random() * missionList.length)]
        const didx = msfl.indexOf('data');
        const msflpath = didx !== -1 ? msfl.substring(didx + 5) : "";
        const mission = await fetch(`api/data/file?path=${msflpath}`)
            .then((r) => {
                return r.json() as unknown as MissionFileObject;
            })
            .catch((e) => {
                throw new Error(e);
            });

        return mission.type;
    }

    async function randomCaller(): Promise<callerObject> {
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