import { StatusDisplayBox } from "../../system_message";
import { ModuleHeader } from "./base";

export function UnitContentModule() {
    return (
        <div className="content-module unit-menu">
            <ModuleHeader data={{
                title: "Einsatzkräfte"
            }} />
            <div className="menu-content">
                <StatusDisplayBox http_status_code={404} />
            </div>
        </div>
    )
}