import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useFetcher } from "react-router";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { isValidEmail } from "~/lib/functions";

interface ContactFormProps {
    className?: string;
    onSubmitSuccess?: () => void;
}

export default function ContactForm({ className, onSubmitSuccess }: ContactFormProps) {
    const fetcher = useFetcher();
    const errors = fetcher.data?.errors;
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        projectTypes: {
            'websites': false,
            'AI': false,
            'blockchain': false,
            'design': false,
            'other': false,
        }
    });

    const isNameValid = formState.name.length >= 2;
    const isEmailValid = isValidEmail(formState.email);
    const isCompanyValid = formState.company.length >= 2;
    const isMessageValid = formState.message.length >= 10;
    const isProjectTypeSelected = Object.values(formState.projectTypes).some(value => value === true);

    const isFormValid =
        isNameValid &&
        isEmailValid &&
        isCompanyValid &&
        isMessageValid &&
        isProjectTypeSelected;

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

    const handleSubmit = (e: React.FormEvent) => {
        setFormSubmitted(true);
        if (isFormValid) {
            setIsSubmitting(true);
        }
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
                message: '',
                projectTypes: {
                    'websites': false,
                    'AI': false,
                    'blockchain': false,
                    'design': false,
                    'other': false,
                }
            });
            setFormSubmitted(false);
            onSubmitSuccess?.();
        } else if (fetcher.data?.errors) {
            if (fetcher.data.errors.submit) {
                toast.error("Failed to send message", {
                    description: fetcher.data.errors.submit,
                });
            }
        }
    }, [fetcher.data, onSubmitSuccess]);

    useEffect(() => {
        if (fetcher.state === "idle" && isSubmitting) {
            setIsSubmitting(false);
        }
    }, [fetcher.state, isSubmitting]);

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

    const baseInputStyles = "border-0 border-b rounded-none shadow-none focus:ring-0 focus:border-black px-0 py-2 bg-transparent w-full text-black text-base sm:text-lg md:text-xl lg:text-2xl font-light [-webkit-appearance:none] [&:-webkit-autofill]:!bg-transparent [&:-webkit-autofill]:!shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:![text-fill-color:black] [&:-webkit-autofill]:![-webkit-text-fill-color:black] ![text-fill-color:black] ![-webkit-text-fill-color:black] [color-scheme:light] !text-black [&::placeholder]:text-gray-200 [&::placeholder]:opacity-40 [&::-webkit-input-placeholder]:text-gray-200 [&::-webkit-input-placeholder]:opacity-40 [&::-moz-placeholder]:text-gray-200 [&::-moz-placeholder]:opacity-40 [&:-ms-input-placeholder]:text-gray-200 [&:-ms-input-placeholder]:opacity-40";

    const getInputStyles = (isValid: boolean, fieldValue: string) => {
        if (!formSubmitted || !fieldValue) return `${baseInputStyles} border-gray-300`;
        return isValid
            ? `${baseInputStyles} border-gray-300 focus:border-black`
            : `${baseInputStyles} border-red-500 focus:border-red-500`;
    };

    return (
        <div className={`w-full h-full mt-2 sm:mt-12 mb-24 ${className}`}>
            <div className="w-full flex justify-start items-center">
                <div className="w-full mx-auto">
                    <motion.div
                        className="w-full h-full"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <fetcher.Form method="post" action="/api/resend" className="space-y-8">
                            <input type="hidden" name="action" value="contact" />

                            <motion.div variants={item} className="space-y-8">
                                <div className="w-full">
                                    <div className="text-2xl md:text-4xl lg:text-6xl font-extralight mb-4 leading-relaxed">
                                        My name is
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                            onChange={handleInputChange}
                                            value={formState.name}
                                            className={`${getInputStyles(isNameValid, formState.name)} inline-block mx-2 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]`}
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
                                            className={`${getInputStyles(isCompanyValid, formState.company)} inline-block mx-2 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]`}
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
                                            className={`${getInputStyles(isEmailValid, formState.email)} inline-block mx-2 w-[250px] sm:w-[270px] md:w-[290px] lg:w-[310px]`}
                                        />
                                        .
                                    </div>

                                    <div className="text-2xl md:text-4xl lg:text-6xl font-extralight mb-4 leading-relaxed">
                                        <div className="flex flex-wrap items-center gap-x-2">
                                            <span className="mr-1">I am interested in</span>
                                            {Object.entries(formState.projectTypes).map(([type, isSelected]) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => handleCheckboxChange(type)}
                                                    className={`
                                                        px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-base md:text-lg rounded-full border transition-all whitespace-nowrap
                                                        ${isSelected
                                                            ? 'bg-black text-white border-black'
                                                            : formSubmitted && !isProjectTypeSelected
                                                                ? 'bg-white hover:bg-gray-50 border-red-500'
                                                                : 'bg-white hover:bg-gray-50 border-gray-300'
                                                        }
                                                    `}
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </button>
                                            ))}
                                            <span>and my project involves</span>
                                            <Input
                                                id="message"
                                                name="message"
                                                required
                                                placeholder="Tell us about your project"
                                                onChange={handleInputChange}
                                                value={formState.message}
                                                className={`${getInputStyles(isMessageValid, formState.message)} inline min-w-[200px] sm:min-w-[220px] md:min-w-[240px] lg:min-w-[260px] flex-1`}
                                            />
                                            <span>.</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {formSubmitted && !isFormValid && (
                                <motion.div 
                                    variants={item}
                                    className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-4"
                                >
                                    <div className="font-medium mb-1">Please complete the following:</div>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                        {!isNameValid && <li>Your name</li>}
                                        {!isCompanyValid && <li>Your company</li>}
                                        {!isEmailValid && <li>A valid email address</li>}
                                        {!isProjectTypeSelected && <li>Select at least one project type</li>}
                                        {!isMessageValid && <li>Project details (at least 10 characters)</li>}
                                    </ul>
                                </motion.div>
                            )}

                            <motion.div variants={item}>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className={`
                                        w-full py-10 px-8 rounded-md
                                        transition-all duration-300 ease-in-out
                                        flex items-center justify-between gap-6 text-lg
                                        bg-transparent border-2 border-black/50 text-black hover:bg-black hover:text-white
                                        cursor-pointer font-medium
                                    `}
                                >
                                    <span className="mx-2">Send Message</span>
                                    {isFormValid ? (
                                        <div className="w-12 h-12 rounded-full border-2 border-green-500 bg-green-50 flex items-center justify-center">
                                            <Check className="w-7 h-7 text-green-500" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-full border-2 border-red-400 bg-red-50 flex items-center justify-center">
                                            <X className="w-7 h-7 text-red-400" />
                                        </div>
                                    )}
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