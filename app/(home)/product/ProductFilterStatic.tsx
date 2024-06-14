"use client";

import MyButton from "@/app/components/Button";
import { E_InputCounter } from "@/app/enum";
import type { Pagination } from "@/app/types";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const sort = [
	{
		id: 1,
		name: "Giá thấp đến cao",
	},
	{
		id: 2,
		name: "Giá cao đến thấp",
	},
];

export const ProductFilterStatic = ({ meta }: { meta: Pagination }) => {
	const [value, setValue] = useState(2);
	const [page, setPage] = useState(1);
	const params = useSearchParams();
	const route = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		current_query = {
			...current_query,
			sort: value,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [value]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let current_query = {};

		if (params) {
			current_query = qs.parse(params.toString());
		}

		current_query = {
			...current_query,
			page: page,
		};

		const url = qs.stringify(current_query, { skipNulls: true });
		route.push(`/product?${url}`);
	}, [page]);

	const handleChangePage = (e: E_InputCounter) => {
		if (e === E_InputCounter.DECREMENT) {
			if (page > 1) {
				setPage(page - 1);
			}
		}
		if (e === E_InputCounter.INCREMENT) {
			if (page < meta.pageCount) {
				setPage(page + 1);
			}
		}
	};

	return (
		<div
			className="flex items-center 
				justify-between bg-white 
				bg-opacity-5 leading-4"
		>
			<div className="text-[#555555] line-clamp-1">Sắp xếp theo</div>
			<div className="flex basis-0 items-center justify-start capitalize">
				<MyButton className="bg-[#ee4d2d] text-white" label={"Liên Quan"} />
				<MyButton className="bg-[#fdfdfd]" label={"Mới Nhất"} />
				<MyButton className="bg-[#fdfdfd]" label={"Bán Chạy"} />
				<Dropdown>
					<DropdownTrigger>
						<Button className="bg-[#fdfdfd]">Sắp Xếp Theo</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Static Actions">
						<DropdownItem key={sort[0].id} onClick={() => setValue(sort[0].id)}>
							{sort[0].name}
						</DropdownItem>
						<DropdownItem key={sort[1].id} onClick={() => setValue(sort[1].id)}>
							{sort[1].name}
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
			<div className="flex gap-2 items-center">
				<span>
					{meta.page}/{meta.pageCount}
				</span>
				<div>
					<MyButton
						onClick={() => handleChangePage(E_InputCounter.DECREMENT)}
						isIconOnly
						icon={<MdNavigateBefore />}
					/>
					<MyButton
						onClick={() => handleChangePage(E_InputCounter.INCREMENT)}
						isIconOnly
						icon={<MdNavigateNext />}
					/>
				</div>
			</div>
		</div>
	);
};
