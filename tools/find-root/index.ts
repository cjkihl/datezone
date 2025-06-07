import path from "node:path";
import { findUp } from "find-up";

const lockfiles: Record<string, string> = {
	"bun.lockb": "bun",
	"bun.lock": "bun",
	"pnpm-lock.yaml": "pnpm",
	"yarn.lock": "yarn",
	"package-lock.json": "npm",
};

/**
 * Finds the root directory of the monorepo by looking for lockfiles
 * @returns {Promise<RootResult>} The root directory info
 * @throws {Error} When no lockfile is found
 * @example
 * const { root, packageManager } = await findRoot();
 */
export async function findRoot(): Promise<{
	root: string;
	lockfile: string;
	packageManager: string;
}> {
	const lockfile = await findUp(Object.keys(lockfiles));
	if (!lockfile) {
		console.error("Could not find root lockfile");
		throw new Error(
			`Could not find root directory from ${process.cwd()}. Was looking for one of ${Object.keys(lockfiles).join(", ")}`,
		);
	}
	console.log(`Lockfile: ${lockfile}`);
	const root = path.dirname(lockfile);
	const name = path.basename(lockfile);
	const packageManager = lockfiles[name];
	if (!packageManager) {
		throw new Error(
			`Could not detect package manager from lockfile: ${lockfile}`,
		);
	}
	return { root, lockfile, packageManager };
}
