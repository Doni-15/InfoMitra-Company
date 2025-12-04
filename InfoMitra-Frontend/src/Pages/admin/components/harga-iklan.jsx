import React, { useState, useEffect } from 'react';
import { hargaIklanService } from '../../../services/hargaIklanService';
import { toast } from 'react-hot-toast';
import { Save, Plus, Trash2, Loader2, Tag, Percent, List } from "lucide-react";

export function HargaIklan() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const data = await hargaIklanService.getAllPackages();
            setPackages(Array.isArray(data) ? data : []); 
        } catch (error) {
            toast.error("Gagal memuat data paket.");
            setPackages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index, field, value) => {
        const newPackages = [...packages];
        let finalValue = value;
        
        if (field === 'price') {
            const parsed = parseInt(value);
            finalValue = isNaN(parsed) || parsed < 0 ? 0 : parsed;
        } else if (field === 'label') {
            finalValue = value.toUpperCase();
        }

        newPackages[index] = { 
            ...newPackages[index], 
            [field]: finalValue
        };
        setPackages(newPackages);
    };

    const handleDiscountChange = (pkgIndex, discIndex, value) => {
        const newPackages = [...packages];
        const updatedPkg = { ...newPackages[pkgIndex] };
        const updatedDiscounts = [...(updatedPkg.discounts || [])];
        
        let parsedVal = parseInt(value) || 0;
        if (parsedVal < 0) parsedVal = 0;
        if (parsedVal > 100) parsedVal = 100;

        updatedDiscounts[discIndex] = { 
            ...updatedDiscounts[discIndex], 
            percent: parsedVal
        };
        
        updatedPkg.discounts = updatedDiscounts;
        newPackages[pkgIndex] = updatedPkg;
        setPackages(newPackages);
    };

    const handleFeatureChange = (pkgIndex, featureIndex, value) => {
        const newPackages = [...packages];
        const updatedPkg = { ...newPackages[pkgIndex] };
        const updatedFeatures = [...(updatedPkg.features || [])];
        
        updatedFeatures[featureIndex] = value;
        
        updatedPkg.features = updatedFeatures;
        newPackages[pkgIndex] = updatedPkg;
        setPackages(newPackages);
    };

    const addFeature = (pkgIndex) => {
        const newPackages = [...packages];
        const updatedPkg = { ...newPackages[pkgIndex] };
        const updatedFeatures = [...(updatedPkg.features || [])];
        
        updatedFeatures.push(""); 
        
        updatedPkg.features = updatedFeatures;
        newPackages[pkgIndex] = updatedPkg;
        setPackages(newPackages);
    };

    const removeFeature = (pkgIndex, featureIndex) => {
        const newPackages = [...packages];
        const updatedPkg = { ...newPackages[pkgIndex] };
        const updatedFeatures = [...(updatedPkg.features || [])];
        
        updatedFeatures.splice(featureIndex, 1);
        
        updatedPkg.features = updatedFeatures;
        newPackages[pkgIndex] = updatedPkg;
        setPackages(newPackages);
    };

    const handleSave = async (pkg) => {
        setSavingId(pkg.id);
        
        try {
            const payload = {
                id: pkg.id,
                name: pkg.name,                 
                price: Math.max(0, parseInt(pkg.price) || 0),    
                label: pkg.label,               
                features: (pkg.features || []).filter(f => f.trim() !== ""), 
                discounts: (pkg.discounts || []).map(d => ({                 
                    duration: parseInt(d.duration),
                    percent: Math.max(0, Math.min(100, parseInt(d.percent) || 0))
                }))
            };

            await hargaIklanService.updatePackage(pkg.id, payload);
            
            toast.success(`Paket ${pkg.name} berhasil diperbarui!`);
            await fetchPackages();

        } catch (error) {
            const serverMessage = error.response?.data?.message || "Gagal menyimpan data.";
            toast.error(serverMessage);
        } finally {
            setSavingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--color-text)] flex items-center gap-2">
                    <Tag className="text-blue-500"/> Pengaturan Paket & Harga
                </h1>
                <p className="text-gray-400 text-sm mt-1">Kelola harga dan fitur untuk setiap paket iklan.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10">
                {(packages || []).map((pkg, index) => (
                    <div 
                        key={pkg.id || index} 
                        className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 left-0 w-full h-1 ${pkg.label === 'VIP' || pkg.label === 'POPULER' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}></div>

                        <div className="flex justify-between items-start mb-6 border-b border-slate-700/50 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    {pkg.name}
                                    {pkg.label && (
                                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                                            {pkg.label}
                                        </span>
                                    )}
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">ID: {pkg.id}</p>
                            </div>
                            <div className="bg-slate-800 p-2 rounded-lg">
                                <span className="text-emerald-400 font-mono font-bold">
                                    Rp {parseInt(pkg.price || 0).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Nama Paket</label>
                                    <input
                                        type="text"
                                        value={pkg.name || ""} 
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Harga Dasar</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={pkg.price || ""} 
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                        className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Badge Label</label>
                                    <input
                                        type="text"
                                        value={pkg.label || ''} 
                                        placeholder="Contoh: Pupuler"
                                        onChange={(e) => handleChange(index, 'label', e.target.value)}
                                        className="w-full bg-[#0f172a] border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#0f172a]/50 rounded-xl p-4 border border-slate-700/50">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                        <List size={14}/> Fitur Paket
                                    </label>
                                    <button
                                        onClick={() => addFeature(index)}
                                        className="text-xs bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-2 py-1 rounded transition-all flex items-center gap-1"
                                    >
                                        <Plus size={12}/> Tambah
                                    </button>
                                </div>
                                
                                <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                                    {(pkg.features || []).map((feature, fIndex) => (
                                        <div key={fIndex} className="flex gap-2 items-center">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                                            <input
                                                type="text"
                                                value={feature || ""}
                                                onChange={(e) => handleFeatureChange(index, fIndex, e.target.value)}
                                                className="flex-1 bg-transparent border-b border-slate-700 focus:border-blue-500 px-1 py-1 text-sm text-slate-300 focus:text-white outline-none"
                                                placeholder="Deskripsi fitur..."
                                            />
                                            <button
                                                onClick={() => removeFeature(index, fIndex)}
                                                className="text-slate-600 hover:text-red-400 transition-colors p-1"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {(!pkg.features || pkg.features.length === 0) && (
                                        <p className="text-center text-xs text-slate-600 italic py-2">Belum ada fitur</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Percent size={14}/> Diskon Durasi (0 - 100%)
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {(pkg.discounts || []).map((disc, dIndex) => (
                                        <div key={dIndex} className="bg-[#0f172a] border border-slate-700 rounded-lg p-2 text-center">
                                            <span className="text-[10px] text-slate-500 block mb-1">{disc.duration} Bulan</span>
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={disc.percent || ""}
                                                    onChange={(e) => handleDiscountChange(index, dIndex, e.target.value)}
                                                    className="w-full bg-transparent text-center font-bold text-emerald-400 outline-none text-sm"
                                                />
                                                <span className="text-[10px] text-slate-500">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handleSave(pkg)}
                                disabled={savingId === pkg.id}
                                className={`
                                    w-full py-3 rounded-xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95
                                    ${pkg.label === 'POPULER' || pkg.label === 'VIP'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-900/20'
                                        : 'bg-slate-700 hover:bg-slate-600 text-white shadow-slate-900/20'
                                    }
                                    ${savingId === pkg.id ? 'opacity-70 cursor-wait' : ''}
                                `}
                            >
                                {savingId === pkg.id ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <Save size={18} />
                                )}
                                {savingId === pkg.id ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                ))}

                {(!packages || packages.length === 0) && !loading && (
                    <div className="col-span-full text-center py-20 text-slate-500">
                        <p>Tidak ada data paket ditemukan.</p>
                    </div>
                )}
            </div>
        </div>
    );
}