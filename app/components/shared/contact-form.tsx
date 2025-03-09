import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useFetcher } from "react-router";
import { MoveRight } from "lucide-react";
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

    const isFormValid =
        formState.name.length >= 2 &&
        isValidEmail(formState.email) &&
        formState.message.length >= 10 &&
        formState.company.length >= 2 &&
        formState.phone.length >= 10;

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

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serializedData = serializeFormData();
        const formData = new FormData();
        
        formData.append('action', 'contact');
        formData.append('name', serializedData.name);
        formData.append('email', serializedData.email);
        formData.append('company', serializedData.company);
        formData.append('phone', serializedData.phone);
        formData.append('message', serializedData.message);
        formData.append('projectType', serializedData.projectType);
        
        fetcher.submit(formData, { method: 'post', action: '/api/subscribe' });
    };

    return (
        <div className={`bg-white dark:bg-neutral-950 p-2 sm:p-4 md:p-8 rounded-xl ${className}`}>
            <div className="w-full max-w-6xl mx-auto flex justify-center items-center min-h-[700px]">
                <div className="w-full px-4">
                    <motion.div
                        className="w-full h-full"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <fetcher.Form method="post" action="/api/subscribe" className="space-y-6" onSubmit={handleSubmit}>
                            <input type="hidden" name="action" value="contact" />

                            {/* Two column layout for form fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div variants={item} className="col-span-1">
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Your full name"
                                        onChange={handleInputChange}
                                        value={formState.name}
                                        className="w-full"
                                    />
                                    {errors?.name && <em className="text-red-500 text-sm mt-2 block">{errors.name}</em>}
                                </motion.div>

                                <motion.div variants={item} className="col-span-1">
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="your@email.com"
                                        onChange={handleInputChange}
                                        value={formState.email}
                                        className="w-full"
                                    />
                                    {errors?.email && <em className="text-red-500 text-sm mt-2 block">{errors.email}</em>}
                                </motion.div>

                                <motion.div variants={item} className="col-span-1">
                                    <label htmlFor="company" className="block text-sm font-medium mb-2">Company *</label>
                                    <Input
                                        type="text"
                                        id="company"
                                        name="company"
                                        required
                                        placeholder="Your company name"
                                        onChange={handleInputChange}
                                        value={formState.company}
                                        className="w-full"
                                    />
                                </motion.div>

                                <motion.div variants={item} className="col-span-1">
                                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone *</label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        placeholder="Your phone number"
                                        onChange={handleInputChange}
                                        value={formState.phone}
                                        className="w-full"
                                    />
                                </motion.div>
                            </div>

                            {/* Project Type section with flex-wrap */}
                            <motion.div variants={item} className="col-span-2">
                                <label className="block text-sm font-medium mb-2">Project Type</label>
                                <div className="flex flex-wrap gap-2">
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
                                </div>
                            </motion.div>

                            {/* Project Details */}
                            <motion.div variants={item} className="col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details *</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    placeholder="Tell us about your project"
                                    rows={4}
                                    onChange={handleInputChange}
                                    value={formState.message}
                                    className="w-full"
                                />
                                {errors?.message && <em className="text-red-500 text-sm mt-2 block">{errors.message}</em>}
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div variants={item} className="col-span-2 pt-4">
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
                                {errors?.submit && (
                                    <div className="text-red-500 text-center mt-4">{errors.submit}</div>
                                )}
                            </motion.div>
                        </fetcher.Form>
                    </motion.div>

                    {/* Contact image - moved to background for mobile */}
                    <div className="hidden md:block fixed inset-0 z-[-1] opacity-5">
                        <img 
                            src="/content/contact.jpg" 
                            alt="" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}