import React from 'react';
import House from '../icons/house';

const Card = () => {
    return (
        <div className="relative py-2 px-4 bg-slate-50 border border-gray-600 w-72 h-32 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
                <House />
                <h2 className="text-gray-500">Card Title</h2>
            </div>


            <p className="pt-2 text-black text-2xl"><strong>Card Data Here</strong></p>

            <p className="absolute bottom-2 text-gray-500">Type: <strong className="text-black">Sample</strong></p>
        </div>
    );
};

export default Card;