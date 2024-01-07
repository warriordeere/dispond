import './calls.css';
import '../../../globals.css';
import { BsFire, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { db_get_active_missions } from '@/app/indexed';
import React, { useEffect, useState } from 'react';
import { MissionInterface } from '../../types/types';

export default function CallItem() {
    const [missionData, setMissionData] = useState<MissionInterface[]>([]);

    useEffect(() => {
        async function fetchMissionData() {
            const data = await db_get_active_missions();
            setMissionData(data);
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