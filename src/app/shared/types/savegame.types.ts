import { LngLatLike } from "@tomtom-international/web-sdk-maps"

export interface savegameInterface {
    created: Number
    modified: Number
    game: {
        name: string
        spawn: LngLatLike
    }
}

export interface savegame {
    id: string,
    name: string
}

export interface NamesFile {
    last_names: string[]
    first_names: string[]
}

export interface gameConfigFile {
    savegame: {
        name: string
        created: number
        last_modifed: number
    }
    config_version: 1
    mods: boolean
}