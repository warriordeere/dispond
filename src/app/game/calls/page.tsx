'use client'

import { Sidemenu } from "@/app/shared/components/menu/sidemenu"
import Sidebar, { SidebarBackButton } from "@/app/shared/components/nav/sidenav"
import { useRouter } from "next/navigation";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function Calls() {
    const router = useRouter();
    return (
        <>
            <Sidebar data={
                <>
                    <SidebarBackButton />
                </>
            } />
            <Sidemenu type="MENU_CALLS" />
        </>
    )
}

function MissionStateButton() {
    const router = useRouter();
    return (
        <>
            <button className="sidebar-item back-btn react-icon-regular" onClick={() => {
                router.back()
            }}>
                <BsArrowLeftCircle />
            </button>
        </>
    )
}