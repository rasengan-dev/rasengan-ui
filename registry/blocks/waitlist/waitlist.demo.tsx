import { Waitlist } from "@/components/blocks/waitlist";

export default function WaitlistDemo() {
	return <Waitlist onSubmit={() => new Promise((resolve) => setTimeout(resolve, 800))} />;
}
