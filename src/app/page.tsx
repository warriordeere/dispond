'use client'

import { useEffect } from "react";
import Landing from "@shared//components/landing";
import { App } from "./script/app";

export const API_KEY = process.env.TOMTOM_API_KEY
export const RPC_CLIENT_ID = process.env.RPC_CLIENT_ID

export default function page() {

    useEffect(() => {
        App.initMap();
    }, [])

    return (
        <>
            <Landing />
        </>
    )
}