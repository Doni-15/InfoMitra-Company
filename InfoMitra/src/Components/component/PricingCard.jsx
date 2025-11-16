import { memo } from 'react';
import clsx from 'clsx';

function PricingCardComponent({ plan, isActive, onClick }) {
    const isVip = plan.id === 'vip';
    const defaultClasses =
        'cursor-pointer text-justify rounded-lg lg:w-[375px] p-2 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.5)] w-[40vw] border-2';

    const cardClasses = clsx(defaultClasses, 'transition-all duration-200', {
        'bg-[#0A2A4E] hover:bg-[#194274] text-[#dfdfdf] border-[#0A2A4E]': isVip,
        'bg-white hover:bg-[#cccccc] border-[#0A2A4E]': !isVip,
        'ring-4 ring-blue-500 ring-offset-2': isActive,
    });

    return (
        <button className={cardClasses} onClick={onClick}>
            <h1 className="text-center font-bold md:text-xl text-lg">{plan.judul}</h1>
            <h1 className="text-center font-bold md:text-lg text-base mb-3">{plan.harga}</h1>
            <ul className="text-base md:text-lg list-disc ml-5"> </ul>
        </button>
    );
}

export const PricingCard = memo(PricingCardComponent);