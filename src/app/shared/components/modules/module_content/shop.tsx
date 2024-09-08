import { ShopCategoryTypes } from "@/app/shared/types/types";
import { ModuleHeader } from "./base";
import { useEffect, useState } from "react";
import { DatabaseGetOptions, DatabasePostOptions } from "@/app/shared/types/idb.types";
import { getDB, postDB } from "@/app/script/utils/idb";
import { BuildingInterface } from "@/app/shared/types/building.types";
import { StatusDisplayBox } from "../../system_message";
import { VehicleFileObject, VehicleShopItemInterface } from "@/app/shared/types/vehicle.types";

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

            let vhcBuf: VehicleFileObject[] = [];

            const vhcList = await fetch('/api/list?dir=vehicles&type=json')
                .then((r) => {
                    return r.json();
                });

            vhcList.forEach(async (vhc: string) => {
                const v = vhc.split('\\').pop()?.split('/').pop() || ''
                const r =
                    await fetch(`/api/data/vehicle?id=${v.replace('.json', '')}`)
                        .then((r) => {
                            return r.json() as unknown as VehicleFileObject[];
                        })
                        .catch((e: any) => {
                            return e;
                        })
                        .finally(() => {
                            setLoading(false)
                        });

                vhcBuf.push(r[0]);
            });

            setVhcAry(vhcBuf)
        }

        fetchData();
    }, []);

    return (
        <div className="shop-category category-vehicle">
            {
                isLoading && <div>loading...</div>
            }
            {
                vhcAry ? (
                    vhcAry.map((vhc: VehicleFileObject) => {
                        const uuid = crypto.randomUUID();
                        return (
                            <VehicleCard key={uuid} vhc={vhc} />
                        );
                    })
                ) : null
            }
        </div>
    );
}

function VehicleCard({ vhc }: { vhc: VehicleFileObject }) {

    function handleVehicleBtn() {

        console.log('[DEBUG] Handle Interaction?!');        

        const item: VehicleShopItemInterface = {
            id: crypto.randomUUID(),
            vehicle_type: vhc.type,
            parent: "cf989aee-f550-40eb-8528-4bb351877ea4"
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

    return (
        <div className="vehicle-card">
            <div className="vehicle-label-container">
                <h2 className="vehicle-name">{vhc.category.de_DE}</h2>
                <sub className="vehicle-desc">{vhc.desc.de_DE}</sub>
                <button onClick={handleVehicleBtn} className="vehicle-btn-buy">Kaufen</button>
            </div>
        </div>
    )
}