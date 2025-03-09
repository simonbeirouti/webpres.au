import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useFetcher } from "react-router";
import { MoveRight, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    const [currentStep, setCurrentStep] = useState(1);
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

    // Step 1 validation
    const isStep1Valid =
        formState.name.length >= 2 &&
        isValidEmail(formState.email) &&
        formState.company.length >= 2 &&
        formState.phone.length >= 10;

    // Step 2 validation
    const isStep2Valid = 
        formState.message.length >= 10 && 
        Object.values(formState.projectTypes).some(value => value === true);

    // Overall form validation
    const isFormValid = isStep1Valid && isStep2Valid;

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

    const handleNextStep = () => {
        if (isStep1Valid) {
            setCurrentStep(2);
        } else {
            // Show validation messages for first step
            toast.error("Please fill in all required fields correctly");
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(1);
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
        e.preventDefault(); // Always prevent default to handle submission manually
        
        if (!isFormValid) {
            toast.error("Please fill in all required fields");
            return;
        }
        
        // Serialize the form data and submit using fetcher
        const formData = new FormData();
        const serializedData = serializeFormData();
        
        // Add all form fields to FormData
        formData.append("action", "contact");
        formData.append("name", serializedData.name);
        formData.append("email", serializedData.email);
        formData.append("company", serializedData.company);
        formData.append("phone", serializedData.phone);
        formData.append("message", serializedData.message);
        formData.append("projectType", serializedData.projectType);
        
        // Submit the form using fetcher
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
            setCurrentStep(1);
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
    const inputStyles = "border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0 focus:border-black px-0 py-2 bg-transparent w-full";

    // Get step progress percentage
    const progressPercentage = currentStep === 1 ? 50 : 100;

    return (
        <div className={`bg-white p-2 sm:p-4 md:p-8 rounded-xl w-full h-full mb-24 ${className}`}>
            <div className="w-full flex justify-start items-center">
                <div className="w-full max-w-2xl mx-auto px-4">
                    {/* Progress bar */}
                    <div className="w-full h-1 bg-gray-200 my-6 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-black transition-all duration-500 ease-in-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    
                    <div className="py-2 mb-4 flex justify-between text-sm text-gray-500">
                        <span className={currentStep === 1 ? 'font-semibold text-black' : ''}>Your Information</span>
                        <span className={currentStep === 2 ? 'font-semibold text-black' : ''}>Project Details</span>
                    </div>
                    
                    <motion.div
                        className="w-full h-full"
                        variants={container}
                        initial="hidden"
                        animate="show"
                        key={`step-${currentStep}`}
                    >
                        <fetcher.Form method="post" action="/api/resend" className="space-y-8" onSubmit={handleFormSubmit}>
                            <input type="hidden" name="action" value="contact" />

                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-8"
                                    >
                                        {/* Step 1: Contact Information */}
                                        <motion.div variants={item} className="flex flex-col space-y-8">
                                            {/* Name field */}
                                            <div className="flex flex-row items-baseline w-full">
                                                <label htmlFor="name" className="text-xl sm:text-2xl font-normal text-black whitespace-nowrap mr-2">
                                                    I am
                                                </label>
                                                <div className="w-full">
                                                    <Input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        required
                                                        placeholder="John boe"
                                                        onChange={handleInputChange}
                                                        value={formState.name}
                                                        className={inputStyles}
                                                    />
                                                    {errors?.name && <em className="text-red-500 text-sm mt-2 block">{errors.name}</em>}
                                                    {!errors?.name && formState.name && formState.name.length < 2 && 
                                                        <em className="text-red-500 text-sm mt-2 block">Name must be at least 2 characters</em>
                                                    }
                                                </div>
                                            </div>

                                            {/* Company field */}
                                            <div className="flex flex-row items-baseline w-full">
                                                <label htmlFor="company" className="text-xl sm:text-2xl font-normal text-black whitespace-nowrap mr-2">
                                                    I'm from
                                                </label>
                                                <div className="w-full">
                                                    <Input
                                                        type="text"
                                                        id="company"
                                                        name="company"
                                                        required
                                                        placeholder="Global tech co"
                                                        onChange={handleInputChange}
                                                        value={formState.company}
                                                        className={inputStyles}
                                                    />
                                                    {!errors?.company && formState.company && formState.company.length < 2 && 
                                                        <em className="text-red-500 text-sm mt-2 block">Company name must be at least 2 characters</em>
                                                    }
                                                </div>
                                            </div>

                                            {/* Email field */}
                                            <div className="flex flex-row items-baseline w-full">
                                                <label htmlFor="email" className="text-xl sm:text-2xl font-normal text-black whitespace-nowrap mr-2">
                                                    My email
                                                </label>
                                                <div className="w-full">
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        placeholder="example@email.com"
                                                        onChange={handleInputChange}
                                                        value={formState.email}
                                                        className={inputStyles}
                                                    />
                                                    {errors?.email && <em className="text-red-500 text-sm mt-2 block">{errors.email}</em>}
                                                    {!errors?.email && formState.email && !isValidEmail(formState.email) && 
                                                        <em className="text-red-500 text-sm mt-2 block">Please enter a valid email</em>
                                                    }
                                                </div>
                                            </div>

                                            {/* Phone field */}
                                            <div className="flex flex-row items-baseline w-full">
                                                <label htmlFor="phone" className="text-xl sm:text-2xl font-normal text-black whitespace-nowrap mr-2">
                                                    Call me on
                                                </label>
                                                <div className="w-full">
                                                    <Input
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        required
                                                        placeholder="+61 412 345 678"
                                                        onChange={handleInputChange}
                                                        value={formState.phone}
                                                        className={inputStyles}
                                                    />
                                                    {!errors?.phone && formState.phone && formState.phone.length < 10 && 
                                                        <em className="text-red-500 text-sm mt-2 block">Please enter a valid phone number</em>
                                                    }
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div variants={item} className="mt-12">
                                            <Button
                                                type="button"
                                                className={`
                                                    w-full text-white py-4 px-6 rounded-md
                                                    transition-all duration-300 ease-in-out
                                                    flex items-center justify-center
                                                    ${isStep1Valid
                                                        ? 'bg-black hover:bg-gray-800 cursor-pointer'
                                                        : 'bg-gray-300 hover:bg-gray-400 cursor-not-allowed'
                                                    }
                                                `}
                                                onClick={handleNextStep}
                                                disabled={!isStep1Valid}
                                            >
                                                <span className="mr-2">Continue to Project Details</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Step 2: Project Information */}
                                        <motion.div variants={item} className="mb-8">
                                            <label htmlFor="message" className="text-xl sm:text-2xl font-normal text-black">Project Type</label>
                                            <div className="flex flex-wrap gap-3 mt-6">
                                                <div 
                                                    className={`
                                                        flex-1 min-w-[48%] basis-[48%] flex items-center p-3 border rounded-md cursor-pointer transition-all
                                                        ${formState.projectTypes.website 
                                                            ? 'bg-black text-white border-black' 
                                                            : 'bg-white hover:bg-gray-50 border-gray-300'
                                                        }
                                                    `}
                                                    onClick={() => handleCheckboxChange('website')}
                                                >
                                                    <span className="text-sm cursor-pointer flex-grow text-center">Website Development</span>
                                                </div>
                                                <div 
                                                    className={`
                                                        flex-1 min-w-[48%] basis-[48%] flex items-center p-3 border rounded-md cursor-pointer transition-all
                                                        ${formState.projectTypes.ai 
                                                            ? 'bg-black text-white border-black' 
                                                            : 'bg-white hover:bg-gray-50 border-gray-300'
                                                        }
                                                    `}
                                                    onClick={() => handleCheckboxChange('ai')}
                                                >
                                                    <span className="text-sm cursor-pointer flex-grow text-center">AI Development</span>
                                                </div>
                                                <div 
                                                    className={`
                                                        flex-1 min-w-[48%] basis-[48%] flex items-center p-3 border rounded-md cursor-pointer transition-all
                                                        ${formState.projectTypes.web3 
                                                            ? 'bg-black text-white border-black' 
                                                            : 'bg-white hover:bg-gray-50 border-gray-300'
                                                        }
                                                    `}
                                                    onClick={() => handleCheckboxChange('web3')}
                                                >
                                                    <span className="text-sm cursor-pointer flex-grow text-center">Web3 Services</span>
                                                </div>
                                                <div 
                                                    className={`
                                                        flex-1 min-w-[48%] basis-[48%] flex items-center p-3 border rounded-md cursor-pointer transition-all
                                                        ${formState.projectTypes.design 
                                                            ? 'bg-black text-white border-black' 
                                                            : 'bg-white hover:bg-gray-50 border-gray-300'
                                                        }
                                                    `}
                                                    onClick={() => handleCheckboxChange('design')}
                                                >
                                                    <span className="text-sm cursor-pointer flex-grow text-center">Design Services</span>
                                                </div>
                                                <div 
                                                    className={`
                                                        flex-1 min-w-[48%] basis-[48%] flex items-center p-3 border rounded-md cursor-pointer transition-all
                                                        ${formState.projectTypes.other 
                                                            ? 'bg-black text-white border-black' 
                                                            : 'bg-white hover:bg-gray-50 border-gray-300'
                                                        }
                                                    `}
                                                    onClick={() => handleCheckboxChange('other')}
                                                >
                                                    <span className="text-sm cursor-pointer flex-grow text-center">Other</span>
                                                </div>
                                            </div>
                                            {!Object.values(formState.projectTypes).some(value => value === true) && 
                                                <em className="text-red-500 text-sm mt-2 block">Please select at least one project type</em>
                                            }
                                        </motion.div>

                                        {/* Project Details */}
                                        <motion.div variants={item} className="mb-10 col-span-2">
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="message" className="text-xl sm:text-2xl font-normal text-black mb-4">
                                                    Project Details
                                                </label>
                                                <div className="w-full">
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        required
                                                        placeholder="Tell us about your project"
                                                        rows={4}
                                                        onChange={handleInputChange}
                                                        value={formState.message}
                                                        className="w-full min-h-[200px] resize-none"
                                                    />
                                                    {errors?.message && <em className="text-red-500 text-sm mt-2 block">{errors.message}</em>}
                                                    {!errors?.message && formState.message && formState.message.length < 10 && 
                                                        <em className="text-red-500 text-sm mt-2 block">Project details must be at least 10 characters</em>
                                                    }
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Navigation Buttons */}
                                        <div className="grid grid-cols-2 gap-4 mt-12">
                                            <motion.div variants={item}>
                                                <Button
                                                    type="button"
                                                    className="w-full py-4 px-6 rounded-md border border-black bg-white text-black hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                                                    onClick={handlePrevStep}
                                                >
                                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                                    <span>Back</span>
                                                </Button>
                                            </motion.div>

                                            <motion.div variants={item}>
                                                <Button
                                                    type="submit"
                                                    className={`
                                                        w-full text-white py-4 px-6 rounded-md
                                                        transition-all duration-300 ease-in-out
                                                        flex items-center justify-center
                                                        ${isStep2Valid
                                                            ? 'bg-black hover:bg-gray-800 cursor-pointer'
                                                            : 'bg-gray-300 hover:bg-gray-400 cursor-not-allowed'
                                                        }
                                                    `}
                                                    disabled={!isStep2Valid}
                                                >
                                                    <span className="mr-2">Send Message</span>
                                                    <MoveRight className="w-4 h-4" />
                                                </Button>
                                            </motion.div>
                                        </div>
                                        
                                        {errors?.submit && (
                                            <div className="text-red-500 text-center mt-4">{errors.submit}</div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </fetcher.Form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}