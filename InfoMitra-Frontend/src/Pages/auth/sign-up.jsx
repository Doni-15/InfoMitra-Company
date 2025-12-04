import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { InputBox, SideBarAunt } from "@/Components";
import { authService } from "@/services/authService";
import "../../Components/style-global/form-style.css";

export function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama: '',
        email: '',
        password: '',
        confPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!form.nama || !form.email || !form.password) {
            toast.error("Semua data wajib diisi!");
            return;
        }

        if (form.password !== form.confPassword) {
            toast.error("Password dan Konfirmasi Password tidak cocok!");
            return;
        }

        setIsLoading(true);

        try {
            const cleanEmail = form.email.trim();
            await authService.register({
                nama: form.nama,
                email: cleanEmail,
                password: form.password
            });

            toast.success("Registrasi Berhasil! Silakan Login.");
            navigate('/auth/sign-in');

        } catch (err) {
            const msg = err.response?.data?.message || "Gagal Mendaftar. Coba lagi.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen w-full bg-base-400 flex items-center justify-center p-4 md:p-6 font-sans">
            <div className="w-full max-w-6xl bg-netral-putih rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div className="w-full lg:w-5/12 bg-utama text-netral-putih relative flex flex-col justify-center items-center p-8 lg:p-12 overflow-hidden order-last lg:order-first">
                    <div className="absolute top-0 left-0 -mt-10 -ml-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10 w-full">
                        <SideBarAunt
                            title="Sudah Memiliki Akun?"
                            subTitle="Masuk kembali untuk mengakses dashboard anda."
                            buttonText="Sign In"
                            buttonLink="/auth/sign-in"
                            navigate={navigate}
                            tombolKiri={true}
                        />
                    </div>
                </div>

                <div className="w-full lg:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-netral-putih">
                    <div className="mb-6 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-utama mb-2">Buat Akun Baru</h1>
                        <p className="text-neutral/70 text-sm">Lengkapi data diri anda di bawah ini</p>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4' autoComplete="off">
                        
                        <InputBox 
                            id="nama"
                            name="nama"
                            type="text" 
                            placeholder="Contoh: Budi Santoso" 
                            judul="Nama Lengkap"
                            value={form.nama}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        
                        <InputBox 
                            id="email"
                            name="email"
                            type="email" 
                            placeholder="Contoh: usaha@gmail.com" 
                            judul="Email"
                            value={form.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputBox 
                                id="password"
                                name="password"
                                type="password" 
                                placeholder="Buat Password" 
                                judul="Password"
                                value={form.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            
                            <InputBox 
                                id="confPassword"
                                name="confPassword"
                                type="password" 
                                placeholder="Ulangi Password" 
                                judul="Konfirmasi Password"
                                value={form.confPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        
                        <button type="submit" className="hidden" disabled={isLoading} />

                        <div className='mt-6'>
                            <SideBarAunt 
                                buttonText={isLoading ? "Memproses..." : "Sign Up"}
                                tombolKiri={false}
                                onClick={isLoading ? undefined : handleSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}