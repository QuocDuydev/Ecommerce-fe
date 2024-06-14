"use client";

import getAutocomplete from "@/app/actions/getAutocomplete";
import type { Product } from "@/app/types";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo";
import IconCart from "../cart/IconCart";

type NavbarProps = {
	facebook: string;
	instagram: string;
};
type Props = {
	params: {
		id: string;
	};
};

export default function Navbar({ facebook, instagram }: NavbarProps) {
	const { user, logout } = useAuth();
	const [isClient, setIsClient] = useState(false);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const params = useSearchParams();
	const route = useRouter();
	const [search, setSearch] = useState<string>("");
	const [autocomplete, setAutocomplete] = useState<Product[]>([]);

	useEffect(() => {
		setIsClient(true);
	}, []);

	function goToProfile() {
		route.push("/profile");
	}

	const handle = (_query?: string) => {
		setAutocomplete([]);
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		if (search || _query) {
			current_query = _query
				? {
						query: _query,
					}
				: {
						query: search,
					};
		}

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const autocompleteTimeoutRef = useRef<any>();
	const handleAutocomplete = (query: string) => {
		setSearch(query);
		if (!query) {
			setAutocomplete([]);
			return;
		}

		if (autocompleteTimeoutRef.current) {
			clearTimeout(autocompleteTimeoutRef.current);
		}

		autocompleteTimeoutRef.current = setTimeout(() => {
			if (!query) {
				setAutocomplete([]);
				return;
			}
			getAutocomplete(query).then((res) => {
				setAutocomplete(res.data);
			});
		}, 650);
	};

	const handleSelectAutocomplete = (product: Product) => {
		setAutocomplete([]);
		setSearch(product.attributes.name);
		handle(product.attributes.name);
	};

	const handleLogout = () => {
		logout();
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="top-0 w-full h-[50] bg-gradient-to-r from-[#f53d2d] to-[#f63] z-100 flex flex-col items-center">
			<div className="2xl:w-[1200px] lg:w-[1000px] sm:w-[500px] md:w-[650px] flex justify-between text-white">
				<div className="opacity-90 flex gap-2">
					<span>Kênh Người Bán</span>
					<span>Tải ứng dụng</span>
					<span className="flex items-center gap-1">
						Kết nối
						<div className="flex gap-2.5">
							<Link href={facebook}>
								<FaFacebook />
							</Link>
							<Link href={instagram}>
								<FaInstagram />
							</Link>
						</div>
					</span>
				</div>
				<div className="flex gap-2">
					<div>Thông Báo</div>
					<div>Hỗ Trợ</div>
					<div>Ngôn ngữ</div>
					<div>
						{isClient && user ? (
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
							<div onClick={goToProfile}>
								<Dropdown>
									<DropdownTrigger>
										<div className={"cursor-pointer"}>{user.username}</div>
									</DropdownTrigger>
									<DropdownMenu>
										<DropdownItem key={"profile"} href={"/profile"}>
											Profile
										</DropdownItem>
										<DropdownItem key={"logout"} onClick={handleLogout}>
											Logout
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						) : (
							<div className="flex gap-2">
								<Link href={"/auth"}>Đăng ký</Link>
								<div>|</div>
								<Link href={"/auth"}>Đăng nhập</Link>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="2xl:w-[1200px] lg:w-[1000px] sm:w-[500px] md:w-[700px] py-[16px] flex justify-around items-center">
				<div className="h-[60px] w-[160px]">
					<Logo fill="white" />
				</div>
				<div className=" 2xl:w-[850px] lg:w-[600px] sm:w-[250px] md:w-[400px]">
					<div className="px-[0.625rem] bg-white flex py-[7px]">
						<input
							className="w-full outline-none"
							aria-label="Tìm sản phẩm, thương hiệu, và tên shop"
							placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
							aria-autocomplete="list"
							aria-controls="shopee-searchbar-listbox"
							aria-expanded="false"
							role="combobox"
							value={search}
							onChange={(e) => handleAutocomplete(e.target.value)}
							onFocus={() => setIsSearchFocused(true)}
							onBlur={() => setIsSearchFocused(false)}
						/>
						<Button
							className="h-[32px] w-10 rounded-none bg-[#fb5533] outline-none"
							onClick={() => handle()}
							isIconOnly
						>
							<CiSearch className="text-white" />
						</Button>
					</div>
					{isSearchFocused && (
						<div className="absolute mt-2 flex flex-col w-[840px] z-50">
							{autocomplete.map((item) => (
								// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<div
									className="cursor-pointer bg-white p-2"
									key={item.id}
									onClick={() => handleSelectAutocomplete(item)}
								>
									{item.attributes.name}
								</div>
							))}
						</div>
					)}
				</div>
				<IconCart />
			</div>
		</div>
	);
}
