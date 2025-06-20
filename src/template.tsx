import { useTheme } from "@rasenganjs/theme";
import { type TemplateProps } from "rasengan";
import { twMerge } from "tailwind-merge";

export default function Template({ Head, Body, Script }: TemplateProps) {
	const { isDark } = useTheme();

	return (
		<html lang='en' className={twMerge("bg-background", isDark && "dark")}>
			<Head>
				<meta charSet='UTF-8' />
				<link rel='icon' type='image/svg+xml' href='/rasengan.svg' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>

			<Body>
				<Script />
			</Body>
		</html>
	);
}
