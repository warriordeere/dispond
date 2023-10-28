'use client'

import Map from "@/app/shared/components/map/map"
import Sidebar from "@/app/shared/components/sidebar/sidebar"

export default function Calls() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: true,
                renderLocationButton: true,
                extended_menu: {
                    extended: true,
                    initiator: 'TYPE_CALLS'
                }
            }} />
            <Map />
        </>
    )
}