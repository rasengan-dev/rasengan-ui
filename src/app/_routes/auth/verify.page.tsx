import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authProvider } from "@/provider/data/auth";
import { Link, PageComponent, useSearchParams } from "rasengan";
import { useEffect } from "react";

const Page: PageComponent = () => {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		(async () => {
			await handleVerify();
		})();
	}, []);

	const handleVerify = async () => {
		const userId = searchParams.get("userId");
		const secret = searchParams.get("secret");

		const { data } = await authProvider.createSession(userId!, secret!);

		console.log(data);
	};

	return (
		<section
			className={cn(
				"w-full min-h-screen h-auto flex flex-col p-4 bg-background"
			)}
		>
			<header className='w-full h-auto flex justify-between items-center'>
				<Link to='/' className='size-8'>
					<Button size={"icon"} variant={"ghost"} className='size-8'>
						<AppLogo size='sm' />
					</Button>
				</Link>

				<div className='w-auto h-auto flex items-center gap-2'>
					<ThemeButton />
				</div>
			</header>

			<div className='w-full max-w-[360px] mx-auto h-auto flex flex-col mt-20'>
				Verify your email
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Verify your email",
	description: "Verify your email to continue",
};

export default Page;
