// Test the hours around DST transitions
const testHours = [-2, -1, 0, 1, 2, 3, 4]; // Hours relative to transition

testHours.forEach((hourOffset) => {
	const _testTime = dstTransitionTime + hourOffset * 60 * 60 * 1000;
	// Test your logic with this timestamp
});
