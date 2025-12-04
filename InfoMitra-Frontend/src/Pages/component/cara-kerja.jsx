import { motion } from 'framer-motion';

import { 
    containerVariants, itemVariants, caraKerjaData,
    ScrollToTop, TitlePages
} from "@/Components";


export function CaraKerja({pages}) {
    if (pages) {
        ScrollToTop();
        TitlePages('Cara Kerja | ');
    }

    const paddingBottom = pages ? "pb-20 mt-10" : "pb-10";

    return (
        <motion.section 
            className={`min-h-screen flex items-center justify-center bg-white text-gray-800 ${paddingBottom}`} 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className='container mx-auto px-6 py-10'>
                <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={itemVariants}>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-utama)] mb-4 relative inline-block">
                        Cara Kerja InfoMitra
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-yellow-400 rounded-full"></span>
                    </h2>
                    <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                        InfoMitra bekerja dengan proses yang terstruktur untuk memastikan setiap proyek promosi digital berjalan efektif dan sesuai kebutuhan Anda.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 px-2" 
                    variants={containerVariants}
                >
                    {(caraKerjaData || []).map((item, index) => (
                        <motion.div 
                            key={item.id || index} 
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="relative rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group bg-blue-100"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[var(--color-utama)] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md border-4 border-white group-hover:bg-yellow-400 group-hover:text-[var(--color-utama)] transition-colors duration-300">
                                {index + 1}
                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-utama)] transition-colors">
                                    {item.section}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {item.penjelasan}
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-utama)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </motion.section>
    );
}