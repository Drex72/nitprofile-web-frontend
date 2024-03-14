import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import { CustomProvider } from "@/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: {
        template: "%s | Nitprofile",
        default: "Nitprofile",
    },
    description: "Generate and download your certificates all in one place!",
    applicationName: "Nitprofile",
    authors: [{ name: "Nithub", url: "https://nithub.unilag.edu.ng" }],
    generator: "Nitprofile",
    keywords: ["Profile Generation", "Certificate Generation", "Nithub", "Dynamic Image"],
    referrer: "origin-when-cross-origin",
    creator: "Nithub",
    publisher: "Nithub",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CustomProvider>{children}</CustomProvider>
                <div className="modal" id="modal"></div>
            </body>
        </html>
    )
}
