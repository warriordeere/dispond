import './calls.css';
import '../../../globals.css';
import { BsFire, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function CallItem() {
    return (
        <div className="call-item">
                <span className="caller-icon">
                    <BsPersonCircle />
                </span>
                <span className="caller-name">Günther Kleinlich</span>
                <span className="caller-date">12. September 2024, 12:21</span>

                <span className="call-icon">
                    <BsFire />
                </span>
                <span className="call-type">
                    B1 Kleinbrand
                </span>
                <span className="call-specific">
                    brennt Mülleimer
                </span>

                <span className="location-icon">
                    <FaMapMarkerAlt />
                </span>
                <span className="location-main">
                    Neue Straße 23
                </span>
                <span className="location-second">
                    01234 Neustadt
                </span>
        </div>
    )
}
