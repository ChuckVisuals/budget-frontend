"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';


const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'income' | 'expense' | null>(null);
    const [uid, setUid] = useState<string | null>(null);

    useEffect(() => {
        // Check if UID exists in localStorage
        let storedUid = localStorage.getItem('uid');
        if (!storedUid) {
            // Generate a new UID and store it in localStorage
            storedUid = uuidv4();
            localStorage.setItem('uid', storedUid);
            console.log('Generated UID:', storedUid);
        } else {
            console.log('Existing UID:', storedUid);
        }
        setUid(storedUid);
    }, []);

    const formSchema = z.object({
        source: z.string().min(1, "Source is required").max(50),
        amount: z.string().min(0, "Amount must be a positive number"),
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(uid)
        console.log(values)
        const valuesWithUid = { ...values, uid };
        console.log(valuesWithUid);

        try {
            const response = await fetch(`https://${modalType === 'income' ? 'collymarker.vercel.app/income' : 'collymarker.vercel.app/add_expense'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(valuesWithUid),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            setIsModalOpen(false); // Close the modal after form submission
            form.reset(); // Clear the form
            window.location.reload(); // Reload the page to fetch the updated data
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const openModal = (type: 'income' | 'expense') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    return (
        <div className="relative h-14 flex items-center justify-center">

            <div className="absolute inset-0">
                <div className="bg-slate-200 flex items-center justify-center space-x-8 py-2">
                    <Button variant="secondary" onClick={() => openModal('income')}>Add Income</Button>
                    <Button variant="secondary" onClick={() => openModal('expense')}>Add Expense</Button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="source"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">
                                                {modalType === 'income' ? 'Income Source' : 'Expense Source'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="text-gray-900" placeholder={`Enter ${modalType === 'income' ? 'Income' : 'Expense'} Source Here`} {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                {modalType === 'income' ? 'This is the name of your income source (e.g. salary, side hustle, etc.)' : 'This is the name of your expense source (e.g. rent, groceries, etc.)'}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">
                                                {modalType === 'income' ? 'Income Amount' : 'Expense Amount'}
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="text-gray-900" type="number" placeholder={`Enter ${modalType === 'income' ? 'Income' : 'Expense'} Amount Here`} {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                {modalType === 'income' ? 'This is the amount of income you receive from this source.' : 'This is the amount of expense you incur from this source.'}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                        <button
                            className="mt-4 text-red-500"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Navbar;