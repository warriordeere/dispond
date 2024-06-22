export enum MenuModuleContentTypes {
    "MENU_MODULE_CONTENT_TYPE_DISPATCH_MENU" = "type_dispatch_menu",
    "MENU_MODULE_CONTENT_TYPE_UNIT_OVERVIEW" = "type_unit_overview",
    "MENU_MODULE_CONTENT_TYPE_ITEM_DISPLAY" = "type_item_display"
}

export type MenuModuleTypes = "MENU_MODULE_TYPE_PRIMARY" | "MENU_MODULE_TYPE_SECONDARY"

export enum SearchParamsOptions {
    "SEARCHPARAMS_MENU_MODULE_PRIMARY" = "primary",
    "SEARCHPARAMS_MENU_MODULE_SECONDARY" = "secondary",
    "SEARCHPARAMS_DISPLAY_ITEM_ID" = "view",
    "SEARCHPARAMS_DISPLAY_ITEM_TYPE" = "type",
}

export interface MenuContentInterface {
    content_type: MenuModuleContentTypes
    item?: string
}

export type ToolboxButtonTypes = "TB_BTN_BUILDING_MENU" | "TB_BTN_VEHICLE_MENU" | "TB_DRP_ADD_MENU"

export interface ItemRadioInterface {
    id: string
    label: string
    state: number // 0 - 9; See https://de.wikipedia.org/wiki/Funkmeldesystem
}