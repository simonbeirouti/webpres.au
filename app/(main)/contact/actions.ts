'use server';

import { Resend } from "resend";
import { Email } from "./email";
import { z } from "zod";
import { validatedAction } from "@/lib/auth/middleware";

type ActionState = {
    error?: string;
    success?: string;
};

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    company: z.string().min(2, "Company name must be at least 2 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    projectTypes: z.union([
        z.string().transform(str => JSON.parse(str)),
        z.object({
            websites: z.boolean(),
            AI: z.boolean(),
            blockchain: z.boolean(),
            design: z.boolean(),
            other: z.boolean(),
        })
    ]).refine((data) => Object.values(data).some(value => value === true), {
        message: "Please select at least one project type",
    }),
});

export const contactAction = validatedAction(contactSchema, async (data): Promise<ActionState> => {
    console.log('Contact action started with data:', data);
    const { name, email, company, message, projectTypes } = data;
    
    // Parse projectTypes if it's a string
    const parsedProjectTypes = typeof projectTypes === 'string' 
        ? JSON.parse(projectTypes) 
        : projectTypes;

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error('Missing RESEND_API_KEY');
        return { error: "Email service is not configured" };
    }

    const resend = new Resend(apiKey);

    // Convert projectTypes object to a string of selected types
    const selectedTypes = Object.entries(parsedProjectTypes)
        .filter(([_, isSelected]) => isSelected)
        .map(([type]) => type)
        .join(', ');

    try {
        console.log('Attempting to send email...');
        const data = await resend.emails.send({
            from: 'webpres@cmpnd.cc',
            to: 'hello@simonbeirouti.com',
            subject: `New enquiry from ${name}`,
            react: Email({
                name,
                email,
                company,
                message,
                projectType: selectedTypes
            }),
            replyTo: `${name} <${email}>`,
        });

        console.log('Email sent successfully', data);
        return { success: "Message sent successfully" };
    } catch (error) {
        console.error("Contact form error:", error);
        return {
            error: "Failed to send message. Please try again later."
        };
    }
});

const subscribeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export const subscribeAction = validatedAction(subscribeSchema, async (data): Promise<ActionState> => {
  const { name, email } = data;
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return { error: "Email service is not configured" };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.contacts.create({
      email: email,
      firstName: name,
      unsubscribed: false,
      audienceId: audienceId,
    });

    return { success: "Successfully subscribed" };
  } catch (error) {
    console.error("Subscribe error:", error);
    return {
      error: "Failed to subscribe. Please try again later."
    };
  }
}); 