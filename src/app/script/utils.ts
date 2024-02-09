import { invoke } from "@tauri-apps/api/tauri";
import { PresenceData } from "../shared/types/types";

export function updatePresence() {

    console.log("updating activity");
    const presenceUpdateData: PresenceData = {
        action: "EVENT_RPC_UPDATE",
        data: {
            state: "Ingame",
            details: "Responding To Calls",
            image_large: "arcavigi_interactive_logo",
            text_large: "Dispond Early Access",
            image_small: "arcavigi_interactive_logo",
            text_small: "Level: Expert"
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