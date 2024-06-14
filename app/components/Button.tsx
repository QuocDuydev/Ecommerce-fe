"use client";

import { Button } from "@nextui-org/react";
import type React from "react";
import type { ReactNode } from "react";

interface ButtonProps {
	label?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	icon?: ReactNode;
	size?: "sm" | "md" | "lg" | undefined;
	type?: "submit" | "reset" | "button" | undefined;
	isIconOnly?: boolean;
	className?: string;
}

const MyButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	size,
	type,
	isIconOnly,
	icon: Icon,
	className,
}) => {
	return (
		<Button
			type={type}
			aria-label={label}
			disabled={disabled}
			size={size}
			isIconOnly={isIconOnly}
			onClick={onClick}
			variant={outline ? `bordered` : `solid`}
			startContent={Icon}
			className={`rounded-[2px] ${className}`}
		>
			{label}
		</Button>
	);
};

export default MyButton;
