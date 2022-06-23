import React from 'react';
import { IButtons } from '../models/others';

const Button: React.FC<IButtons> = ({ name, event }) => {
    return (
        <div>
            <button
                onClick={event}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-md mx-2 border-none outline-none transition-all hover:bg-black "
            >
                {name}
            </button>
        </div>
    );
};

export default Button;