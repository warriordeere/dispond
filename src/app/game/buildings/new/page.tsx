import { Sidemenu } from '@/app/shared/components/menu/sidemenu'
import Sidebar from '@/app/shared/components/nav/sidenav'

export default function NewBuilding() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false,
                renderHomeButton: false,
                renderBackButton: true
            }} />
            <Sidemenu type="MENU_NEW_BUILDING" />
        </>
    )
}