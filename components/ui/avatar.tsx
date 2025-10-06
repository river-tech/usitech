import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	name?: string;
	src?: string;
	alt?: string;
	size?: number;
}

export function Avatar({ name = "User", src, alt = name, size = 40, className = "", ...props }: AvatarProps) {
	const initials = React.useMemo(() => {
		const parts = name.trim().split(" ").filter(Boolean);
		const first = parts[0]?.[0] ?? "U";
		const last = parts[1]?.[0] ?? "";
		return (first + last).toUpperCase();
	}, [name]);

	return (
		<div
			className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium overflow-hidden ${className}`}
			style={{ width: size, height: size }}
			{...props}
		>
			{src ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img src={src} alt={alt} className="h-full w-full object-cover" />
			) : (
				<span className="text-sm">{initials}</span>
			)}
		</div>
	);
}

export default Avatar;
