import React, { useState } from "react";
import { Header } from "./components/Header";
import MyRoom from "./components/MyRoom";
import { ThemeChanger } from "./components/ThemeChanger";
import { MusicPlayer } from "./components/MusicPlayer";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div>
      <Header />
      <MyRoom isMusicPlaying={isPlaying} />
      <ThemeChanger />
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Footer />
    </div>
  );
};

export default App;
