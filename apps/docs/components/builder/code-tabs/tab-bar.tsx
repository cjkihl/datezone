import { CodeTab } from "./code-tabs";

interface File {
	id: string;
	name: string;
	content: string;
}

interface TabBarProps {
	files: File[];
	activeFileId: string;
	onTabClick: (fileId: string) => void;
	onTabClose: (fileId: string) => void;
}

export function TabBar({
	files,
	activeFileId,
	onTabClick,
	onTabClose,
}: TabBarProps) {
	return (
		<div className="flex bg-muted border-b border-border">
			{files.map((file) => (
				<CodeTab
					fileName={file.name}
					isActive={file.id === activeFileId}
					key={file.id}
					onClick={() => onTabClick(file.id)}
					onClose={() => onTabClose(file.id)}
				/>
			))}
		</div>
	);
}
