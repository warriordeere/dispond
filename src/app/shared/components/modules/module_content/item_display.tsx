import { useState, useEffect } from "react";

import { getDB } from "@script/utils/idb";

import { StatusDisplayBox } from "../../system_message";

import { ShopCategoryTypes } from "@shared/types/types";
import { DatabaseGetOptions } from "@shared/types/idb.types";
import { VehicleInterface } from "@/app/shared/types/vehicle.types";

export function ItemDisplayContentModule({ item, type }: { item: string, type: ShopCategoryTypes }) {

    const [itemData, setItemData] = useState<VehicleInterface[]>([]);

    useEffect(() => {

        let dbopts: DatabaseGetOptions;

        switch (type) {
            case "SHOP_ITEM_TYPE_BUILDING":
                dbopts = {
                    database: 'DB_SAVEGAME_DATA',
                    store: 'DB_STORE_BUILDINGS',
                    schema: 'SCHEMA_SAVEGAME_DATA',
                    key: 'DB_GET_REQUEST_OPTION_ALL'
                }
                break;

            case "SHOP_ITEM_TYPE_VEHICLE":
                dbopts = {
                    database: 'DB_SAVEGAME_DATA',
                    store: 'DB_STORE_OWNED_VEHICLES',
                    schema: 'SCHEMA_SAVEGAME_DATA',
                    key: [item],
                }
                break;
        }

        async function fetchData() {
            await getDB(dbopts)
                .then((r) => {
                    setItemData(r as VehicleInterface[]);
                    return r;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }

        fetchData();
    }, []);

    return (
        <div className="content-module item-display">
            <details>
                <summary>
                    <h2>Item: {item}</h2>
                </summary>
                <div>
                    {
                        itemData.map((foo) => {
                            if (foo) {
                                return <p key={foo.id}>{foo.id}</p>
                            }
                            else {
                                return <StatusDisplayBox key={crypto.randomUUID()} http_status_code={500} />
                            }
                        })
                    }
                </div>
            </details>
        </div >
    )
}