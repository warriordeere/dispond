'use client'

import TTMap from "../shared/components/map/map";
import { useEffect, useState } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <TTMap />
        </>
    )
}