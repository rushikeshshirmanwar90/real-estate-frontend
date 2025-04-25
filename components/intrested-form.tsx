"use client"

import type React from "react"

import { useState } from "react"
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
import { addInterestedProperty } from "@/functions/intrest"

export function InterestForm({ buildingName, buildingId }: { buildingName: string, buildingId: string }) {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.phoneNumber) {
            toast.error("Missing information", {
                description: "Please fill in all fields",
            })
            return
        }

        try {
            setIsSubmitting(true)


            const PropertyDetails = {
                name: buildingName,
                id: buildingId
            }

            const user = Cookies.get('user') ? JSON.parse(Cookies.get('user') || '') : null;
            if (user != null) {
                await addInterestedProperty(user, PropertyDetails)
            } else {
                Cookies.set('user', JSON.stringify(formData), { expires: 7 });
            }


            toast.success("Interest registered!", {
                description: "We'll contact you soon with more information.",
            })

            setFormData({
                name: "",
                phoneNumber: "",
            })

            setOpen(false)
        } catch (error: unknown) {
            toast.error("Something went wrong", {
                description: "Please try again later",
            })
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }
    }

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
                            Interested in {buildingName}? Fill in your details below and our team will contact you soon.
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
                        <DialogFooter>
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