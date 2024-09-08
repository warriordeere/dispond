import { openDB, IDBPDatabase } from 'idb';

import { DBVersionInterface, SavegameDataSchema, DatabaseStores, DatabaseGetOptions, DatabasePostOptions } from '@shared/types/idb.types';

async function DBVersion(db_name: string): Promise<DBVersionInterface> {
    const db = await openDB<SavegameDataSchema>(db_name);
    const ltvs = localStorage.getItem('db_version');
    const crvs = db.version.toString()

    if (ltvs !== crvs) {
        localStorage.setItem('db_version', crvs);
    }
    return {
        'crvs': crvs,
        'ltvs': ltvs ? (ltvs) : ('[ERROR] falsey "ltvs" value')
    };
}

async function initDB(db_name: string): Promise<IDBPDatabase<any>> {
    const dbv = await DBVersion(db_name);
    return openDB<SavegameDataSchema>(db_name, new Number(dbv.crvs) as number, {
        upgrade(db) {
            const valid_stores: DatabaseStores[] = ['DB_STORE_ACTIVE_MISSIONS', 'DB_STORE_BUILDINGS', 'DB_STORE_OWNED_VEHICLES'];
            valid_stores.forEach((store) => {
                if (!db.objectStoreNames.contains(store)) {
                    const new_str = db.createObjectStore(store, { keyPath: 'id' });
                    new_str.createIndex('by-id', 'id')
                }
            })
        }
    });
}

export async function getDB(db_opt: DatabaseGetOptions): Promise<[]> {
    const db_name = db_opt.database;
    const db_store = db_opt.store;
    const db = await initDB(db_name);

    switch (db_opt.key) {
        case 'DB_GET_REQUEST_OPTION_ALL':
            if (db.objectStoreNames.contains(db_store)) {
                const trx = db.transaction(db_store, 'readonly');
                const data = await trx.store.getAll();
                await trx.done;
                db.close();
                return data as [];
            }
            else {
                db.close();
                return [];
            }

        default:
            if (db.objectStoreNames.contains(db_store)) {
                const trx = db.transaction(db_store, 'readonly');
                let buffer: any[] = new Array();

                for (let i = 0; i < db_opt.key.length; i++) {
                    buffer.push(await trx.store.get(db_opt.key[i]));
                    await trx.done;
                    db.close();
                }

                return buffer as [];
            }
            else {
                db.close();
                return [];
            }
    }
}

export async function postDB(db_opt: DatabasePostOptions) {
    const db_name = db_opt.database;
    const db_store = db_opt.store;
    const dbv = await DBVersion(db_name);

    let db = await initDB(db_name);

    db.addEventListener('versionchange', () => {
        db.close();
        console.warn('DB Version changed in another instance! Reload is required.');
    })

    if (!db.objectStoreNames.contains(db_store)) {
        const nwVrs = new Number(dbv.crvs) as number + 1;
        localStorage.setItem('db_version', nwVrs.toString());
        db.close();
        db = await openDB(db_name, nwVrs, {
            upgrade(db) {
                const nwstr = db.createObjectStore(db_store, { keyPath: 'id' });
                nwstr.createIndex('by-id', 'id');
            }
        })
    }

    const trx = db.transaction(db_store, 'readwrite');
    const str = trx.objectStore(db_store);

    await str.put(db_opt.data)
    await trx.done;

    db.close();
}