import { useEffect, useState } from "react";
import { brosurService } from "@/services/brosurService"; 
import { SearchingBrosur } from "@/Components"; 

export function BrosurKecil(){
    const [brosurList, setBrosurList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await brosurService.getGrid();
                const safeData = Array.isArray(data) ? data : [];
                setBrosurList(safeData);
                setFilteredData(safeData);
            } catch (error) {
                console.error("Gagal memuat brosur:", error);
                setBrosurList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (!searchTerm) {
                setFilteredData(brosurList);
            } else {
                const lowerTerm = searchTerm.toLowerCase();
                const results = (brosurList || []).filter(item => 
                    (item?.nama_mitra && item.nama_mitra.toLowerCase().includes(lowerTerm)) ||
                    (item?.kategori && item.kategori.toLowerCase().includes(lowerTerm))
                );
                setFilteredData(results);
            }
        }, 500);
        
        return () => clearTimeout(delayDebounce);

    }, [searchTerm, brosurList]);

    if (loading) {
        return (
            <div className="w-full h-96 flex flex-col items-center justify-center gap-4">
                <div className="loading loading-spinner loading-lg text-[var(--color-utama)]"></div>
                <p className="text-gray-500 animate-pulse">Memuat Galeri Brosur...</p>
            </div>
        );
    }

    return (
        <section className="w-full px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-4">
                <div className="w-full md:w-auto">
                    <h1 className="font-bold text-3xl text-[var(--color-utama)] mb-1">Daftar Brosur</h1>
                    <p className="text-[var(--color-custom-text)] text-sm opacity-80">
                        Temukan penawaran terbaik dari mitra kami
                    </p>
                </div>
                <div className="w-full md:w-auto">
                    <SearchingBrosur value={searchTerm} onChange={setSearchTerm} />
                </div>
            </div>

            {(!filteredData || filteredData.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-20 bg-base-100/20 rounded-3xl border-2 border-dashed border-[var(--color-netral-abu)] opacity-70">
                    <div className="text-6xl mb-4">📂</div>
                    <p className="text-custom-text font-medium text-lg">Brosur tidak ditemukan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                    {(filteredData || []).map((brosur, index) => (
                        <div
                            key={brosur.id || index}
                            onClick={() => window.open(brosur.link_tujuan || "#", "_blank")}
                            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer border border-transparent hover:border-[var(--color-base-300)]"
                        >
                            <div className="aspect-[3/4] w-full relative bg-gray-100 overflow-hidden">
                                <img
                                    src={brosur.gambar_url}
                                    alt={`Brosur ${brosur.nama_mitra || 'Mitra'}`}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.style.display = 'none';
                                        e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-200');
                                        e.target.parentElement.innerHTML = '<span class="text-xs text-gray-500">Gambar Tidak Tersedia</span>';
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-utama)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        {brosur.nama_mitra || "Lihat Detail"}
                                    </span>
                                    <span className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                        Klik untuk mengunjungi
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}