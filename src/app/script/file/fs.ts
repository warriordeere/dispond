'use server'

import { savegameInterface, buildingFile, configFile, localDataParams, cst_readInterface } from '@/app/shared/types/types';
import { writeTextFile, BaseDirectory, createDir, exists, readTextFile, readDir, FileEntry } from '@tauri-apps/api/fs';
import namesData from '@/app/shared/assets/names.json'
import missionsData from '@/app/shared/assets/missions.json'

export const cst_fs = new class cst_fs {

    async read(data: cst_readInterface): Promise<FileEntry[] | Error | String> {
        if (data.file.name) {
            const file = `Arcavigi Interactive/dispond/${data.file.path}/${data.file.name}`;
            if (await exists(file, { dir: BaseDirectory.Document })) {
                return await readTextFile(file, { dir: BaseDirectory.Document })
            }
            else {
                return new Error('Invalid')
            }
        }
        else {
            const dir = `Arcavigi Interactive/dispond/${data.file.path}`;
            if (await exists(`${dir}`, { dir: BaseDirectory.Document })) {
                return await readDir(`${dir}`, { dir: BaseDirectory.Document })
            }
            else {
                return new Error('Invalid')
            }
        }
    }

    async setupConfig(config_data: savegameInterface) {
        if (await exists(`Arcavigi Interactive/dispond/saves/${config_data.auth.game_id}/config.json`, { dir: BaseDirectory.Document })) {
            const file_content = await this.read({
                file: {
                    path: `saves/${config_data.auth.game_id}`,
                    name: 'config.json'
                }
            })
            const file_data: configFile = JSON.parse(file_content.toString());
            file_data.savegame.last_modifed = Date.now();
            await writeTextFile(`Arcavigi Interactive/dispond/saves/${config_data.auth.game_id}/config.json`, JSON.stringify(file_data), { dir: BaseDirectory.Document })
                .catch((err) => {
                    throw new Error(err)
                })
        }
        else {
            const configObject: configFile = {
                savegame: {
                    id: config_data.auth.game_id,
                    created: Date.now(),
                    last_modifed: Date.now()
                },
                mods: false,
                config_version: 1
            }

            await createDir(`Arcavigi Interactive/dispond/saves/${config_data.auth.game_id}`, { dir: BaseDirectory.Document, recursive: true })
                .then(async () => {
                    await writeTextFile(`Arcavigi Interactive/dispond/saves/${config_data.auth.game_id}/config.json`, `${JSON.stringify(configObject)}`, { dir: BaseDirectory.Document });
                    await createDir('Arcavigi Interactive/dispond/saves/MySave/assets', { dir: BaseDirectory.Document, recursive: true })
                        .then(async () => {
                            try {
                                const { } = namesData;
                                const { } = missionsData;
                                await writeTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/names.json', `${JSON.stringify(namesData)}`, { dir: BaseDirectory.Document });
                                await writeTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/missions.json', `${JSON.stringify(missionsData)}`, { dir: BaseDirectory.Document });
                            } catch (err: any) {
                                throw new Error(err)
                            }
                        })
                })
        }
    }

    async localData({ file_data, file_name, file_path }: localDataParams) {
        try {
            if (await exists(`Arcavigi Interactive/dispond/saves/MySave/${file_path}/${file_name}`, { dir: BaseDirectory.Document })) {
                switch (file_name) {
                    case 'buildings.json':
                        const file_content = await this.read({
                            file: {
                                path: `saves/MySave/data`,
                                name: 'buildings.json'
                            }
                        })
                        const data: buildingFile = JSON.parse(file_content.toString());
                        data.last_modified = Date.now();
                        data.items.push(file_data);
                        console.log(data);
                        await writeTextFile('Arcavigi Interactive/dispond/saves/MySave/data/buildings.json', JSON.stringify(data), { dir: BaseDirectory.Document })
                            .catch((err) => {
                                throw new Error(err)
                            })
                        return;
                }
            }
            else {
                await createDir(`Arcavigi Interactive/dispond/saves/MySave/${file_path}`, { dir: BaseDirectory.Document, recursive: true })
                    .then(async () => {
                        const file_base: buildingFile = {
                            created_at: Date.now(),
                            last_modified: Date.now(),
                            items: [file_data]
                        }
                        await writeTextFile(`Arcavigi Interactive/dispond/saves/MySave/${file_path}/${file_name}`, JSON.stringify(file_base), { dir: BaseDirectory.Document })
                    })
            }
        } catch (err: any) {
            throw new Error(err)
        }
    }
}