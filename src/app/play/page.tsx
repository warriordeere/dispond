import TTMap from "../shared/components/map";
import DispatchMenu from "../shared/components/dispatch_menu";
import RadioMenu from '../shared/components/radio_menu';
import UnitMenu from '../shared/components/unit_menu';

import '../shared/style/globals.css';
import Toolbox from "../shared/components/toolbox";

export default function Page() {
    return (
        <>
            <Toolbox />
            <UnitMenu />
            <RadioMenu />
            <DispatchMenu />
            <TTMap />
        </>
    )
}
