import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';

// --- DATA ARTEFAK MUSEUM ---
const ARTIFACT_DATA = {
  pertama: {
    title: "Pertama Kuda Bersejarah",
    modelSrc: "/assets/gerobak2.glb",
    audioSrc: "/assets/backsound.mp3",
    historyTitle: "Sejarah Pertama Kuda",
    historyText: "Pertama kuda ini digunakan pada abad ke-19 oleh para bangsawan. Terbuat dari kayu jati pilihan dengan interior kain beludru.",
    hotspotPos: "0 0.5 0"
  },
  kedua: {
    title: "Kedua Kuda Bersejarah",
    modelSrc: "/assets/1kereta.glb",
    audioSrc: "/assets/backsound.mp3",
    historyTitle: "Sejarah Kedua Kuda",
    historyText: "Kedua kuda ini digunakan pada abad ke-19 oleh para bangsawan. Terbuat dari kayu jati pilihan dengan interior kain beludru.",
    hotspotPos: "0 0.5 0"
  },
  ketiga: {
    title: "Ketiga Kuda Bersejarah",
    modelSrc: "/assets/gerobak.glb",
    audioSrc: "/assets/backsound.mp3",
    historyTitle: "Sejarah Ketiga Kuda",
    historyText: "Ketiga kuda ini digunakan pada abad ke-19 oleh para bangsawan. Terbuat dari kayu jati pilihan dengan interior kain beludru.",
    hotspotPos: "0 0.5 0"
  },
  keempat: {
    title: "Keemoat Ganesha",
    modelSrc: "/assets/3kereta.glb",
    audioSrc: "/assets/backsound.mp3",
    historyTitle: "Simbol Kebijaksanaan",
    historyText: "Keemoat peninggalan kerajaan Hindu-Buddha ini merepresentasikan dewa ilmu pengetahuan dan penyingkir rintangan.",
    hotspotPos: "0 0.5 0"
  }
};

function App() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  
  const [isStarted, setIsStarted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [artifact, setArtifact] = useState(null);

  // Mengambil ID artefak dari URL saat web pertama kali dimuat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    // Jika ID cocok dengan data kita, gunakan data tersebut. 
    // Jika tidak ada ID atau ID salah, default ke 'kereta'.
    if (id && ARTIFACT_DATA[id]) {
      setArtifact(ARTIFACT_DATA[id]);
    } else {
      setArtifact(ARTIFACT_DATA['kereta']);
    }
  }, []);

  const handleStartExperience = () => {
    setIsStarted(true);
    
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio gagal diputar:", e));
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          alert("Gagal mengakses kamera. Pastikan izin diberikan.");
        });
    }
  };

  // Jangan render apa-apa jika data artifact belum siap
  if (!artifact) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      
      {/* Audio sekarang mengambil sumber dari data artefak */}
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
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* --- AREA 3D --- */}
      {isStarted && (
        <>
          <model-viewer
            src={artifact.modelSrc} 
            camera-controls
            auto-rotate
            rotation-per-second="30deg"
            shadow-intensity="1"
            className="absolute inset-0 z-10 w-full h-full bg-transparent outline-none"
          >
            {showInfo && (
              <div 
                slot="hotspot-sejarah" 
                data-position={artifact.hotspotPos} 
                data-normal="0 1 0"
                className="w-64 md:w-80 p-5 bg-gray-900/80 backdrop-blur-md text-white rounded-2xl border border-white/20 shadow-2xl -translate-x-1/2 -translate-y-full"
              >
                <h2 className="text-lg md:text-xl font-bold mb-2">{artifact.historyTitle}</h2>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {artifact.historyText}
                </p>
              </div>
            )}
          </model-viewer>

          <button 
            onClick={() => setShowInfo(!showInfo)}
            className={`absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg transition-colors ${
              showInfo ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {showInfo ? '×' : 'i'}
          </button>
        </>
      )}
    </div>
  );
}

export default App;