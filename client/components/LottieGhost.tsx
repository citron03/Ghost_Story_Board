import { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import aGhost from "@/assets/a_ghost2.json";

function GhostLottie() {
  const lottieRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lottieRef.current) {
      Lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: aGhost,
      });
    }
    return () => Lottie.destroy();
  }, []);
  return (
    <div
      ref={lottieRef}
      style={{
        width: "65px",
        height: "65px",
        backgroundColor: "transparent",
      }}
    ></div>
  );
}

export default GhostLottie;
