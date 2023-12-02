'use client'

import Sidebar from "../shared/components/sidebar/sidebar";

export default function Game() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: true,
                renderLocationButton: true,
                renderManageButton: true
            }} />
        </>
    )
}