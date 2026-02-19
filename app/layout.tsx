import React from "react"
import './styles/globals.css'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: "K Energy Save - ENERGY YOU CAN TRUST",
	description: "Advanced power-saving technology with proven results. Cut your Electric Bill from day one!",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// Force dynamic rendering so pages using useSearchParams don't need Suspense
	await headers()

	return (
		<html lang="en" translate="no" className="notranslate" suppressHydrationWarning>
			<head>
				<meta name="google" content="notranslate" />
			</head>
			<body suppressHydrationWarning>
				{children}
			</body>
		</html>
	)
}
