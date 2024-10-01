"use client";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const setGiscusTheme = () => {
  const giscus = document.querySelector<HTMLIFrameElement>(".giscus-frame");

  if (!giscus) return;

  const isDark = document.documentElement.classList.contains("dark");
  const url = new URL(giscus.src);

  url.searchParams.set("theme", isDark ? "dark" : "light");

  giscus.src = url.toString();
};

const toggleTheme = (dark: boolean) => {
  const css = document.createElement("style");
  const textContent = document.createTextNode(`* {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    -ms-transition: none !important;
    transition: none !important;
  }`);

  css.appendChild(textContent);

  document.head.appendChild(css);
  document.documentElement.classList.toggle("dark", dark);
  document.head.removeChild(css);

  setGiscusTheme();
};

const preloadTheme = () => {
  const userTheme = localStorage.theme;

  if (["dark", "light"].includes(userTheme)) toggleTheme(userTheme === "dark");
  else toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
};

const onScroll = () => document.documentElement.classList.toggle("scrolled", window.scrollY > 0);

const animate = () => {
  document
    .querySelectorAll(".animate")
    .forEach((element, index) => setTimeout(() => element.classList.add("show"), index * 100));
};

const updateThemeButtons = () => {
  const theme = localStorage.getItem("theme");

  const lightThemeButton = document.getElementById("light-theme-button");
  const darkThemeButton = document.getElementById("dark-theme-button");
  const systemThemeButton = document.getElementById("system-theme-button");

  const removeActiveButtonTheme = (button: HTMLElement | null) => {
    button?.classList.remove("bg-black/5");
    button?.classList.remove("dark:bg-white/5");
  };

  const addActiveButtonTheme = (button: HTMLElement | null) => {
    button?.classList.add("bg-black/5");
    button?.classList.add("dark:bg-white/5");
  };

  removeActiveButtonTheme(lightThemeButton);
  removeActiveButtonTheme(darkThemeButton);
  removeActiveButtonTheme(systemThemeButton);

  if (theme === "light") addActiveButtonTheme(lightThemeButton);
  else if (theme === "dark") addActiveButtonTheme(darkThemeButton);
  else addActiveButtonTheme(systemThemeButton);
};

const addCopyCodeButtons = () => {
  const copyButtonLabel = "📋";
  const codeBlocks = Array.from(document.querySelectorAll("pre"));

  async function copyCode(codeBlock: HTMLPreElement, copyButton: HTMLButtonElement) {
    const codeText = codeBlock.innerText;
    const buttonText = copyButton.innerText;
    const textToCopy = codeText.replace(buttonText, "");

    await navigator.clipboard.writeText(textToCopy);
    copyButton.innerText = "✅";

    setTimeout(() => {
      copyButton.innerText = copyButtonLabel;
    }, 2000);
  }

  for (const codeBlock of codeBlocks) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const copyButton = document.createElement("button");
    copyButton.innerText = copyButtonLabel;
    copyButton.title = "Copy Code";
    copyButton.classList.add("copy-code");

    codeBlock.setAttribute("tabindex", "0");
    codeBlock.appendChild(copyButton);

    codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton?.addEventListener("click", async () => await copyCode(codeBlock, copyButton));
  }
};

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    preloadTheme();
    setGiscusTheme();

    const backToTop = document.getElementById("back-to-top");
    backToTop?.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const backToPrev = document.getElementById("back-to-prev");
    backToPrev?.addEventListener("click", () => window.history.back());

    const lightThemeButton = document.getElementById("light-theme-button");
    lightThemeButton?.addEventListener("click", () => {
      localStorage.setItem("theme", "light");
      toggleTheme(false);
      updateThemeButtons();
    });

    const darkThemeButton = document.getElementById("dark-theme-button");
    darkThemeButton?.addEventListener("click", () => {
      localStorage.setItem("theme", "dark");
      toggleTheme(true);
      updateThemeButtons();
    });

    const systemThemeButton = document.getElementById("system-theme-button");
    systemThemeButton?.addEventListener("click", () => {
      localStorage.setItem("theme", "system");
      toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
      updateThemeButtons();
    });

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => "system" === localStorage.theme && toggleTheme(e.matches));

    document.addEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    onScroll();
    animate();
    updateThemeButtons();
    addCopyCodeButtons();
  }, [pathname]);

  return (
    <body className={`${GeistMono.className} ${GeistSans.className}`}>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* <PageFind /> */}
    </body>
  );
}
