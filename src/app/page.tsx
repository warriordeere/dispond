import Landing from "./shared/components/landing/landing";
import Sidebar from "./shared/components/sidebar/sidebar";

export default function page() {
    return (
        <>
            <Sidebar data={{
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false
            }} />
            <Landing />
        </>
    )
}