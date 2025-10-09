"use client";

import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";

export default function ContactLayout() {
    return (
        <section className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
                <div className="lg:col-span-2">
                    <ContactForm />
                </div>
                <div className="lg:col-span-1">
                    <ContactSidebar />
                </div>
            </div>
        </section>
    );
}


