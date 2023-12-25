'use client'

import { game } from '@/app/emitter';
import Sidebar from '@/app/shared/components/sidebar/sidebar';
import { invoke } from "@tauri-apps/api/tauri";
import { savegameInterface } from "@/app/shared/types/types";

export default function Page() {
    game.emit('EVENT_START', {
        created: Date.now(),
        modified: Date.now(),
        game: {
            name: 'My Save',
            spawn: [13.5, 52.5]
        }
    })

    const data: savegameInterface = {
        created: Date.now(),
        modified: Date.now(),
        game: {
            name: 'My Save',
            spawn: [13.5, 52.5]
        }
    }

    invoke('setup', { data: JSON.stringify(data) })
    return (
        <Sidebar data={{
            renderCallsButton: true,
            renderLocationButton: true,
            renderManageButton: true,
            renderHomeButton: true
        }} />
    );
}