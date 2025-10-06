import type { Metadata } from "next";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import MotionProvider from "../../components/shared/MotionProvider";

export const metadata: Metadata = {
	title: "UsITech",
	description: "Automation workflows",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="min-h-[calc(100vh-200px)]">
				<MotionProvider>
					{children}
				</MotionProvider>
			</main>
			<Footer />
		</>
	);
}
