import { invoke } from "@tauri-apps/api/tauri";

import { GeometryData } from "@shared/types/ttcst.types";
import { PresenceData, PresenceInterface } from "@shared/types/utils.types";
import { DispatchFileObject, DispatchInterface, DispatchTypeOptions } from "@/app/shared/types/dispatches.types";
import { BuildingTypeOptions } from "@/app/shared/types/building.types";
import { VehicleFileObject, VehicleTypeOptions } from "@/app/shared/types/vehicle.types";

export function updatePresence(presence: PresenceData) {

    console.debug("[DEBUG] updating activity");
    const presenceUpdateData: PresenceInterface = {
        action: "EVENT_RPC_SET",
        data: {
            state: presence.state,
            details: presence.details,
            image_large: presence.image_large,
            text_large: presence.text_large,
            image_small: presence.image_small,
            text_small: presence.text_small
        }
    }

    console.debug("[DEBUG] invoking command");
    invoke('presence', {
        data: presenceUpdateData
    })
        .then((r) => {
            console.debug(`[DEBUG] updated activity: ${r}`);
        })
        .catch((e) => {
            throw new Error(`updating activity failed: ${e}`)
        })

    console.debug("[DEBUG] updating activity done");
}

export function animateRespond(route: GeometryData) {
    // function moveToStep(marker: any, route: any, c: any) {
    //     if (route.getNumSteps() > c) {
    //         marker.setLatLng(route.getStep(c).getLatLng());
    //         window.setTimeout(function () {
    //             moveToStep(marker, route, c + 1);
    //         }, 500);
    //     }
    // }

    // const marker = new tt.Marker().setLngLat(route.features[0].geometry.coordinates)

    // moveToStep(marker, route, 0);
}

export async function dispatchTypeToString(dispatch: DispatchTypeOptions): Promise<string> {
    const dispatchData: DispatchFileObject[] = await fetch(`api/data/dispatch?id=${dispatch}`)
        .then((r) => {
            return r.json() as unknown as DispatchFileObject[];
        })
        .catch((e) => {
            throw new Error(e);
        });

    return dispatchData[0].category.de_DE;
}

export async function dispatchDescToString(dispatch: DispatchTypeOptions): Promise<string> {
    const dispatchData: DispatchFileObject[] = await fetch(`api/data/dispatch?id=${dispatch}`)
        .then((r) => {
            return r.json() as unknown as DispatchFileObject[];
        })
        .catch((e) => {
            throw new Error(e);
        });

    return dispatchData[0].desc.de_DE;
}

export async function buildingTypeToString(building_type: BuildingTypeOptions): Promise<string> {

    switch (building_type) {
        case 'BUILDING_TYPE_EMS':
            return 'Rettungswache';
        case "BUILDING_TYPE_FIREBRIGADE":
            return 'Berufsfeuerwehr'
        case "BUILDING_TYPE_VOLUNTEER_FIREBRIGADE":
            return 'freiwillige Feuerwehr'
        case "BUILDING_TYPE_POLICE":
            return 'Polizeiwache'
        case "BUILDING_TYPE_HWY_POLICE":
            return 'Autobahnpolizei'
        case "BUILDING_TYPE_HOSPITAL":
            return 'Krankenhaus'
        default:
            return '???'
    }
}

export async function vehicleTypeToString(vehicle_type: VehicleTypeOptions): Promise<string> {
    console.log(vehicle_type);
    const vehicleData: VehicleFileObject[] = await fetch(`api/data/vehicle?id=${vehicle_type}`)
        .then((r) => {
            return r.json() as unknown as VehicleFileObject[];
        })
        .catch((e) => {
            throw new Error(e);
        });

    console.log(vehicleData);

    return vehicleData[0].category.de_DE;
}