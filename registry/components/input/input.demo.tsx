import { Input } from "@/components/ui/input";

export default function InputDemo() {
	return (
		<div className="grid w-full max-w-sm gap-3">
			<Input type="email" placeholder="naruto@konoha.dev" aria-label="Email" />
			<Input defaultValue="Hidden Leaf" aria-label="Workspace" />
			<Input defaultValue="chakra" type="password" aria-label="Password" aria-invalid />
			<Input defaultValue="Team 7" aria-label="Team" disabled />
		</div>
	);
}
