import Logo from "@/app/components/Logo";
import Link from "next/link";

export default function SecondNavbar() {
	return (
		<div className="w-full h-[84px] bg-white opacity-95">
			<div className="w-[1200px] h-full m-auto flex items-center justify-between">
				<div className="h-full flex items-center gap-4">
					<div className="top-0 h-[42px] w-[127px]">
						<Logo fill="#fb5533" />
					</div>
				</div>
				<div className="pt-3 text-sm">
					<Link href={"/"} className="text-[#fb5533]">
						Bạn cần giúp đỡ?
					</Link>
				</div>
			</div>
		</div>
	);
}
