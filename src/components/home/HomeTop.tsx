"use client";

import { HomeHero } from "./HomeHero";
import { HomeAbout } from "./HomeAbout";

type Props = { locale: "en" | "hi" };

export function HomeTop({ locale }: Props) {
  return (
    <>
      <HomeHero locale={locale} />
      <HomeAbout locale={locale} />
    </>
  );
}
