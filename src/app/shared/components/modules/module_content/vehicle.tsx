import { useEffect, useState } from "react";

import { ModuleHeader } from "./base";

import { getDB } from "@script/utils/idb";
import { MenuEmitter } from "@script/utils/emitter";

import { DatabaseGetOptions } from "@shared/types/idb.types";
import { VehicleInterface } from "@shared/types/vehicle.types";
import { ModuleFooterButtonInterface } from "@shared/types/modules.types";

import { MdAdd, MdModeEdit } from "react-icons/md";
import { vehicleTypeToString } from "@/app/script/utils/utils";
import { coreMap } from "@/app/script/core/map";

export function VehicleContentModule() {
    const [vehicleData, setVehicleData] = useState<VehicleInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            const dbopts: DatabaseGetOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_OWNED_VEHICLES',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: 'DB_GET_REQUEST_OPTION_ALL',
            }

            await getDB(dbopts)
                .then((r) => {
                    setVehicleData(r as VehicleInterface[]);
                    return r;
                })
                .catch((err) => {
                    console.error(err)
                });
        };

        fetchData();
    }, []);

    const footerBtns: ModuleFooterButtonInterface[] = [
        {
            icon: <MdModeEdit />,
            title: "Fahrzeug Bearbeiten",
            on: {
                click: handleFooterBtn
            }
        }
    ]

    function handleFooterBtn() {
        console.log('Footer Btn click');
    }

    return (
        <div className="content-module building-menu">
            <ModuleHeader data={{
                title: 'Fahrzeuge'
            }} />
            <div className="menu-content">
                {
                    vehicleData.map((vehicle: VehicleInterface) => {
                        return (
                            <VehicleContentItem key={vehicle.id} data={vehicle} />
                        );
                    })
                }
            </div>
        </div>
    )
}

function VehicleContentItem({ data }: { data: VehicleInterface }) {

    function handleItemViewRequest(item_id: string) {
        MenuEmitter.emit('EVENT_MENU_ITEM_DISPLAY_OPEN', item_id);
    }

    const [vehicleType, setVehicleType] = useState<string>();

    useEffect(() => {
        async function fetchData() {
            setVehicleType(await vehicleTypeToString(data.vehicle_type));
        }

        fetchData();
    }, [vehicleType]);

    return (
        <button
            className="building-item menu-item"
            onDoubleClick={() => {
                handleItemViewRequest(data.id)
            }}
            onClick={
                () => {
                    if (coreMap.InternalMap) {
                        coreMap.InternalMap.easeTo({
                            center: data.positon,
                            zoom: 12,
                            duration: 1000
                        });
                    }
                }
            }
        >
            <div className="vehicle-type">
                <h3>{vehicleType}</h3>
            </div>
        </button>
    );
}