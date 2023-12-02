import Sidebar from '@/app/shared/components/sidebar/sidebar'

export default function NewBuilding() {
    return (
        <Sidebar data={{
            renderCallsButton: false,
            renderLocationButton: false,
            renderManageButton: false,
            extended_menu: "MENU_NEW_BUILDING"
        }} />
    )
}