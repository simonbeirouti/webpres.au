import type { Route } from "./+types/resend";
import { Resend } from "resend";
import { Email } from "~/components/email/receive";

export const action = async ({ request }: Route.ActionArgs) => {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    const resend = new Resend(apiKey);
    const formData = await request.formData();
    const action = String(formData.get("action"));

    if (action === "subscribe") {
        const email = String(formData.get("email"));
        const name = String(formData.get("name"));

        try {
            await resend.contacts.create({
                email: email,
                firstName: name,
                unsubscribed: false,
                audienceId: audienceId || "",
            });

            return { success: true };
        } catch (error) {
            console.error("Subscribe error:", error);
            return { 
                errors: {
                    submit: "Failed to subscribe. Please try again later."
                }
            };
        }
    }

    if (action === "contact") {
        const name = String(formData.get("name"));
        const email = String(formData.get("email"));
        const message = String(formData.get("message"));

        try {
            await resend.emails.send({
                from: 'website@cmpnd.cc',
                to: 'hello@simonbeirouti.com',
                cc: 'vasugaur2@gmail.com',
                subject: `New Contact Form Submission from ${name}`,
                react: <Email name={name} email={email} message={message} />,
                replyTo: email,
            });

            return { success: true };
        } catch (error) {
            console.error("Contact form error:", error);
            return {
                errors: {
                    submit: "Failed to send message. Please try again later."
                }
            };
        }
    }

    return { 
        errors: {
            submit: "Invalid action"
        }
    };
}; 