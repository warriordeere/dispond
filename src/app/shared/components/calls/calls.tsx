import './calls.css';
import '../../../globals.css';
import { BsFire, BsPersonCircle } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Call } from '@/app/script/gen/call';

export default async function CallItem() {
    const callData = await Call.generate();
    return (
        <div className="call-item">
            <span className="caller-icon">
                <BsPersonCircle />
            </span>
            <span className="caller-name">{callData.caller.first_name} {callData.caller.last_name}</span>
            <span className="caller-date">{new Date(callData.time).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' }).toString()}</span>

            <span className="call-icon">
                <BsFire />
            </span>
            <span className="call-type">
                {callData.mission.type}
            </span>
            <span className="call-specific">
                {callData.mission.specific}
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