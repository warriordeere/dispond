import "@shared/style/loading.css";

export default function Loading() {
    return (
        <div className="loading-page">
            <div className="animation-container">
                {/* TODO: Implement animated Logo instead*/}
                <span className="animate-circle"></span>
            </div>
            <p>Inhalt wird geladen</p>
            <p className="loading-hint">Hier könnte ein hilfreicher Tipp stehen</p>
        </div>
    )
}