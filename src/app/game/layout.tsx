'use client'

import dynamic from "next/dynamic";
import TTMap from "../shared/components/map/map";

const WindowTitlebar = dynamic(() => import("@/app/shared/components/titlebar/titlebar"), { ssr: false })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <WindowTitlebar />
                {children}
                <TTMap />
            </body>
        </html>
    )
}