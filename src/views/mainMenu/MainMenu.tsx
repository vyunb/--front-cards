import React, { useEffect, useRef } from "react";
import { Slider } from "../../components/MenuSlider/Slider";
import { WindowsArea } from "../../components/Windows/WindowsArea";
import { useAtom } from "jotai";
import { imagesAtom, menuRenderingAtom, loadingStatus } from "../../stores/loading.store";

export const MainMenu = () => {
  const [imagesIsLoaded] = useAtom(imagesAtom);
  const [menuIsLoaded, menuLoaded] = useAtom(menuRenderingAtom);
  const [status] = useAtom(loadingStatus);
  const outerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    menuLoaded();
  }, []);

  const LoadingScreen = () => {
    console.log(status);
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background: "white",
          zIndex: 1000,
        }}
      >
        <h1
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
          }}
        >
          LOADING {status}
        </h1>
      </div>
    );
  };

  return (
    <>
      {!imagesIsLoaded && <LoadingScreen />}
      <main ref={outerRef}>
        <WindowsArea />
        <Slider />
      </main>
    </>
  );
};
