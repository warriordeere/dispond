'use client'

import Map from "@/app/shared/components/map/map"
import Sidebar from "@/app/shared/components/sidebar/sidebar"

export default function Calls() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: true,
                renderLocationButton: true,
                renderManageButton: true,
                extended_menu: "MENU_MANAGE"
            }} />
            <Map />
        </>
    )
}