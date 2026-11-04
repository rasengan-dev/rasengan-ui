import Image from "@rasenganjs/image";

type Props = {
	size?: "sm" | "md" | "lg";
	minimal?: boolean;
};

export default function AppLogo({ size = "md" }: Props) {
	const sizes = {
		sm: {
			width: 30,
			height: "auto",
		},
		md: {
			width: 60,
			height: "auto",
		},
		lg: {
			width: 100,
			height: "auto",
		},
	};

	return (
		<div className='flex items-center gap-1 overflow-hidden'>
			<div>
				<Image
					src='/rasengan.svg'
					alt='Logo'
					width={sizes[size].width}
					height={sizes[size].height}
				/>
			</div>
		</div>
	);
}
