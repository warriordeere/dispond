import { LngLatLike } from '@tomtom-international/web-sdk-maps';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsPencilFill, BsFillBuildingFill, BsCashCoin } from 'react-icons/bs';
import { FaCar, FaCartShopping } from 'react-icons/fa6';
import { buildingTypes, GeometryData, VehicleTypes } from '../../types/types';

export function FleetManageMenu() {

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

export function FleetMenu() {
    return (
        <div>fleetmenu</div>
    )
}

export function VehicleShop() {

    const [vehicle_id, setVehicleId] = useState<string | undefined>();
    const [vehicle_type, setVehicleType] = useState<VehicleTypes | undefined>();
    const [vehicle_cost, setVehicleCost] = useState<number | undefined>();

    function handleVehiclePurchase() {

    }

    return (
        <div className="sidemenu-action-field" id="bm-interface">
            <div className="vehicle">
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
            <div className="bm-input-box">
                <span className="bm-box-icon">
                    <BsFillBuildingFill />
                </span>
                <div className="bm-type">
                    <select name="bm-type" id="bm-type-inp">
                        <option value="FIREBRIGADE">Feuerwehr</option>
                        <option value="VOLUNTEER_FIREBRIGADE">Freiwillige Feuerwehr</option>
                    </select>
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