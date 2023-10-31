import { configFile } from '@/app/shared/types/types';
import { writeTextFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';
import namesData from '@/app/shared/assets/names.json'
import missionsData from '@/app/shared/assets/missions.json'

export const cst_fs = new class cst_fs {
    async setup_config() {

        const configObject: configFile = {
            savegame: {
                id: '1-1',
                created: Date.now(),
                last_modifed: Date.now()
            },
            mods: false
        }

        await createDir('Arcavigi Interactive/saves/MySave', { dir: BaseDirectory.Document, recursive: true })
            .then(async () => {
                await writeTextFile('Arcavigi Interactive/saves/MySave/config.json', `${JSON.stringify(configObject)}`, { dir: BaseDirectory.Document });
                await createDir('Arcavigi Interactive/saves/MySave/assets', { dir: BaseDirectory.Document, recursive: true })
                    .then(async () => {
                        try {
                            const { } = namesData;
                            const { } = missionsData;
                            await writeTextFile('Arcavigi Interactive/saves/MySave/assets/names.json', `${JSON.stringify(namesData)}`, { dir: BaseDirectory.Document });
                            await writeTextFile('Arcavigi Interactive/saves/MySave/assets/missions.json', `${JSON.stringify(missionsData)}`, { dir: BaseDirectory.Document });
                        } catch (err: any) {
                            throw new Error(err)
                        }
                    })
            })
    }
}