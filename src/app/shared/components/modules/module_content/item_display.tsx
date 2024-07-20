import { useState, useEffect } from "react";

import { getDB } from "@script/utils/idb";

import { DatabaseGetOptions } from "@shared/types/idb.types";
import { GeneralItemTypes, ShopItemData } from "@shared/types/types";
import { StatusDisplayBox } from "../../system_message";

export function ItemDisplayContentModule({ item, type }: { item: string, type: GeneralItemTypes }) {

    const [itemData, setItemData] = useState<ShopItemData[]>([]);

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
                    store: 'DB_STORE_PURCHASED_ITEMS',
                    schema: 'SCHEMA_SAVEGAME_DATA',
                    key: [item],
                }
                break;
        }

        async function fetchData() {
            await getDB(dbopts)
                .then((r) => {
                    setItemData(r as ShopItemData[]);
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
                <p>
                    {
                        itemData.map((foo) => {
                            if (foo) {
                                return <>{foo.id}</>
                            }
                            else {
                                return <StatusDisplayBox http_status_code={500} />
                            }
                        })
                    }
                </p>
            </details>
        </div >
    )
}