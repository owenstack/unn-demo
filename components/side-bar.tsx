import { sidebarList } from "@/lib/constants";
import { MenuLink } from "./menu-link";

export function SideBar() {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-bold ">School Dashboard</h2>
			</div>
			<nav className="flex-1 px-4 mt-6 space-y-2">
				{sidebarList.map(({ name, url, icon }) => (
					<MenuLink url={url} name={name} icon={icon} key={url} />
				))}
			</nav>
		</div>
	);
}
