import './landing.css';
import '../../../globals.css';

export default function Landing() {
    return (
        <section className="landing">
            <div className="savegame-container">
                <div className="savegame">
                    <span className="savegame-bg">
                        <img src="https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&key=E0ELce62yviKI8YNFFSLU7fg6AwXPmRi&zoom=12&center=13.37989881564988,52.5096447695974&width=800&height=500&language=NGT" />
                    </span>
                    <div className="savegame-preview">
                        <div className="sg-detail sg-name">My Save</div>
                        <div className="sg-detail sg-balance">
                            <span>Balance</span>
                            999.999.999€
                        </div>
                        <div className="sg-detail sg-playtime">
                            <span>Playtime</span>
                            12:28 Hours
                        </div>
                        <div className="sg-detail sg-location">
                            <span>Location</span>
                            Berlin, Germany
                        </div>
                    </div>
                </div>
                <div className="savegame">
                    <span className="savegame-bg">
                        <img src="https://api.tomtom.com/map/1/staticimage?layer=basic&style=main&format=png&key=E0ELce62yviKI8YNFFSLU7fg6AwXPmRi&zoom=12&center=14.12,50.921&width=800&height=500&language=NGT" />
                    </span>
                    <div className="savegame-preview">
                        <div className="sg-detail sg-name">My Save</div>
                        <div className="sg-detail sg-balance">
                            <span>Balance</span>
                            999.999.999€
                        </div>
                        <div className="sg-detail sg-playtime">
                            <span>Playtime</span>
                            12:28 Hours
                        </div>
                        <div className="sg-detail sg-location">
                            <span>Location</span>
                            Bad Schandau, Germany
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}