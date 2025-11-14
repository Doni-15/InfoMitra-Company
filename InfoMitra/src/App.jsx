import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header, MainLayout, Footer, KosWanitaAzka } from '@/Components';

import { 
  GaleriIklan, Beranda, PaketDanHarga,
  KebijakanPrivasi, SyaratDanKetentuan, CaraKerja, TentangKami
} from '@/Pages';

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/Pages" element={<MainLayout replace />}>
            {/* Untuk header */}
            <Route path="galeri-iklan" element={<GaleriIklan />} />
            <Route path="beranda" element={<Beranda/>}/>
            <Route path="cara-kerja" element={<CaraKerja pages={true}/>}/>
            <Route path="paket-dan-harga" element={<PaketDanHarga />} />
            <Route path="tentang-kami" element={<TentangKami />} />
            {/* Untuk header */}

            {/* Untuk footer */}
            <Route path="kebijakan-privasi" element={<KebijakanPrivasi/>}/>
            <Route path="syarat-dan-ketentuan" element={<SyaratDanKetentuan/>}/>
            {/* Untuk footer */}
            
            <Route index element={<Navigate to="/Pages/galeri-iklan"/>} />
          </Route>

          <Route path="/" element={<Navigate to="/Pages/galeri-iklan" replace />} />
          <Route path="*" element={<Navigate to="/Pages/galeri-iklan" replace />} />

          <Route path="/Pages/kos-azka" element={<KosWanitaAzka />} />
        </Routes>

        <Footer />
      </Router>
    </>
  )
}

export default App
