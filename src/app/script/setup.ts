import { invoke } from "@tauri-apps/api/tauri";
import { game } from "../emitter";
import { buildingObject } from "../shared/types/types";
import { db_get_buildings } from "../indexed";
import { map_inst } from "../shared/components/map/map";
import tt, { LngLatBounds, LngLatLike } from "@tomtom-international/web-sdk-maps";
import { GeometryData } from "@/app/shared/types/types";
import * as turf_bbox from '@turf/bbox';
import * as turf_boolean_point_in_polygon from '@turf/boolean-point-in-polygon';
import * as turf_random from '@turf/random'
import * as truf_helpers from "@turf/helpers";

export function init() {
    game.on('EVENT_START', async (data) => {

        const buildingData = await db_get_buildings();

        readSetupData();
        spawnBuildings();
        const createMissionInterval = setInterval(startMissionGen, 30000);

        function readSetupData() {
            if (data) {
                invoke('read_file', { data: { base_dir: 'document_dir', file_path: 'Arcavigi Interactive/dispond/saves/saves.json' } })
                    .then(async (r) => {
                        const savegame_config = r;
                    })
                    .catch((err) => {
                        console.warn(err);
                    })
                    .finally(() => {
                        invoke('setup', { data: JSON.stringify(data) });
                    })
            }
            else {
                throw new Error("Invalid or corrupted setup data. Canceled game start.");
            }
        }

        function spawnBuildings() {
            buildingData.forEach((bld_item: buildingObject) => {
                const marker = new tt.Marker({ draggable: false, color: '#ff0000' });
                const popup = new tt.Popup({ anchor: 'top', closeButton: false })
                if (bld_item.position && bld_item.name) {
                    marker.setLngLat(bld_item.position);
                    marker.addTo(map_inst);
                    popup.setText(bld_item.name);
                    popup.addTo(map_inst);
                    marker.setPopup(popup);
                }
                else {
                    throw new Error(`corupted data, 'position | name' of 'building' is '${bld_item.position} | ${bld_item.name}' (invalid)`);
                }
            })
            for (let i = 0; i < buildingData.length; i++) {
                if (i === (buildingData.length - 1)) {
                    buildingData
                    const bounds = new LngLatBounds(buildingData[0].position, buildingData[i].position);
                    map_inst.fitBounds(bounds, { padding: 175 });
                }
            }
        }

        function startMissionGen() {
            buildingData.forEach(async (bld: buildingObject) => {
                const area = bld.mission_area
                if (area) {
                    const marker = new tt.Marker({ draggable: false, color: 'orange' });
                    await createMissionLocation(area)
                        .then((r: LngLatLike) => {
                            marker.setLngLat(r);
                            marker.addTo(map_inst);
                        })
                        .catch((err) => {
                            throw new Error(err)
                        })
                } else {
                    throw new Error(`corupted data, 'mission_area' of 'building' is '${area}' (invalid)`)
                }
            })
        }
    })
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