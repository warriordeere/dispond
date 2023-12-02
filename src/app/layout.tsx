'use client'

import dynamic from "next/dynamic";
import { cst_fs } from "./script/file/fs";

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
        {children}
      </body>
    </html>
  )
}

cst_fs.setupConfig()