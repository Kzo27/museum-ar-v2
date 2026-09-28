import React, { useEffect, useRef, useState, useCallback } from 'react';
import '@google/model-viewer';

// --- DATA ARTEFAK MUSEUM ---
const ARTIFACT_DATA = {
  Bendi: {
    title: "Bendi",
    modelSrc: "https://assets.olicyclestove.my.id/Bendi.glb",
    audioSrc: "/assets/sound/Bendi.m4a",
    historyTitle: "BENDI",
    historyText: "Bendi merupakan salah satu alat transportasi tradisional yang digunakan untuk mengangkut orang di Gorontalo. Keberadaan bendi di Gorontalo telah tercatat setidaknya sejak akhir abad ke-19 berdasarkan Laporan Baron Van Hoevell tahun 1899, sementara arsip foto tertua bendi di Gorontalo berasal dari tahun 1910, yang memperlihatkan bendi di depan Gedung W.B. Ledeboer & Co. Pada masa sebelum kemerdekaan, bendi digunakan sebagai sarana transportasi bagi orang Eropa, bangsawan, serta pejabat pemerintahan seperti Jogugu dan Marsaoleh. Setelah kemerdekaan, penggunaannya semakin meluas dan pada periode 1950-an hingga 1990-an, bendi berkembang menjadi salah satu moda transportasi umum utama di Gorontalo.",
    scale: "1 1 1"
  },
  Roda_Wanggubu: {
    title: "Roda Wanggubu",
    modelSrc: "https://assets.olicyclestove.my.id/Roda_Wanggubu.glb",
    audioSrc: "/assets/sound/Roda_Wanggubu.m4a",
    historyTitle: "Roda Wanggubu",
    historyText: "Roda Wanggubu adalah alat transportasi tradisional masyarakat Gorontalo terbuat dari kombinasi bahan kayu, besi, bambu dan daun rumbia, dengan ciri khas alat transportasi ini yaitu memiliki Wanggubu yaitu atap pelindung. Transportasi ini diperkirakan telah ada sejak abad ke 16 Masehi. Roda Wanggubu difungsikan untuk mengangkut hasil panen yang rentan rusak apabila terkena paparan hujan secara langsung seperti Kopra, Kopi, Nila, dan Kapas.",
    scale: "1.5 1.5 1.5"
  },
  Roda: {
    title: "Roda",
    modelSrc: "https://assets.olicyclestove.my.id/Roda.glb",
    audioSrc: "/assets/sound/Roda.m4a",
    historyTitle: "Sejarah Ketiga Kuda",
    historyText: "Roda merupakan alat transportasi tradisional masyarakat Gorontalo yang diperkirakan telah digunakan sejak abad ke-16 Masehi. Secara bentuk dan konstruksi, Roda memiliki kemiripan dengan Roda Wanggubu, namun tidak dilengkapi dengan wanggubu atau atap pelindung. Alat transportasi ini dibuat dari perpaduan kayu, besi, dan bambu serta digunakan untuk mengangkut berbagai barang dalam jarak relatif dekat, terutama material yang tidak mudah rusak apabila terkena air, seperti rotan, bambu, damar, dan hasil alam lainnya. Selain digunakan dalam aktivitas pengangkutan masyarakat, Roda juga dimanfaatkan sebagai alat angkut di kawasan pelabuhan, khususnya untuk mendukung kegiatan bongkar muat barang dari dan ke kapal.",
    scale: "1 1 1"
  },
  Goroba: {
    title: "Goroba",
    modelSrc: "https://assets.olicyclestove.my.id/Goroba.glb",
    audioSrc: "/assets/sound/Goroba.m4a",
    historyTitle: "Goroba",
    historyText: "Goroba merupakan alat transportasi tradisional masyarakat Gorontalo yang digunakan untuk mengangkut beras, hasil pertanian, dan berbagai barang. Umumnya ditarik menggunakan kuda, sehingga memiliki mobilitas lebih tinggi dibandingkan Roda. Sekitar 1960–1970-an, Goroba mulai menggunakan ban bekas kendaraan bermotor sebagai roda, menunjukkan adanya penyesuaian teknologi tradisional terhadap perkembangan zaman. Bukti penggunaannya terlihat dalam foto tahun 1981 di Jembatan Taludaa yang memperlihatkan dua orang remaja mengendarai Goroba.",
    scale: "1 1 1"
  },
  Bendera: {
    title: "Bendera Merah Putih 23 Januari 1942",
    modelSrc: "https://assets.olicyclestove.my.id/Bendera.glb",
    audioSrc: "/assets/sound/Bendera.m4a",
    historyTitle: "Bendera 23 Januari 1942",
    historyText: "Bendera Merah Putih ini digunakan dalam upacara pengibaran di alun-alun Kota Gorontalo pada 23 Januari 1942, yang kini dikenal sebagai Lapangan Taruna Remaja. Menjelang pukul 10.00 pagi, sekitar lima jam setelah operasi penangkapan terhadap pejabat kolonial dilakukan, masyarakat berkumpul menyaksikan pengibaran Bendera Merah Putih dan menyanyikan lagu Indonesia Raya. Peristiwa tersebut menjadi bagian penting dari Peristiwa Patriotik 23 Januari 1942, yang menandai perjuangan rakyat Gorontalo dalam melepaskan diri dari pemerintahan kolonial Belanda.",
    scale: "0.8 0.8 0.8" 
  },
  Bulotu: {
    title: "Bulotu",
    modelSrc: "https://assets.olicyclestove.my.id/Bulotu.glb",
    audioSrc: "/assets/sound/Bulotu.m4a",
    historyTitle: "Bulotu",
    historyText: "Bulotu merupakan alat transportasi air tradisional masyarakat Gorontalo yang digunakan di sungai, danau, dan wilayah pesisir. Selain sebagai sarana transportasi, Bulotu berfungsi untuk mengangkut orang dan barang, mendukung aktivitas nelayan, serta membawa hasil tangkapan dan hasil perdagangan melalui jalur perairan. Keberadaannya berkaitan erat dengan kondisi geografis Gorontalo yang menjadikan perairan sebagai jalur mobilitas dan kegiatan ekonomi masyarakat. Bukti visual awal terdapat dalam lukisan “Molluksche Eilanden; De rivier en Negorij Gorontalo” yang diperkirakan dibuat sekitar 1830–1840, sebelum catatan C. B. H. von Rosenberg tahun 1863 yang menyebut istilah blotto. Penggunaan Bulotu juga terlihat dalam dokumentasi sekitar 1920–1930 dan arsip tahun 1951. Selain memiliki fungsi praktis, Bulotu juga berkaitan dengan tradisi Mopolahu Lo Bulotu, yaitu upacara sebelum perahu digunakan.",
    scale: "0.8 0.8 0.8" 
  },
  Sepeda_Onthel_Pasukan_RIMBA: {
    title: "Sepeda Onthel Pasukan RIMBA",
    modelSrc: "https://assets.olicyclestove.my.id/Sepeda1.glb",
    audioSrc: "/assets/sound/Sepeda1.m4a",
    historyTitle: "Sepeda Onthel Pasukan RIMBA",
    historyText: "Raleigh Roadster 1951 merupakan sepeda onthel buatan Inggris yang digunakan sebagai sarana transportasi dan mendukung mobilitas Pasukan Rimba di Gorontalo pada masa pergolakan sekitar 1957–1958. Sepeda ini dimanfaatkan untuk membawa logistik dan amunisi, sekaligus mendukung pergerakan pasukan karena tidak memerlukan bahan bakar dan tidak menghasilkan suara mesin. Sebelumnya, sepeda ini merupakan kendaraan dinas Jonder Manueke, Kepala Polisi di Kota Gorontalo, yang kemudian diserahkan oleh putranya, Harry Manueke, kepada museum.",
    scale: "0.8 0.8 0.8" 
  },
  Sepeda_Onthel_NSU_Tourenrad_Modell_55: {
    title: "Sepeda Onthel NSU Tourenrad Modell 55",
    modelSrc: "https://assets.olicyclestove.my.id/Sepeda2.glb",
    audioSrc: "/assets/sound/Sepeda2.m4a",
    historyTitle: "Sepeda Onthel NSU Tourenrad Modell 55",
    historyText: "Sepeda NSU Tourenrad Modell 55 merupakan sepeda buatan Jerman yang menjadi bagian dari sejarah transportasi dan kehidupan masyarakat Gorontalo pada abad ke-20. Sepeda ini dibeli oleh keluarga Liputo-Katili pada tahun 1951 dan berasal dari Desa Luhu, Kecamatan Telaga, Kabupaten Gorontalo. Pada 1974–1977, sepeda digunakan oleh Dr. H. Weni Liputo untuk perjalanan dari Telaga menuju Kota Gorontalo saat menempuh pendidikan di Sekolah Pendidikan Guru Negeri II Gorontalo.",
    scale: "0.8 0.8 0.8" 
  },
  Kokoyonga: {
    title: "Kokoyonga",
    modelSrc: "https://assets.olicyclestove.my.id/Kokoyonga.glb",
    audioSrc: "/assets/sound/Kokoyonga.m4a",
    historyTitle: "Kokoyonga",
    historyText: "Kokoyonga merupakan alat transportasi tradisional masyarakat Gorontalo yang terbuat dari kayu, tidak memiliki roda, dan ditarik menggunakan tenaga sapi. Alat ini digunakan untuk mengangkut hasil kebun dari daerah pegunungan atau wilayah yang sulit dijangkau kendaraan beroda. Bentuknya menunjukkan penyesuaian teknologi masyarakat terhadap kondisi geografis dan jaringan jalan pada masa tradisional yang umumnya berupa jalan setapak dan jalur perdagangan. Kokoyonga memiliki keterkaitan erat dengan aktivitas pertanian dan perkebunan masyarakat Gorontalo.",
    scale: "0.8 0.8 0.8" 
  }
};

function App() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const modelViewerRef = useRef(null); 
  
  const [isStarted, setIsStarted] = useState(false);
  const [showInfo, setShowInfo] = useState(false); 
  const [artifact, setArtifact] = useState(null);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    setArtifact(ARTIFACT_DATA[id] || ARTIFACT_DATA['Bendi']);
  }, []);

  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (viewer) {
      const updateProgress = (event) => {
        const percentage = Math.round(event.detail.totalProgress * 100);
        setLoadProgress((prev) => (prev !== percentage ? percentage : prev));
      };

      viewer.addEventListener('progress', updateProgress);
      return () => viewer.removeEventListener('progress', updateProgress);
    }
  }, [isStarted]); 

  // Audio BENAR-BENAR HANYA dimulai saat progress mencapai 100%
  useEffect(() => {
    if (loadProgress === 100 && isStarted && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Gagal memutar audio:", e));
    }
  }, [loadProgress, isStarted]);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleStartExperience = useCallback(async () => {
    setIsStarted(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Gagal mengakses kamera. Pastikan izin diberikan.");
    }
  }, []);

  if (!artifact) return null;

  return (
    // PERUBAHAN 1: Mengganti h-screen menjadi h-[100dvh] agar akurat di mobile
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black font-sans">
      
      <audio ref={audioRef} src={artifact.audioSrc} loop />

      {/* --- LAYAR AWAL --- */}
      {!isStarted && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-sm text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            {artifact.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
            Nyalakan volume perangkat Anda dan izinkan akses kamera untuk memulai pengalaman interaktif 3D.
          </p>
          <button 
            onClick={handleStartExperience}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95"
          >
            Mulai Pengalaman AR
          </button>
        </div>
      )}

      {/* --- BACKGROUND KAMERA --- */}
      <video 
        ref={videoRef} 
        autoPlay playsInline muted
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
      />

      {/* --- AREA 3D & LOADING SCREEN --- */}
      {isStarted && (
        <>
          {loadProgress < 100 && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
               <h2 className="text-white text-xl font-bold mb-2">Memuat Artefak 3D</h2>
               <div className="w-64 bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
                 <div 
                   className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-out" 
                   style={{ width: `${loadProgress}%` }}
                 ></div>
               </div>
               <p className="text-blue-400 mt-2 font-semibold">{loadProgress}% Selesai</p>
            </div>
          )}

          <model-viewer
            ref={modelViewerRef}
            src={artifact.modelSrc}
            scale={artifact.scale || "1 1 1"} 
            camera-controls
            auto-rotate
            rotation-per-second="30deg"
            shadow-intensity="1"
            power-preference="high-performance"
            className="absolute inset-0 z-10 w-full h-full bg-transparent outline-none pb-24"
          />

          {/* --- BOTTOM SHEET DRAWER UI --- */}
          {loadProgress === 100 && (
            <div 
              className={`absolute left-0 w-full bg-gray-900/90 backdrop-blur-xl rounded-t-3xl border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out z-30 flex flex-col will-change-transform`}
              style={{ 
                // PERUBAHAN 2: Menggunakan dvh agar proporsi tinggi tidak tenggelam
                height: '50dvh', 
                bottom: 0,
                // Mengurangi jarak translateY yang tersisa saat ditutup untuk memastikan tombol selalu aman terlihat
                transform: showInfo ? 'translateY(0)' : 'translateY(calc(100% - 90px))' 
              }}
            >
              <div 
                onClick={() => setShowInfo(!showInfo)}
                // Menambahkan padding-bottom aman (pb-2) agar klik lebih nyaman di layar HP
                className="w-full h-[90px] pb-2 flex-shrink-0 flex flex-col items-center justify-center cursor-pointer px-6 relative"
              >
                <div className="w-12 h-1.5 bg-gray-500/70 rounded-full mb-3 mt-2"></div>
                
                <div className="w-full flex items-center justify-between">
                  <h2 className="text-white text-lg md:text-xl font-bold truncate pr-4">
                    {artifact.historyTitle}
                  </h2>
                  <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 ${showInfo ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-12 overflow-y-auto flex-1">
                <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify">
                  {artifact.historyText}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
