import TTMap from "../shared/components/map";
import RadioMenu from '../shared/components/radio_menu';
import MenuModule from '../shared/components/menu_module';
import Toolbox from "../shared/components/toolbox";

import '../shared/style/globals.css';
import '../shared/style/game.css'

export default function Page() {
    return (
        <>
            <Toolbox />
            <MenuModule module_type="MENU_MODULE_TYPE_PRIMARY" />
            <RadioMenu />
            <MenuModule module_type="MENU_MODULE_TYPE_SECONDARY" />
            <TTMap />
        </>
    )
}
