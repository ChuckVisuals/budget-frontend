import React from 'react';
import House from '../icons/house';
import Icon from '../icons/info';

// Define the interface for the props
interface WideCardProps {
    totalIncome: number;
    totalExpense: number;
}

const wideCard: React.FC<WideCardProps> = ({ totalIncome, totalExpense }) => {

    const mockData = [
        { name: 'Total Income', data: `$${totalIncome}` },
        { name: 'Total Expense', data: `$${totalExpense}` },
        { name: 'DUmmy', data: '10% - 220%' },
        { name: 'DUmmy2', data: '10% - 220%' },

    ];

    return (
        <div className="relative py-2 px-4 bg-slate-50 border border-gray-200 w-[896px] h-48 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
                <House />
                <h2 className="text-gray-500">Budget Summary</h2>
            </div>

            <hr className="mt-4" />

            <div className="space-x-8 flex items-center justify-center mt-8">
                {mockData.map((item, index) => (
                    <div key={index} className={`pl-4 ${index !== 0 ? 'border-l border-gray-300' : ''}`}>
                        <div className="flex item-center space-x-4 justify-center">
                            <h2 className="text-gray-500">{item.name}</h2>
                            <div className="mb-0">
                                <Icon />
                            </div>

                        </div>


                        <p className="pt-2 text-black text-2xl"><strong>{item.data}</strong></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default wideCard;