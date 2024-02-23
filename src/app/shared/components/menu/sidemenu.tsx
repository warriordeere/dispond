import { Resizable } from 're-resizable';
import { BiSolidPhoneCall, BiSolidAmbulance } from "react-icons/bi";
import { BsBuildingFillAdd, BsBuildingFill } from "react-icons/bs";
import { SidemenuInterface, SidemenuContentInterface } from "../../types/types";
import CallItem from "../calls/calls";
import { BuildingMenu, AddBuildingMenu } from "./buildingmenu";
import './menu.css';
import { FleetManageMenu, FleetMenu, VehicleShop } from './fleetmenu';
import { FaCartShopping } from 'react-icons/fa6';

export function Sidemenu(data: SidemenuInterface) {
    switch (data.type) {
        case 'MENU_CALLS':
            return (
                <SidemenuContent data={{
                    title: "Anrufe",
                    icon: <BiSolidPhoneCall />,
                    content: <CallItem />
                }} />
            );

        case 'MENU_FLEET':
            return (
                <SidemenuContent data={{
                    title: "Fahrzeugmenü",
                    icon: <BiSolidAmbulance />,
                    content: <FleetMenu />
                }} />
            );

        case 'MENU_MANAGE_FLEET':
            return (
                <SidemenuContent data={{
                    title: "Fahrzeugmenü",
                    icon: <BiSolidAmbulance />,
                    content: <FleetManageMenu />
                }} />
            );

        case 'MENU_MANAGE_BUILDINGS':
            return (
                <SidemenuContent data={{
                    title: "Baumenü",
                    icon: <BsBuildingFill />,
                    content: <BuildingMenu />
                }} />
            );

        case 'MENU_NEW_BUILDING':
            return (
                <SidemenuContent data={{
                    title: "Neues Gebäude",
                    icon: <BsBuildingFillAdd />,
                    content: <AddBuildingMenu />
                }} />
            );

        case 'MENU_NEW_VEHICLE':
            return (
                <SidemenuContent data={{
                    title: "Fahrzeughändler",
                    icon: <FaCartShopping />,
                    content: <VehicleShop />
                }} />
            );
    }
}

function SidemenuContent({ data }: { data: SidemenuContentInterface }) {
    return (
        <Resizable
            maxWidth={"100%"}
            minWidth={"30%"}
            bounds={'window'}
            enable={{ right: true }}
            className="sidemenu">
            <div className="sidemenu-item">
                <div className="sidemenu-head">
                    <span className="sidemenu-icon react-icon-regular">
                        {data.icon}
                    </span>
                    <h2>
                        {data.title}
                    </h2>
                </div>
                <div className="sidemenu-body">
                    {data.content}
                </div>
            </div>
        </Resizable>
    )
}