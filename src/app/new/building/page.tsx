'use client'

import Map from "@/app/shared/components/map/map"
import Sidebar from "@/app/shared/components/sidebar/sidebar"

export default function ManageFleet() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                extended_menu: "MENU_NEW_BUILDING"
            }} />
            <Map />
        </>
    )
}