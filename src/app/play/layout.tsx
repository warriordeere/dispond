'use client'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="game-container">
            {children}
        </main>
    )
}