import "@shared/style/globals.css";
import "@shared/style/toolbox.css";

import { RxQuestionMark } from "react-icons/rx";
import { BsBuildingFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import { ToolboxButtonTypes } from "@shared/types/modules.types";
import { FaCartShopping } from "react-icons/fa6";
import { MenuEmitter } from "@/app/script/utils/emitter";

export default function Toolbox() {
    return (
        <section className="toolbox">
            <ToolboxButton type="TB_BTN_BUILDING_MENU" />
            <ToolboxButton type="TB_BTN_VEHICLE_MENU" />
            <ToolboxButton type="TB_BTN_ITEM_SHOP" />
            <ToolboxButton type="TB_DRP_ADD_MENU" />
        </section>
    )
}


function handleBuildingMenuClick() {
    MenuEmitter.emit('EVENT_MENU_BUILDING_OPEN');
}

function handleVehicleMenuClick() {
    MenuEmitter.emit('EVENT_MENU_VEHICLE_OPEN');
}

function handleShopMenuClick() {
    MenuEmitter.emit('EVENT_MENU_SHOP_OPEN');
}

function ToolboxButton({ type }: { type: ToolboxButtonTypes }) {
    switch (type) {
        case "TB_BTN_BUILDING_MENU":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Gebäude Übersicht"
                    onClick={handleBuildingMenuClick}
                >
                    <BsBuildingFill />
                </button>
            );

        case "TB_BTN_VEHICLE_MENU":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Fahrzeug Übersicht"
                    onClick={handleVehicleMenuClick}
                >
                    <FaCar />
                </button>
            );

        case "TB_BTN_ITEM_SHOP":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Shop"
                    onClick={handleShopMenuClick}
                >
                    <FaCartShopping />
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
