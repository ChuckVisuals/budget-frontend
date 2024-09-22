"use client"

import React, { useState, useEffect } from 'react';
import Card from "../components/card";
import WideCard from "../components/wideCard";
import Navbar from "../components/navbar";
import { Progress } from "@/components/ui/progress"
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

    const [incomeData, setIncomeData] = useState([{ source: '', amount: 0 }]);
    const [expenseData, setExpenseData] = useState([{ source: '', amount: 0 }]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [progress, setProgress] = React.useState(13)
    const [uid, setUid] = useState<string | null>(null);
    const [userData, setData] = useState({ expenses: [], income: [] });

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

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

    // Fetch data from the API
    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await fetch('https://collymarker.vercel.app/all_transactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setData(data)
            } catch (error) {
                console.error('Error:', error);
            }
        }
        FetchData();
    }, [])

    // Log userData whenever it changes
    useEffect(() => {
        // Filter expenses and income based on uid
        const filteredExpenses = userData.expenses.filter(expense => expense.uid === uid);
        const filteredIncome = userData.income.filter(income => income.uid === uid);
        setTotalIncome(filteredIncome.reduce((acc, curr) => acc + curr.amount, 0));
        setTotalExpense(filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0));
        setIncomeData(filteredIncome);
        setExpenseData(filteredExpenses);
    }, [userData]);

    return (
        <div className="relative bg-gradient-to-tr from-green-50 to-indigo-50 h-screen w-screen overflow-x-hidden">
            <Navbar />

            <h2 className="scroll-m-20 border-b pb-2 px-4 text-3xl font-semibold tracking-tight first:mt-0 w-fit text-slate-500 border-slate-300 ml-12 mt-12 rounded-md">
                My Progress
            </h2>
            <Progress value={progress} className="w-[60%] mt-8 ml-8" />

            <div className="flex justify-center mt-10">
                <div className="grid grid-cols-2 gap-32">
                    <div>
                        <h2 className="text-center scroll-m-20 border-b pb-1 mb-6 text-3xl text-slate-500 border-slate-300 font-semibold tracking-tight first:mt-0 w-full rounded-xl">
                            My Income
                        </h2>
                        <div className="space-y-4">
                            {incomeData.map((data, index) => (
                                <Card key={index} prop={data} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center scroll-m-20 border-b pb-1 mb-6 text-3xl text-slate-500 border-slate-300 font-semibold tracking-tight first:mt-0 w-full rounded-xl">
                            My Expenses
                        </h2>
                        <div className="space-y-4">
                            {expenseData.map((data, index) => (
                                <Card key={index} prop={data} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-6 ml-4">
                <WideCard totalIncome={totalIncome} totalExpense={totalExpense} />
            </div>
        </div>
    )
}
