import { invoke } from "@tauri-apps/api/tauri";
import { PresenceData, PresenceInterface } from "../shared/types/types";

export function updatePresence(presence: PresenceData) {

    console.log("updating activity");
    const presenceUpdateData: PresenceInterface = {
        action: "EVENT_RPC_UPDATE",
        data: {
            state: presence.state,
            details: presence.details,
            image_large: presence.image_large,
            text_large: presence.text_large,
            image_small: presence.image_small,
            text_small: presence.text_small
        }
    }

    console.log("invoking command");
    invoke('presence', {
        data: presenceUpdateData
    })
        .then((r) => {
            console.log(`updated activity: ${r}`);
        })
        .catch((e) => {
            throw new Error(`updating activity failed: ${e}`)
        })

    console.log("updating activity done");
}