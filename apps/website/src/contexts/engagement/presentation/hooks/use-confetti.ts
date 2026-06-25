"use client";

import { useCallback } from "react";

const CONFETTI_COLORS = [
	"hsl(270, 95%, 65%)",
	"hsl(175, 90%, 50%)",
	"hsl(35, 95%, 55%)",
	"hsl(270, 80%, 75%)",
	"hsl(175, 70%, 60%)",
];
const CONFETTI_DURATION_MS = 500;

export function useConfetti() {
	const fireConfetti = useCallback(async () => {
		try {
			const confetti = (await import("canvas-confetti")).default;
			const end = Date.now() + CONFETTI_DURATION_MS;

			const frame = () => {
				confetti({
					particleCount: 4,
					angle: 60,
					spread: 55,
					origin: { x: 0, y: 0.6 },
					zIndex: 9999,
					colors: CONFETTI_COLORS,
				});
				confetti({
					particleCount: 4,
					angle: 120,
					spread: 55,
					origin: { x: 1, y: 0.6 },
					zIndex: 9999,
					colors: CONFETTI_COLORS,
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			};
			frame();
		} catch {
			// Canvas confetti may not be available in SSR
		}
	}, []);

	return { fireConfetti };
}
