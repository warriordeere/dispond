'use client'

import Landing from "./shared/components/landing/landing";
import Sidebar from "./shared/components/nav/sidenav";

export const API_KEY = process.env.TOMTOM_API_KEY

export default function page() {
    return (
        <>
            <Sidebar />
            <Landing />
        </>
    )
}