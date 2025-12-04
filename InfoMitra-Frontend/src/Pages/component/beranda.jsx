import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

import { 
    faqData, ScrollToTop, TitlePages, CaraKerja, HeroSection, NilaiNilai,
    containerVariants, itemVariants
} from "@/Components";

const FaqItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            variants={itemVariants}
            className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[var(--color-utama)] transition-colors duration-300"
        >
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
            >
                <span className={`font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-[var(--color-utama)]' : 'text-gray-800'}`}>
                    {faq.question}
                </span>
                <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                >
                    <IoIosArrowDown size={20} />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {typeof faq.answer === 'object' ? (
                                <>
                                    {faq.answer.part1}
                                    <Link to={faq.answer.linkTo} className="text-blue-600 font-semibold hover:underline mx-1">
                                        {faq.answer.linkText}
                                    </Link>
                                    {faq.answer.part2}
                                </>
                            ) : (
                                faq.answer
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export function Beranda() {
    TitlePages('Beranda | ');
    ScrollToTop();

    return (
        <>
            <HeroSection beranda={true}/>
            <NilaiNilai />
            <CaraKerja pages={false}/>

            <section className="py-20 bg-gray-200">
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-utama)] mb-4 relative inline-block">
                            FAQ InfoMitra
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-yellow-400 rounded-full"></span>
                        </h2>
                        <p className="text-gray-600 mt-6">
                            Pertanyaan yang sering diajukan oleh mitra dan pelanggan kami.
                        </p>
                    </div>
                    
                    <motion.div 
                        className="max-w-3xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {faqData.map((faq) => (
                            <FaqItem key={faq.id} faq={faq} />
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}