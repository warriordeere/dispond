'use client'

import React, { useEffect, useState } from "react";
import "../style/globals.css";
import "../style/menu_module.css";
import { MenuModuleContentTypes, MenuModuleTypes } from "../types/types";
import { DispatchContentModule, UnitContentModule } from "./content_module";
import { StatusDisplayBox } from "./system_message";

export default function MenuModule({ module_type }: { module_type: MenuModuleTypes }) {

    const [primaryContentType, setPrimaryContentType] = useState<MenuModuleContentTypes>();
    const [secondaryContentType, setSecondaryContentType] = useState<MenuModuleContentTypes>();

    useEffect(() => {
        function getContentType() {
            const url = new URLSearchParams(window.location.search);
            setPrimaryContentType(url.get('primary_content') as MenuModuleContentTypes);
            setSecondaryContentType(url.get('secondary_content') as MenuModuleContentTypes);
        }

        getContentType();
    }, []);

    switch (module_type) {
        case "MENU_MODULE_TYPE_PRIMARY":
            return (
                <section className="primary-menu menu-container">
                    <MenuContent content_type={primaryContentType} />
                </section>
            )

        case "MENU_MODULE_TYPE_SECONDARY":
            return (
                <section className="secondary-menu menu-container">
                    <MenuContent content_type={secondaryContentType} />
                </section>
            )

        default:
            break;
    }
}


export function MenuContent({ content_type }: { content_type: MenuModuleContentTypes | undefined }) {
    switch (content_type) {
        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU:
            return <DispatchContentModule />

        case MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW:
            return <UnitContentModule />

        default:
            return <StatusDisplayBox http_status_code={404} detail_string="Unknown Content Type"/>
    }
}