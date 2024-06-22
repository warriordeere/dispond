import "@shared/style/globals.css";
import "@shared/style/modules/radio_module.css";

import { ItemRadioInterface } from "@shared/types/modules.types";

export default function RadioMenu() {
    return (
        <section className="radio-menu menu-container">
            <header>
                <h3>FMS-Log</h3>
            </header>
            <div className="radio-wrapper content-wrapper">
                <RadioItem
                    radio_object={
                        {
                            id: crypto.randomUUID(),
                            label: 'FL-GR 11/11/1',
                            state: 1,
                        }
                    }
                />
                <RadioItem
                    radio_object={
                        {
                            id: crypto.randomUUID(),
                            label: 'FL-GR 11/49/3',
                            state: 3,
                        }
                    }
                />
                <RadioItem
                    radio_object={
                        {
                            id: crypto.randomUUID(),
                            label: 'FL-GR 11/24/2',
                            state: 5,
                        }
                    }
                />
                <RadioItem
                    radio_object={
                        {
                            id: crypto.randomUUID(),
                            label: 'FL-GR 11/19/1',
                            state: 6,
                        }
                    }
                />
            </div>
        </section>
    )
}

function RadioItem({ radio_object }: { radio_object: ItemRadioInterface }) {

    return (
        <div className="radio-item" id={radio_object.id}>
            <span className={`item-state state-${radio_object.state}`}>
                {radio_object.state}
            </span>
            <p className="item-label">
                {radio_object.label}
            </p>
        </div>
    )
}