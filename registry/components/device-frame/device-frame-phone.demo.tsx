import { DeviceFrame } from "@/components/ui/device-frame";

/** The phone: the screen fills it, under an island and above a home bar. */
export default function DeviceFramePhoneDemo() {
	return (
		<DeviceFrame variant="phone" className="w-56">
			<img src="/placeholders/product-phone.svg" alt="Senbon on a phone: an invoice ready to pay by mobile money" width={390} height={844} />
		</DeviceFrame>
	);
}
