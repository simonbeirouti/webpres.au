"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { motion } from "motion/react"
import { Check, X } from "lucide-react"
import { toast } from "sonner"
import { contactAction } from "./actions"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    projectTypes: z.object({
        websites: z.boolean(),
        AI: z.boolean(),
        blockchain: z.boolean(),
        design: z.boolean(),
        other: z.boolean(),
    }).refine((data) => Object.values(data).some(value => value === true), {
        message: "Please select at least one project type",
    }),
});

export default function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: "",
            projectTypes: {
                websites: false,
                AI: false,
                blockchain: false,
                design: false,
                other: false,
            },
        },
        mode: "onChange",
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('company', values.company);
            formData.append('message', values.message);
            formData.append('projectTypes', JSON.stringify(values.projectTypes));
            
            const result = await contactAction(formSchema, formData);

            if (result.success) {
                toast.success(result.success);
                form.reset();
            } else if (result.error) {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const isFormComplete = () => {
        const values = form.getValues();
        const hasProjectType = Object.values(values.projectTypes).some(value => value === true);
        const isValid = form.formState.isValid;
        
        return isValid && hasProjectType;
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <motion.div variants={item} className="space-y-8">
                    <div className="text-2xl md:text-4xl lg:text-6xl font-extralight mb-4 leading-relaxed">
                        My name is
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="inline-block">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="John Doe"
                                            className="inline-block mx-2 w-[250px] sm:w-[270px] md:w-[290px] lg:w-[310px] md:h-16 align-middle text-lg md:placeholder:text-2xl md:text-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute text-sm text-red-500" />
                                </FormItem>
                            )}
                        />
                        , and I am from
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem className="inline-block">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Global Tech Co"
                                            className="inline-block mx-2 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] md:h-16 align-middle text-lg md:placeholder:text-2xl md:text-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute text-sm text-red-500" />
                                </FormItem>
                            )}
                        />
                        . You can send me an email at
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="inline-block">
                                    <FormControl>
                                        <Input
                                            type="email"
                                            {...field}
                                            placeholder="example@email.com"
                                            className="inline-block mx-2 w-[250px] sm:w-[270px] md:w-[290px] lg:w-[310px] md:h-16 align-middle text-lg md:placeholder:text-2xl md:text-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute text-sm text-red-500" />
                                </FormItem>
                            )}
                        />
                        .
                    </div>

                    <div className="text-2xl md:text-4xl lg:text-6xl font-extralight mb-4 leading-relaxed">
                        <div className="flex flex-wrap items-center gap-x-2">
                            <span className="mr-1">I am interested in</span>
                            <FormField
                                control={form.control}
                                name="projectTypes"
                                render={({ field }) => (
                                    <FormItem className="inline-block">
                                        <FormControl>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(field.value).map(([type, isSelected]) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => {
                                                            const currentTypes = field.value;
                                                            field.onChange({
                                                                ...currentTypes,
                                                                [type]: !isSelected
                                                            });
                                                        }}
                                                        className={`px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-base md:text-lg rounded-full border transition-all whitespace-nowrap
                                                            ${isSelected
                                                                ? 'bg-black text-white border-black'
                                                                : 'bg-white hover:bg-gray-50 border-gray-300'
                                                            }
                                                        `}
                                                    >
                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormMessage className="absolute text-sm text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <span>and my project involves</span>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="inline-block">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Tell us about your project"
                                                className="inline min-w-[400px] sm:min-w-[420px] md:min-w-[440px] lg:min-w-[460px] flex-1 md:h-16 align-middle text-lg md:placeholder:text-2xl md:text-2xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute text-sm text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <span>.</span>
                        </div>
                    </div>
                </motion.div>

                <Button
                    type="submit"
                    className="w-full py-10 px-8 rounded-md transition-all duration-300 ease-in-out flex items-center justify-between gap-6 text-lg bg-transparent border-2 border-black/50 text-black hover:bg-black hover:text-white cursor-pointer font-medium"
                >
                    <span className="mx-2">Send Message</span>
                    {isFormComplete() ? (
                        <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center">
                            <Check className="w-7 h-7 text-green-500" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full border-2 border-red-400 bg-red-50 flex items-center justify-center">
                            <X className="w-7 h-7 text-red-400" />
                        </div>
                    )}
                </Button>
            </form>
        </Form>
    )
}