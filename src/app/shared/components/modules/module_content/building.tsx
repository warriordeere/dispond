import { useState, useEffect } from "react";

import { map_inst } from "../../map";

import { getDB } from "@script/utils/idb";
import { MenuEmitter } from "@script/utils/emitter";
import { buildingTypeToString } from "@script/utils/utils";

import { DatabaseGetOptions } from "@shared/types/idb.types";
import { BuildingInterface, BuildingTypeOptions } from "@shared/types/building.types";

import { ImFire } from "react-icons/im";
import { FaThList } from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { MdOutlineQuestionMark } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

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

    return (
        <div className="content-module building-menu">
            <div className="menu-head-wrapper">
                <div className="menu-title">
                    <h2>Gebäudeübersicht</h2>
                </div>
                <div className="menu-ui">
                    <button>
                        <BsFillGrid3X3GapFill />
                    </button>
                    <button>
                        <FaThList />
                    </button>
                    <button>
                        <TbArrowsExchange />
                    </button>
                </div>
            </div>
            <div className="menu-content">
                {
                    buildingData.map((building: BuildingInterface) => {
                        return (
                            <BuildingContentItem key={building.id} data={building} />
                        );
                    })
                }
            </div>
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
            className="building-item"
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
            <div className="building-icon">
                <BuildingIcon type={data.type} />
            </div>
            <div className="building-name">
                <h3>{data.name}</h3>
            </div>
            <div className="building-name">
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