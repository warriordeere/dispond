import { callInterface, callerObject, missionObject } from "@/app/shared/types/types";
import { BaseDirectory, readTextFile } from "@tauri-apps/api/fs";

export const Call = new class call {

    async generate(): Promise<callInterface> {

        async function randomMission(): Promise<missionObject> {
            const missionObject = JSON.parse(`${await readTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/missions.json', { dir: BaseDirectory.Document })}`);
            const missionArray = missionObject[Math.floor(Math.random() * missionObject.length)];
            const mission = missionArray[Math.floor(Math.random() * missionArray.length)]
            return { specific: mission.specific, type: mission.type };
        }

        async function randomCaller(): Promise<callerObject> {
            const callerObject = JSON.parse(`${await readTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/names.json', { dir: BaseDirectory.Document })}`);
            const firstName = callerObject.first_names[Math.floor(Math.random() * callerObject.first_names.length)]
            const lastName = callerObject.last_names[Math.floor(Math.random() * callerObject.last_names.length)]
            return { first_name: firstName, last_name: lastName }
        }

        return {
            id: '1',
            caller: await randomCaller(),
            location: { coords: [1, 1] },
            mission: await randomMission(),
            time: Date.now()
        }
    }
}