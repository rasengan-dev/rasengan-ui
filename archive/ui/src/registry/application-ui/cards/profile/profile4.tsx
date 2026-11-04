import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";

const registryUrl = import.meta.env["RASENGAN_REGISTRY_URL"] || "https://registry.rasengan.dev"

export const ProfileCard4 = () => {
	return (
		<article className='relative w-full max-w-[320px] h-[400px] rounded-3xl p-1 shadow-md bg-background overflow-hidden'>
			<div className='absolute inset-0'>
				<img
					src={`${registryUrl}/static/images/teams/dilane-kombou.png`}
					alt='Avatar'
					className='rounded-[22px] object-top h-full w-full'
				/>
			</div>
			<div className='absolute bottom-0 h-1/2 inset-x-0 bg-gradient-to-b from-transparent to-[#49291F] z-10 rounded-[22px]'></div>

			<div className='relative h-full z-50 p-4 flex flex-col justify-between'>
				<div className='w-full flex justify-end'>
					<Button size='icon' className='bg-foreground/50'>
						<Plus />
					</Button>
				</div>

				<div className='w-full h-[60px] rounded-lg bg-background p-3 flex justify-between items-center'>
					<div>
						<h2 className='font-bold text-sm text-foreground'>Dilane Kombou</h2>
						<p className='text-[12px] text-foreground/60'>
							Founder & CEO Rasengan Labs
						</p>
					</div>

					<div>
						<Button
							size='icon'
							variant={"outline"}
							className='rounded-full text-foreground/70'
						>
							<ArrowRight />
						</Button>
					</div>
				</div>
			</div>
		</article>
	);
};
