import { Link, useNavigate } from 'react-router-dom';
import { logoSrc } from "@/assets/logo";
import { UserIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export function MobileMenu({ isOpen, toggleMenu, closeAll, navLinks }) {
    return (
        <div className="lg:hidden relative">
            <button 
                onClick={toggleMenu} 
                className="p-2 text-[var(--color-utama)] hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <XMarkIcon className="size-8" />
                ) : (
                    <Bars3Icon className="size-8" />
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={closeAll}></div>
                    
                    <div className="absolute top-12 right-0 w-64 bg-white z-50 shadow-2xl rounded-2xl border border-gray-100 overflow-hidden transform origin-top-right transition-all duration-200">
                        <ul className="flex flex-col py-2">
                            {(navLinks || []).map((link, index) => (
                                <li key={index} className="border-b border-gray-50 last:border-none">
                                    <Link 
                                        to={link.to} 
                                        onClick={closeAll}
                                        className="block px-6 py-3 text-[var(--color-custom-text)] font-medium hover:bg-[var(--color-base-100)] hover:text-[var(--color-utama)] transition-colors"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

export function LogoUsaha() {
    return (
        <div className="flex items-center">
            <Link to="/" className="cursor-pointer ml-0 lg:ml-5 transition-transform hover:scale-105 active:scale-95">
                <img 
                    src={logoSrc} 
                    alt="Logo Bisnis" 
                    className="h-[45px] md:h-[50px] object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            </Link>
        </div>
    );
}

export function LaptopNavigasi({ navLinks }) {
    return (
        <nav className="hidden lg:flex">
            <ul className="flex flex-row justify-center space-x-8">
                {(navLinks || []).map((link, index) => (
                    <li key={index}>
                        <Link 
                            to={link.to}
                            className="relative font-medium text-[var(--color-netral-putih)] hover:text-white transition-colors duration-300 group py-2 text-xl"
                        >
                            {link.text}
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
  
export function LogIn() {
    return(
        <div className='flex items-center gap-3 mr-4 lg:mr-8'>
            <Link to={'/auth/sign-in'}>
                <button className='px-5 py-2 rounded-full text-sm font-semibold text-white bg-[var(--color-utama)] border border-[var(--color-utama)] hover:bg-white hover:text-[var(--color-utama)] transition-all duration-300 shadow-md hover:shadow-lg'>
                    Sign In
                </button>
            </Link>
            <Link to={'/auth/sign-up'}>
                <button className='hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-[var(--color-utama)] bg-white border border-white hover:bg-gray-100 transition-all duration-300 shadow-sm'>
                    Sign Up
                </button>
            </Link>
        </div>
    );
}

export function UserProfile({ user, onLogout, isOpen, toggle }) {
    const navigate = useNavigate();

    return (
        <div className="relative mr-4 lg:mr-8 select-none" style={{ zIndex: 9999 }}>
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-transparent h-screen w-screen" 
                    onClick={toggle}
                ></div>
            )}

            <div className={`
                absolute right-0 top-20 w-72 rounded-2xl bg-white 
                border border-gray-100
                shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] 

                transform transition-all duration-200 ease-out origin-top-right
                ${isOpen 
                    ? "opacity-100 scale-100 translate-y-0 visible" 
                    : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
                }
            `} style={{ zIndex: 9999 }}>

                <div className="px-6 py-5 border-b border-gray-100 bg-[var(--color-base-100)]/30 rounded-t-2xl">
                    <h1 className="text-left text-lg font-bold text-[var(--color-utama)] truncate">
                        {user?.nama || "Pengguna"}
                    </h1>
                    <p className="text-left text-sm text-gray-500 truncate mb-2">
                        {user?.email || "email@contoh.com"}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wide">
                        {user?.role || 'Member'}
                    </span>
                </div>

                {/* Menu Items */}
                <div className="p-2 bg-white rounded-b-2xl">
                    <button 
                        onClick={() => { toggle(); navigate("/mitra/user-profil"); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors group"
                    >
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <UserIcon className="size-5"/>
                        </div>
                        <span className="font-semibold text-sm">Profil Saya</span>
                    </button>

                    <button 
                        onClick={() => { toggle(); onLogout(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors group mt-1"
                    >
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                            <ArrowRightOnRectangleIcon className="size-5"/>
                        </div>
                        <span className="font-semibold text-sm">Keluar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}