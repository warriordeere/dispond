import './calls.css';
import '../../../globals.css';
import { BsFire, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getDB } from '@/app/indexed_db';
import React, { useEffect, useState } from 'react';
import { DatabaseOptions, MissionInterface } from '../../types/types';

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
                    <div className="call-item">
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
                            Neue Straße 23
                        </span>
                        <span className="location-second">
                            01234 Neustadt
                        </span>
                    </div>
                })

            }
        </>
    )

}