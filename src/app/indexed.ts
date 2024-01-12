import { openDB, IDBPDatabase } from 'idb';
import { SavegameDataSchema, MissionInterface, BuildingInterface, DatabaseOptions, DatabasePostOptions, DatabaseStores } from './shared/types/types';

function init(db_name: string, db_store: DatabaseStores): Promise<IDBPDatabase<any>> {
    return openDB<SavegameDataSchema>(db_name, 1, {
        upgrade(db) {
            db.createObjectStore(db_store);
        }
    });
}

export async function getDB(db_opt: DatabaseOptions): Promise<[]> {
    const db_name = db_opt.database;
    const db_store = db_opt.store;
    const db = await init(db_name, db_store);

    if (db.objectStoreNames.contains(db_store)) {
        const trx = db.transaction(db_store, 'readonly');
        const data = await trx.store.getAll();
        await trx.done;
        return data as [];
    }
    else {
        return [];
    }
}

export async function postDB(db_opt: DatabasePostOptions) {
    const db_name = db_opt.database;
    const db_store = db_opt.store;
    const db = await init(db_name, db_store);

    const trx = db.transaction(db_store, 'readwrite');
    const str = trx.objectStore(db_store);
    await str.put(db_opt.data)
    await trx.done;
}

function initDB(store: string): Promise<IDBPDatabase<any>> {
    switch (store) {
        case 'buildings':
            return openDB<SavegameDataSchema>('savegame_data', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('DB_STORE_BUILDINGS')) {
                        const saved_buildings = db.createObjectStore('DB_STORE_BUILDINGS', { keyPath: 'id' })
                        saved_buildings.createIndex('by-id', 'id')
                        saved_buildings.createIndex('by-name', 'name')
                    }
                }
            });

        case 'active_missions':
            return openDB<SavegameDataSchema>('savegame_data', 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('DB_STORE_ACTIVE_MISSIONS')) {
                        const saved_missions = db.createObjectStore('DB_STORE_ACTIVE_MISSIONS', { keyPath: 'id' })
                        saved_missions.createIndex('by-id', 'id')
                        saved_missions.createIndex('by-name', 'name')
                    }
                }
            });
        default:
            return Promise.reject(new Error(`Invalid object-store requested: ${store}`));
    }
}

export async function db_save_name(data: BuildingInterface) {
    const db = await initDB('buildings');
    const tx = db.transaction('buildings', 'readwrite');
    let cnt: BuildingInterface = await tx.store.get(data.id);
    if (!cnt) {
        cnt = { id: data.id, name: data.name }
    }
    else {
        cnt.name = data.name;
    }
    const obj_sor = tx.objectStore('buildings');
    await obj_sor.put(cnt);
    await tx.done;
}

export async function db_save_position(data: BuildingInterface) {
    const db = await initDB('buildings');
    const tx = db.transaction('buildings', 'readwrite');
    const obj_sor = tx.objectStore('buildings');
    const cnt: BuildingInterface = await tx.store.get(data.id)
    let bfr = cnt;
    bfr.position = data.position;
    await obj_sor.put(bfr);
    await tx.done;
}

export async function db_save_type(data: BuildingInterface) {
    const db = await initDB('buildings');
    const tx = db.transaction('buildings', 'readwrite');
    const obj_sor = tx.objectStore('buildings');
    const cnt: BuildingInterface = await tx.store.get(data.id)
    let bfr = cnt;
    bfr.type = data.type;
    await obj_sor.put(bfr);
    await tx.done;
}

export async function db_save_area(data: BuildingInterface) {
    const db = await initDB('buildings');
    const tx = db.transaction('buildings', 'readwrite');
    const obj_sor = tx.objectStore('buildings');
    const cnt: BuildingInterface = await tx.store.get(data.id)
    let bfr = cnt;
    bfr.mission_area = data.mission_area;
    await obj_sor.put(bfr);
    await tx.done;
}

export async function db_save_active_mission(data: MissionInterface) {
    const db = await initDB('active_missions');
    const tx = db.transaction('active_missions', 'readwrite');
    const obj_str = tx.objectStore('active_missions');
    await obj_str.put(data);
    await tx.done;
}