'use client'

import Sidebar from "@/app/shared/components/sidebar/sidebar"

export default function Calls() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                extended_menu: "MENU_CALLS"
            }} />
        </>
    )
}