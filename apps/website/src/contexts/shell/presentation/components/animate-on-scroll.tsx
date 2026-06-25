"use client";

import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

export type AnimationVariant =
	| "fade-up"
	| "fade-in"
	| "fade-left"
	| "fade-right"
	| "scale-up"
	| "bounce-in"
	| "depth-shift";

interface AnimateOnScrollProps {
	children: ReactNode;
	variant?: AnimationVariant;
	duration?: number;
	easing?: string;
	delay?: number;
	threshold?: number;
	className?: string;
	as?: React.ElementType;
}

/**
 * Maps each variant to a CSS transform applied BEFORE the element is visible.
 * On reveal the transform transitions to "none" + opacity to 1 — smooth, no blink.
 */
const variantInitialTransform: Record<AnimationVariant, string> = {
	"fade-up": "translateY(20px) scale(0.98)",
	"fade-in": "scale(0.98)",
	"fade-left": "translateX(20px) scale(0.98)",
	"fade-right": "translateX(-20px) scale(0.98)",
	"scale-up": "scale(0.95)",
	"bounce-in": "scale(0.95)",
	"depth-shift": "scale(0.95)",
};

export function AnimateOnScroll({
	children,
	variant = "fade-up",
	duration = 600,
	easing = "cubic-bezier(0.22, 1, 0.36, 1)",
	delay = 0,
	threshold = 0.1,
	className,
	as: Component = "div",
}: AnimateOnScrollProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mediaQuery.matches);

		const handler = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches);
		};
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	const observerCallback = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			}
		},
		[],
	);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(observerCallback, {
			threshold,
			rootMargin: "0px 0px -50px 0px",
		});

		observer.observe(element);
		return () => observer.disconnect();
	}, [observerCallback, threshold]);

	if (prefersReducedMotion) {
		return (
			<Component ref={ref as React.RefObject<never>} className={className}>
				{children}
			</Component>
		);
	}

	const style: React.CSSProperties = isVisible
		? {
				opacity: 1,
				transform: "none",
				transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
			}
		: {
				opacity: 0,
				transform: variantInitialTransform[variant],
				willChange: "opacity, transform",
			};

	return (
		<Component
			ref={ref as React.RefObject<never>}
			className={className}
			style={style}
		>
			{children}
		</Component>
	);
}
