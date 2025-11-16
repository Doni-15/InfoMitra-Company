import { brosurKecilList } from "../data/data-brosur-kecil";

export function BrosurKecil(){
    return (
        <>
            <div className="judul_daftar font-bold" id="judul_daftar">Daftar Brosur</div> 
            <div className="grid my-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mx-17">
                {brosurKecilList.map((brosur) => (
                    <div key={brosur.id} className="bg-amber-200 border-3">
                        <img src={brosur.gambar} alt={`Brosur ${brosur.id}`}/>
                    </div>
                ))}
            </div>
        </>
    );
}