export type sidebarRenderTypes = {
    data: {
        renderCallsButton: boolean,
        renderLocationButton: boolean,
        extended_menu?: {
            extended: boolean,
            initiator: 'TYPE_CALLS'
        }
    }
}

export interface savegame {
    id: string,
    name: string
}