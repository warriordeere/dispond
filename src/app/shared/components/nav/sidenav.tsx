'use client'

import { IoMdSettings } from "react-icons/io";
import { SidebarData } from "../../types/types";
import './sidenav.css';
import '../../../globals.css';
import { useRouter } from "next/navigation";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function Sidebar({ data }: { data?: SidebarData }) {
    return (
        <nav className="sidebar">
            <div className="sidebar-ui-container">
                {
                    data ? (data) : null
                }
            </div>
            <div className="sidebar-ui-contaienr">
                <button className="sidebar-item react-icon-regular">
                    <IoMdSettings />
                </button>
            </div>
        </nav>
    )
}

export function SidebarBackButton() {
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