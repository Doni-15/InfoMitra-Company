import { anonimusIcon, signUpIcon, logInIcon } from "@/assets/logo";
import { Link } from 'react-router-dom';

export function ProfilTamu({isProfileDropdownOpen, closeAllDropdowns }){
    return(
        <>
            {isProfileDropdownOpen && (
                <div className="bg-[#0A2A4E] fixed w-[300px] flex-col items-center lg:w-2/5 h-72 top-[55px] lg:top-18 right-0 mr-2 shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-left rounded-lg p-3 z-50">
                    <h1 className="mb-5 font-semibold text-center">Login Sebagai Tamu</h1>
                    <section className="bg-white rounded-full size-20 object-contain overflow-hidden flex justify-center items-center p-1 border-2 mx-auto">
                        <img src={anonimusIcon} alt="Gambar Pengguna" />
                    </section>
                    <h1 className="mt-2 font-semibold text-2xl text-center">
                        Hallo, Selamat Datang
                    </h1>
                    <section className="text-center py-0 mt-2 text-xl flex justify-center">
                        <Link to="/daftar" onClick={closeAllDropdowns}>
                            <div className="px-10 py-1 bg-green-500 rounded-l-full ml-0 border-2 border-green-500 hover:bg-green-600 flex items-center">
                                <img src={signUpIcon} alt="Sign Up" className="h-7 mr-2" /> Daftar
                            </div>
                        </Link>
                        <Link to="/login" onClick={closeAllDropdowns}>
                            <div className="px-10 py-1 rounded-r-full ml-0 border-2 border-white hover:bg-gray-400 flex items-center">
                                <img src={logInIcon} alt="Sign In" className="h-5 mr-2" /> Masuk
                            </div>
                        </Link>
                    </section>
                </div>
            )}
        </>
    );
}