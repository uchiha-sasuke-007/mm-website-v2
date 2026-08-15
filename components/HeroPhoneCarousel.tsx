"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type HeroPhone = { src: string; name: string };

const PHONE_SPACING = 120;
const AUTOPLAY_SPEED = 17.5;
const AUTOPLAY_RESUME_DELAY = 900;

const shortestAngle = (value: number) => ((value + 540) % 360) - 180;

export function HeroPhoneCarousel({ phones, lang }: { phones: HeroPhone[]; lang: "pt" | "en" }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const angle = useRef(-PHONE_SPACING);
  const targetAngle = useRef<number | null>(null);
  const lastFrame = useRef(0);
  const paused = useRef(false);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const dragDistance = useRef(0);
  const suppressClick = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useRef(false);
  const activeRef = useRef(1);
  const [activePhone, setActivePhone] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => { reducedMotion.current = media.matches; };
    syncMotion();
    media.addEventListener("change", syncMotion);

    const renderOrbit = () => {
      const stageWidth = stageRef.current?.clientWidth ?? 440;
      const radius = Math.min(stageWidth * .31, 145);
      let frontIndex = 0;
      let frontDepth = -2;

      phoneRefs.current.forEach((element, index) => {
        if (!element) return;
        const degrees = angle.current + index * PHONE_SPACING;
        const radians = degrees * Math.PI / 180;
        const depth = Math.cos(radians);
        const normalizedDepth = (depth + 1) / 2;
        const x = Math.sin(radians) * radius;
        const y = (1 - normalizedDepth) * 22;
        const z = (depth - 1) * 105;
        const scale = .72 + normalizedDepth * .28;
        const rotateY = Math.sin(radians) * -10;

        element.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), ${y.toFixed(2)}px, ${z.toFixed(2)}px) scale(${scale.toFixed(4)}) rotateY(${rotateY.toFixed(2)}deg)`;
        element.style.zIndex = String(Math.round(normalizedDepth * 100) + 1);
        element.style.opacity = String(.78 + normalizedDepth * .22);
        element.style.setProperty("--phone-depth", normalizedDepth.toFixed(4));

        if (depth > frontDepth) {
          frontDepth = depth;
          frontIndex = index;
        }
      });

      if (frontIndex !== activeRef.current) {
        activeRef.current = frontIndex;
        setActivePhone(frontIndex);
      }
    };

    let frameId = 0;
    const animate = (time: number) => {
      const delta = lastFrame.current ? Math.min(time - lastFrame.current, 40) : 16;
      lastFrame.current = time;

      if (targetAngle.current !== null) {
        const difference = shortestAngle(targetAngle.current - angle.current);
        if (Math.abs(difference) < .15) {
          angle.current = targetAngle.current;
          targetAngle.current = null;
        } else {
          angle.current += difference * Math.min(1, delta * (reducedMotion.current ? .04 : .009));
        }
      } else if (!paused.current && !dragging.current && !reducedMotion.current) {
        angle.current = (angle.current + AUTOPLAY_SPEED * delta / 1000) % 360;
      }

      renderOrbit();
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
      media.removeEventListener("change", syncMotion);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
    };
  }, [phones.length]);

  const pause = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    paused.current = true;
  };

  const resume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { paused.current = false; }, AUTOPLAY_RESUME_DELAY);
  };

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pause();
    targetAngle.current = null;
    dragging.current = true;
    setIsDragging(true);
    dragStartX.current = event.clientX;
    dragStartAngle.current = angle.current;
    dragDistance.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragDistance.current = event.clientX - dragStartX.current;
    angle.current = dragStartAngle.current + dragDistance.current * .42;
  };

  const pointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    targetAngle.current = angle.current + shortestAngle(-(activeRef.current * PHONE_SPACING) - angle.current);
    if (Math.abs(dragDistance.current) > 6) {
      suppressClick.current = true;
      if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
      clickResetTimer.current = setTimeout(() => { suppressClick.current = false; }, 350);
    }
    dragDistance.current = 0;
    resume();
  };

  const focusPhone = (index: number) => {
    if (suppressClick.current) return;
    pause();
    targetAngle.current = angle.current + shortestAngle(-(index * PHONE_SPACING) - angle.current);
    resume();
  };

  return <div
    ref={stageRef}
    className={`referencePhones orbitalCarousel${isDragging ? " isDragging" : ""}`}
    aria-label={lang === "pt" ? "Telefones em destaque" : "Featured phones"}
    onPointerDown={pointerDown}
    onPointerMove={pointerMove}
    onPointerUp={pointerEnd}
    onPointerCancel={pointerEnd}
  >
    <div className="referenceNeonBar referenceNeonBarTop" aria-hidden="true"/>
    <div className="referenceBeam referenceNeonBar referenceNeonBarBottom" aria-hidden="true"/>
    {phones.map((phone, index) => <button
      ref={(element) => { phoneRefs.current[index] = element; }}
      type="button"
      className="referencePhone orbitalPhone"
      key={phone.src}
      onClick={() => focusPhone(index)}
      aria-label={lang === "pt" ? `Destacar ${phone.name}` : `Feature ${phone.name}`}
      aria-pressed={activePhone === index}
    ><img src={phone.src} alt={phone.name} draggable={false}/></button>)}
  </div>;
}
