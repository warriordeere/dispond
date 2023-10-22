import Landing from "./shared/components/landing/page";
import WindowTitlebar from "./shared/components/titlebar/page";

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <WindowTitlebar />
        <Landing />
      </body>
    </html>
  )
}