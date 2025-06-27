import Features from "@/components/features";
import Hero from "@/components/landing/hero";
import Section from "@/components/landing/section";

async function getGitHubStars() {
	try {
		const response = await fetch(
			"https://api.github.com/repos/cjkihl/datezone",
			{
				next: {
					revalidate: 60,
				},
			},
		);
		if (!response?.ok) {
			return null;
		}
		const json = await response.json();
		const stars = Number.parseInt(json.stargazers_count).toLocaleString();
		return stars;
	} catch {
		return null;
	}
}

export default async function HomePage() {
	const stars = await getGitHubStars();
	return (
		<main className="h-min mx-auto overflow-x-hidden">
			<Section
				className="mb-1 overflow-y-clip"
				crosses
				crossesOffset="lg:translate-y-[5.25rem]"
				customPaddings
				id="hero"
			>
				<Hero />
				<Features stars={stars} />
				<hr className="h-px bg-gray-200" />
			</Section>
		</main>
	);
}
