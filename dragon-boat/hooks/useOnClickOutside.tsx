import { useEffect } from "react";

export function useOnClickOutside(
	ref: React.RefObject<HTMLElement>,
	onClickInside: () => void,
	onClickOutside: () => void
) {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!ref.current) return;

			if (ref.current.contains(event.target as Node)) {
				// Click happened inside the element
				onClickInside();
			} else {
				// Click happened outside the element
				onClickOutside();
			}
		};

		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [ref, onClickInside, onClickOutside]);
}
