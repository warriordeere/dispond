'use client'

import './landing.css';
import '../../../shared/style/globals.css';
import { useRouter } from 'next/navigation';
import { LuGamepad2 } from "react-icons/lu";
import { FaMedal } from "react-icons/fa6";
import { FaPlay } from 'react-icons/fa';
import { PiCurrencyEurFill } from "react-icons/pi";
import { BiSolidTimeFive } from 'react-icons/bi';
import { API_KEY } from '@/app/page';
import { MAP_SPAWN } from '@/app/script/setup';

export default function Landing() {
    const router = useRouter();
    const gameRoute = '/game/play';
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
                        <img src={`https://api.tomtom.com/map/1/staticimage?layer=hybrid&style=main&format=png&key=${API_KEY}&zoom=12&center=${MAP_SPAWN}&width=800&height=500&language=NGT`} />
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