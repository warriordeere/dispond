import './map.css';
import '../../../globals.css';
import tt from "@tomtom-international/web-sdk-maps"
import { useEffect } from "react"

const API_KEY = process.env.TOMTOM_API_KEY

export default function Map() {
  useEffect(() => {
    const map = tt.map({
      key: `${API_KEY}`,
      center: [13.5, 52.5],
      zoom: 10,
      container: 'map',
      style: `https://api.tomtom.com/style/1/style/*?map=2/basic_street-satellite&poi=2/poi_dynamic-satellite&key=${API_KEY}`
    })
  }, [])

  return (
    <section className="map-container">
      <div id="map"></div>
    </section>
  )
}
