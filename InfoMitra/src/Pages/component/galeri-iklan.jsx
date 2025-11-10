import { sebelum, sesudah } from "@/assets/logo";

import { 
    BrosurVip, BrosurKecil, KomentarBox,
    ScrollToTop, TitlePages
} from "@/Components";

export function GaleriIklan() {
    TitlePages('');
    ScrollToTop();

    return (
        <>
            {/* Main kontent */}
            <div className="main_brosur overflow-x-hidden" id="main_brosur">
                <BrosurVip />
                
                <div className="klik" id="klik">
                    <img src={sebelum} alt="sebelum" id="sebelum"/>
                    <img src={sesudah} alt="sesudah" id="sesudah"/>
                </div>
            </div>
            {/* Akhir Main Kontent */}

            {/* Brosur kecil */}
            <div className="daftar_brosur" id="daftar_brosur">
                <BrosurKecil />
            </div>
            {/* Akhir Brosur kecil */}

            {/* Komentar Pengguna */}
            <div className="komentar_brosur" id="komentar_brosur">
                <KomentarBox />
            </div>
            {/* Akhir Komentar Pengguna */}
        </>
    );
}