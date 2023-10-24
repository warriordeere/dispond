import { IoMdSettings } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import './sidebar.css';
import '../../../globals.css';
import { sidebarRenderTypes } from "../../types/types";

export default function Sidebar({ data }: sidebarRenderTypes) {
    return (
        <nav className="sidebar">
            <div className="sidebar-ui-container">
                <div className="sidebar-item">
                    <AiFillHome />
                </div>
                {
                    data.renderCallsButton ? (
                        <div className="sidebar-item">
                            <BiSolidPhoneCall />
                        </div>
                    ) : null
                }
                {
                    data.renderCallsButton ? (
                        <div className="sidebar-item">
                            <FaMapMarkerAlt />
                        </div>
                    ) : null
                }
            </div>
            <div className="sidebar-ui-contaienr">
                <div className="sidebar-item">
                    <IoMdSettings />
                </div>
            </div>
        </nav>
    )
}