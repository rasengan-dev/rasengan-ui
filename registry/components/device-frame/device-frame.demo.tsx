import { DeviceFrame } from "@/components/ui/device-frame";

export default function DeviceFrameDemo() {
	return (
		<DeviceFrame url="senbon.app/dashboard" className="max-w-2xl">
			<img src="/placeholders/product-dashboard.svg" alt="The Senbon dashboard: this month's invoices, an overdue alert and payments per day" width={1280} height={800} />
		</DeviceFrame>
	);
}
