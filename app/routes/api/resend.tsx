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
        const company = String(formData.get("company"));
        const message = String(formData.get("message"));
        const projectType = String(formData.get("projectType"));

        try {
            const data = await resend.emails.send({
                from: 'webpres@cmpnd.cc',
                to: 'hello@simonbeirouti.com',
                subject: `New enquiry from ${name}`,
                react: <Email
                    name={name}
                    email={email}
                    company={company}
                    message={message}
                    projectType={projectType}
                />,
                replyTo: `${name} <${email}>`,
            });

            console.log(data);

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