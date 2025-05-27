"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addLeads } from "@/functions/leads"


interface InterestFormProps {
    propertyName: string
    propertyId: string
    projectName: string
    projectType: "building" | "rowhouse"
}

export function InterestForm({ propertyName, propertyId, projectName, projectType }: InterestFormProps) {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
    })

    // Load data from cookies when component mounts or dialog opens
    useEffect(() => {
        if (open) {
            const savedName = Cookies.get('user_name');
            const savedPhoneNumber = Cookies.get('user_phone');

            if (savedName || savedPhoneNumber) {
                setFormData({
                    name: savedName || "",
                    phoneNumber: savedPhoneNumber || "",
                });

                // Show a toast to let user know we've pre-filled their info
                if (savedName && savedPhoneNumber) {
                    toast.info("Info pre-filled", {
                        description: "We've filled in your details from last time.",
                    });
                }
            }
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        // Form validation
        const { name, phoneNumber } = formData;
        if (!name?.trim() || !phoneNumber?.trim()) {
            toast.error("Missing information", {
                description: "Please fill in all fields",
            });
            return;
        }

        // Phone number validation (optional)
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
            toast.error("Invalid phone number", {
                description: "Please enter a valid phone number",
            });
            return;
        }

        try {
            setIsSubmitting(true);

            const propertyDetails = { name: propertyName, id: propertyId };
            const userDetails = { name: name.trim(), phoneNumber: phoneNumber.trim() };

            // Store user details in cookies for future use
            // Set cookies to expire in 30 days
            Cookies.set('user_name', name.trim(), { expires: 30 });
            Cookies.set('user_phone', phoneNumber.trim(), { expires: 30 });

            // Disable form while submitting
            const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
            if (submitButton) submitButton.disabled = true;

            const data = await addLeads(
                userDetails,
                projectName,
                projectType,
                propertyDetails
            );

            console.log(data);

            // Success handling
            toast.success("Interest registered!", {
                description: "We'll contact you soon with more information.",
            });

            // Reset form (but don't clear cookies)
            setFormData({ name: "", phoneNumber: "" });
            setOpen(false);

        } catch (error) {
            // Error handling with better messages
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            console.error("Form submission error:", errorMessage);

            toast.error("Something went wrong", {
                description: "Please try again later. Error: " + errorMessage.slice(0, 50),
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="fixed bottom-0 py-4  left-0 right-0 flex justify-center bg-white shadow-md z-50">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white w-[80%] cursor-pointer ">
                        I&apos;m Interested
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Express Interest</DialogTitle>
                        <DialogDescription>
                            Interested in {propertyName}? Fill in your details below and our team will contact you soon.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-right">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="col-span-3"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phoneNumber" className="text-right">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="col-span-3"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex flex-col gap-2">
                            <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700 mt-2 w-full">
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}