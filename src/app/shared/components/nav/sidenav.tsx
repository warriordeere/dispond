'use client'

import { IoMdSettings } from "react-icons/io";
import { SidebarData } from "../../types/types";
import './sidenav.css';
import '../../../globals.css';

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