import { invoke } from "@tauri-apps/api/tauri";
import { game } from "../emitter";
import { GeometryData, buildingObject } from "../shared/types/types";
import { db_get_buildings } from "../indexed";
import { map_inst } from "../shared/components/map/map";
import tt, { LngLatBounds } from "@tomtom-international/web-sdk-maps";

export function init() {
    game.on('EVENT_START', (data) => {
        if (data) {
            invoke('read_file', { data: { base_dir: 'document_dir', file_path: 'Arcavigi Interactive/dispond/saves/saves.json' } })
                .then(async (r) => {
                    const savegame_config = r;
                    await db_get_buildings()
                        .then((bld: buildingObject[]) => {
                            sessionStorage.setItem('sesion_buildings', JSON.stringify(bld))
                            bld.forEach((bld_item: buildingObject) => {
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
                                    throw new Error('corupted data, building was not added')
                                }
                            })
                            for (let i = 0; i < bld.length; i++) {
                                if (i === (bld.length - 1)) {
                                    const bounds = new LngLatBounds(bld[0].position, bld[i].position);
                                    map_inst.fitBounds(bounds, { padding: 175 });
                                }
                            }
                        })
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
    })
}