import React, { useEffect, useRef, useState } from "react";
import { Next } from "./Next";
import { Pause } from "./Pause";
import { Play } from "./Play";
import { Previous } from "./Previous";

interface Song {
  url: string;
  cover: string;
  name: string;
  artists: string;
  genres: string[];
}
const songList: Song[] = [
  {
    artists: "Masego & FKJ",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/35/48/b3/3548b3c7-92bd-ea54-1e09-47a1f6f25b01/00842812109249.rgb.jpg/100x100bb.jpg",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/15/f5/f2/15f5f201-b1b2-a0da-9ee2-a0d94490fed3/mzaf_6079515520625844641.plus.aac.ep.m4a",
    name: "Tadow",
    genres: ["R&B", "Soul"],
  },
  {
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/b0/d8/aa/b0d8aa8e-1a38-6287-508d-27693174249e/mzaf_13677213744690699536.plus.aac.ep.m4a",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/de/eb/63/deeb63c1-7bc0-9153-cfa3-fd9e4929aacf/4050538826562.jpg/100x100bb.jpg",
    name: "Never gonna give you up",
    artists: "Ricky Astley",
    genres: ["Pop"],
  },
  {
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f9/9c/55/f99c553e-7be1-91dc-b55e-3da1aad29bba/mzaf_8881595477209725037.plus.aac.ep.m4a",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b3/8a/98/b38a9867-2a9c-de2f-2d80-c624fb2200ec/11UMGIM19347.rgb.jpg/100x100bb.jpg",
    name: "Somebody That I Used to Know",
    artists: "Gotye ft. Kimbra",
    genres: ["Jazz", "Rock"],
  },
];

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (newState: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  setIsPlaying,
}) => {
  const [currentSong, setCurrentSong] = useState<number>(0);
  const musicPlayer = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      if (musicPlayer.current === null) {
        musicPlayer.current = new Audio(songList[currentSong].url);
        musicPlayer.current.addEventListener("ended", handleEnded);
      } else {
        musicPlayer.current.pause();
        musicPlayer.current.src = songList[currentSong].url;
        musicPlayer.current.load();
      }
      if (isPlaying) {
        musicPlayer.current.play();
      }
    }
    return () => {
      if (musicPlayer.current) {
        musicPlayer.current.removeEventListener("ended", handleEnded);
        musicPlayer.current.pause();
        musicPlayer.current = null;
      }
    };
  }, [currentSong, songList]);

  const handleEnded = () => {
    next();
  };

  const playPause = () => {
    if (isPlaying) {
      musicPlayer.current?.pause();
      setIsPlaying(false);
    } else {
      musicPlayer.current?.play();
      setIsPlaying(true);
    }
  };

  const next = () => {
    setCurrentSong((prevSong) => (prevSong + 1) % songList.length);
  };

  const prev = () => {
    setCurrentSong(
      (prevSong) => (prevSong - 1 + songList.length) % songList.length
    );
  };

  return (
    <div className="flex flex-col items-center gap-1 my-5">
      <span className="text-sm text-center text-secondary">
        (Look in my room after you play music)
      </span>
      <div className="flex p-4 items-center  gap-4">
        <img
          className={`rounded-full w-24 h-24 ring ${
            isPlaying ? "animate-spin ring-accent" : "ring-base-100"
          }`}
          style={{
            animationDuration: "10s",
          }}
          src={songList[currentSong].cover}
        />
        <div className="flex flex-col items-start text-lg truncate overflow-hidden whitespace-nowrap">
          <span className="monospace">{songList[currentSong].artists}</span>
          <span className="font-bold">{songList[currentSong].name}</span>
          <div className="flex gap-4 justify-between">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-base-content hover:bg-primary"
            >
              <Previous />
            </button>
            <button
              onClick={playPause}
              className="p-2 rounded-full border border-base-content hover:bg-primary"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full border border-base-content hover:bg-primary"
            >
              <Next />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
