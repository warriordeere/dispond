import { RxQuestionMark } from "react-icons/rx";
import { BsBuildingFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";

import { ToolboxButtonTypes } from "../types/types";

import "../style/globals.css";
import "../style/toolbox.css";
import { IoMdAddCircle } from "react-icons/io";

export default function Toolbox() {
    return (
        <section className="toolbox">
            <ToolboxButton type="TB_BTN_BUILDING_MENU" />
            <ToolboxButton type="TB_BTN_VEHICLE_MENU" />
            <ToolboxButton type="TB_DRP_ADD_MENU" />
        </section>
    )
}

function ToolboxButton({ type }: { type: ToolboxButtonTypes }) {
    switch (type) {
        case "TB_BTN_BUILDING_MENU":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Gebäude Übersicht"
                >
                    <BsBuildingFill />
                </button>
            );

        case "TB_BTN_VEHICLE_MENU":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Fahrzeug Übersicht"
                >
                    <FaCar />
                </button>
            );

        case "TB_DRP_ADD_MENU":
            return (
                <div className="tb-drp">
                    <div className="tb-drp-wrapper">
                        <button className="tb-drp-item">1</button>
                        <button className="tb-drp-item">2</button>
                        <button className="tb-drp-item">3</button>
                    </div>
                    <IoMdAddCircle />
                </div>
            );

        default:
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="?"
                >
                    <RxQuestionMark />
                </button>
            );
    }
}
