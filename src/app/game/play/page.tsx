'use client'

import { GameEmitter } from '@/app/emitter';
import Sidebar from '@/app/shared/components/nav/sidenav';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaMap } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { updatePresence } from '@/app/script/utils';

export default function Page() {
    useEffect(() => {
        const session = crypto.randomUUID()
        const game_data = {
            game_id: "My Save",
            session_id: session
        }
        localStorage.setItem('game', JSON.stringify(game_data))
        sessionStorage.setItem('game_session', session);

        GameEmitter.emit('EVENT_GAME_START', {
            created: Date.now(),
            modified: Date.now(),
            game: {
                name: 'My Save',
                spawn: [13.5, 52.5]
            }
        })

        updatePresence();
    }, [])

    const router = useRouter();

    return (
        <Sidebar data={
            <>
                <button className="sidebar-item react-icon-regular" onClick={() => {
                    router.push('/')
                }}>
                    <AiFillHome />
                </button>
                <button className="sidebar-item react-icon-regular" onClick={() => {
                    router.push('/game/calls')
                }}>
                    <BiSolidPhoneCall />
                </button>
                <button className="sidebar-item react-icon-regular" onClick={() => {
                    router.push('/game')
                }}>
                    <FaMap />
                </button>
                <button className="sidebar-item react-icon-regular btn-drp">
                    <IoMdAddCircle />
                    <div className="drp-cnt">
                        <div role='button' className='drp-cnt-item' onClick={() => {
                            router.push('/game/buildings');
                        }}
                        >
                            Baumenü
                        </div>
                        <div role='button' className='drp-cnt-item' onClick={() => {
                            router.push('/game/fleet');
                        }}
                        >
                            Fahrzeugmenü
                        </div>
                    </div>
                </button>
            </>
        } />
    );
}