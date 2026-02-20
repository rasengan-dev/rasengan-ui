import { Blocks, Handshake } from "lucide-react";
import React from "react";
import { randomId } from "@/lib/utils";
import { componentsData } from ".";

export type NavigationItem = {
	id: number;
	name: string;
	link?: string;
	level: 1 | 2 | 3 | 4;
	icon?: React.ReactNode;
	visible?: boolean;
	children?: Array<NavigationItem>;
	isNew?: boolean;
	isComingSoon?: boolean;
	isBeta?: boolean;
};

export const NavigationData: Array<NavigationItem> = [
	{
		id: randomId(),
		name: "MARKETING",
		icon: <Handshake size={20} />,
		level: 1,
		children: componentsData.marketing.components.map((group) => {
			return {
				id: randomId(),
				name: group.name,
				// link: "/docs/getting-started/introduction",
				level: 2,
				children: group.componentsType.map((type) => {
					return {
						id: randomId(),
						name: type.name,
						// link: "/docs/getting-started/introduction",
						level: 3,
						children: type.components.map((component) => {
							return {
								id: randomId(),
								name: component.name,
								link: `/marketing/${group.label}/${component.label}`,
								// link: "/docs/getting-started/introduction",
								level: 4,
							};
						}),
					};
				}),
			};
		}),
	},
	{
		id: randomId(),
		name: `APPLICATION UI`,
		icon: <Blocks size={20} />,
		level: 1,
		children: componentsData["application-ui"].components.map((group) => {
			return {
				id: randomId(),
				name: group.name,
				// link: "/docs/getting-started/introduction",
				level: 2,
				children: group.componentsType.map((type) => {
					return {
						id: randomId(),
						name: type.name,
						// link: "/docs/getting-started/introduction",
						level: 3,
						children: type.components.map((component) => {
							return {
								id: randomId(),
								name: component.name,
								link: `/application-ui/${group.label}/${component.label}`,
								// link: "/docs/getting-started/introduction",
								level: 4,
							};
						}),
					};
				}),
			};
		}),
	}
];
