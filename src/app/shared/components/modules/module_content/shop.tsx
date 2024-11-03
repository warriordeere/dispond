import { ModuleHeader } from "./base";
import { useEffect, useState } from "react";
import { postDB } from "@/app/script/utils/idb";
import { StatusDisplayBox } from "../../system_message";
import { VehicleFileObject, VehicleInterface } from "@/app/shared/types/vehicle.types";
import { DatabasePostOptions } from "@/app/shared/types/idb.types";
import { LanguageString } from "@/app/shared/types/types";
import { clothingTypeToString, loadoutTypeToString } from "@/app/script/utils/utils";

export function ShopContentModule() {
    return (
        <div className="content-module shop-menu">
            <ModuleHeader data={{
                title: 'Shop'
            }} />
            <div className="menu-content">
                <CategoryVehicle />
            </div>
        </div>
    );
}

function CategoryBuilding() {

    return (
        <div className="shop-category category-building">
            <StatusDisplayBox http_status_code={404} />
        </div>
    );
}

function CategoryVehicle() {

    const [vhcAry, setVhcAry] = useState<VehicleFileObject[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {

            setLoading(true);

            try {
                const vhcList = await fetch('/api/v1/list?dir=vehicles&type=json')
                    .then((r) => {
                        return r.json();
                    });

                const vhcBuf = await Promise.all(vhcList.map(async (vhc: string) => {
                    const v = vhc.split('\\').pop()?.split('/').pop()?.replace('.json', '') || '';

                    try {
                        const r = await fetch(`/api/v1/data/vehicle?id=${v}`);
                        const d = await r.json() as VehicleFileObject;
                        return d;
                    } catch (e) {
                        console.error(`Failed fetching vehicle (${e}) | [${v}]`);
                        return null;
                    }
                }));

                const flatVhcAry = vhcBuf.flat().filter(Boolean) as VehicleFileObject[];
                setVhcAry(flatVhcAry);
            } catch (e) {
                console.error(`Failed fetching vehicle list (${e})`);
            }
            finally {
                setLoading(false);
            }

        };

        fetchData();

    }, []);

    const vhc: VehicleFileObject = {
        file_type: "vehicle/engine",
        type: "vehicle_type_lf",
        category: {
            de_DE: "test",
            en_US: "test"
        },
        desc: {
            de_DE: "desc_test",
            en_US: "desc_test"
        },
        clothing: [],
        perks: {
            units: 0,
            extinguishing_cap: 0,
            loadout_cap: 0,
            loadout_items: {
                item_fire_fighting: [],
                item_assistance: [],
                item_misc: []
            }
        }
    }

    // [TODO]: vhc.type might not be unique - handle possible exceptions!

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    if (!vhcAry || vhcAry.length === 0) {
        return <div>No vehicles found.</div>; // Show no vehicles message
    }

    return (
        <div className="shop-category category-vehicle">{
            isLoading && <div>loading...</div>
        }
            {
                vhcAry && vhcAry.length > 0 ? (
                    vhcAry.map((vhc: VehicleFileObject) =>
                        <VehicleCard key={vhc.type} vhc={vhc} />
                    )
                ) : (
                    !isLoading && <div>No vehicles found.</div>
                )
            }

        </div>
    );
};

function VehicleCard({ vhc }: { vhc: VehicleFileObject }) {

    function handleVehicleBtn() {

        console.log('[DEBUG] Handle Interaction?!');

        const item: VehicleInterface = {
            id: crypto.randomUUID(),
            vehicle_type: vhc.type,
            parent: "cf989aee-f550-40eb-8528-4bb351877ea4",
            positon: {
                lng: 0,
                lat: 0
            }
        }

        const dbpost: DatabasePostOptions = {
            data: item,
            database: "DB_SAVEGAME_DATA",
            store: "DB_STORE_OWNED_VEHICLES",
            schema: "SCHEMA_SAVEGAME_DATA"
        }

        postDB(dbpost)
            .catch((e) => {
                throw new Error(e)
            });
    }

    if (!vhc || !vhc.category || !vhc.desc) {
        console.error('Invalid vehicle object:', vhc);
        return <div>Invalid vehicle data</div>;
    }

    const vehicleName = vhc.category[LanguageString.LANGUAGE_STRING_DE_DE] || "Unknown Vehicle";
    const vehicleDesc = vhc.desc[LanguageString.LANGUAGE_STRING_DE_DE] || "No description available.";

    return (
        <div className="vehicle-card">
            <div className="vehicle-label-container">
                <details>
                    <summary>
                        <h2 className="vehicle-name">{vehicleName}</h2>
                        <sub className="vehicle-desc">{vehicleDesc}</sub>
                    </summary>
                    <p>Löschmittel: {vhc.perks.extinguishing_cap}</p>
                    <p>Stauraum: {vhc.perks.loadout_cap}</p>
                    <p>Besatzung: {vhc.perks.units}</p>
                    <p>Bekleidung: {vhc.clothing.map((item) => clothingTypeToString(item))}</p>
                    <p>Ausrüstung Technische Hilfe: {vhc.perks.loadout_items.item_assistance.map((item) => loadoutTypeToString(item))}</p>
                    <p>Ausrüstung Feuerbekämpfung: {vhc.perks.loadout_items.item_fire_fighting.map((item) => loadoutTypeToString(item))}</p>
                    <p>Ausrüstung Sonstige: {vhc.perks.loadout_items.item_misc.map((item) => loadoutTypeToString(item))}</p>
                    <hr />
                    <button onClick={handleVehicleBtn} className="vehicle-btn-buy">Kaufen</button>
                </details>
            </div>
        </div>
    );
}