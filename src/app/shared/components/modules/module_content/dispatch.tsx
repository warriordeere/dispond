'use client'

import '@shared/style/modules/content_module.css'

import { getDB } from "@script/utils/idb";
import { dispatchDescToString, dispatchTypeToString } from '@script/utils/utils';

import { useEffect, useState } from "react";

import { TbArrowsExchange } from "react-icons/tb";
import { FaThList } from "react-icons/fa";
import { BsFillGrid3X3GapFill, BsTools } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import { MdOutlineQuestionMark } from "react-icons/md";

import { DatabaseGetOptions } from "@shared/types/idb.types";
import { VehicleTypeOptions } from '@shared/types/vehicle.types';
import { DispatchFileObject, DispatchInterface, DispatchTypeOptions } from "@shared/types/dispatches.types";
import { MenuEmitter } from '@/app/script/utils/emitter';
import { map_inst } from '../../map';

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

    function handleItemViewRequest(item_id: string) {
        MenuEmitter.emit('EVENT_MENU_ITEM_DISPLAY_OPEN', item_id);
    }

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
        <button
            className="dispatch-item"
            onClick={
                () => {
                    handleItemViewRequest(data.id)
                }
            }
            onMouseEnter={
                () => {
                    map_inst.easeTo({
                        center: data.location.coords,
                        zoom: 12,
                        duration: 1000
                    })
                }
            }
        >
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
        </button>
    );
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