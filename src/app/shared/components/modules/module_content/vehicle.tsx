import { StatusDisplayBox } from "../../system_message";
import { ModuleHeader } from "./base";

export function VehicleContentModule() {
    return (
        <div className="content-module unit-menu">
            <ModuleHeader data={{
                title: "Fahrzeuge"
            }} />
            <div className="menu-content">
                <StatusDisplayBox http_status_code={404} />
            </div>
        </div>
    )
}