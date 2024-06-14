import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import React, { type ReactNode } from "react";
import Footer from "../components/Footer";
import SecondNavbar from "../components/navbar/SecondNavbar";
import { roboto } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
	title: "Authentication",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className} bg-gray-100`}>
				<SecondNavbar />
				<div>{children}</div>
				<Footer />
			</body>
			<GoogleAnalytics gaId="G-8WH5RY3SRX" />
		</html>
	);
}
