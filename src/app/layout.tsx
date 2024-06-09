'use client'

import dynamic from "next/dynamic";
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
        <WindowTitlebar />
        <DebugMenu />
        {children}
      </body>
    </html>
  )
}