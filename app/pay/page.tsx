import { PayForm } from "@/components/pay-form";

export default function Page({
	searchParams,
}: { searchParams: { r: string } }) {
	const rrr = searchParams.r;
	return <PayForm rrr={rrr} />;
}
