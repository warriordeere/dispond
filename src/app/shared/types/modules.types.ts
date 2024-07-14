export enum MenuModuleContentTypes {
    "MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU" = "type_dispatch_menu",
    "MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW" = "type_unit_overview",
    "MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY" = "type_item_display"
}

export enum LargeMenuModuleContentTypes {
    "LARGE_MENU_MODULE_CONTENT_TYPE_BUILDING_MENU" = "type_building_menu",
    "LARGE_MENU_MODULE_CONTENT_TYPE_VEHICLE_MENU" = "type_vehicle_menu",
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

export interface MenuContentInterface {
    content_type: MenuModuleContentTypes | LargeMenuModuleContentTypes
    item?: string
}

export type ToolboxButtonTypes = "TB_BTN_BUILDING_MENU" | "TB_BTN_VEHICLE_MENU" | "TB_DRP_ADD_MENU" | "TB_BTN_ITEM_SHOP"

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