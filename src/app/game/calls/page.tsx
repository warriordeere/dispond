'use client'

import { Sidemenu } from "@/app/shared/components/menu/sidemenu"
import Sidebar from "@/app/shared/components/nav/sidenav"
import { useRouter } from "next/navigation";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function Calls() {
    const router = useRouter();
    return (
        <>
            <Sidebar data={
                <button className="sidebar-item react-icon-regular" onClick={() => {
                    router.back()
                }}>
                    <BsArrowLeftCircle />
                </button>
            } />
            <Sidemenu type="MENU_CALLS" />
        </>
    )
}