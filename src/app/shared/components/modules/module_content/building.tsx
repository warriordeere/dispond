import { useState, useEffect } from "react";

import { map_inst } from "../../map";
import { ModuleFooter, ModuleHeader } from "./base";

import { getDB } from "@script/utils/idb";
import { MenuEmitter } from "@script/utils/emitter";
import { buildingTypeToString } from "@script/utils/utils";

import { DatabaseGetOptions } from "@shared/types/idb.types";
import { ModuleFooterButtonInterface } from "@/app/shared/types/modules.types";
import { BuildingInterface, BuildingTypeOptions } from "@shared/types/building.types";

import { ImFire } from "react-icons/im";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { BsFillHouseAddFill } from "react-icons/bs";
import { MdModeEdit, MdOutlineQuestionMark } from "react-icons/md";

export function BuildingMenuContentModule() {

    const [buildingData, setBuildingData] = useState<BuildingInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            const dbopts: DatabaseGetOptions = {
                database: 'DB_SAVEGAME_DATA',
                store: 'DB_STORE_BUILDINGS',
                schema: 'SCHEMA_SAVEGAME_DATA',
                key: 'DB_GET_REQUEST_OPTION_ALL',
            }

            await getDB(dbopts)
                .then((r) => {
                    setBuildingData(r as BuildingInterface[]);
                    return r;
                })
                .catch((err) => {
                    console.error(err)
                });
        };

        fetchData();
    }, []);

    const footerBtns: ModuleFooterButtonInterface[] = [
        {
            icon: <BsFillHouseAddFill />,
            title: "Gebäude hinzufügen",
            on: {
                click: handleFooterBtn
            }
        },
        {
            icon: <MdModeEdit />,
            title: "Gebäude Bearbeiten",
            on: {
                click: handleFooterBtn
            }
        }
    ]

    function handleFooterBtn() {
        console.log('Footer Btn click');
    }

    return (
        <div className="content-module building-menu">
            <ModuleHeader data={{
                title: 'Gebäude'
            }} />
            <div className="menu-content">
                {
                    buildingData.map((building: BuildingInterface) => {
                        return (
                            <BuildingContentItem key={building.id} data={building} />
                        );
                    })
                }
            </div>
            <ModuleFooter data={{
                button: footerBtns
            }} />
        </div>
    )
}

function BuildingContentItem({ data }: { data: BuildingInterface }) {

    function handleItemViewRequest(item_id: string) {
        MenuEmitter.emit('EVENT_MENU_ITEM_DISPLAY_OPEN', item_id);
    }

    const [buildingType, setBuildingType] = useState<string>();

    useEffect(() => {
        async function fetchData() {
            console.log(data.type);
            setBuildingType(await buildingTypeToString(data.type));
        }

        fetchData();
    }, [buildingType]);

    return (
        <button
            className="building-item menu-item"
            onClick={
                () => {
                    handleItemViewRequest(data.id)
                }
            }
            onMouseEnter={
                () => {
                    map_inst.easeTo({
                        center: data.location.coords,
                        zoom: 12,
                        duration: 1000
                    })
                }
            }
        >
            <div className="building-icon menu-item-icon">
                <BuildingIcon type={data.type} />
            </div>
            <div className="building-name">
                <h3>{data.name}</h3>
            </div>
            <div className="building-type">
                <p>{buildingType}</p>
            </div>
            <div className="building-address">
                <p>{data.location.free_address}</p>
            </div>
        </button>
    );
}

function BuildingIcon({ type }: { type: BuildingTypeOptions }) {
    if (type.endsWith('FIREBRIGADE')) {
        return <ImFire className='building-icon-fire' />;
    }

    if (type.endsWith('POLICE')) {
        return <RiPoliceBadgeFill className='building-icon-tech' />;
    }

    return <MdOutlineQuestionMark className='building-icon-unknown' />;
}