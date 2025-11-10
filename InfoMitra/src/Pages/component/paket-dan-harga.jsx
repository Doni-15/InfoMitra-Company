import { useState, useCallback, useMemo } from 'react';
import { ScrollToTop, TitlePages, paketHarga, PricingCard, PlanDetails, TampilanAwal} from "@/Components";

export function PaketDanHarga() {
    TitlePages('Paket Dan Harga | ');
    ScrollToTop();

    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const handleSelectPlan = useCallback((id) => {
        setSelectedPlanId(id);
    }, []);
    const selectedPlan = useMemo(
        () => paketHarga.find(p => p.id === selectedPlanId),
        [selectedPlanId]
    );

    return(
        <>
            <h1 className="text-center font-bold text-2xl md:text-3xl px-5 md:px-30 py-5 md:mt-5 lg:mb-5">
                Paket Dan Harga Iklan
            </h1>
            <div className="flex flex-wrap mx-5 md:mx-10 justify-center space-x-5 lg:space-y-0 lg:space-x-10">
                {paketHarga.map((plan) => (
                    <PricingCard
                        key={plan.id}
                        plan={plan}
                        isActive={selectedPlanId === plan.id} 
                        onClick={() => handleSelectPlan(plan.id)} 
                    />
                ))}
            </div>

            <div className="flex flex-wrap mx-5 md:mx-10 justify-center space-y-10 lg:space-y-0 lg:space-x-10 mt-10 mb-16">
                {
                    selectedPlan ? (
                        <PlanDetails plan={selectedPlan} />
                    ) : (
                        <TampilanAwal />
                    )
                }
            </div>
        </>
    );
}