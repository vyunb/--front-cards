import { useMotionValue } from "framer-motion";
import { useAtom } from "jotai";
import { RovingTabIndexProvider } from "react-roving-tabindex";
import { menuConfig } from "__/data/menu/menu-config";
import { openMenuStore } from "__/stores/menu.store";
import css from "./Slider.module.scss";
import { SliderItem } from "./SliderItem";
import React from "react";

export const Slider = () => {
  const [openApps] = useAtom(openMenuStore);

  const mouseX = useMotionValue<number | null>(null);

  return (
    <section id="dock" className={css.container}>
      <div className={css.dockEl} onMouseMove={(event) => mouseX.set(event.nativeEvent.x)} onMouseLeave={() => mouseX.set(null)}>
        <RovingTabIndexProvider options={{ direction: "horizontal" }}>
          {Object.keys(menuConfig).map((appID, i) => (
            <div key={i}>
              {menuConfig[appID].dockBreaksBefore && <div className={css.divider} key={`${appID}-divider`} aria-hidden="true" />}
              <SliderItem index={i} key={appID} mouseX={mouseX} appID={appID} isOpen={openApps[appID]} {...menuConfig[appID]} />
            </div>
          ))}
        </RovingTabIndexProvider>
      </div>
    </section>
  );
};
