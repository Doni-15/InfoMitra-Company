import { useState, useEffect } from "react";
import { testimoniService } from "@/services/testimoniService"; 
import { Star, User, Quote, Loader2 } from "lucide-react";

export function KomentarBox() {
    const [testimonis, setTestimonis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonis = async () => {
            try {
                const data = await testimoniService.getPublic(); 
                setTestimonis(Array.isArray(data) ? data : []); 
            } 
            catch (error) {
                console.error("Gagal memuat testimoni", error);
                setTestimonis([]);
            } 
            finally {
                setLoading(false);
            }
        };
        fetchTestimonis();
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star 
                key={i} 
                size={16} 
                className={`${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-200"}`} 
            />
        ));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-utama)] mb-4 relative inline-block">
                        Apa Kata Mitra Kami?
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-yellow-400 rounded-full"></span>
                    </h2>
                    <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                        Cerita sukses dan pengalaman nyata dari para pengusaha hebat yang telah mempercayakan promosi digital mereka kepada kami.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                        <p className="text-gray-400 animate-pulse">Sedang memuat ulasan...</p>
                    </div>
                ) : (!testimonis || testimonis.length === 0) ? (
                    <div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-12 bg-white rounded-2xl border-2 border-dashed border-gray-200 max-w-md mx-auto"
                    >
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                            <Quote size={24} />
                        </div>
                        <h3 className="text-gray-800 font-bold text-lg mb-2">Belum ada ulasan</h3>
                        <p className="text-gray-500 text-sm">Jadilah mitra pertama yang membagikan pengalaman Anda bersama InfoMitra!</p>
                    </div>
                ) : (
                    <div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {(testimonis || []).map((item) => (
                            <div 
                                key={item.id} 
                                whileHover={{ y: -5 }}
                                className="group bg-white p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-blue-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col relative"
                            >
                                <div className="absolute top-6 right-8 text-gray-100 group-hover:text-blue-50 transition-colors duration-300">
                                    <Quote size={80} className="transform rotate-180" />
                                </div>

                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px] shadow-lg">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xl overflow-hidden">
                                            {item.foto_profil ? (
                                                <img src={item.foto_profil} alt={item.nama} className="w-full h-full object-cover"/>
                                            ) : (
                                                item.nama ? item.nama.charAt(0).toUpperCase() : <User size={24}/>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-base line-clamp-1">{item.nama}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${
                                                item.user_role === 'mitra' 
                                                ? 'bg-blue-50 text-blue-600 border-blue-100' 
                                                : 'bg-gray-50 text-gray-500 border-gray-100'
                                            }`}>
                                                {item.user_role === 'mitra' ? 'Mitra Resmi' : 'Pengguna'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 relative z-10">
                                    <div className="flex gap-1 mb-4">
                                        {renderStars(item.rating)}
                                    </div>
                                    <p className="text-gray-600 text-[15px] leading-relaxed italic">
                                        "{item.isi_text}"
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400 font-medium relative z-10">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span>Terverifikasi pada {formatDate(item.created_at)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}