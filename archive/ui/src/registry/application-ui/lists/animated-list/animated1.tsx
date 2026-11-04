import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AnimatedList1() {
	const imageList = [
		{
			id: 1,
			src: "/static/images/wallpapers/1.jpeg",
			title: "Destination 1",
		},
		{
			id: 2,
			src: "/static/images/wallpapers/2.jpeg",
			title: "Destination 2",
		},
		{
			id: 3,
			src: "/static/images/wallpapers/3.jpeg",
			title: "Destination 3",
		},
		{
			id: 4,
			src: "/static/images/wallpapers/4.jpeg",
			title: "Destination 4",
		},
		{
			id: 5,
			src: "/static/images/wallpapers/5.jpeg",
			title: "Destination 5",
		},
		{
			id: 6,
			src: "/static/images/wallpapers/6.jpeg",
			title: "Destination 6",
		},
		{
			id: 7,
			src: "/static/images/wallpapers/7.jpeg",
			title: "Destination 7",
		},
	];

	const [activeImage, setActiveImage] = useState(1);

	return (
		<div className='mt-20 w-full'>
			<div className='z-10 w-full flex flex-col items-center justify-end text-center px-4 md:px-10 pb-10'>
				<h1 className='relative z-20 text-[40px] lg:text-[50px] leading-[50px] lg:leading-[60px] max-w-[800px] font-medium text-center text-foreground text-pretty'>
					Pick your next Destination
				</h1>
				<p className='relative z-20 text-sm text-center text-foreground/60 max-w-[500px] mt-4 text-pretty'>
					Find the perfect destination for your next adventure
				</p>
			</div>

			<section className='w-full max-w-[1400px] mx-auto h-[500px] flex justify-between gap-2 px-4 md:px-20 pb-4'>
				{imageList.map((image) => (
					<div
						key={image.id}
						className={cn(
							"relative h-full rounded-lg flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out cursor-pointer",
							image.id === activeImage ? "w-full" : "w-[80px] hover:w-[150px]"
						)}
						onClick={() => setActiveImage(image.id)}
					>
						<img src={image.src} className='w-full h-full object-cover' />
						<div
							className={cn(
								"w-full h-auto flex flex-col items-center justify-center text-center p-4 absolute bottom-0 left-0 right-0 transition-all duration-300 ease-in-out z-20",
								image.id === activeImage ? "" : "hidden"
							)}
						>
							<h2 className='text-xl font-bold text-white'>{image.title}</h2>
						</div>

						<div
							className={cn(
								"absolute inset-0 bg-black/50 z-10 transition-all duration-300 ease-in-out",
								image.id === activeImage ? "" : "hidden"
							)}
						></div>
					</div>
				))}
			</section>
		</div>
	);
}
