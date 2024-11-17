import { invoke } from "@tauri-apps/api/core";

import { GeometryData } from "@shared/types/ttcst.types";
import { PresenceData, PresenceInterface } from "@shared/types/utils.types";
import { DispatchFileObject, DispatchInterface, DispatchTypeOptions } from "@/app/shared/types/dispatches.types";
import { BuildingTypeOptions } from "@/app/shared/types/building.types";
import { ClothingTypes, ItemAssistanceTypes, ItemFireFightingTypes, ItemMiscTypes, VehicleFileObject, VehicleTypeOptions } from "@/app/shared/types/vehicle.types";

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
    const dispatchData: DispatchFileObject[] = await fetch(`api/v1/data/dispatch?id=${dispatch}`)
        .then((r) => {
            return r.json() as unknown as DispatchFileObject[];
        })
        .catch((e) => {
            throw new Error(e);
        });

    return dispatchData[0].category.de_DE;
}

export async function dispatchDescToString(dispatch: DispatchTypeOptions): Promise<string> {
    const dispatchData: DispatchFileObject[] = await fetch(`api/v1/data/dispatch?id=${dispatch}`)
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
    const vehicleData: VehicleFileObject[] = await fetch(`api/v1/data/vehicle?id=${vehicle_type}`)
        .then((r) => {
            return r.json() as unknown as VehicleFileObject[];
        })
        .catch((e) => {
            throw new Error(e);
        });

    return vehicleData[0].category.de_DE;
}

export async function loadoutTypeToString(loadout_type: ItemFireFightingTypes | ItemAssistanceTypes | ItemMiscTypes): Promise<string> {
    switch (loadout_type) {
        case 'LOADOUT_ITEM_DOORKIT':
            return 'Rucksack Türöffnung, ';
        case 'LOADOUT_ITEM_FIRE_HOSE':
            return 'Strahlrohr, ';
        case 'LOADOUT_ITEM_FOAM_PIPE':
            return 'Schaumrohr, ';
        case 'LOADOUT_ITEM_HAZMATKIT':
            return 'Gefahrgutazsrüstung, ';
        case 'LOADOUT_ITEM_LEAKKIT_BIG':
            return 'Ölbindemittel (groß), ';
        case 'LOADOUT_ITEM_LEAKKIT_SMALL':
            return 'Ölbindemittel (klein), ';
        case 'LOADOUT_ITEM_LIGHTKIT':
            return 'Lichtmast, ';
        case 'LOADOUT_ITEM_TECHKIT':
            return 'Rettungssatz (Schere, Spreizer), ';
        default:
            return 'Unknown Loadout Type, '
    }
}

export async function clothingTypeToString(clothing_type: ClothingTypes): Promise<string> {
    switch (clothing_type) {
        case 'CLOTHING_HAZMAT':
            return 'Chemieschutzanzug, ';
        case 'CLOTHING_SCBA':
            return 'Atemschutzanzug, ';
        default:
            return 'Unknown Clothing Type, '
    }
}