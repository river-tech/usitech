"use client";
import * as React from "react";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
	defaultValue?: string;
}

export function Tabs({ children, className = "", defaultValue }: TabsProps) {
	const first = React.Children.toArray(children).find(
		(child: any) => child?.type?.displayName === "TabsList"
	) as any;
	const initial = defaultValue || first?.props?.children?.[0]?.props?.value;
	const [value, setValue] = React.useState<string>(initial);

	return (
		<div className={className}>
			{React.Children.map(children, (child: any) => {
				if (child?.type?.displayName === "TabsList") {
					return React.cloneElement(child, { value, setValue });
				}
				if (child?.type?.displayName === "TabsContent") {
					return React.cloneElement(child, { value });
				}
				return child;
			})}
		</div>
	);
}

export function TabsList({ children, className = "", value, setValue }: any) {
	return <div className={`flex gap-2 ${className}`}>{React.Children.map(children, (child: any) => React.cloneElement(child, { active: child.props.value === value, onSelect: () => setValue(child.props.value) }))}</div>;
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ children, value, active, onSelect }: any) {
	return (
		<button
			onClick={onSelect}
			className={`rounded-md px-4 py-2 text-sm font-medium border ${
				active ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
			}`}
		>
			{children}
		</button>
	);
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, children, className = "", ...props }: any) {
	return <div className={`mt-4 ${className}`} hidden={!props?.value || props.value !== value}>{children}</div>;
}
TabsContent.displayName = "TabsContent";
