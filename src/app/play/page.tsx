'use client'

import Sidebar from "../shared/components/sidebar/sidebar";
import Map from "../shared/components/map/map";

export default function Game() {
  return (
    <>
      <Sidebar data={{
        renderCallsButton: true,
        renderLocationButton: true
      }} />
      <Map />
    </>
  )
}
