import { openDB, IDBPDatabase } from 'idb';
import { SavegameDataSchema, DatabaseOptions, DatabasePostOptions, DatabaseStores } from './shared/types/types';

function init(db_name: string): Promise<IDBPDatabase<any>> {
    return openDB<SavegameDataSchema>(db_name, 1, {
        upgrade(db) {
            const valid_stores: DatabaseStores[] = ['DB_STORE_ACTIVE_MISSIONS', 'DB_STORE_BUILDINGS'];
            valid_stores.forEach((store) => {
                if (!db.objectStoreNames.contains(store)) {
                    const new_str = db.createObjectStore(store, { keyPath: 'id' });
                    new_str.createIndex('by-id', 'id')
                }
            })
        }
    });
}

export async function getDB(db_opt: DatabaseOptions): Promise<[]> {
    const db_name = db_opt.database;
    const db_store = db_opt.store;
    const db = await init(db_name);

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
}

export async function postDB(db_opt: DatabasePostOptions) {
    const db_name = db_opt.database;
    const db_store = db_opt.store;

    const db = await init(db_name);

    db.addEventListener('versionchange', () => {
        db.close();
        console.warn('DB Version changed in another instance! Reload is required.');
    })

    if (db.objectStoreNames.contains(db_store)) {
        const trx = db.transaction(db_store, 'readwrite');
        const str = trx.objectStore(db_store);

        await str.put(db_opt.data)
        await trx.done;
    }
    else {
        console.error('store not found!');
    }

    db.close();
}