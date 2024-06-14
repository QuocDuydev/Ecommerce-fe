"use client";

import MyButton from "@/app/components/Button";
import Loader from "@/app/components/Loader";
import { Suspense } from "react";

export default function ThanksPage() {
	return (
		<Suspense fallback={<Loader />}>
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="max-w-md w-full bg-white p-8 rounded shadow-md">
					<h1 className="text-4xl font-bold text-center mb-6">
						Chúc mừng bạn đã đăng ký thành công!
					</h1>
					<p className="text-center text-lg mb-4">
						Cảm ơn bạn đã đăng ký nhận bản tin của chúng tôi. Bạn sẽ nhận được
						những ưu đãi độc quyền và mẹo nội bộ mới nhất từ chúng tôi.
					</p>
					<p className="text-center text-lg mb-4">
						Hãy luôn kiểm tra hộp thư đến của bạn để không bỏ lỡ bất kỳ thông
						tin quan trọng nào.
					</p>
					<div className="flex justify-center">
						<MyButton
							label="Quay với trang chủ"
							onClick={() => {
								window.location.href = "/";
							}}
						></MyButton>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
