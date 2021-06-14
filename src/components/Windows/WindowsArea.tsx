import { useAtom } from "jotai";
import { lazy } from "react";
import { useEffect } from "react";
import { Suspense } from "react";
import { menuConfig } from "__/data/menu/menu-config";
import { activeMenuStore, activeMenuZIndexStore, AppID, openMenuStore } from "__/stores/menu.store";
import React from "react";
import { CardType } from "__/types";
import css from "./WindowsArea.module.scss";

const Window = lazy(() => import("./Window"));

export const WindowsArea = () => {
  const [openApps] = useAtom(openMenuStore);
  const [activeApp] = useAtom(activeMenuStore);
  const [activeAppZIndex, setActiveAppZIndex] = useAtom(activeMenuZIndexStore);

  useEffect(() => {
    setActiveAppZIndex(activeAppZIndex + 2);
  }, [activeApp]);

  return (
    <section>
      <Suspense fallback={<span></span>}>
        {Object.keys(menuConfig).map((appID: AppID) => openApps[appID] && menuConfig[appID].shouldOpenWindow && <Window key={appID} appID={appID} />)}
      </Suspense>
    </section>
  );
};
