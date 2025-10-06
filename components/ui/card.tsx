import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", ...props }: CardProps) {
	return (
		<div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`} {...props} />
	);
}

export function CardHeader({ className = "", ...props }: CardProps) {
	return <div className={`p-6 pb-3 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardProps) {
	return <div className={`p-6 pt-0 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: CardProps) {
	return <div className={`p-6 pt-0 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: CardProps) {
	return (
		<h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
	);
}

export function CardDescription({ className = "", ...props }: CardProps) {
	return (
		<p className={`text-sm text-gray-500 ${className}`} {...props} />
	);
}
