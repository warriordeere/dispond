import { callInterface, callerObject, locationObject, missionObject, namesFile } from "@/app/shared/types/types";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

export class call {
    id: string;
    caller: Promise<callerObject>;
    location: { coords: number[]; };
    mission: missionObject;

    constructor() {

        function randomMission(): missionObject {
            return { specific: 'brennt Mülleimer', type: "B1" };
        }

        function randomCaller() {
            return new Promise<callerObject>(async (resolve) => {
                const callerObject = JSON.parse(`${await readTextFile('Arcavigi Interactive/saves/MySave/assets/names.json', { dir: BaseDirectory.Document })}`);
                const firstName = callerObject.first_names[Math.floor(Math.random())]
                const lastName = callerObject.last_names[Math.floor(Math.random())]
                resolve({ first_name: firstName, last_name: lastName });
            })
        }

        this.id = '1';
        this.caller = randomCaller();
        this.location = { coords: [1, 1] }
        this.mission = randomMission();
    }
}