'use client'

import { Sidemenu } from "@/app/shared/components/menu/sidemenu"
import Sidebar, { SidebarBackButton } from "@/app/shared/components/nav/sidenav"
import { useRouter } from "next/navigation";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function ManageFleet() {
    return (
        <>
            <Sidebar data={<SidebarBackButton />} />
            <Sidemenu type="MENU_FLEET" />
        </>
    )
}