import ContactHero from "../../../components/contact/ContactHero";
import ContactLayout from "../../../components/contact/ContactLayout";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <ContactHero />
            <ContactLayout />
        </div>
    );
}

// import { Input } from "../../../components/ui/input";
// import { Button } from "../../../components/ui/button";

// export default function ContactPage() {
// 	return (
// 		<div className="mx-auto max-w-xl px-4 py-10">
// 			<h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
// 			<div className="space-y-3">
// 				<Input placeholder="Name" />
// 				<Input placeholder="Email" />
// 				<Input placeholder="Message" />
// 				<Button className="w-full">Send</Button>
// 			</div>
// 			<p className="mt-4 text-sm text-gray-600">Messages are not sent; this is a UI placeholder.</p>
// 		</div>
// 	);
// }
