'use client'

import React, { useEffect, useState } from "react";
import "../style/globals.css";
import "../style/menu_module.css";
import { ItemDisplayInterface, MenuModuleContentTypes, MenuModuleTypes, GeneralItemTypes, SearchParamsOptions, MenuContentInterface } from "../types/types";
import { DispatchContentModule, ItemDisplayModule, UnitContentModule } from "./content_module";
import { StatusDisplayBox } from "./system_message";

export default function MenuModule({ module_type }: { module_type: MenuModuleTypes }) {

    const [primaryParams, setPrimaryParams] = useState<MenuContentInterface>();
    const [secondaryParams, setSecondaryParams] = useState<MenuContentInterface>();


    useEffect(() => {
        function getContentType() {
            const url = new URLSearchParams(window.location.search);

            setPrimaryParams({
                content_type: url.get(SearchParamsOptions.SEARCHPARAMS_MENU_MODULE_PRIMARY) as MenuModuleContentTypes,
                item_display: {
                    item: url.get(SearchParamsOptions.SEARCHPARAMS_DISPLAY_ITEM_ID) as String,
                    type: url.get(SearchParamsOptions.SEARCHPARAMS_DISPLAY_ITEM_TYPE) as GeneralItemTypes
                }
            })

            setSecondaryParams({
                content_type: url.get(SearchParamsOptions.SEARCHPARAMS_MENU_MODULE_SECONDARY) as MenuModuleContentTypes,
                item_display: {
                    item: url.get(SearchParamsOptions.SEARCHPARAMS_DISPLAY_ITEM_ID) as String,
                    type: url.get(SearchParamsOptions.SEARCHPARAMS_DISPLAY_ITEM_TYPE) as GeneralItemTypes
                }
            })
        }

        getContentType();
    }, []);

    console.log(primaryParams);

    switch (module_type) {
        case "MENU_MODULE_TYPE_PRIMARY":
            return (
                <section className="primary-menu menu-container">
                    <MenuContent params={primaryParams} />
                </section>
            )

        case "MENU_MODULE_TYPE_SECONDARY":
            return (
                <section className="secondary-menu menu-container">
                    <MenuContent params={secondaryParams} />
                </section>
            )


        default: throw new Error("Unknown 'MENU_MODULE_TYPE_'")
    }

}


export function MenuContent({ params }: { params: MenuContentInterface }) {

    console.log(params);

    switch (params.content_type) {
        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU:
            return <DispatchContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW:
            return <UnitContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY:
            return <ItemDisplayModule item={params.item_display.item} type={params.item_display.type} />

        default:
            return <StatusDisplayBox http_status_code={404} detail_string="Unknown Menu Content Type" />
    }
}