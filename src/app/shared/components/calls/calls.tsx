'use client'

import './calls.css';
import '../../../globals.css';
import { BsFire, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getDB } from '@/app/indexed_db';
import React, { useEffect, useState } from 'react';
import { DatabaseOptions, MissionInterface } from '../../types/types';
import { MissionEmitter } from '@/app/emitter';
import { BiSolidBellRing } from 'react-icons/bi';

export default function CallItem() {
    const [missionData, setMissionData] = useState<MissionInterface[]>([]);

    useEffect(() => {
        async function fetchMissionData() {
            const getFromDBOptions: DatabaseOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_ACTIVE_MISSIONS',
                schema: 'SCHEMA_SAVEGAME_DATA'
            }

            await getDB(getFromDBOptions)
                .then((r) => {
                    setMissionData(r as MissionInterface[]);
                    return r;
                })
                .catch((err) => {
                    console.error(err)
                });
        };
        fetchMissionData();
    }, []);

    return (
        <>
            {
                missionData.map((item) => {
                    return (
                        <details open className="call-item" key={item.id} id={item.id} onToggle={(e) => {
                            if (e.currentTarget.open) {
                                MissionEmitter.emit('EVENT_MISSION_ITEM_TOGGLE', item);
                            }
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
                                            MissionEmitter.emit('EVENT_MISSION_START', item);
                                        }}>
                                        Alarmierung <BiSolidBellRing />
                                    </button>
                                </div>
                            </div>
                        </details>);
                })

            }
        </>
    )

}