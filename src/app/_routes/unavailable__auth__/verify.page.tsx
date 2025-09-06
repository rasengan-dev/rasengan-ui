import AppLogo from "@/components/common/atoms/app-logo";
import ThemeButton from "@/components/common/atoms/theme-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, sleep } from "@/lib/utils";
import { authProvider } from "@/provider/data/auth";
import { avatars } from "@/provider/data/config";
import { userProvider } from "@/provider/data/users";
import { useAuthStore } from "@/store/auth";
import { Loader } from "lucide-react";
import { Link, PageComponent, useNavigate, useSearchParams } from "rasengan";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod/v4";

const nameSchema = z.string().min(3);

const Page: PageComponent = () => {
	const [searchParams] = useSearchParams();

	const userId = searchParams.get("userId");
	const secret = searchParams.get("secret");

	const [loading, setLoading] = useState(false);
	const [loadingVerify, setLoadingVerify] = useState(true);
	const [authMethod, setAuthMethod] = useState<"magic-link" | "oauth">(
		userId && secret ? "magic-link" : "oauth"
	);
	const [name, setName] = useState("");
	const [userExists, setUserExists] = useState(true);

	const { setUser } = useAuthStore();

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			await handleVerify();
		})();
	}, []);

	const handleVerify = async () => {
		// Check if userId and secret are present
		if (authMethod === "oauth") {
			// Oauth 2 scenario
			const { data } = await authProvider.createSession();

			if (data) {
				const user = data.user;

				setUser(user);

				await sleep(2000);

				navigate("/");
			}

			return;
		}

		// Verify if the user exists
		const { data: user } = await userProvider.getUser(userId!);

		if (!user) {
			await sleep(2000);

			setUserExists(false);
			setLoadingVerify(false);
			return;
		}

		const { data } = await authProvider.createSession(userId!, secret!);

		if (data) {
			const user = data.user;

			await sleep(2000);

			setUser(user);

			navigate("/");
		} else {
			toast.error("Generate a new magic link");
			navigate("/auth/signin");
		}
	};

	const handleCreateAccount = async () => {
		if (!handleVerifyForm()) {
			return;
		}

		setLoading(true);

		const { data } = await authProvider.createSession(userId!, secret!, name);

		if (data) {
			const user = data.user;

			await sleep(2000);

			setUser(user);

			navigate("/");
		}

		setLoading(false);
	};

	const handleVerifyForm = useCallback(() => {
		const result = nameSchema.safeParse(name);

		if (!result.success) {
			return false;
		}

		return true;
	}, [name]);

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
				{loadingVerify ? (
					<div className='h-[400px] flex flex-col items-center justify-center'>
						<div className='w-full h-auto flex flex-col items-center'>
							<AppLogo size='md' minimal />
							<h1 className='text-4xl font-medium text-foreground text-center'>
								We are almost done
							</h1>
						</div>

						<div className='w-full mt-10 flex gap-2 items-center justify-center text-foreground'>
							<Loader className='w-6 h-6 animate-spin' />
							<p>Verifying...</p>
						</div>
					</div>
				) : (
					<div className='w-full h-auto flex flex-col items-center'>
						<div className='w-full h-auto flex flex-col items-center'>
							<AppLogo size='md' minimal />
							<h1 className='text-4xl font-medium text-foreground text-center'>
								Let's finish creating your account
							</h1>
						</div>

						<div className='w-full h-auto flex flex-col mt-10'>
							<label htmlFor='name' className='text-foreground'>
								How do you prefer to be called?
							</label>
							<Input
								id='name'
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Enter your name'
								className='h-12 text-foreground rounded-xl mt-2'
							/>
						</div>

						<Button
							className='w-full mt-4 h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={handleCreateAccount}
							disabled={!handleVerifyForm() || loading}
						>
							{loading ? "Loading..." : "Continue"}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};

Page.metadata = {
	title: "Verify your email",
	description: "Verify your email to continue",
};

export default Page;
