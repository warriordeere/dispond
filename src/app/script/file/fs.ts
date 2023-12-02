import { buildingFile, buildingObject, configFile, localDataParams } from '@/app/shared/types/types';
import { writeTextFile, BaseDirectory, createDir, exists, readTextFile } from '@tauri-apps/api/fs';
import namesData from '@/app/shared/assets/names.json'
import missionsData from '@/app/shared/assets/missions.json'

export const cst_fs = new class cst_fs {
    async setupConfig() {
        if (await exists('Arcavigi Interactive/dispond/saves/MySave/config.json', { dir: BaseDirectory.Document })) {
            const file_content = await this.getFileContent({ directory: BaseDirectory.Document, file_path: 'saves/MySave/config.json' })
            const data: configFile = JSON.parse(file_content.toString());
            data.savegame.last_modifed = Date.now();
            await writeTextFile('Arcavigi Interactive/dispond/saves/MySave/config.json', JSON.stringify(data), { dir: BaseDirectory.Document })
                .catch((err) => {
                    throw new Error(err)
                })
        }
        else {
            const configObject: configFile = {
                savegame: {
                    id: crypto.randomUUID(),
                    created: Date.now(),
                    last_modifed: Date.now()
                },
                mods: false
            }

            await createDir('Arcavigi Interactive/dispond/saves/MySave', { dir: BaseDirectory.Document, recursive: true })
                .then(async () => {
                    await writeTextFile('Arcavigi Interactive/dispond/saves/MySave/config.json', `${JSON.stringify(configObject)}`, { dir: BaseDirectory.Document });
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
                        const file_content = await this.getFileContent({ file_path: `saves/MySave/data/buildings.json`, directory: BaseDirectory.Document })
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

    async getFileContent({ file_path, directory }: { file_path: string, directory: BaseDirectory }) {
        if (await exists(`Arcavigi Interactive/dispond/${file_path}`, { dir: directory })) {
            return await readTextFile(`Arcavigi Interactive/dispond/${file_path}`, { dir: directory })
        }
        else {
            return Error('file does not exist')
        }
    }
}