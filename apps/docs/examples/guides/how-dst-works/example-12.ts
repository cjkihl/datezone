// Always test your date logic around DST transitions
const dstTransitions = [
	"2024-03-10", // Spring forward
	"2024-11-03", // Fall back
	"2025-03-09", // Next spring forward
	"2025-11-02", // Next fall back
];

dstTransitions.forEach((date) => {
	// Test your date arithmetic around these dates
	testDateLogic(new Date(date).getTime());
});
