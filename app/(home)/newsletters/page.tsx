"use client";

import { subcribeNewsletters } from "@/app/actions/subcribeNewsletters";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewslettersPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");

	function handleSubcribe(): void {
		subcribeNewsletters(email).then((res) => {
			if (!res.data) {
				return;
			}
			router.push("/newsletters/thanks");
		});
	}

	return (
		<div className="w-full py-16 px-4">
			<div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
				<div className="lg:col-span-2 my-4">
					<h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
						Muốn nhận ưu đãi độc quyền & mẹo nội bộ? Đăng ký ngay bây giờ!
					</h1>
					<p>
						Đăng ký nhận bản tin của chúng tôi và cập nhật thông tin mới nhất.
					</p>
				</div>
				<div className="my-4">
					<div className="flex flex-col sm:flex-row items-center justify-between w-full">
						<input
							className="p-3 flex w-full rounded-md text-black"
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button
							className="bg-[#ee4d2d] text-white rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3"
							onClick={handleSubcribe}
						>
							Đăng ký
						</button>
					</div>
					<p>
						Chúng tôi quan tâm đến việc bảo vệ dữ liệu của bạn. Đọc{" "}
						<span className="text-[#ee4d2d]">Chính Sách Bảo Mật</span> của chúng
						tôi.
					</p>
				</div>
			</div>
		</div>
	);
}
