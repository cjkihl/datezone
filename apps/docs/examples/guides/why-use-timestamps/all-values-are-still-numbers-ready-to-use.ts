const data = {
	createdAt: Date.now(),
	scheduledFor: new Date("2024-12-31T23:59:59Z").getTime(),
	updatedAt: Date.now(),
};

const json = JSON.stringify(data);
const parsed = JSON.parse(json);

// All values are intact
console.log(typeof parsed.createdAt); // "number"
