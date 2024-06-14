import React from "react";
interface failureProp {
	message: string;
	handleMessage: () => void;
}
export default function Failure({ message, handleMessage }: failureProp) {
	return (
		<>
			<div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
				<div className="relative p-4 w-full max-w-md h-full md:h-auto">
					<div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
						<button
							type="button"
							className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							onClick={handleMessage}
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
							<svg
								fill="#f14a4a"
								viewBox="0 -8 528 528"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								></g>
								<g id="SVGRepo_iconCarrier">
									<title>fail</title>
									<path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"></path>
								</g>
							</svg>
							<span className="sr-only">Failure</span>
						</div>
						<p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
							Failure.
						</p>
						<button
							data-modal-toggle="successModal"
							type="button"
							className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
							onClick={handleMessage}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
