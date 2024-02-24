'use client'

import { Sidemenu } from "@/app/shared/components/menu/sidemenu"
import Sidebar, { SidebarBackButton } from "@/app/shared/components/nav/sidenav"
import { useRouter } from "next/navigation";

export default function Calls() {
    const router = useRouter();
    return (
        <>
            <Sidebar data={<SidebarBackButton />} />
            <Sidemenu type="MENU_CALLS" />
        </>
    )
}