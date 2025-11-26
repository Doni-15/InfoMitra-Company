import { useNavigate } from "react-router-dom";
import { InputBox } from "@/Components";
import "../../Components/style-global/form-style.css";

export function ForgotPassword() {
    const navigate = useNavigate();

    return (
        <section className="w-screen h-screen bg-[var(--color-base-400)] flex items-center justify-center">
            <div className="w-1/3 rounded-3xl p-10 bg-[var(--warna-netral-abu)] shadow-xl">
                
                <h1 className="text-4xl font-bold tracking-wider mb-8 text-center">
                    Reset Password
                </h1>

                <p className="text-lg text-gray-700 mb-5 text-center">
                    Masukkan email yang terdaftar. Kami akan mengirim link reset password.
                </p>

                <form className="flex flex-col gap-5">
                    <InputBox type="email" placeholder="Email terdaftar" />
                </form>

                <button 
                    className="bg-[var(--color-base-100)] hover:bg-[var(--color-base-400)] py-2 px-16 text-xl font-semibold rounded-lg mx-auto block mt-8 transition text-[var(--warna-netral-abu)]"
                >
                    Kirim Link Reset
                </button>

                <h1 
                    onClick={() => navigate('/auntifikasi/sign-in')}
                    className="text-center text-lg mt-6 text-[var(--color-base-300)] hover:text-[var(--color-base-200)] hover:underline cursor-pointer"
                >
                    Kembali ke Login
                </h1>
            </div>
        </section>
    );
}
