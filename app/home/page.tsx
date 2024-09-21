"use client"

import * as React from "react"
import Card from "../components/card";
import WideCard from "../components/wideCard";
import Navbar from "../components/navbar";
import { Progress } from "@/components/ui/progress"

export default function Home() {

    const mockData = [
        { type: 'income', source: 'Salary', amount: 1000 },
        { type: 'expense', source: 'Rent', amount: 500 },
        { type: 'income', source: 'Freelance', amount: 2000 },
        { type: 'expense', source: 'Groceries', amount: 300 },
        { type: 'income', source: 'Investment', amount: 1500 },
        { type: 'expense', source: 'Utilities', amount: 200 },
        { type: 'income', source: 'Salary', amount: 1000 },
        { type: 'expense', source: 'Rent', amount: 500 },
        { type: 'income', source: 'Freelance', amount: 2000 },
        { type: 'expense', source: 'Groceries', amount: 300 },
        { type: 'income', source: 'Investment', amount: 1500 },
        { type: 'expense', source: 'Utilities', amount: 200 },
    ];

    const incomeData = mockData.filter(data => data.type === 'income');
    const expenseData = mockData.filter(data => data.type === 'expense');

    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (

        <div className="relative bg-gradient-to-tr from-green-50 to-indigo-50 h-screen w-screen overflow-x-hidden">

            <Navbar />

            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-fit text-slate-500 border-slate-500 ml-12 mt-12">
                My Progress
            </h2>
            <Progress value={progress} className="w-[60%] mt-8 ml-8" />

            <div className="flex justify-center mt-10">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-center scroll-m-20 border-b pb-1 mb-2 text-3xl text-slate-500 border-slate-500 font-semibold tracking-tight first:mt-0 w-full rounded-xl">
                            My Income
                        </h2>
                        <div className="space-y-4">
                            {incomeData.map((data, index) => (
                                <Card key={index} prop={data} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-center scroll-m-20 border-b pb-1 mb-2 text-3xl text-slate-500 border-slate-500 font-semibold tracking-tight first:mt-0 w-full rounded-xl">
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
                <WideCard />
            </div>
        </div>
    )
}
