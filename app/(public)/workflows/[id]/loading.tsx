import { Skeleton } from "../../../../components/ui/skeleton";

export default function Loading() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-10 space-y-4">
			<Skeleton className="h-7 w-1/2" />
			<Skeleton className="h-4 w-1/4" />
			<Skeleton className="h-24 w-full" />
		</div>
	);
}
