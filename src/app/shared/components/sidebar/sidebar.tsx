'use client'

import { IoMdAddCircle, IoMdSettings } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FaMap } from "react-icons/fa6";
import { extendedSidebar, sidebarRenderTypes } from "../../types/types";
import { useRouter } from "next/navigation";
import CallItem from "../calls/calls";
import './sidebar.css';
import '../../../globals.css';

export default function Sidebar({ data }: sidebarRenderTypes) {
    return (
        <>
            {
                data.extended_menu ? (
                    <ExtendedSidebarContent data={{
                        extended_menu: "MENU_CALLS"
                    }} />
                ) : (
                    <SidebarContent data={data} />
                )
            }
        </>
    )
}

function SidebarContent({ data }: sidebarRenderTypes) {
    const router = useRouter();
    return (
        <nav className="sidebar">
            <div className="sidebar-ui-container">
                <button className="sidebar-item react-icon-regular" onClick={() => {
                    router.push('/')
                }}>
                    <AiFillHome />
                </button>
                {
                    data.renderCallsButton ? (
                        <button className="sidebar-item react-icon-regular" onClick={() => {
                            router.push('/game/calls')
                        }}>
                            <BiSolidPhoneCall />
                        </button>
                    ) : null
                }
                {
                    data.renderLocationButton ? (
                        <button className="sidebar-item react-icon-regular" onClick={() => {
                            router.push('/play')
                        }}>
                            <FaMap />
                        </button>
                    ) : null
                }
                {
                    data.renderManageButton ? (
                        <button className="sidebar-item react-icon-regular" onClick={() => {
                            router.push('/game/manage')
                        }}>
                            <IoMdAddCircle />
                        </button>
                    ) : null
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

function ExtendedSidebarContent({ data }: extendedSidebar) {
    switch (data.extended_menu) {
        case 'MENU_CALLS':
            return (
                <nav className="sidebar-extended">
                    <div className="ext-sidebar-content">
                        <div className="extsb-head">
                            <button className="extsb-close react-icon-regular" onClick={() => {
                                history.back()
                            }}>
                                <BsArrowLeftCircle />
                            </button>
                            <span className="extsb-icon react-icon-regular">
                                <BiSolidPhoneCall />
                            </span>
                            <h2>
                                Anrufe
                            </h2>
                        </div>
                        <div className="extsb-body">
                            <CallItem />
                        </div>
                    </div>
                </nav>
            )
        case 'MENU_MANAGE':
            return (
                <div>Test</div>
                // <ManageMenu />
            )
    }
}