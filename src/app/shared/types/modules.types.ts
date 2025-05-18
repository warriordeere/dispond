import React from "react"
import { ItemDisplayTypes } from './types';

export enum MenuModuleContentTypes {
    "MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU" = "type_dispatch_menu",
    "MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW" = "type_unit_overview",
    "MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY" = "type_item_display",
    "MENU_MODULE_CONTENT_TYPE_BUILDING_MENU" = "type_building_menu",
    "MENU_MODULE_CONTENT_TYPE_VEHICLE_MENU" = "type_vehicle_menu",
}

export enum LargeMenuModuleContentTypes {
    "LARGE_MENU_MODULE_CONTENT_TYPE_BUILDING_DISPLAY" = "type_building_display",
    "LARGE_MENU_MODULE_CONTENT_TYPE_VEHICLE_DISPLAY" = "type_vehicle_display",
    "LARGE_MENU_MODULE_CONTENT_TYPE_SHOP_MENU" = "type_shop_menu"
}

export type MenuModuleTypes = "MENU_MODULE_TYPE_PRIMARY" | "MENU_MODULE_TYPE_SECONDARY" | "MENU_MODULE_TYPE_LARGE"

export enum SearchParamsOptions {
    "SEARCHPARAMS_MENU_MODULE_LARGE" = "menu_large",
    "SEARCHPARAMS_MENU_MODULE_PRIMARY" = "primary",
    "SEARCHPARAMS_MENU_MODULE_SECONDARY" = "secondary",
    "SEARCHPARAMS_DISPLAY_ITEM_ID" = "view",
    "SEARCHPARAMS_DISPLAY_ITEM_TYPE" = "type",
}

export interface MenuContentInterfaceBase {
    content_type: MenuModuleContentTypes | LargeMenuModuleContentTypes;
}

export interface ItemDisplayMenuContentInterface extends MenuContentInterfaceBase {
    content_type: MenuModuleContentTypes.MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY;
    item_display_type: ItemDisplayTypes;
    item_id: string;
}

export type MenuContentInterface = MenuContentInterfaceBase | ItemDisplayMenuContentInterface;

export type ToolboxButtonTypes = "TB_BTN_BUILDING_MENU" | "TB_BTN_VEHICLE_MENU" | "TB_DRP_ADD_MENU" | "TB_BTN_ITEM_SHOP" | "TB_BTN_UNIT_MENU"

export interface ItemRadioInterface {
    id: string
    label: string
    state: number // 0 - 9; See https://de.wikipedia.org/wiki/Funkmeldesystem
}

export interface MenuWrapperSetInterface {
    module_set: MenuWrapperSetOptionDouble | MenuWrapperSetOptionSingle
}

export interface MenuWrapperSetOptionSingle {
    large: LargeMenuModuleContentTypes
}

export interface MenuWrapperSetOptionDouble {
    primary: MenuModuleContentTypes,
    secondary: MenuModuleContentTypes
    item_id?: string
}

export interface ModuleHeaderInterface {
    data: {
        icon?: React.JSX.Element,
        title: string
    }
}

export interface ModuleFooterInterface {
    data: {
        button: ModuleFooterButtonInterface[]
    }
}

export interface ModuleFooterButtonInterface {
    icon: React.JSX.Element
    title: string
    on: {
        click: () => void
    }
}