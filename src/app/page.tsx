'use client'

import { useEffect } from "react";
import Landing from "./shared/components/landing/landing";
import Sidebar from "./shared/components/nav/sidenav";
// import { setupWindow } from "./script/setup";

export const API_KEY = process.env.TOMTOM_API_KEY

export default function page() {

    // useEffect(() => {
    //     setupWindow();
    // }, [])

    return (
        <>
            <Sidebar data={{
                renderHomeButton: false,
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                renderBackButton: false
            }} />
            <Landing />
        </>
    )
}