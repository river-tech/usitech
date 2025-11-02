"use client";

import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as React from "react";
import ContactApi from "../../lib/api/Contact";
import { useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";


export default function ContactForm() {
    const {userEmail, userName} = useAuth();

    const [message, setMessage] = React.useState("");
    const max = 500;
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const contactApi = ContactApi();
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");

    useEffect(() => {
        setFullName(userName || "");
        setEmail(userEmail || "");
    }, []);

   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setError("");
        setSuccess("");
        e.preventDefault();
        const result = await contactApi.createContactMessage({
            full_name: fullName || "",
            email: email || "",
            subject: subject || "",
            message: message || "",
        });
        if (result.success) {
            setFullName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setSuccess("Message sent successfully");
        } else {
            setError(result.error || "Error sending message");
        }
        // console.log("fullName", fullName);
        // console.log("email", email);
        // console.log("subject", subject);
        // console.log("message", message);
    }
    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <h2 className="text-xl font-semibold text-[#0F172A] mb-4">Send us a Message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <Input  value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Enter your full name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <Input  value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter your email address" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter a subject" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                        required
                        maxLength={max}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe your inquiry in detail..."
                        className="w-full min-h-[140px] rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007BFF] focus:border-transparent"
                    />
                    <div className="text-xs text-gray-500 mt-1 text-right">{message.length}/{max} characters</div>
                </div>
                <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#002B6B] to-[#007BFF] text-white hover:brightness-110 shadow-md">
                    Send Message
                </Button>
                {(success || error) && (
                    <div className={`mt-2 rounded-xl px-3 py-2 text-sm font-medium ${success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {success || error}
                    </div>
                )}
            </form>
        </motion.div>
    );
}


