import { Blocks, Handshake, Unplug, Package } from "lucide-react";
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
	},
	// {
	// 	id: randomId(),
	// 	name: "E-COMMERCE",
	// 	icon: <Unplug size={20} />,
	// 	level: 1,
	// 	children: [
	// 		{
	// 			id: randomId(),
	// 			name: "Components",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					id: randomId(),
	// 					name: "Link",
	// 					link: "/docs/api-reference/components/link",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "NavLink",
	// 					link: "/docs/api-reference/components/navlink",
	// 					level: 3,
	// 					isNew: true,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "Outlet",
	// 					link: "/docs/api-reference/components/outlet",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "Component",
	// 					link: "/docs/api-reference/components/component",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "Template",
	// 					link: "/docs/api-reference/components/template",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "Layout Component",
	// 					link: "/docs/api-reference/components/layout-component",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "Page Component",
	// 					link: "/docs/api-reference/components/page-component",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "Router Component",
	// 					link: "/docs/api-reference/components/router-component",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "ScrollRestoration",
	// 					link: "/docs/api-reference/components/scroll-restoration",
	// 					level: 3,
	// 					isNew: true,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			id: randomId(),
	// 			name: "Functions",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					id: randomId(),
	// 					name: "defineConfig",
	// 					link: "/docs/api-reference/functions/define-config",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "defineRouter",
	// 					link: "/docs/api-reference/functions/define-router",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "defineRoutesGroup",
	// 					link: "/docs/api-reference/functions/define-routes-group",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "renderApp",
	// 					link: "/docs/api-reference/functions/render-app",
	// 					level: 3,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			id: randomId(),
	// 			name: "File Conventions",
	// 			level: 2,
	// 			children: [
	// 				{
	// 					id: randomId(),
	// 					name: "[name].layout.js",
	// 					link: "/docs/api-reference/conventions/layout",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "[name].router.js",
	// 					link: "/docs/api-reference/conventions/router",
	// 					level: 3,
	// 				},
	// 				{
	// 					id: randomId(),
	// 					name: "[name].page.js",
	// 					link: "/docs/api-reference/conventions/page",
	// 					level: 3,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			id: randomId(),
	// 			name: "rasengan.config.js",
	// 			link: "/docs/api-reference/rasengan-config",
	// 			level: 2,
	// 			children: [],
	// 		},
	// 		{
	// 			id: randomId(),
	// 			name: "create-rasengan CLI",
	// 			link: "/docs/api-reference/create-rasengan-cli",
	// 			level: 2,
	// 			children: [],
	// 		},
	// 		{
	// 			id: randomId(),
	// 			name: "Rasengan CLI",
	// 			link: "/docs/api-reference/rasengan-cli",
	// 			level: 2,
	// 			children: [],
	// 		},
	// 	],
	// },
];
