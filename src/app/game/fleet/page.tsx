'use client'

import Sidebar from "@/app/shared/components/sidebar/sidebar"

export default function ManageFleet() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                extended_menu: "MENU_MANAGE_FLEET"
            }} />
        </>
    )
}