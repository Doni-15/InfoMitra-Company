import React from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { 
    containerVariants, itemVariants, heroDescription, coreValuesData
} from "@/Components";

export const Jelajahi = () => {
    return(
        <Link to="/Pages/galeri-iklan">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-[var(--color-success)] text-white font-bold text-lg rounded-full shadow-[0_10px_20px_-10px_var(--color-success)] hover:shadow-[0_20px_30px_-10px_var(--color-success)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
            >
                <span className="relative z-10">Jelajahi InfoMitra</span>
                <ArrowRightIcon className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
            </motion.div>
        </Link>
    );  
}

export const TentangKami = () => {
    return(
        <Link to="/Pages/tentang-kami">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold text-lg rounded-full hover:bg-white hover:text-[var(--color-utama)] transition-all duration-300 flex items-center justify-center"
            >
                Tentang Kami
            </motion.div>
        </Link>
    );
}

export function HeroSection({beranda}){
    return(
        <motion.section 
            className='min-h-[90vh] flex items-center justify-center text-white relative' 
            style={{ backgroundColor: 'var(--color-utama)' }}
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            exit="hidden"
        >
            <div className='container mx-auto px-6 py-20 text-center z-10'>
                <motion.h1 
                    className="font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-6" 
                    variants={itemVariants} 
                >
                    Promosi Digital yang <br className="hidden md:block"/>
                    <span className="text-yellow-400">
                        Mudah & Terjangkau
                    </span> <br className="hidden md:block"/>
                    untuk UMKM
                </motion.h1> 

                <motion.div 
                    className="text-gray-200 text-base md:text-xl max-w-4xl mx-auto mb-12 leading-relaxed font-light" 
                    variants={itemVariants} 
                >
                    {heroDescription.map((text, index) => (
                        <p key={index} className={index > 0 ? "mt-4" : ""}>
                            {text}
                        </p>
                    ))}
                </motion.div>
                
                <motion.div 
                    variants={itemVariants} 
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
                >
                    <div className="w-64">
                        <Jelajahi />
                    </div>
                    {beranda && (
                        <div className="w-64">
                            <TentangKami />
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
}


export function NilaiNilai(){
    return(
        <motion.section 
            className='py-20 text-[var(--color-custom-text)] bg-netral-abu' 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className='container mx-auto px-6'>
                <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-utama)] mb-4 relative inline-block">
                        Nilai-Nilai Inti InfoMitra
                        <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-20 h-1 bg-[var(--color-primary)] rounded-full"></span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mt-6">
                        Di InfoMitra, kami tidak hanya membangun platform; kami membangun jembatan menuju kesuksesan bagi setiap pelanggan kami.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" 
                    variants={containerVariants}
                >
                    {(coreValuesData || []).map((item) => (
                        <motion.div 
                            key={item.id} 
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 mb-6 bg-[var(--color-base-200)]/30 rounded-full flex items-center justify-center group-hover:bg-[var(--color-base-200)] transition-colors duration-300">
                                <img 
                                    src={item.icon} 
                                    alt={item.title} 
                                    className="w-12 h-12 object-contain drop-shadow-md"
                                />
                            </div>

                            <h3 className={`text-xl font-bold mb-3 ${item.titleClassName || 'text-gray-800'}`}> 
                                {item.title} 
                            </h3>
                            
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}