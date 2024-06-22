
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

import { getDB, postDB } from '@/app/indexed_db';

import { BsPencilFill, BsCashCoin } from 'react-icons/bs';
import { FaCar, FaCartShopping } from 'react-icons/fa6';

import { ShopItemData } from '@shared/types/types';
import { DatabaseGetOptions } from '@shared/types/idb.types';
import { VehicleTypeOptions } from '@shared/types/vehicle.types';
import { BuildingInterface } from '@shared/types/building.types';

export async function FleetManageMenu() {

    const dbopt: DatabaseGetOptions = {
        database: 'DB_SAVEGAME_DATA',
        store: 'DB_STORE_PURCHASED_ITEMS',
        schema: 'SCHEMA_SAVEGAME_DATA',
        key: "DB_GET_REQUEST_OPTION_ALL"
    }

    const db_data = await getDB(dbopt);
    const allVehiles = db_data;

    return (
        <>
            <div>fleet manage menu</div>
            {
                allVehiles.map((vehicle: ShopItemData) => {
                    return (
                        <code>
                            <h2>{vehicle.item_secondary_type}</h2>
                            <p>{vehicle.id}</p>
                        </code>
                    )
                })
            }
        </>
    )
}

export function FleetMenu() {
    const router = useRouter();

    return (
        <div className="sidemenu-action-row">
            <div className="sidemenu-ar-item">
                <button className="sidemenu-btn react-icon-regular"
                    onClick={() => {
                        router.push('./fleet/new')
                    }}>
                    <FaCartShopping />
                </button>
                <span className="sidemenu-btn-label">Fahrzeughändler</span>
            </div>
            <div className="sidemenu-ar-item">
                <button className="sidemenu-btn react-icon-regular"
                    onClick={() => {
                        router.push('./fleet/manage')
                    }}>
                    <FaCar />
                </button>
                <span className="sidemenu-btn-label">Fahrzeuge Verwalten</span>
            </div>
        </div>
    )

}

export function VehicleShop() {

    const [vehicle_id, setVehicleId] = useState<string>(crypto.randomUUID());
    const [vehicle_type, setVehicleType] = useState<VehicleTypeOptions>(VehicleTypeOptions.VEHICLE_TYPE_ENGINE_B);
    const [vehicle_cost, setVehicleCost] = useState<number>(0);

    async function handleVehiclePurchase() {
        setVehicleId(crypto.randomUUID());
        setVehicleType(VehicleTypeOptions.VEHICLE_TYPE_ENGINE_B);
        setVehicleCost(0);

        // [Important!] todo: add functionality to choose wích building will be the "home" for the new vhc

        const db_opt: DatabaseGetOptions = {
            key: 'DB_GET_REQUEST_OPTION_ALL',
            database: 'DB_SAVEGAME_DATA',
            store: 'DB_STORE_PURCHASED_ITEMS',
            schema: 'SCHEMA_SAVEGAME_DATA'
        }

        const vhcHome: BuildingInterface[] = await getDB(db_opt);

        const data: ShopItemData = {
            item_type: 'SHOP_ITEM_TYPE_VEHICLE',
            id: vehicle_id,
            item_secondary_type: vehicle_type,
            item_cost: vehicle_cost,
            item_owner: vhcHome[0].id,
            item_position: vhcHome[0].position
        }

        postDB({
            data: data,
            database: 'DB_SAVEGAME_DATA',
            store: 'DB_STORE_PURCHASED_ITEMS',
            schema: 'SCHEMA_SAVEGAME_DATA'
        });
    }

    return (
        <div className="sidemenu-action-field" id="bm-interface">
            <div className="vehicle">
                <p>FL-GR 11/49/1</p>
                <p>HLF-20/16</p>
                <code>Platzhalter für Fahrzeug</code>
            </div>
            <div className="bm-input-box">
                <span className="bm-box-icon">
                    <BsPencilFill />
                </span>
                <div className="bm-naming">
                    <input type="text" name="bm-name" id="bm-name-inp" placeholder="Name" />
                </div>
            </div>
            <div className="bm-finish">
                <button className="bm-finish-btn"
                    onClick={handleVehiclePurchase}
                >
                    Kaufen
                    <span>
                        {vehicle_cost}&nbsp;
                        <BsCashCoin />
                    </span>
                </button>
            </div>
        </div>
    )
}