"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { type GetAccessTokenResponse, URL_API } from "@/app/types";
import { CircularProgress } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

interface AuthCallbackProps {
	params: { slug: string };
}

export default function AuthCallback({ params }: AuthCallbackProps) {
	const router = useSearchParams();
	const _params = Object.fromEntries(router.entries());
	const { save_token } = useAuth();
	const route = useRouter();

	useEffect(() => {
		fetch(
			`${URL_API}/api/auth/${params.slug}/callback?access_token=${_params.access_token}`,
		).then((res) => {
			if (res.ok) {
				res.json().then((resJson: GetAccessTokenResponse) => {
					save_token(resJson.jwt, resJson.user);
				});
				route.push("/");
			} else {
				route.push("/auth");
			}
		});
	}, [_params, params, route, save_token]);

	return (
		<Suspense fallback={<CircularProgress />}>
			<div></div>
		</Suspense>
	);
}
