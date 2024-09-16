import React from 'react';
import House from '../icons/house';



const Navbar = () => {
    return (

        <div className="bg-stone-200 h-20 flex items-center justify-center space-x-8">

            <button className="bg-gray-100 round rounded-lg p-2 border border-gray-600 text-black">ADD INCOME</button>
            <button className="bg-gray-100 round rounded-lg p-2 border border-gray-600 text-black">ADD EXPENSE</button>

        </div>
    );
};

export default Navbar;