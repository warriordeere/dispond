'use client'

import '@shared/style/modules/content_module.css'

import { getDB } from "@/app/script/utils/idb";

import { useEffect, useState } from "react";

import { TbArrowsExchange } from "react-icons/tb";
import { FaThList } from "react-icons/fa";
import { BsFillGrid3X3GapFill, BsTools } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import { MdOutlineQuestionMark } from "react-icons/md";

import { ShopItemData, GeneralItemTypes } from "@shared/types/types";
import { DatabaseGetOptions } from "@shared/types/idb.types";
import { DispatchFileObject, DispatchInterface, DispatchTypeOptions } from "@shared/types/dispatches.types";
import { dispatchDescToString, dispatchTypeToString } from '@/app/script/utils/utils';
import { VehicleTypeOptions } from '../../types/vehicle.types';

export function DispatchContentModule() {

    const [missionData, setMissionData] = useState<DispatchInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            const dbopts: DatabaseGetOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: 'DB_GET_REQUEST_OPTION_ALL',
            }

            await getDB(dbopts)
                .then((r) => {
                    setMissionData(r as DispatchInterface[]);
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
                    missionData.map((dispatch: DispatchInterface) => {
                        return (
                            <DispatchContentItem key={dispatch.id} data={dispatch} />
                        );
                    })
                }
            </div>
        </div>
    )
}

function DispatchContentItem({ data }: { data: DispatchInterface }) {

    const [dispatchCategory, setDispatchCategory] = useState<string>();
    const [dispatchDesc, setDispatchDesc] = useState<string>();
    const [unitSet, setUnitSet] = useState<VehicleTypeOptions[]>();

    useEffect(() => {
        async function fetchData() {
            setDispatchCategory(await dispatchTypeToString(data.type));
            setDispatchDesc(await dispatchDescToString(data.type));

            const dispatchFile = await fetch(`api/data/dispatch?id=${data.type}`) as unknown as DispatchFileObject;

            if (dispatchFile && dispatchFile.recommended_unit_set) {
                setUnitSet(dispatchFile.recommended_unit_set[0]);
            }
        }

        fetchData();
    }, [unitSet]);

    return (
        <div className="dispatch-item">
            <div className="dispatch-icon">
                <DispatchIcon type={data.type} />
            </div>
            <h3 className="dispatch-title">
                {dispatchCategory}
            </h3>
            <p className="dispatch-detail">
                {dispatchDesc}
            </p>
            <div className="dispatch-unit-set">
                {
                    unitSet ? (
                        unitSet.map((unit) => {
                            return (
                                <DispatchUnitSetItem recommended_unit={unit} />
                            );
                        })
                    ) : null
                }
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
                            return <>{foo.id}</>
                        })
                    }
                </p>
            </details>
        </div >
    )
}

function DispatchIcon({ type }: { type: DispatchTypeOptions }) {
    if (type.startsWith('fire')) {
        return <ImFire className='dispatch-icon-fire' />;
    }

    if (type.startsWith('tech')) {
        return <BsTools className='dispatch-icon-tech' />;
    }

    return <MdOutlineQuestionMark className='dispatch-icon-unknown' />;
}

function DispatchUnitSetItem({ recommended_unit }: { recommended_unit: VehicleTypeOptions }) {
    switch (recommended_unit) {
        case 'vehicle_type_dlk':
            return (
                <p className='unit-tag'>GR 11/23/1</p>
            );
    }
}