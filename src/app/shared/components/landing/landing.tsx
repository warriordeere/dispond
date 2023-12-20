'use client'

import './landing.css';
import '../../../globals.css';
import { FaPlay } from 'react-icons/fa';
import { BiSolidTimeFive } from 'react-icons/bi';
import { PiCurrencyEurFill } from 'react-icons/pi';
import { MdOutlineAdd } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { LuGamepad2 } from "react-icons/lu";
import { FaMedal } from "react-icons/fa6";
import Link from 'next/link';

export default function Landing() {
    const router = useRouter();
    const savegameRoute = '/game/play/12345';
    return (
        <section className="landing">
            <div className="front">
                <h2 className='front-header'>Willkommen zurück, WarriorDeere</h2>
                <div className="front-body">
                    <Link className="front-ui-item" href={'./game/new'}>
                        <MdOutlineAdd />
                    </Link>
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
                    router.push(savegameRoute)
                }}>
                    <span className="savegame-bg">
                        <img src="https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&key=E0ELce62yviKI8YNFFSLU7fg6AwXPmRi&zoom=12&center=13.37989881564988,52.5096447695974&width=800&height=500&language=NGT" />
                    </span>
                    <div className="savegame-preview">
                        <div className="sg-detail sg-name">Neues Spiel</div>
                        <div className="sg-detail sg-balance">
                            <PiCurrencyEurFill />
                            999.999.999
                        </div>
                        <div className="sg-detail sg-playtime">
                            <BiSolidTimeFive />
                            12:28 Stunden
                        </div>
                        <div className="sg-detail play-container">
                            <button className="play-game"
                                onClick={() => {
                                    router.push(savegameRoute)
                                }}>
                                <FaPlay />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="savegame">
                    <span className="savegame-bg">
                        <img src="https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&key=E0ELce62yviKI8YNFFSLU7fg6AwXPmRi&zoom=12&center=14.12,50.921&width=800&height=500&language=NGT" />
                    </span>
                    <div className="savegame-preview">
                        <div className="sg-detail sg-name">My Save</div>
                        <div className="sg-detail sg-balance">
                            <PiCurrencyEurFill />
                            999.999.999
                        </div>
                        <div className="sg-detail sg-playtime">
                            <BiSolidTimeFive />
                            12:28 Hours
                        </div>
                        <div className="sg-detail play-container">
                            <button className="play-game">
                                <FaPlay />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}