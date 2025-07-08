export default function TerminalPrefix() {
	return (
		<p className="md:text-sm text-xs font-mono select-none">
			<span>
				<span className="text-[#44c872]">git:</span>
				<span className="text-[#71aef0]">(main) </span>
			</span>
		</p>
	);
}
