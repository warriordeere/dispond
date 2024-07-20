'use client'

import "@shared/style/globals.css";
import "@shared/style/modules/menu_module.css";

import { useEffect, useState } from "react";

import { StatusDisplayBox } from "../system_message";
import { BuildingMenuContentModule } from "./module_content/building";

import { DispatchContentModule } from "./module_content/dispatch";
import { ItemDisplayContentModule } from "./module_content/item_display";
import { UnitContentModule } from "./module_content/unit";

import { isMenuOptionDouble, isMenuOptionSingle } from "@script/utils/type_guard";
import { MenuEmitter } from "@script/utils/emitter";

import { MenuModuleTypes, MenuContentInterface, MenuModuleContentTypes, LargeMenuModuleContentTypes, MenuWrapperSetOptionDouble, MenuWrapperSetOptionSingle } from "@shared/types/modules.types";
import { VehicleContentModule } from "./module_content/vehicle";

export function MenuWrapper() {

    const [menuWrapperSet, setMenuWrapperSet] = useState<MenuWrapperSetOptionDouble | MenuWrapperSetOptionSingle>();

    useEffect(() => {

        MenuEmitter.on('EVENT_MENU_BUILDING_OPEN', () => {
            setMenuWrapperSet({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_BUILDING_MENU
            });
        });

        MenuEmitter.on('EVENT_MENU_SHOP_OPEN', () => {
            setMenuWrapperSet({
                large: LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_SHOP_MENU
            });
        });

        MenuEmitter.on('EVENT_MENU_VEHICLE_OPEN', () => {
            setMenuWrapperSet({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_VEHICLE_MENU
            });
        });

        MenuEmitter.on('EVENT_MENU_UNIT_OPEN', () => {
            setMenuWrapperSet({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW
            });
        });

        MenuEmitter.on('EVENT_MENU_ITEM_DISPLAY_OPEN', (item_id) => {
            setMenuWrapperSet({
                primary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU,
                secondary: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY,
                item_id: item_id
            });
        });

    }, []);

    if (isMenuOptionSingle(menuWrapperSet)) {
        return (
            <>
                <MenuModule module_type="MENU_MODULE_TYPE_LARGE" module_content={menuWrapperSet.large} />
            </>
        );
    }
    else if (isMenuOptionDouble(menuWrapperSet)) {
        return (
            <>
                <MenuModule module_type="MENU_MODULE_TYPE_PRIMARY" module_content={menuWrapperSet.primary} item_id={menuWrapperSet.item_id} />
                <MenuModule module_type="MENU_MODULE_TYPE_SECONDARY" module_content={menuWrapperSet.secondary} item_id={menuWrapperSet.item_id} />
            </>
        );
    } else {
        return (
            <>
                <MenuModule module_type="MENU_MODULE_TYPE_PRIMARY" module_content={MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU} />
                {/* <MenuModule module_type="MENU_MODULE_TYPE_SECONDARY" module_content={MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW} /> */}
                <MenuModule module_type="MENU_MODULE_TYPE_SECONDARY" module_content={MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_BUILDING_MENU} />
            </>
        );
    }
}

function MenuModule({ module_type, module_content, item_id }:
    {
        module_type: MenuModuleTypes,
        module_content: MenuModuleContentTypes | LargeMenuModuleContentTypes,
        item_id?: string
    }) {

    const styleClassString = module_type.toLowerCase().slice(17);

    return (
        <section className={`${styleClassString}-menu menu-container`}>
            <MenuContent content_type={module_content} item={item_id} />
        </section>
    )
}


function MenuContent({ content_type, item }: MenuContentInterface) {
    switch (content_type) {
        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU:
            return <DispatchContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW:
            return <UnitContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY:
            if (item) {
                return <ItemDisplayContentModule item={item} type={"SHOP_ITEM_TYPE_VEHICLE"} />
            }
            else return <StatusDisplayBox http_status_code={400} />;

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_BUILDING_MENU:
            return <BuildingMenuContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_VEHICLE_MENU:
            return <VehicleContentModule />

        case LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_SHOP_MENU:
            return (
                <h2>Test1</h2>
            );

        default:
            return <StatusDisplayBox http_status_code={404} detail_string="Unknown Menu Content Type" />
    }
}