import { CreateContactMessageRequest } from "../models/contact";
const ContactApi = () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

        const createContactMessage = async (data: CreateContactMessageRequest) => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const responseData = await response.json();
                if (response.ok) {
                    return { success: true, data: responseData };
                } else {
                    return { success: false, error: responseData.detail || responseData.message || responseData.error || "Error creating contact message" };
                }
            } catch (error) {
                console.log("Error creating contact message:", error);
                return { success: false, error: error as string };
            }   
        }

    return {
        createContactMessage,
    }
}

export default ContactApi;