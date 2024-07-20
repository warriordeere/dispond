import "@shared/style/globals.css";
import "@shared/style/toolbox.css";

import { RxQuestionMark } from "react-icons/rx";
import { BsBuildingFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import { LargeMenuModuleContentTypes, MenuModuleContentTypes, ToolboxButtonTypes } from "@shared/types/modules.types";
import { FaCartShopping } from "react-icons/fa6";
import { MenuEmitter } from "@/app/script/utils/emitter";
import { MdPerson } from "react-icons/md";

export default function Toolbox() {
    return (
        <section className="toolbox">
            <ToolboxButton type="TB_BTN_BUILDING_MENU" />
            <ToolboxButton type="TB_BTN_VEHICLE_MENU" />
            <ToolboxButton type="TB_BTN_UNIT_MENU" />
            <ToolboxButton type="TB_BTN_ITEM_SHOP" />
        </section>
    )
}


function handleBuildingMenuClick() {
    MenuEmitter.emit('EVENT_MENU_BUILDING_OPEN');
    localStorage.setItem('menu_primary', MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU);
    localStorage.setItem('menu_secondary', MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_BUILDING_MENU);
    localStorage.setItem('menu_large', 'undefined');
}

function handleVehicleMenuClick() {
    MenuEmitter.emit('EVENT_MENU_VEHICLE_OPEN');
    localStorage.setItem('menu_primary', MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU);
    localStorage.setItem('menu_secondary', MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_BUILDING_MENU);
    localStorage.setItem('menu_large', 'undefined');
}

function handleUnitMenuClick() {
    MenuEmitter.emit('EVENT_MENU_UNIT_OPEN');
    localStorage.setItem('menu_primary', MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU);
    localStorage.setItem('menu_secondary', MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW);
    localStorage.setItem('menu_large', 'undefined');
}

function handleShopMenuClick() {
    MenuEmitter.emit('EVENT_MENU_SHOP_OPEN');
    localStorage.setItem('menu_primary', 'undefined');
    localStorage.setItem('menu_secondary', 'undefined');
    localStorage.setItem('menu_large', LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_SHOP_MENU);
}

function ToolboxButton({ type }: { type: ToolboxButtonTypes }) {
    switch (type) {
        case "TB_BTN_BUILDING_MENU":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Gebäude"
                    onClick={handleBuildingMenuClick}
                >
                    <BsBuildingFill />
                </button>
            );

        case "TB_BTN_VEHICLE_MENU":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Fahrzeuge"
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

        case "TB_BTN_UNIT_MENU":
            return (
                <button className="tb-btn"
                    data-tooltip-id="generic-ttp-id"
                    data-tooltip-content="Einsatzkräfte"
                    onClick={handleUnitMenuClick}
                >
                    <MdPerson />
                </button>
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
