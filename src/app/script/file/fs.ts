'use client'

import { writeTextFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';

export const cst_fs = new class cst_fs {
    async setup_config() {
        await createDir('Arcavigi Interactive/saves/MySave', { dir: BaseDirectory.Document, recursive: true })
            .then(async () => {
                await writeTextFile('Arcavigi Interactive/saves/MySave/config.json', '', { dir: BaseDirectory.Document });
                await createDir('Arcavigi Interactive/saves/MySave/assets', { dir: BaseDirectory.Document, recursive: true })
                    .then(async () => {
                        await writeTextFile('Arcavigi Interactive/saves/MySave/assets/names.json', '', { dir: BaseDirectory.Document });
                    })
            })
    }
}