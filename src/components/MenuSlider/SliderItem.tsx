import useRaf from "@rooks/use-raf";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useAtom } from "jotai";
import { useImmerAtom } from "jotai/immer";
import { RefObject, useEffect } from "react";
import { useRef, useState, CSSProperties, MouseEvent } from "react";
import { MenuConfig } from "__/helpers/create-menu-config";
import { activeMenuStore, AppID, openMenuStore } from "__/stores/menu.store";
import { imagesAtom, loadingStatus } from "__/stores/loading.store";
import React from "react";
import css from "./SliderItem.module.scss";

type DockItemProps = MenuConfig & {
  mouseX: MotionValue<number | null>;
  appID: AppID;
  isOpen: boolean;
  index: number;
};

export function SliderItem({ title, externalAction, mouseX, appID, isOpen, shouldOpenWindow }: DockItemProps) {
  const [, setOpenApps] = useImmerAtom(openMenuStore);
  const [, setActiveApp] = useAtom(activeMenuStore);
  const [animateObj, setAnimateObj] = useState({ scale: 1 });
  const [loaded, addImage] = useAtom(imagesAtom);
  const [, setStatus] = useAtom(loadingStatus);

  const imgRef = useRef<HTMLImageElement>();

  const { width } = useDockHoverAnimation(mouseX, imgRef);

  function openApp(e: any) {
    if (!shouldOpenWindow) return void externalAction?.(e);

    setOpenApps((apps) => {
      apps[appID] = true;
      return apps;
    });
    setActiveApp(appID);
  }

  return (
    <button className={css.dockItemButton} aria-label={`Launch ${title}`} onClick={openApp}>
      <motion.span initial={false} animate={animateObj} transition={{ type: "spring", duration: 1 }}>
        <motion.img
          ref={imgRef}
          src={`https://picsum.photos/200/300`}
          draggable={false}
          style={{ width, willChange: "width" }}
          alt={`${title} app icon`}
          className="motion-img"
          onLoad={addImage}
        />
      </motion.span>
      <div className={css.dot} style={{ "--opacity": +isOpen } as CSSProperties} />
    </button>
  );
}

const baseWidth = 157.6;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
const distanceInput = [-distanceLimit, -distanceLimit / 1.25, -distanceLimit / 2, 0, distanceLimit / 2, distanceLimit / 1.25, distanceLimit];
const widthOutput = [baseWidth, baseWidth * 1.1, baseWidth * 1.414, baseWidth * 2, baseWidth * 1.414, baseWidth * 1.1, baseWidth];

const useDockHoverAnimation = (mouseX: MotionValue<number | null>, ref: RefObject<HTMLImageElement>) => {
  const distance = useMotionValue(beyondTheDistanceLimit);

  const widthPX: MotionValue<number> = useSpring(useTransform(distance, distanceInput, widthOutput), {
    stiffness: 1300,
    damping: 82,
  });

  const width = useTransform(widthPX, (width) => `${width / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return { width };
};
