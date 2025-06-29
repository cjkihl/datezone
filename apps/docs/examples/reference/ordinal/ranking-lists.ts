import { formatOrdinal } from "datezone";

// Ranking Lists
function createRankingList(items: string[], locale = "en"): string[] {
	return items.map((item, index) => {
		const rank = formatOrdinal(index + 1, locale);
		return `${rank} place: ${item}`;
	});
}

const competitors = ["Alice", "Bob", "Charlie", "Diana"];

console.log("=== Competition Rankings ===\n");

console.log("English:");
createRankingList(competitors, "en").forEach((ranking) => console.log(ranking));
// ["1st place: Alice", "2nd place: Bob", "3rd place: Charlie", "4th place: Diana"]

console.log("\nSpanish:");
createRankingList(competitors, "es").forEach((ranking) => console.log(ranking));
// ["1º place: Alice", "2º place: Bob", "3º place: Charlie", "4º place: Diana"]

console.log("\nFrench:");
createRankingList(competitors, "fr").forEach((ranking) => console.log(ranking));
// ["1er place: Alice", "2e place: Bob", "3e place: Charlie", "4e place: Diana"]

// More comprehensive ranking example
function createSportsLeaderboard(
	teams: { name: string; points: number }[],
	locale = "en",
): void {
	// Sort by points (descending)
	const sortedTeams = teams.sort((a, b) => b.points - a.points);

	console.log("\n=== Sports Leaderboard ===");
	sortedTeams.forEach((team, index) => {
		const position = formatOrdinal(index + 1, locale);
		console.log(`${position}: ${team.name} (${team.points} points)`);
	});
}

const soccerTeams = [
	{ name: "Manchester United", points: 78 },
	{ name: "Liverpool", points: 82 },
	{ name: "Arsenal", points: 75 },
	{ name: "Chelsea", points: 71 },
	{ name: "Tottenham", points: 68 },
];

createSportsLeaderboard(soccerTeams, "en");

// Race results with times
function formatRaceResults(
	results: { name: string; time: string }[],
	locale = "en",
): void {
	console.log("\n=== Race Results ===");
	results.forEach((result, index) => {
		const position = formatOrdinal(index + 1, locale);
		console.log(`${position}: ${result.name} - ${result.time}`);
	});
}

const raceResults = [
	{ name: "Lightning McQueen", time: "1:23.456" },
	{ name: "Cruz Ramirez", time: "1:24.123" },
	{ name: "Jackson Storm", time: "1:24.789" },
	{ name: "Bobby Swift", time: "1:25.234" },
];

formatRaceResults(raceResults, "en");
formatRaceResults(raceResults, "de");

// Academic rankings
function createGradeRankings(
	students: { name: string; grade: number }[],
	locale = "en",
): void {
	const sorted = students.sort((a, b) => b.grade - a.grade);

	console.log("\n=== Academic Rankings ===");
	sorted.forEach((student, index) => {
		const rank = formatOrdinal(index + 1, locale);
		console.log(`${rank}: ${student.name} (${student.grade}%)`);
	});
}

const students = [
	{ grade: 95, name: "Emma" },
	{ grade: 87, name: "Liam" },
	{ grade: 92, name: "Olivia" },
	{ grade: 89, name: "Noah" },
	{ grade: 94, name: "Ava" },
];

createGradeRankings(students, "en");
createGradeRankings(students, "fr");
