import { useEffect, useState } from "react";
import SettingsSVG from "../assets/svgs/settings.svg";
import SunSVG from "../assets/svgs/sun.svg";
import MoonSVG from "../assets/svgs/moon.svg";

type ThemeMode = "auto" | "dark" | "light";

export default function useTheme() {
	const [themeMode, setThemeMode] = useState<ThemeMode>(
		() => (localStorage.getItem("theme-mode") as ThemeMode) ?? "auto"
	);

	function getAutoDarkPreference() {
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		const hour = new Date().getHours();
		const isNight = hour < 6 || hour >= 18;
		return prefersDark || isNight;
	}

	function isDarkModeActive() {
		if (themeMode === "auto") return getAutoDarkPreference();
		return themeMode === "dark";
	}

	useEffect(() => {
		let isDark = false;

		if (themeMode === "auto") {
			isDark = getAutoDarkPreference();
		} else {
			isDark = themeMode === "dark";
		}

		if (isDark) {
			document.documentElement.classList.remove("light-mode");
		} else {
			document.documentElement.classList.add("light-mode");
		}

		localStorage.setItem("theme-mode", themeMode);
	}, [themeMode]);

	function toggleTheme() {
		setThemeMode((prev) => {
			if (prev === "auto") return "light";
			if (prev === "light") return "dark";
			return "auto";
		});
	}

	function getThemeSVG() {
		const isDark = isDarkModeActive();
		if (themeMode === "auto") return SettingsSVG;
		return isDark ? MoonSVG : SunSVG;
	}

	return {
		themeMode,
		setThemeMode,
		toggleTheme,
		getThemeSVG,
		isDarkModeActive,
	};
}
