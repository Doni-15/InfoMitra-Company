import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';

import { LogoUsaha, LaptopNavigasi, MobileMenu, LogIn, UserProfile } from '@/Components';

const navLinks = [
    { to: '/Pages/beranda', text: 'Beranda' },
    { to: '/Pages/galeri-iklan', text: 'Galeri Iklan' },
    { to: '/Pages/paket-dan-harga', text: 'Paket Iklan' },
    { to: '/Pages/cara-kerja', text: 'Cara Kerja' },
];

export function Header({ user, setUser }) {
    const navigate = useNavigate();
    const initial = user?.nama ? user.nama.charAt(0).toUpperCase() : "U";
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsProfileDropdownOpen(false);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
        setIsMobileMenuOpen(false);
    };

    const closeAllDropdowns = () => {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
    };

    const handleLogout = () => {
        authService.logout(); 
        setUser(null);
        closeAllDropdowns();
        navigate('/Pages/galeri-iklan');
        toast.success('LogOut berhasil!');
    };

    return (
        <>
            <header className="fixed justify-between flex flex-row items-center w-full py-[10px] shadow-lg border-b border-[var(--color-base-300)] z-100 bg-[#1e2a4a]">
                <LogoUsaha />

                <div className="flex flex-row items-center space-x-4 lg:space-x-9">
                    <LaptopNavigasi navLinks={navLinks} />
                    
                    <MobileMenu 
                        isOpen={isMobileMenuOpen} 
                        toggleMenu={toggleMobileMenu} 
                        closeAll={closeAllDropdowns} 
                        navLinks={navLinks}
                    />
                </div>

                {user ? (
                    <div onClick={toggleProfileDropdown} className="cursor-pointer group relative z-50 mr-10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-utama)] to-[var(--color-primary)] border-2 border-white flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 ml-auto">
                            {initial}
                        </div>
                    </div>
                ) : (
                    <LogIn />
                )}
            </header>

            {user ? (
                <UserProfile 
                    user={user} 
                    isOpen={isProfileDropdownOpen}
                    toggle={toggleProfileDropdown}
                    onLogout={handleLogout} 
                />
            ) : (
                <LogIn />
            )}
        </>
    );
}