// import { savegameInterface, buildingFile, gameConfigFile, localDataParams, cst_readInterface, cst_writeInterface } from '@/app/shared/types/types';
// import { writeTextFile, BaseDirectory, createDir, exists, readTextFile, readDir, FileEntry } from '@tauri-apps/api/fs';
// import namesData from '@/app/shared/assets/names.json'
// import missionsData from '@/app/shared/assets/missions.json'
// import * as path from 'path';
// import * as os from 'os';
// import { readFile } from 'fs/promises';
// import { readFileSync } from 'fs';

// export const cst_fs = new class cst_fs {
//     async write(data: cst_writeInterface): Promise<void | Error> {
//         if (data.file.name) {
//             const file = `Arcavigi Interactive/dispond/${data.file.path}/${data.file.name}`;
//             if (await exists(file, { dir: BaseDirectory.Document })) {
//                 return await writeTextFile(file, data.content, { dir: BaseDirectory.Document })
//             }
//             else {
//                 return new Error('"writeTextFile" Operation failed')
//             }
//         }
//         else {
//             const dir = `Arcavigi Interactive/dispond/${data.file.path}`;
//             if (await exists(`${dir}`, { dir: BaseDirectory.Document })) {
//                 return await createDir(`${dir}`, { dir: BaseDirectory.Document })
//             }
//             else {
//                 return new Error('"createDir" Operation failed')
//             }
//         }
//     }

//     setupSaves(data: savegameInterface) {
//         console.log('[CST_FS]: setupSaves');
//         // if (await exists(`Arcavigi Interactive/dispond/saves/saves.json`, { dir: BaseDirectory.Document })) {
//         //     const file_content = await this.read({
//         //         file: {
//         //             path: `saves`,
//         //             name: 'saves.json'
//         //         }
//         //     })
//         //     const file_data: savegameInterface = JSON.parse(file_content.toString());
//         //     file_data.modified = Date.now();
//         //     await writeTextFile(`Arcavigi Interactive/dispond/saves/${data.game.name}/config.json`, JSON.stringify(file_data), { dir: BaseDirectory.Document })
//         //         .catch((err) => {
//         //             throw new Error(err)
//         //         })
//         // }
//         // else {
//         //     const savesFile: savegameInterface = {
//         //         modified: data.modified,
//         //         created: data.created,
//         //         game: {
//         //             name: data.game.name,
//         //             spawn: data.game.spawn
//         //         }
//         //     }

//         //     await createDir(`Arcavigi Interactive/dispond/saves`, { dir: BaseDirectory.Document, recursive: true })
//         //         .then(async () => {
//         //             await writeTextFile(`Arcavigi Interactive/dispond/saves/saves.json`, `${JSON.stringify(savesFile)}`, { dir: BaseDirectory.Document });
//         //         })
//         // }
//     }

//     setupConfig(data: savegameInterface) {
//         console.log('[CST_FS]: setupConfig');
//         try {
//             const file_path = path.join(os.homedir(), 'Documents', 'Arcavigi Interactive', 'dispond', 'saves', data.game.name, 'saves.json')
//             const file_content = readFileSync()

//             // fs.readFile(file_path, () => {
//             //     const file_content: gameConfigFile = {
//             //         savegame: {
//             //             name: data.game.name,
//             //             created: Date.now(),
//             //             last_modifed: Date.now()
//             //         },
//             //         mods: false,
//             //         config_version: 1
//             //     }

//             //     const dir_path = path.join(os.homedir(), 'Documents', 'Arcavigi Interactive', 'dispond', 'saves', data.game.name)
//             //     fs.mkdirSync(dir_path)
//             //     fs.writeFileSync(file_path, JSON.stringify(file_content))
//             // })

//             // const file_content: gameConfigFile = JSON.parse(fs.readFileSync(file_path, 'utf-8').toString());
//             // file_content.savegame.last_modifed = Date.now();
//             // fs.writeFileSync(file_path, JSON.stringify(file_content))
//         } catch (error: any) {
//             throw new Error(error)
//         }

//         // if (fs.existsSync(file_path)) {
//         //     console.log(`[CST_FS]: setupConfig - filepath: ${file_path} exists!`);
//         //     console.log(`[CST_FS]: setupConfig - file: ${file_path}`, `content: ${file_content}`);

//         //     file_content.savegame.last_modifed = Date.now();
//         //     fs.writeFileSync(file_path, JSON.stringify(file_content))
//         // }
//         // else {

//         //     // await createDir(`Arcavigi Interactive/dispond/saves/${data.game.name}`, { dir: BaseDirectory.Document, recursive: true })
//         //     //     .then(async () => {
//         //     //         await writeTextFile(`Arcavigi Interactive/dispond/saves/${data.game.name}/config.json`, `${JSON.stringify(configObject)}`, { dir: BaseDirectory.Document });
//         //     //         await createDir('Arcavigi Interactive/dispond/saves/MySave/assets', { dir: BaseDirectory.Document, recursive: true })
//         //     //             .then(async () => {
//         //     //                 try {
//         //     //                     const { } = namesData;
//         //     //                     const { } = missionsData;
//         //     //                     await writeTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/names.json', `${JSON.stringify(namesData)}`, { dir: BaseDirectory.Document });
//         //     //                     await writeTextFile('Arcavigi Interactive/dispond/saves/MySave/assets/missions.json', `${JSON.stringify(missionsData)}`, { dir: BaseDirectory.Document });
//         //     //                 } catch (err: any) {
//         //     //                     throw new Error(err)
//         //     //                 }
//         //     //             })
//         //     //     })
//         // }
//     }
// }