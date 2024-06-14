import { putCart } from "@/app/actions/api_carts/putCart";
import { useAuth } from "@/app/hooks/useAuth";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

interface InputCounterProps {
	quantity: number;
	cartId: number;
	onQuantityChange: (newQuantity: number) => void;
	productitem: number;
}

export default function Counter({
	quantity,
	cartId,
	onQuantityChange,
	productitem,
}: InputCounterProps) {
	const { jwt } = useAuth();
	const increaseQuantity = async () => {
		const newQuantity = quantity + 1;
		onQuantityChange(newQuantity);
		await handlePutQuantity(newQuantity, productitem);
	};

	const decreaseQuantity = async () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			onQuantityChange(newQuantity);
			await handlePutQuantity(newQuantity, productitem);
		}
	};

	const handlePutQuantity = async (
		newQuantity: number,
		productitem: number,
	) => {
		try {
			if (!jwt) return;

			const response = await putCart(cartId, jwt, newQuantity, productitem);

			if (response?.error.status === 400) {
				alert(response.error.message);
				window.location.reload();
			}
			// Optional: Add a delay or perform any other actions after updating quantity
		} catch (error) {
			console.error("Update failed:", error);
			// Handle errors here
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value);
		if (!Number.isNaN(value)) {
			onQuantityChange(value);
		}
	};
	return (
		<div className=" flex mt-3">
			<label className="mb-2 block text-sm font-medium text-gray-900 ">
				SL:
			</label>
			<div className="relative flex max-w-[8rem] items-center ml-3 -mt-2">
				<button
					type="button"
					className="z-50 h-7 rounded-s-lg border border-gray-300 
					bg-gray-300 p-3 focus:ring-2 "
					onClick={decreaseQuantity}
				>
					<CgMathMinus className="h-4 w-4 -mt-2" />
				</button>
				<input
					type="text"
					className="block h-7 w-full border border-gray-300
					bg-gray-50 py-2.5 text-center"
					placeholder="1"
					disabled
					value={quantity}
					onChange={handleChange}
					required
				/>
				<button
					type="button"
					className="h-7 rounded-e-lg border border-gray-300 
					bg-gray-300 p-3 focus:ring-2 "
					onClick={increaseQuantity}
				>
					<CgMathPlus className="h-4 w-4 -mt-2" />
				</button>
			</div>
		</div>
	);
}
