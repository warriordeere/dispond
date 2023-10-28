import WindowTitlebar from "./shared/components/titlebar/titlebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WindowTitlebar />
        {children}
      </body>
    </html>
  )
}

