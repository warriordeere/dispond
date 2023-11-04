'use client'

import TTMap from "../shared/components/map/map";
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