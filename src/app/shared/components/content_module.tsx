'use client'

import { TbArrowsExchange } from "react-icons/tb";
import { FaThList } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import { getDB } from "@/app/indexed_db";
import { MissionInterface, DatabaseOptions, ShopItemData, GeneralItemTypes } from "../types/types";

import { useEffect, useState } from "react";

import '../style/content_module.css'

export function DispatchContentModule() {

    const [missionData, setMissionData] = useState<MissionInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            const dbopt_mission: DatabaseOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA'
            }

            await getDB(dbopt_mission)
                .then((r) => {
                    setMissionData(r as MissionInterface[]);
                    return r;
                })
                .catch((err) => {
                    console.error(err)
                });
        };

        fetchData();
    }, []);

    return (
        <div className="content-module dispatch-menu">
            <div className="menu-head-wrapper">
                <div className="menu-title">
                    <h2>Einsatzliste</h2>
                </div>
                <div className="menu-ui">
                    <button>
                        <BsFillGrid3X3GapFill />
                    </button>
                    <button>
                        <FaThList />
                    </button>
                    <button>
                        <TbArrowsExchange />
                    </button>
                </div>
            </div>
            <div className="menu-content">
                {
                    missionData.map((dispatch: MissionInterface) => {
                        return (
                            <DispatchContentItem data={dispatch} />
                        );
                    })
                }
            </div>
        </div>
    )
}

function DispatchContentItem({ data }: { data: MissionInterface }) {
    return (
        <div className="dispatch-item">
            <div className="dispatch-icon">
                icon
            </div>
            <h3 className="dispatch-title">
                {data.mission.type}
            </h3>
            <p className="dispatch-detail">
                {data.mission.specific}
            </p>
            <div className="dispatch-units">
                <div className="unit-tag">
                    <p>FL-GR 11/11/1</p>
                </div>
                <div className="unit-tag">
                    <p>FL-GR 11/49/1</p>
                </div>
                <div className="unit-tag">
                    <p>FL-GR 11/24/1</p>
                </div>
                <div className="unit-tag">
                    <p>FL-GR 11/33/1</p>
                </div>
            </div>
        </div>
    );
}

export function UnitContentModule() {
    return (
        <div className="content-module unit-menu">
            <p>Units</p>
        </div>
    )
}

export function ItemDisplayModule({ item, type }: { item: string, type: GeneralItemTypes }) {

    const [itemData, setItemData] = useState<ShopItemData[]>([]);

    useEffect(() => {

        let dbopt_vehicles: DatabaseOptions;

        switch (type) {
            case "SHOP_ITEM_TYPE_BUILDING":
                dbopt_vehicles = {
                    database: 'DB_SAVEGAME_DATA',
                    store: 'DB_STORE_BUILDINGS',
                    schema: 'SCHEMA_SAVEGAME_DATA'
                }
                break;

            case "SHOP_ITEM_TYPE_VEHICLE":
                dbopt_vehicles = {
                    database: 'DB_SAVEGAME_DATA',
                    store: 'DB_STORE_PURCHASED_ITEMS',
                    schema: 'SCHEMA_SAVEGAME_DATA'
                }
                break;
        }

        async function fetchData() {
            await getDB(dbopt_vehicles)
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
                            return <p>{foo.id}</p>
                        })
                    }
                </p>
            </details>
        </div>
    )
}