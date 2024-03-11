import { invoke } from "@tauri-apps/api/tauri";
import { GameEmitter, MissionEmitter } from "../emitter";
import { BuildingInterface, DatabaseOptions, MissionInterface } from "../shared/types/types";
import { getDB } from "../indexed_db";
import { map_inst } from "../shared/components/map/map";
import tt, { LngLatBounds, Marker } from "@tomtom-international/web-sdk-maps";
import { Mission, generateMissionData } from "./gen/mission";
// import { currentMonitor, appWindow, PhysicalPosition } from "@tauri-apps/api/window";

// export async function setupWindow() {
//     const saved_monitor = JSON.parse(localStorage.getItem('app_monitor') as string);
//     const tauri_monitor = await currentMonitor();

//     if (tauri_monitor && tauri_monitor.name !== saved_monitor.name) {
//         localStorage.setItem('app_monitor', JSON.stringify(tauri_monitor));
//         await appWindow.setPosition(new PhysicalPosition(saved_monitor.position.x, saved_monitor.position.y))
//     }

//     window.addEventListener('move', () => {
//         localStorage.setItem('app_monitor', JSON.stringify(tauri_monitor));
//     })
// }

export const MAP_SPAWN = '13.5,52.5'
export function init() {

    GameEmitter.on('EVENT_GAME_START', async (data) => {

        const getFromDBOptions: DatabaseOptions = {
            database: 'DB_SAVEGAME_DATA',
            store: 'DB_STORE_BUILDINGS',
            schema: 'SCHEMA_SAVEGAME_DATA'
        }

        const buildingData: BuildingInterface[] = await getDB(getFromDBOptions);

        readSetupData();
        spawnBuildings();
        loadActiveMissions();
        const createMissionInterval = setInterval(startMissionGen, 20000);

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
            buildingData.forEach((bld_item: BuildingInterface) => {
                const marker = new tt.Marker({ draggable: false, color: '#ff0000' });
                const popup = new tt.Popup({ anchor: 'top', closeButton: false })
                if (bld_item.position && bld_item.name) {
                    marker.setLngLat(bld_item.position);
                    marker.addTo(map_inst);
                    popup.setText(bld_item.name);
                    popup.addTo(map_inst);
                    marker.setPopup(popup);
                    marker.togglePopup();
                }
                else {
                    throw new Error(`corrupted data, 'position | name' of 'building' is '${bld_item.position} | ${bld_item.name}' (invalid)`);
                }
            })

            for (let i = 0; i < buildingData.length; i++) {
                if (i === (buildingData.length - 1)) {
                    buildingData
                    const bounds = new LngLatBounds(buildingData[0].position, buildingData[i].position);
                    map_inst.fitBounds(bounds, { padding: 175, maxZoom: 15 });
                }
            }
        }

        async function loadActiveMissions() {
            const options: DatabaseOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA'
            }

            const activeMissionData = await getDB(options)
                .then((r) => {
                    return r;
                })
                .catch((err) => {
                    throw new Error(err);
                });

            activeMissionData.forEach((mission: MissionInterface) => {
                const marker = new tt.Marker({ draggable: false, color: 'orange' });
                const popup = new tt.Popup({ anchor: 'top', closeButton: false });

                marker.setLngLat(mission.location.coords);
                marker.addTo(map_inst);
                popup.setHTML(`<strong>${mission.mission.specific}</strong><br>${mission.location.free_address}`);
                popup.addTo(map_inst);
                marker.setPopup(popup);
                marker.togglePopup();
            })
        }

        async function startMissionGen() {
            const options: DatabaseOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA'
            }

            const activeMissionData = await getDB(options)
                .then((r) => {
                    return r;
                })
                .catch((err) => {
                    throw new Error(err);
                });

            if (activeMissionData && activeMissionData.length < 10) {
                buildingData.forEach(async (bld: BuildingInterface) => {
                    const area = bld.mission_area
                    if (area) {
                        const newMissionData = await generateMissionData(area);
                        const newMission = new Mission(newMissionData);

                        const marker = new tt.Marker({ draggable: false, color: 'orange' });
                        const popup = new tt.Popup({ anchor: 'top', closeButton: false });

                        marker.setLngLat(newMission.data.location.coords);
                        marker.addTo(map_inst);
                        popup.setHTML(`<strong>${newMission.data.mission.specific}</strong><br>${newMission.data.location.free_address}`);
                        popup.addTo(map_inst);
                        marker.setPopup(popup);
                        marker.togglePopup();

                    } else {
                        throw new Error(`corrupted data, 'mission_area' of 'building' is '${area}' (invalid)`)
                    }
                })
                return;
            }

            return;
        }
    })
}