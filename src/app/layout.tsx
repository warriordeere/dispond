import Landing from "./shared/components/landing/page";
import Sidebar from "./shared/components/sidebar/page";
import WindowTitlebar from "./shared/components/titlebar/page";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <WindowTitlebar />
        <Sidebar data={
          {
            renderCallsButton: false,
            renderLocationButton: false
          }
        } />
        <Landing />
      </body>
    </html>
  )
}