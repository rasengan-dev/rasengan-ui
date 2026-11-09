import type { LogosGridContent } from "./schema";

const mark = (name: string) => ({ name: name[0].toUpperCase() + name.slice(1), src: `/placeholders/logo-${name}.svg`, width: 96, height: 96 });

export const example: LogosGridContent = {
	title: "Trusted by studios in 30 countries",
	logos: [mark("orbel"), mark("vantra"), mark("kelvo"), mark("nimbra"), mark("tolva"), mark("zephly"), { name: "Lumen" }, { name: "Northwind" }],
};
