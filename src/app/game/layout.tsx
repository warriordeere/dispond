'use client'
import TTMap from "../shared/components/map/map";

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