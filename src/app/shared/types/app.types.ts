import { LanguageString, VersionString } from "./types"

export interface AppMetaData {
    version: VersionString
    app: string
    copyright: string[]
    language: LanguageString
}