"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ThemeToggle() {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		const root = document.documentElement;
		setIsDark(root.classList.contains("dark"));
	}, []);

	const toggleTheme = useCallback(() => {
		const root = document.documentElement;
		if (root.classList.contains("dark")) {
			root.classList.remove("dark");
			root.classList.add("light");
			setIsDark(false);
		} else {
			root.classList.remove("light");
			root.classList.add("dark");
			setIsDark(true);
		}
	}, []);

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]"
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
		</button>
	);
}
