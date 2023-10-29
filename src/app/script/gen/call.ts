import { callInterface, callerObject, locationObject, missionObject } from "@/app/shared/types/types";

export class call implements callInterface {

    id: string;
    caller: callerObject;
    location: locationObject;
    mission: missionObject;
    constructor() {
        function randomCaller(): callerObject {

            return { first_name: '', last_name: '' };
        }

        function randomMission(): missionObject {

            return { specific: 'brennt Mülleimer', type: "B1" };
        }

        this.id = '1';
        this.caller = randomCaller();
        this.location = { coords: [1, 1] }
        this.mission = randomMission();
    }
}