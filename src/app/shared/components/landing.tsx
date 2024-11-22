'use client'

import { API_KEY } from '@/app/page';

import '@shared/style/landing.css';
import '@shared/style/globals.css';

// import tt from '@tomtom-international/web-sdk-maps';
import { useRouter } from 'next/navigation';

import { LuGamepad2 } from "react-icons/lu";
import { FaMedal } from "react-icons/fa6";
import { FaPlay } from 'react-icons/fa';
import { PiCurrencyEurFill } from "react-icons/pi";
import { BiSolidTimeFive } from 'react-icons/bi';
import { useEffect, useState } from 'react';

export default function Landing() {
    const router = useRouter();
    const gameRoute = 'play';
    const [staticMapSrc, setStaticMapSrc] = useState<string>()

    useEffect(() => {
        async function fetchSpawnPoint() {
            await fetch('api/v1/data/saves?filter=spawn')
                .then(async (r) => {
                    const coords: any = await r.json();
                    setStaticMapSrc(`https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&key=${API_KEY}&zoom=12&center=${coords[0].lng},${coords[0].lat}&width=800&height=500&language=NGT`);
                });
        }

        fetchSpawnPoint();
    }, []);

    return (
        <section className="landing">
            <div className="front">
                <h2 className='front-header'>Willkommen zurück, WarriorDeere</h2>
                <div className="front-body">
                    <button className="front-ui-item" disabled>
                        <LuGamepad2 />
                    </button>
                    <button className="front-ui-item" disabled>
                        <FaMedal />
                    </button>
                </div>
            </div>
            <div className="savegame-container">
                <div className="savegame" onDoubleClick={() => {
                    router.push(gameRoute)
                }}>
                    <span className="savegame-bg">
                        <img src={staticMapSrc} />
                    </span>
                    <div className="savegame-preview">
                        <div className="sg-detail sg-name">Neues Spiel</div>
                        <div className="sg-detail sg-balance">
                            <PiCurrencyEurFill />
                            999.999.999
                        </div>
                        <div className="sg-detail sg-playtime">
                            <BiSolidTimeFive />
                            12:28 Hours
                        </div>
                        <div className="sg-detail play-container">
                            <button className="play-game"
                                onClick={() => {
                                    router.push(gameRoute)
                                }}>
                                <FaPlay />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}