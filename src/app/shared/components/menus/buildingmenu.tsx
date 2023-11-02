import { useRouter } from "next/navigation";
import { BsBuildingFillAdd, BsFillQuestionCircleFill } from "react-icons/bs"


export function BuildingMenu() {
    const router = useRouter();
    return (
        <>
            <div className="extsb-interface">
                <button className="extsb-btn react-icon-regular"
                    onClick={() => {
                        router.push('/new/building')
                    }}>
                    <BsBuildingFillAdd />
                    <span className="extsb-btn-tt">Neues Gebäude</span>
                </button>
            </div>
            <div className="extsb-content"></div>
        </>
    )
}

export function AddBuildingMenu() {
    return (
        <>
            <div className="extsb-content">
                <div className="extsb-advice">
                    <p>
                        Klicke auf die Karte oder suche in der Suchleiste unten um einen&nbsp;
                        <span className="quma">
                            gültigen Bereich
                            <span className="quma-tt">
                                <BsFillQuestionCircleFill />
                                Landkreise, Städte, Stadtteile etc.
                            </span>
                        </span> auszuwählen.
                    </p>
                </div>
            </div>
            <div className="extsb-interface">

            </div>
        </>
    )
}