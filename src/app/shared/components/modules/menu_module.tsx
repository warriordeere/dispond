'use client'

import "@shared/style/globals.css";
import "@shared/style/modules/menu_module.css";

import { useEffect, useState } from "react";

import { StatusDisplayBox } from "../system_message";
import { BuildingMenuContentModule } from "./module_content/building";

import { DispatchContentModule } from "./module_content/dispatch";
import { ItemDisplayContentModule } from "./module_content/item_display";
import { UnitContentModule } from "./module_content/unit";

import { MenuEmitter } from "@script/utils/emitter";

import { MenuContentInterface, MenuModuleContentTypes, LargeMenuModuleContentTypes } from "@shared/types/modules.types";
import { VehicleContentModule } from "./module_content/vehicle";
import { ShopContentModule } from "./module_content/shop";

import { ItemDisplayTypes } from '@shared/types/types';

interface MenuState {
    primary?: MenuModuleContentTypes;
    secondary?: MenuModuleContentTypes;
    large?: LargeMenuModuleContentTypes;
    item_display_type?: ItemDisplayTypes;
    item_id?: string;
}

const initialMenuState: MenuState = {};

const MenuModule = () => {
    const [menuState, setMenuState] = useState<MenuState>(initialMenuState);

    useEffect(() => {
        MenuEmitter.on('EVENT_MENU_BUILDING_OPEN', () => {
            setMenuState({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_BUILDING_MENU
            });
        });

        MenuEmitter.on('EVENT_MENU_SHOP_OPEN', () => {
            setMenuState({
                large: LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_SHOP_MENU
            });
        });

        MenuEmitter.on('EVENT_MENU_VEHICLE_OPEN', () => {
            setMenuState({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_VEHICLE_MENU
            });
        });

        MenuEmitter.on('EVENT_MENU_UNIT_OPEN', () => {
            setMenuState({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW
            });
        });

        MenuEmitter.on('EVENT_MENU_ITEM_DISPLAY_OPEN', (item_id: string, item_display_type: ItemDisplayTypes) => {
            setMenuState({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY,
                item_id: item_id,
                item_display_type: item_display_type
            });
        });
    }, []);

    return (
        <div className="menu-wrapper">
            {menuState.primary && <PrimaryMenu contentType={menuState.primary} />}
            {menuState.secondary && <SecondaryMenu contentType={menuState.secondary} itemId={menuState.item_id} itemDisplayType={menuState.item_display_type} />}
            {menuState.large && <LargeMenu contentType={menuState.large} />}
        </div>
    );
};

const PrimaryMenu = ({ contentType }: { contentType: MenuModuleContentTypes }) => {
    // Render primary menu based on contentType
    return <div>{contentType}</div>;
};

const SecondaryMenu = ({ contentType, itemId, itemDisplayType }: { contentType: MenuModuleContentTypes, itemId?: string, itemDisplayType?: ItemDisplayTypes }) => {
    // Render secondary menu based on contentType, itemId, and itemDisplayType
    return <div>{contentType} - {itemId} - {itemDisplayType}</div>;
};

const LargeMenu = ({ contentType }: { contentType: LargeMenuModuleContentTypes }) => {
    // Render large menu based on contentType
    return <div>{contentType}</div>;
};

export default MenuModule;

function MenuContent({ content_type }: MenuContentInterface) {
    switch (content_type) {
        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU:
            return <DispatchContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW:
            return <UnitContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY:
            return <ItemDisplayContentModule type={"ITEM_DISPLAY_TYPE_BUILDING"} item={""} />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_BUILDING_MENU:
            return <BuildingMenuContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_VEHICLE_MENU:
            return <VehicleContentModule />

        case LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_SHOP_MENU:
            return <ShopContentModule />
        default:
            return <StatusDisplayBox http_status_code={404} detail_string="Unknown Menu Content Type" />
    }
}