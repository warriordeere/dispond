import { ShopCategoryTypes } from "@/app/shared/types/types";
import { ModuleHeader } from "./base";
import { useEffect, useState } from "react";
import { DatabaseGetOptions } from "@/app/shared/types/idb.types";
import { getDB } from "@/app/script/utils/idb";
import { BuildingInterface } from "@/app/shared/types/building.types";
import { StatusDisplayBox } from "../../system_message";
import { VehicleFileObject } from "@/app/shared/types/vehicle.types";

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
                            return r.json() as unknown as VehicleFileObject;
                        })
                        .catch((e: any) => {
                            return e;
                        })
                        .finally(() => {
                            setLoading(false)
                        });

                vhcBuf.push(r);
            })

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
                            <div key={uuid}>
                                <h2>Vehicle:</h2>
                                <p>{JSON.stringify(vhc)}</p>
                            </div>
                        )
                    })
                ) : null
            }
        </div>
    );
}