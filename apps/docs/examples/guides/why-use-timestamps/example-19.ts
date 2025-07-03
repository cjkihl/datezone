// ❌ Storing Date objects (often serialized as strings)
interface OldEvent {
	startTime: Date;
}

// ✅ Storing timestamps
interface NewEvent {
	startTime: number;
}
