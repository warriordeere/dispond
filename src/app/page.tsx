import Landing from "./shared/components/landing/landing";
import Sidebar from "./shared/components/sidebar/sidebar";

export const API_KEY = process.env.TOMTOM_API_KEY

export default function page() {
    return (
        <>
            <Sidebar data={{
                renderHomeButton: false,
                renderCallsButton: false,
                renderLocationButton: false,
                renderManageButton: false
            }} />
            <Landing />
        </>
    )
}