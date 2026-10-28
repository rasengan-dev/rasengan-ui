import { Children, createContext, useContext, useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useMotionSettings } from "./context";
import { useReveal, type RevealFrom, type RevealTag } from "./reveal";

const StaggerGroup = createContext<{ inView: boolean; delay: number } | null>(null);
const StaggerIndex = createContext(0);

export interface StaggerProps extends HTMLAttributes<HTMLElement> {
	as?: RevealTag;
	/** Seconds before the first item. */
	delay?: number;
	children: ReactNode;
}

/**
 * Its direct children reveal one after another when the group enters the
 * viewport. Wrap each child in <Stagger.Item> (or use a component that does).
 */
function StaggerRoot({ as = "div", delay = 0, children, ...rest }: StaggerProps) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
	const Tag = as as ElementType;
	return (
		<Tag ref={ref} {...rest}>
			<StaggerGroup.Provider value={{ inView, delay }}>
				{Children.map(children, (child, index) => (
					<StaggerIndex.Provider key={index} value={index}>
						{child}
					</StaggerIndex.Provider>
				))}
			</StaggerGroup.Provider>
		</Tag>
	);
}

export interface StaggerItemProps extends HTMLAttributes<HTMLElement> {
	as?: RevealTag;
	from?: RevealFrom;
}

function StaggerItem({ as = "div", from, ...rest }: StaggerItemProps) {
	const ref = useRef<HTMLElement>(null);
	const group = useContext(StaggerGroup);
	const index = useContext(StaggerIndex);
	const { tokens } = useMotionSettings();
	useReveal(ref, {
		from,
		delay: (group?.delay ?? 0) + index * tokens.stagger,
		trigger: group ? group.inView : undefined,
	});
	const Tag = as as ElementType;
	return <Tag ref={ref} data-reveal="" {...rest} />;
}

export const Stagger = Object.assign(StaggerRoot, { Item: StaggerItem });
