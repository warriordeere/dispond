'use client'

import Sidebar from "@/app/shared/components/nav/sidenav"

export default function ManageFleet() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                renderHomeButton: false,
                extended_menu: "MENU_MANAGE_FLEET"
            }} />
        </>
    )
}