import React from "react";

import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TbArrowsExchange } from "react-icons/tb";
import { FaThList } from "react-icons/fa";

import { ModuleFooterInterface, ModuleHeaderInterface } from "@shared/types/modules.types";

export function ModuleHeader({ data }: ModuleHeaderInterface) {

    return (
        <div className="menu-head-wrapper">
            <div className="menu-title">
                <span>{data.icon}</span>
                <h2>{data.title}</h2>
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
    );
}

export function ModuleFooter({ data }: ModuleFooterInterface) {
    return (
        <div className="menu-footer-wrapper">
            <div className="footer-ui">
                {
                    data.button.map((btn) => {
                        return (
                            <button
                                className="footer-btn"
                                onClick={btn.on.click}
                                data-tooltip-id="generic-ttp-id"
                                data-tooltip-content={btn.title}
                            >
                                {btn.icon}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
}