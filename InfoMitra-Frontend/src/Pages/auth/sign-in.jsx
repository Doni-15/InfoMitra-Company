import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { InputBox, SideBarAunt } from "@/Components";
import { authService } from "@/services/authService"; 

export function SignIn({ setUser }){
    const navigate = useNavigate();  

    const [form, setForm] = useState({
        email : "",
        password : "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        if(error) setError("");
    };

    const handleSubmit = async (e) => {
        if(e) e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            const msg = "Email dan Password wajib diisi!";
            setError(msg);
            toast.error(msg);
            return;
        }

        setIsLoading(true);

        try {
            const cleanEmail = form.email.trim();
            const response = await authService.login(cleanEmail, form.password);
            const loggedInUser = response.user; 

            if(setUser){ 
                setUser(loggedInUser);
            }

            if (loggedInUser.role && loggedInUser.role.toLowerCase() === 'admin') {
                setTimeout(() => {
                    navigate("/admin", { replace: true }); 
                }, 100);
            }
            else {
                toast.success(`Login Berhasil! \nHalo ${loggedInUser.nama}`);

                setTimeout(() => {
                    navigate("/Pages/galeri-iklan", { replace: true });
                }, 100);
            }
        } 
        catch (err) {
            const msg = err.response?.data?.message || "Gagal Login. Periksa Email/Password.";
            setError(msg);
            toast.error(msg);
        }
        finally {
            setIsLoading(false);
        }
    }

    return(
        <section className="min-h-screen w-full bg-base-400 flex items-center justify-center p-4 md:p-6 font-sans">
            <div className="w-full max-w-5xl bg-netral-putih rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold text-utama mb-2">
                            Selamat Datang
                        </h1>
                        <p className="text-neutral/70">
                            Silakan masuk untuk melanjutkan
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <InputBox
                            id="email"
                            name="email"
                            type="email"
                            placeholder="contoh: usaha@gmail.com"
                            judul="Email"
                            value={form.email}
                            autoComplete="username"
                            onChange={handleChange}
                            disabled={isLoading}
                        />

                        <InputBox
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Masukkan Password"
                            judul="Password"
                            value={form.password}
                            autoComplete="current-password"
                            onChange={handleChange}
                            disabled={isLoading}
                        />

                        <button type="submit" className="hidden" disabled={isLoading} />

                        {error && (
                            <div 
                                role="alert"
                                className="flex flex-col text-sm bg-error/10 border border-error text-error px-4 py-3 rounded-xl animate-pulse"
                            >
                                <strong className="font-bold">Terjadi Kesalahan!</strong>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="mt-4">
                            <SideBarAunt 
                                buttonText={isLoading ? "Memproses..." : "Sign In"}
                                tombolKiri={false}
                                onClick={isLoading ? undefined : handleSubmit}
                            />

                            <div
                                onClick={() => navigate("/Pages/galeri-iklan")}
                                className='text-right mt-1 text-base-300 hover:text-base-200 hover:underline cursor-pointer'>
                                Masuk sebagai tamu?
                            </div>
                        </div>
                    </form>
                </div>

                <div className="w-full lg:w-1/2 bg-utama text-netral-putih relative flex flex-col justify-center items-center p-12 overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 text-center w-full">
                        <SideBarAunt
                            title="Belum Memiliki Akun?"
                            subTitle="Daftarkan diri anda sekarang untuk mulai mengakses fitur kami."
                            buttonText="Sign Up"
                            buttonLink="/auth/sign-up"
                            navigate={navigate}
                            tombolKiri={true}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}