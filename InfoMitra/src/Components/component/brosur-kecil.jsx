import { BROSURRYA } from "../../assets/brosurKecil";

export function BrosurKecil(){

     const brosurList = [
    { id: 1, gambar: BROSURRYA},
    { id: 2, gambar: BROSURRYA },
    { id: 3, gambar: BROSURRYA },
  ];
    return (
        <>
            <div className="judul_daftar font-bold" id="judul_daftar">Daftar Brosur</div> 
            <div className="semua_brosur" id="semua_brosur">
                 {brosurList.map((brosur) => (
          <div
            key={brosur.id}
            className="bg-amber-200 border-3 mt-20"
          >
            <img
              src={brosur.gambar}
              alt={`Brosur ${brosur.id}`}
              className="w-150 "
            />
          </div>
        ))}
            </div>
        </>
    );
}

