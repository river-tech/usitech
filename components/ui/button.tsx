import * as React from "react";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const base =
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClass: Record<ButtonVariant, string> = {
	default:"bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] transition-all duration-500 text-white hover:from-[#06b6d4] hover:to-[#1e3a8a] shadow-lg", // blue gradient, white text, hover darkens
	secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
	ghost: "bg-transparent hover:bg-gray-100",
	outline: "border border-gray-300 bg-white hover:bg-gray-50",
	destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClass: Record<ButtonSize, string> = {
	sm: "h-9 px-3",
	md: "h-10 px-4",
	lg: "h-11 px-6 text-base",
	icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className = "", variant = "default", size = "md", ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={`${base} ${variantClass[variant]} ${sizeClass[size]} ${className} cursor-pointer`}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export default Button;
