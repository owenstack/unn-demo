import { PayForm } from "@/components/pay-form";

export default function Page({ params }: { params: { r: string } }) {
	return <PayForm rrr={params.r} />;
}
