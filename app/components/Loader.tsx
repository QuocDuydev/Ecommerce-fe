"use client";

import { CircularProgress } from "@nextui-org/react";

export default function Loader() {
	return (
		<div className="flex size-full items-center justify-center">
			<CircularProgress />
		</div>
	);
}
