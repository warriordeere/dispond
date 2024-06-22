'use client'

import '@shared/style/calls.css';
import '@shared/style/globals.css';

import React, { useEffect, useRef, useState } from 'react';

import { getDB } from '@/app/indexed_db';
import { MissionEmitter } from '@/app/script/emitter';

import { ShopItemData } from '../types/types';
import { MissionRespondData } from '../types/building.types';
import { DatabaseGetOptions } from '../types/idb.types';
import { MissionInterface } from '../types/missions.types';

import { BsFire, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidBellRing } from 'react-icons/bi';

export default function CallItem() {

    const [missionData, setMissionData] = useState<MissionInterface[]>([]);
    const [vehicleData, setVehicleData] = useState<ShopItemData[]>([]);
    const [selectedMission, setSelectedMission] = useState<MissionInterface | null>(null);
    const dialog = useRef<HTMLDialogElement>(null);

    function handleOpenDialog(item: MissionInterface) {
        setSelectedMission(item);
        if (dialog.current) {
            dialog.current.showModal();
        }
    }

    function handleMissionRespond(vehicle: ShopItemData) {
        if (selectedMission) {
            const data: MissionRespondData = {
                mission: selectedMission,
                responding: [vehicle]
            }
            MissionEmitter.emit('EVENT_MISSION_RESPOND', data);

            if (dialog.current) {
                dialog.current.close();
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            const dbopt_mission: DatabaseGetOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: "DB_GET_REQUEST_OPTION_ALL"
            }

            const dbopt_vehicles: DatabaseGetOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_PURCHASED_ITEMS',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: "DB_GET_REQUEST_OPTION_ALL"
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
                missionData.map((item: MissionInterface) => {
                    return (
                        <>
                            <dialog ref={dialog} key={`dialog-${item.id}`} className='indev-dialog'>
                                <h2>[INDEV] Choose Vehicle To Respond To Mission</h2>
                                <p>Available Vehicles:</p>
                                <div>
                                    {
                                        vehicleData.map((vehicle: ShopItemData) => {
                                            return (
                                                <>
                                                    <h3>{vehicle.item_secondary_type}</h3>
                                                    <p>{vehicle.id}</p>
                                                    <button
                                                        onClick={() => handleMissionRespond(vehicle)}>
                                                        Use Vehicle
                                                    </button>
                                                </>
                                            );
                                        })
                                    }
                                </div>
                            </dialog>
                            <details className="call-item" key={`details-${item.id}`} id={item.id} onDoubleClick={() => {
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
                                        {item.mission}
                                    </span>
                                    <span className="call-specific">
                                        {item.mission} [TODO] Fetch Specific Data From File!!
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
                                            onClick={() => handleOpenDialog(item)}>
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