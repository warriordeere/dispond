'use client'

import { Sidemenu } from "@/app/shared/components/menu/sidemenu"
import Sidebar from "@/app/shared/components/nav/sidenav"

export default function Calls() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                renderHomeButton: false,
                renderBackButton: true
            }} />
            <Sidemenu type="MENU_CALLS" />
        </>
    )
}