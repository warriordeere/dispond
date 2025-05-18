import { useState, useEffect } from "react";

import { getDB } from "@script/utils/idb";

import { StatusDisplayBox } from "../../system_message";

import { ItemDisplayTypes } from "@shared/types/types";
import { VehicleInterface } from "@/app/shared/types/vehicle.types";
import { BuildingInterface } from "@/app/shared/types/building.types";
import { DispatchInterface } from "@/app/shared/types/dispatches.types";

export function ItemDisplayContentModule({ item, type }: { item: string, type: ItemDisplayTypes }) {

    const [itemData, setItemData] = useState<VehicleInterface[] | BuildingInterface[] | DispatchInterface[]>([]);

    useEffect(() => {

        async function fetchVehicleData() {
            await getDB({
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_OWNED_VEHICLES',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: [item],
            })
                .then((r) => {
                    setItemData(r as VehicleInterface[]);
                    return r;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }

        async function fetchBuildingData() {
            await getDB({
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_BUILDINGS',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: [item],
            })
                .then((r) => {
                    setItemData(r as BuildingInterface[]);
                    return r;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }

        async function fetchDispatchData() {
            await getDB({
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: [item],
            })
                .then((r) => {
                    setItemData(r as DispatchInterface[]);
                    return r;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }

        fetchVehicleData();
        fetchBuildingData();
        fetchDispatchData();

    }, []);

    switch (type) {
        case "ITEM_DISPLAY_TYPE_BUILDING":
            return (
                <div className="content-module item-display">
                    <h2>Item: {item}</h2>
                    <div>
                        {
                            JSON.stringify(itemData)
                        }
                    </div>
                </div >
            );

        case "ITEM_DISPLAY_TYPE_VEHICLE":
            return (
                <div className="content-module item-display">
                    <h2>Item: {item}</h2>
                    <div>
                        {
                            JSON.stringify(itemData)
                        }
                    </div>
                </div >
            );

        case "ITEM_DISPLAY_TYPE_DISPATCH":
            return (
                <div className="content-module item-display">
                    <h2>Item: {item}</h2>
                    <div>
                        {
                            JSON.stringify(itemData)
                        }
                    </div>
                </div >
            );

        default:
            return <StatusDisplayBox http_status_code={404} />;
    }

}