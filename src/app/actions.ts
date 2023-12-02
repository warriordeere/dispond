// 'use server';

import { LngLat, LngLatLike } from "@tomtom-international/web-sdk-maps";
import { cst_fs } from "./script/file/fs";
import { buildingObject, buildingTypes } from "./shared/types/types";

export async function postResult(formData: FormData) {
    const building_name = formData.get('bm-name')
    const building_position = formData.get('bm-position')
    const building_type = formData.get('bm-type')

    const data: buildingObject = {
        id: crypto.randomUUID(),
        name: building_name as string,
        position: new LngLat(1, 1),
        type: building_type as buildingTypes
    }

    cst_fs.localData({
        file_data: data,
        file_name: 'buildings.json',
        file_path: 'data'
    })
}