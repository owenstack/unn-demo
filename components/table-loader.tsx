import ContentLoader from "react-content-loader";

export function TableLoader() {
	return (
		<ContentLoader
			speed={2}
			width={480}
			height={360}
			viewBox="0 0 480 360"
			backgroundColor="#f1eaea"
			foregroundColor="#3e8f38"
		>
			<rect x="25" y="80" rx="3" ry="3" width="311" height="33" />
			<rect x="348" y="80" rx="7" ry="7" width="60" height="33" />
			<rect x="417" y="82" rx="7" ry="7" width="60" height="33" />
			<rect x="25" y="124" rx="3" ry="3" width="311" height="33" />
			<rect x="348" y="124" rx="7" ry="7" width="60" height="33" />
			<rect x="417" y="126" rx="7" ry="7" width="60" height="33" />
			<rect x="26" y="170" rx="3" ry="3" width="311" height="33" />
			<rect x="349" y="170" rx="7" ry="7" width="60" height="33" />
			<rect x="418" y="172" rx="7" ry="7" width="60" height="33" />
			<rect x="26" y="214" rx="3" ry="3" width="311" height="33" />
			<rect x="349" y="214" rx="7" ry="7" width="60" height="33" />
			<rect x="418" y="216" rx="7" ry="7" width="60" height="33" />
		</ContentLoader>
	);
}
