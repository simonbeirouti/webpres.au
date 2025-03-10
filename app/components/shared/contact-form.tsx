import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useFetcher } from "react-router";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { isValidEmail } from "~/lib/functions";

interface ContactFormProps {
    className?: string;
    onSubmitSuccess?: () => void;
}

export default function ContactForm({ className, onSubmitSuccess }: ContactFormProps) {
    const fetcher = useFetcher();
    const errors = fetcher.data?.errors;
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        projectTypes: {
            'website': false,
            'ai': false,
            'web3': false,
            'design': false,
            'other': false,
        }
    });

    // Form validation
    const isFormValid =
        formState.name.length >= 2 &&
        isValidEmail(formState.email) &&
        formState.company.length >= 2 &&
        formState.phone.length >= 10 &&
        formState.message.length >= 10 && 
        Object.values(formState.projectTypes).some(value => value === true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleCheckboxChange = (option: string) => {
        setFormState(prev => {
            return {
                ...prev,
                projectTypes: {
                    ...prev.projectTypes,
                    [option]: !prev.projectTypes[option as keyof typeof prev.projectTypes]
                }
            };
        });
    };

    // Helper function to serialize form data for submission
    const serializeFormData = () => {
        const projects = Object.entries(formState.projectTypes)
            .filter(([_, isSelected]) => isSelected)
            .map(([project]) => project)
            .join(',');
            
        return {
            ...formState,
            projectType: projects,
        };
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isFormValid) {
            toast.error("Please fill in all required fields");
            return;
        }
        
        const formData = new FormData();
        const serializedData = serializeFormData();
        
        formData.append("action", "contact");
        formData.append("name", serializedData.name);
        formData.append("email", serializedData.email);
        formData.append("company", serializedData.company);
        formData.append("phone", serializedData.phone);
        formData.append("message", serializedData.message);
        formData.append("projectType", serializedData.projectType);
        
        fetcher.submit(formData, {
            method: "post",
            action: "/api/resend",
        });
    };

    useEffect(() => {
        if (fetcher.data?.success) {
            toast.success("Message sent!", {
                description: "We'll get back to you soon.",
            });
            setFormState({
                name: '',
                email: '',
                company: '',
                phone: '',
                message: '',
                projectTypes: {
                    'website': false,
                    'ai': false,
                    'web3': false,
                    'design': false,
                    'other': false,
                }
            });
            onSubmitSuccess?.();
        } else if (fetcher.data?.errors) {
            if (fetcher.data.errors.submit) {
                toast.error("Failed to send message", {
                    description: fetcher.data.errors.submit,
                });
            }
        }
    }, [fetcher.data, onSubmitSuccess]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Input styling with underline and no borders/shadows
    const inputStyles = "border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0 focus:border-black px-0 py-2 bg-transparent w-full text-base sm:text-lg md:text-xl lg:text-2xl";

    return (
        <div className={`w-full h-full mb-24 ${className}`}>
            <div className="w-full flex justify-start items-center">
                <div className="w-full mx-auto">
                    <motion.div
                        className="w-full h-full"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <fetcher.Form method="post" action="/api/resend" className="space-y-8" onSubmit={handleFormSubmit}>
                            <input type="hidden" name="action" value="contact" />

                            <motion.div variants={item} className="space-y-8">
                                <div className="w-full">
                                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-black mb-6">
                                        My name is
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                            onChange={handleInputChange}
                                            value={formState.name}
                                            className={`${inputStyles} inline-block mx-2 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]`}
                                        />
                                        , and I am from
                                        <Input
                                            type="text"
                                            id="company"
                                            name="company"
                                            required
                                            placeholder="Global Tech Co"
                                            onChange={handleInputChange}
                                            value={formState.company}
                                            className={`${inputStyles} inline-block mx-2 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]`}
                                        />
                                        . You can send me an email at 
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="example@email.com"
                                            onChange={handleInputChange}
                                            value={formState.email}
                                            className={`${inputStyles} inline-block mx-2 w-[250px] sm:w-[270px] md:w-[290px] lg:w-[310px]`}
                                        />
                                        , or you can call me on
                                        <Input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            placeholder="+61 412 345 678"
                                            onChange={handleInputChange}
                                            value={formState.phone}
                                            className={`${inputStyles} inline-block mx-2 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]`}
                                        />
                                        .
                                    </div>

                                    <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-black mb-6">
                                        <div className="flex flex-wrap items-baseline gap-x-2">
                                            <span>I am interested in</span>
                                            {Object.entries(formState.projectTypes).map(([type, isSelected]) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => handleCheckboxChange(type)}
                                                    className={`
                                                        px-3 py-1 text-sm sm:text-base md:text-lg rounded-full border transition-all whitespace-nowrap
                                                        ${isSelected
                                                            ? 'bg-black text-white border-black'
                                                            : 'bg-white hover:bg-gray-50 border-gray-300'
                                                        }
                                                    `}
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </button>
                                            ))}
                                            <span>and my project involves</span>
                                            <Input
                                                type="text"
                                                id="message"
                                                name="message"
                                                required
                                                placeholder="Tell us about your project"
                                                onChange={handleInputChange}
                                                value={formState.message}
                                                className={`${inputStyles} inline min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[260px] flex-1`}
                                            />
                                            <span>.</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {errors?.name && <em className="text-red-500 text-sm block">{errors.name}</em>}
                                        {!errors?.name && formState.name && formState.name.length < 2 && 
                                            <em className="text-red-500 text-sm block">Name must be at least 2 characters</em>
                                        }
                                        
                                        {!errors?.company && formState.company && formState.company.length < 2 && 
                                            <em className="text-red-500 text-sm block">Company name must be at least 2 characters</em>
                                        }
                                        
                                        {errors?.email && <em className="text-red-500 text-sm block">{errors.email}</em>}
                                        {!errors?.email && formState.email && !isValidEmail(formState.email) && 
                                            <em className="text-red-500 text-sm block">Please enter a valid email</em>
                                        }
                                        
                                        {!errors?.phone && formState.phone && formState.phone.length < 10 && 
                                            <em className="text-red-500 text-sm block">Please enter a valid phone number</em>
                                        }

                                        {!Object.values(formState.projectTypes).some(value => value === true) && 
                                            <em className="text-red-500 text-sm block">Please select at least one project type</em>
                                        }

                                        {!errors?.message && formState.message && formState.message.length < 10 && 
                                            <em className="text-red-500 text-sm block">Project details must be at least 10 characters</em>
                                        }
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={item}>
                                <Button
                                    type="submit"
                                    className={`
                                        w-full text-white py-4 px-6 rounded-md
                                        transition-all duration-300 ease-in-out
                                        flex items-center justify-center
                                        ${isFormValid
                                            ? 'bg-black hover:bg-gray-800 cursor-pointer'
                                            : 'bg-gray-300 hover:bg-gray-400 cursor-not-allowed'
                                        }
                                    `}
                                    disabled={!isFormValid}
                                >
                                    <span className="mr-2">Send Message</span>
                                    <MoveRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                            
                            {errors?.submit && (
                                <div className="text-red-500 text-center mt-4">{errors.submit}</div>
                            )}
                        </fetcher.Form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}