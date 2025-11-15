"use client";
import * as React from "react";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
	defaultValue?: string;
}

const isNamedElement = (
  element: React.ReactNode,
  name: string
): element is React.ReactElement =>
  React.isValidElement(element) &&
  typeof element.type !== "string" &&
  (element.type as { displayName?: string }).displayName === name;

export function Tabs({ children, className = "", defaultValue }: TabsProps) {
	const childArray = React.Children.toArray(children);
	const firstList = childArray.find((child) =>
		isNamedElement(child, "TabsList")
	) as React.ReactElement<{ children?: React.ReactNode }> | undefined;
	const firstTrigger = firstList
		? (React.Children.toArray(firstList.props.children)[0] as
				React.ReactElement<{ value?: string }> | undefined)
		: undefined;
	const firstTriggerValue = firstTrigger?.props?.value;

	const initial = defaultValue || (firstTriggerValue as string | undefined) || "";
	const [value, setValue] = React.useState<string>(initial);

	return (
		<div className={className}>
			{React.Children.map(children, (child) => {
				if (!React.isValidElement(child)) {
					return child;
				}

			if (isNamedElement(child, "TabsList")) {
				return React.cloneElement(
					child as React.ReactElement<{ value: string; setValue: (val: string) => void }> ,
					{ value, setValue }
				);
			}
			if (isNamedElement(child, "TabsContent")) {
				return React.cloneElement(
					child as React.ReactElement<{ activeValue?: string }> ,
					{ activeValue: value }
				);
			}
				return child;
			})}
		</div>
	);
}

interface TabsListProps {
	children: React.ReactNode;
	className?: string;
	value: string;
	setValue: (value: string) => void;
}

export function TabsList({ children, className = "", value, setValue }: TabsListProps) {
	return (
		<div className={`flex gap-2 ${className}`}>
		{React.Children.map(children, (child) => {
			if (!React.isValidElement(child)) {
				return child;
			}
			const trigger = child as React.ReactElement<{
				value: string;
				active?: boolean;
				onSelect?: () => void;
			}>;
			return React.cloneElement(trigger, {
				active: trigger.props.value === value,
				onSelect: () => setValue(trigger.props.value),
			});
		})}
		</div>
	);
}
TabsList.displayName = "TabsList";

interface TabsTriggerProps {
	children: React.ReactNode;
	value: string;
	active?: boolean;
	onSelect?: () => void;
}

export function TabsTrigger({ children, active, onSelect }: TabsTriggerProps) {
	return (
		<button
			onClick={onSelect}
			className={`rounded-md px-4 py-2 text-sm font-medium border cursor-pointer ${
				active ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
			}`}
		>
			{children}
		</button>
	);
}
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps {
	value: string;
	activeValue?: string;
	children: React.ReactNode;
	className?: string;
}

export function TabsContent({ value, activeValue, children, className = "" }: TabsContentProps) {
	return (
		<div className={`mt-4 ${className}`} hidden={!activeValue || activeValue !== value}>
			{children}
		</div>
	);
}
TabsContent.displayName = "TabsContent";
