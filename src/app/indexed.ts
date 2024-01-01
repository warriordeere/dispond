import { openDB, IDBPDatabase } from 'idb';
import { BuildingSchema, buildingObject } from './shared/types/types';

function initDB(): Promise<IDBPDatabase<any>> {
    return openDB<BuildingSchema>('savegame_data', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('buildings')) {
                const saved_buildings = db.createObjectStore('buildings', { keyPath: 'id' })
                saved_buildings.createIndex('by-id', 'id')
                saved_buildings.createIndex('by-name', 'name')
            }
        }
    });
}

export async function db_save_name(data: buildingObject) {
    const db = await initDB();
    const tx = db.transaction('buildings', 'readwrite');
    let cnt: buildingObject = await tx.store.get(data.id);
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

export async function db_save_position(data: buildingObject) {
    const db = await initDB();
    const tx = db.transaction('buildings', 'readwrite');
    const obj_sor = tx.objectStore('buildings');
    const cnt: buildingObject = await tx.store.get(data.id)
    let bfr = cnt;
    bfr.position = data.position;
    await obj_sor.put(bfr);
    await tx.done;
}

export async function db_save_type(data: buildingObject) {
    const db = await initDB();
    const tx = db.transaction('buildings', 'readwrite');
    const obj_sor = tx.objectStore('buildings');
    const cnt: buildingObject = await tx.store.get(data.id)
    let bfr = cnt;
    bfr.type = data.type;
    await obj_sor.put(bfr);
    await tx.done;
}

export async function db_save_area(data: buildingObject) {
    const db = await initDB();
    const tx = db.transaction('buildings', 'readwrite');
    const obj_sor = tx.objectStore('buildings');
    const cnt: buildingObject = await tx.store.get(data.id)
    let bfr = cnt;
    bfr.mission_area = data.mission_area;
    await obj_sor.put(bfr);
    await tx.done;
}

export async function db_get_buildings(): Promise<buildingObject[]> {
    const db = await initDB();
    const tx = db.transaction('buildings', 'readonly');
    const allData: buildingObject[] = await tx.store.getAll();
    await tx.done;
    return allData;
}