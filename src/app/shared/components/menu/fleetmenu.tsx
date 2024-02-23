import { LngLatLike } from '@tomtom-international/web-sdk-maps';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsPencilFill, BsFillBuildingFill, BsCashCoin } from 'react-icons/bs';
import { FaCar, FaCartShopping } from 'react-icons/fa6';
import { buildingTypes, DatabaseOptions, GeometryData, ShopItemData, VehicleTypes } from '../../types/types';
import { getDB, postDB } from '@/app/indexed_db';

export async function FleetManageMenu() {

    const dbopt: DatabaseOptions = {
        database: 'DB_SAVEGAME_DATA',
        store: 'DB_STORE_PURCHASED_ITEMS',
        schema: 'SCHEMA_SAVEGAME_DATA'
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
    const [vehicle_type, setVehicleType] = useState<VehicleTypes>('VEHICLE_TYPE_HLF');
    const [vehicle_cost, setVehicleCost] = useState<number>(0);

    function handleVehiclePurchase() {
        setVehicleId(crypto.randomUUID());
        setVehicleType('VEHICLE_TYPE_HLF');

        const data: ShopItemData = {
            item_type: 'SHOP_ITEM_TYPE_VEHICLE',
            id: vehicle_id,
            item_secondary_type: vehicle_type,
            item_cost: vehicle_cost
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