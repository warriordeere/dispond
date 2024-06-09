import { RxQuestionMark } from "react-icons/rx";
import { BsBuildingFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";

import { ToolboxButtonTypes } from "../types/types";

import "../style/globals.css";
import "../style/toolbox.css";

export default function Toolbox() {
    return (
        <section className="toolbox">
            <ToolboxButton type={"TB_BTN_BUILDING_MENU"} />
            <ToolboxButton type={"TB_BTN_VEHICLE_MENU"} />
        </section>
    )
}

function ToolboxButton({ type }: ToolboxButtonTypes) {
    switch (type) {
        case "TB_BTN_BUILDING_MENU":
            return (
                <button className="tb-btn">
                    <BsBuildingFill />
                </button>
            );

        case "TB_BTN_VEHICLE_MENU":
            return (
                <button className="tb-btn">
                    <FaCar />
                </button>
            );

        default:
            return (
                <button className="tb-btn">
                    <RxQuestionMark />
                </button>
            );
    }
}
