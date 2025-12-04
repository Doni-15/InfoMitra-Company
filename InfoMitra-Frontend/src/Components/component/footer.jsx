import { Link } from 'react-router-dom';
import { footerLink1, footerLink2, contactInfo } from "@/Components";
import { logoUsu, logoFasilkom, logoBisnis } from "@/assets/logo";

export function Footer() {
    const handleLogoClick = () => {
        location.reload();
    };

  return (
    <footer className="bg-[var(--color-utama)] text-white pt-16 pb-8 border-t-4 border-yellow-400 font-sans">
        <div className="container mx-auto px-6 lg:px-12">
            
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 mb-12 border-b border-white/10 pb-12">
                <div className="flex flex-col items-center lg:items-start w-full lg:w-1/3">
                    <div className='text-utama'>o</div>
                    <img 
                        src={logoBisnis} 
                        alt="Logo Bisnis" 
                        onClick={handleLogoClick} 
                        className="h-16 md:h-20 w-auto object-contain cursor-pointer p-2 rounded-lg"
                    />
                </div>

                <div className="flex flex-col items-center lg:items-end w-full lg:w-2/3">
                    <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
                        Didukung Oleh
                    </span>
                    <div className="flex flex-wrap justify-center lg:justify-end gap-6">
                        <a href="https://www.usu.ac.id/id" target="_blank" rel="noopener noreferrer">
                            <img src={logoUsu} alt="Logo USU" className="h-12 md:h-14 w-auto object-contain hover:opacity-90 transition-opacity"/>
                        </a>
                        <div className="h-12 w-[1px] bg-white/20 hidden sm:block"></div>
                        <a href="https://fasilkom-ti.usu.ac.id/id" target="_blank" rel="noopener noreferrer">
                            <img src={logoFasilkom} alt="Fasilkom-TI" className="h-12 md:h-14 w-auto object-contain hover:opacity-90 transition-opacity"/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div className="flex flex-col space-y-3 items-center md:items-start">
                    <h3 className="font-bold text-lg mb-2 text-yellow-400">Jelajahi</h3>
                    {footerLink1.map((link) => (
                        <Link key={link.text} to={link.to} className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                            {link.text}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-col space-y-3 items-center md:items-start">
                    <h3 className="font-bold text-lg mb-2 text-yellow-400">Layanan</h3>
                    {footerLink2.map((link) => (
                        <Link key={link.text} to={link.to} className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                            {link.text}
                        </Link>
                    ))}
                </div>

                <div className="md:col-span-2 lg:col-span-2 flex flex-col space-y-4 items-center md:items-start">
                    <h3 className="font-bold text-lg mb-2 text-yellow-400">Hubungi Kami</h3>
                    {contactInfo.map((item) => (
                        <div key={item.text} className="flex items-start gap-3">
                            {item.icon && (
                                <img src={item.icon} alt={item.alt} className="w-5 h-5 mt-0.5" />
                            )}
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                                {item.text}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} InfoMitra. All rights reserved.
                </p>
                <div className="px-4 py-1 bg-white/5 rounded-full border border-white/10">
                    <p className="text-xs text-gray-400 font-mono tracking-wide">
                        NIB: 1909250087476
                    </p>
                </div>
            </div>

        </div>
    </footer>
  );
}