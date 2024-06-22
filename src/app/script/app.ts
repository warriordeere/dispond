import { map_inst } from "../shared/components/map";

import tt from "@tomtom-international/web-sdk-maps";
import { AppMetaData } from "@shared/types/app.types";
import { LanguageString } from "../shared/types/types";

export const App = new class INTERNAL_CLASS_INIT {

    async metadata(): Promise<AppMetaData> {
        return {
            app: 'dispond',
            copyright: ['Warrior Deere', 'Arcavigi Interactive'],
            language: LanguageString.LANGUAGE_STRING_DE_DE,
            version: '0.4.0'
        };
    }

    async initMap() {
        const spawnPoint = (await fetch('api/data/saves?filter=spawn'))
            .json()
            .then((r) => {
                return r[0] as [number, number];
            });

        const coords = tt.LngLat.convert(await spawnPoint);
        map_inst.easeTo({ center: coords });
    }
}