'use client'

import "@shared/style/globals.css";
import "@shared/style/modules/menu_module.css";

import React, { useEffect, useState } from "react";

import { DispatchContentModule, ItemDisplayModule, UnitContentModule } from "./content_module";
import { StatusDisplayBox } from "../system_message";

import { MenuModuleTypes, MenuContentInterface, SearchParamsOptions, MenuModuleContentTypes, LargeMenuModuleContentTypes } from "../../types/modules.types";

export default function MenuModule({ module_type }: { module_type: MenuModuleTypes }) {

    const [largeMenuParams, setLargeMenuParams] = useState<MenuContentInterface>();
    const [primaryParams, setPrimaryParams] = useState<MenuContentInterface>();
    const [secondaryParams, setSecondaryParams] = useState<MenuContentInterface>();

    useEffect(() => {
        function getContentType() {
            const url = new URLSearchParams(window.location.search);

            setLargeMenuParams({
                content_type: url.get(SearchParamsOptions.SEARCHPARAMS_MENU_MODULE_LARGE) as LargeMenuModuleContentTypes
            })

            setPrimaryParams({
                content_type: url.get(SearchParamsOptions.SEARCHPARAMS_MENU_MODULE_PRIMARY) as MenuModuleContentTypes,
                item: url.get(SearchParamsOptions.SEARCHPARAMS_DISPLAY_ITEM_ID) as string
            })

            setSecondaryParams({
                content_type: url.get(SearchParamsOptions.SEARCHPARAMS_MENU_MODULE_SECONDARY) as MenuModuleContentTypes,
                item: url.get(SearchParamsOptions.SEARCHPARAMS_DISPLAY_ITEM_ID) as string
            })
        }

        getContentType();
    }, []);



    switch (module_type) {
        case "MENU_MODULE_TYPE_PRIMARY":
            if (primaryParams) {
                return (
                    <section className="primary-menu menu-container">
                        <MenuContent params={
                            {
                                content_type: primaryParams.content_type,
                                item: primaryParams?.item
                            }
                        } />
                    </section>
                )
            }
            else return <StatusDisplayBox http_status_code={400} />;

        case "MENU_MODULE_TYPE_SECONDARY":
            if (secondaryParams) {
                return (
                    <section className="secondary-menu menu-container">
                        <MenuContent params={
                            {
                                content_type: secondaryParams.content_type,
                                item: secondaryParams?.item
                            }
                        } />
                    </section>

                )
            }
            else return <StatusDisplayBox http_status_code={400} />;

        case "MENU_TYPE_LARGE":
            if (largeMenuParams) {
                return (
                    <section className="large-menu menu-container">
                        <MenuContent params={
                            {
                                content_type: largeMenuParams.content_type
                            }
                        } />
                    </section>

                )
            }
            else return <StatusDisplayBox http_status_code={400} />;

        default: throw new Error("Unknown 'MENU_MODULE_TYPE'")
    }

}


export function MenuContent({ params }: { params: MenuContentInterface }) {
    console.log('test1');    
    switch (params.content_type) {
        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU:
            return <DispatchContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW:
            return <UnitContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY:
            if (params.item) {
                return <ItemDisplayModule item={params.item} type={"SHOP_ITEM_TYPE_VEHICLE"} />
            }
            else return <StatusDisplayBox http_status_code={400} />;

        case LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_BUILDING_MENU:
            return <h2>Test1</h2>

        case LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_VEHICLE_MENU:
            return <h2>Test1</h2>

        case LargeMenuModuleContentTypes.LARGE_MENU_MODULE_CONTENT_TYPE_SHOP_MENU:
            console.log('test');
            return (
                <h2>Test1</h2>
            );

        default:
            return <StatusDisplayBox http_status_code={404} detail_string="Unknown Menu Content Type" />
    }
}