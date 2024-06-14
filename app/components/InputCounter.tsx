"use client";

import { E_InputCounter } from "@/app/enum";

interface InputCounterProps {
	quantity: number;
	setQuantity: (type: E_InputCounter) => void;
	className?: string;
}

export default function InputCounter({
	quantity,
	setQuantity,
	className,
}: InputCounterProps) {
	return (
		<div className={className}>
			<label
				htmlFor="quantity-input"
				className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
			>
				Số lượng:
			</label>
			<div className="relative flex max-w-[8rem] items-center">
				<button
					type="button"
					id="decrement-button"
					data-input-counter-decrement="quantity-input"
					className="h-11 rounded-s-lg border border-gray-300 
					bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none 
					focus:ring-2 focus:ring-gray-100 dark:border-gray-600 
					dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
					onClick={() => setQuantity(E_InputCounter.DECREMENT)}
				>
					<svg
						className="h-3 w-3 text-gray-900 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 2"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h16"
						/>
					</svg>
				</button>
				<input
					type="text"
					id="quantity-input"
					data-input-counter
					aria-describedby="helper-text-explanation"
					className="block h-11 w-full border-x-0 border-gray-300
					bg-gray-50 py-2.5 text-center text-sm text-gray-900
					focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
					dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
					dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="1"
					value={quantity}
					required
					disabled
				/>
				<button
					type="button"
					id="increment-button"
					data-input-counter-increment="quantity-input"
					className="h-11 rounded-e-lg border border-gray-300 
					bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none 
					focus:ring-2 focus:ring-gray-100 dark:border-gray-600 
					dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
					onClick={() => setQuantity(E_InputCounter.INCREMENT)}
				>
					<svg
						className="h-3 w-3 text-gray-900 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 18"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 1v16M1 9h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
