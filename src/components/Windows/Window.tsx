import clsx from "clsx";
import { useAtom } from "jotai";
import { useImmerAtom } from "jotai/immer";
import { RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { Suspense } from "react";
import { Rnd } from "react-rnd";
import { Nexus } from "__/components/Menu/Nexus";
import { menuConfig } from "__/data/menu/menu-config";
import { activeMenuStore, activeMenuZIndexStore, AppID, openMenuStore } from "__/stores/menu.store";

import css from "./Window.module.scss";

type WindowProps = {
  appID: AppID;
};

export const Window = ({ appID }: WindowProps) => {
  const [activeApp, setActiveApp] = useAtom(activeMenuStore);
  const [, setOpenMenu] = useImmerAtom(openMenuStore);
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const closeMenu = () =>
    setOpenMenu((openApps) => {
      openApps[appID] = false;
      return openApps;
    });

  const focusCurrentApp = () => {
    setActiveApp(appID);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "grey",
        position: "absolute",
        zIndex: 1000,
      }}
    >
      <section className={css.container} tabIndex={-1} ref={containerRef} onClick={focusCurrentApp}>
        <div className={clsx(css.trafficLightsContainer, "app-window-drag-handle")}></div>
        <Suspense fallback={<span></span>}>
          <button onClick={closeMenu} style={{ position: "absolute", right: 0, zIndex: 100 }}>
            CLOSE
          </button>

          <div style={{ width: "100%", height: "100%", background: "grey", position: "absolute" }}>
            <Nexus appID={appID} />
          </div>
        </Suspense>
      </section>
    </div>
  );
};

export default Window;
