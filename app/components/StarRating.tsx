import { FaStar } from "react-icons/fa";

export const StarRating = ({ rating }: { rating: number }) => {
	const totalStars = 5;
	return (
		<div className="flex">
			{[...Array(totalStars)].map((_, index) => (
				<FaStar
					key={index}
					className={index < rating ? "text-[#FF5722]" : ""}
				/>
			))}
		</div>
	);
};
