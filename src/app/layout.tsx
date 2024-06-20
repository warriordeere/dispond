'use client'

import dynamic from "next/dynamic";
import { Tooltip } from "react-tooltip";

import { DebugMenu } from "./shared/components/debug_menu";

const WindowTitlebar = dynamic(() => import("../app/shared/components/titlebar/titlebar"), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Tooltip id="generic-ttp-id" style={{ zIndex: 999 }} />
        <WindowTitlebar />
        <DebugMenu />
        {children}
      </body>
    </html>
  )
}