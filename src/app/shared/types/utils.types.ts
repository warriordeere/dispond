export interface PresenceInterface {
    action: "EVENT_RPC_SET"
    data: PresenceData
}

export interface PresenceData {
    state: String | ""
    details: String | ""
    image_large: String | ""
    text_large: String | ""
    image_small: String | ""
    text_small: String | ""
}

export interface ReadFileInterface {
    file_path: string
    base_dir: 'document_dir'
}