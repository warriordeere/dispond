'use client'

import './calls.css';
import '../../../globals.css';
import { BsFire, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getDB } from '@/app/indexed_db';
import React, { useEffect, useRef, useState } from 'react';
import { DatabaseOptions, MissionInterface, ShopItemData } from '../../types/types';
import { MissionEmitter } from '@/app/emitter';
import { BiSolidBellRing } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function CallItem() {

    const [missionData, setMissionData] = useState<MissionInterface[]>([]);
    const [vehicleData, setVehicleData] = useState<ShopItemData[]>([]);
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        async function fetchData() {
            const dbopt_mission: DatabaseOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA'
            }

            const dbopt_vehicles: DatabaseOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_PURCHASED_ITEMS',
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

            await getDB(dbopt_vehicles)
                .then((r) => {
                    setVehicleData(r as ShopItemData[]);
                    return r;
                })
                .catch((err) => {
                    console.error(err)
                });
        };

        fetchData();
    }, []);

    return (
        <>
            {
                missionData.map((item) => {
                    return (
                        <>
                            <dialog ref={dialog} className='indev-dialog'>
                                <h2>[INDEV] Choose Vehicle To Respond To Mission</h2>
                                <p>Available Vehicles:</p>
                                <div>
                                    {
                                        vehicleData.map((vehicle) => {
                                            return (
                                                <>
                                                    <h3>{vehicle.item_secondary_type}</h3>
                                                    <p>{vehicle.id}</p>
                                                    <button>Use Vehicle</button>
                                                </>
                                            );
                                        })
                                    }
                                </div>
                            </dialog>
                            <details className="call-item" key={item.id} id={item.id} onDoubleClick={() => {
                                MissionEmitter.emit('EVENT_MISSION_ITEM_TOGGLE', item);
                            }}>
                                <summary>
                                    <span className="caller-icon">
                                        <BsPersonCircle />
                                    </span>
                                    <span className="caller-name">{item.caller.first_name} {item.caller.last_name}</span>
                                    <span className="caller-date">{new Date(item.time).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' }).toString()}</span>

                                    <span className="call-icon">
                                        <BsFire />
                                    </span>
                                    <span className="call-type">
                                        {item.mission.type}
                                    </span>
                                    <span className="call-specific">
                                        {item.mission.specific}
                                    </span>

                                    <span className="location-icon">
                                        <FaMapMarkerAlt />
                                    </span>
                                    <span className="location-main">
                                        {item.location.street_n_number ? (item.location.street_n_number) : ("Addresse unbekannt")}
                                    </span>
                                    <span className="location-second">
                                        {item.location.postal_code}&nbsp;{item.location.municapality}
                                    </span>
                                </summary>
                                <div className="mission-content">
                                    <p>
                                        {JSON.stringify(item)}
                                    </p>
                                    <div className="mission-item-ui">
                                        <button className='miui-btn btn-secondary-action'
                                            onClick={() => {
                                                MissionEmitter.emit('EVENT_MISSION_CANCEL', item);
                                            }}>
                                            Beenden
                                        </button>
                                        <button className='miui-btn btn-action'
                                            onClick={() => {
                                                if (dialog.current) {
                                                    dialog.current.showModal();
                                                    MissionEmitter.emit('EVENT_MISSION_START', item);
                                                }
                                                else {
                                                    throw new Error('[Error]');
                                                }
                                            }}>
                                            Alarmierung <BiSolidBellRing />
                                        </button>
                                    </div>
                                </div>
                            </details>
                        </>
                    );
                })

            }
        </>
    )

}