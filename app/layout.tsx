import React from 'react'
import '../style/index.css'


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body>
                <React.StrictMode>
                    {children}
                </React.StrictMode>
            </body>
        </html>
    )
}
