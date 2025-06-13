import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import {
	calculateNewVersion,
	generateReleaseNotes,
	parseArgs,
	type Package,
	type DeployOptions
} from "./index";

describe("bun-deploy", () => {
	describe("calculateNewVersion", () => {
		it("should increment patch version", () => {
			expect(calculateNewVersion("1.0.0", "patch")).toBe("1.0.1");
		});

		it("should increment minor version", () => {
			expect(calculateNewVersion("1.0.0", "minor")).toBe("1.1.0");
		});

		it("should increment major version", () => {
			expect(calculateNewVersion("1.0.0", "major")).toBe("2.0.0");
		});

		it("should throw error for invalid version", () => {
			expect(() => calculateNewVersion("invalid", "patch")).toThrow();
		});
	});

	describe("generateReleaseNotes", () => {
		const mockPackages: Package[] = [
			{
				path: "/path/to/pkg1",
				packageJson: {
					name: "@org/pkg1",
					version: "1.0.0"
				}
			},
			{
				path: "/path/to/pkg2",
				packageJson: {
					name: "@org/pkg2",
					version: "1.0.0"
				}
			}
		];

		it("should generate release notes with correct format", () => {
			const notes = generateReleaseNotes("1.0.1", mockPackages, "patch");
			
			expect(notes).toContain("## Release v1.0.1");
			expect(notes).toContain("- @org/pkg1@1.0.1");
			expect(notes).toContain("- @org/pkg2@1.0.1");
			expect(notes).toContain("This release includes patch version updates to @org/pkg1, @org/pkg2");
		});

		it("should handle single package", () => {
			const singlePackage: Package[] = [mockPackages[0]!];
			const notes = generateReleaseNotes("1.0.1", singlePackage, "patch");
			
			expect(notes).toContain("- @org/pkg1@1.0.1");
			expect(notes).toContain("This release includes patch version updates to @org/pkg1");
		});
	});

	describe("parseArgs", () => {
		let originalArgv: string[];

		beforeEach(() => {
			originalArgv = process.argv;
		});

		afterEach(() => {
			process.argv = originalArgv;
		});

		it("should parse default options", () => {
			process.argv = ["node", "bun-deploy"];
			const options = parseArgs();
			
			expect(options).toEqual({
				releaseType: "patch",
				dryRun: false,
				skipGit: false,
				skipRelease: false
			});
		});

		it("should parse major version option", () => {
			process.argv = ["node", "bun-deploy", "--major"];
			const options = parseArgs();
			
			expect(options.releaseType).toBe("major");
		});

		it("should parse minor version option", () => {
			process.argv = ["node", "bun-deploy", "--minor"];
			const options = parseArgs();
			
			expect(options.releaseType).toBe("minor");
		});

		it("should parse dry run option", () => {
			process.argv = ["node", "bun-deploy", "--dry-run"];
			const options = parseArgs();
			
			expect(options.dryRun).toBe(true);
		});

		it("should parse skip git option", () => {
			process.argv = ["node", "bun-deploy", "--skip-git"];
			const options = parseArgs();
			
			expect(options.skipGit).toBe(true);
		});

		it("should parse skip release option", () => {
			process.argv = ["node", "bun-deploy", "--skip-release"];
			const options = parseArgs();
			
			expect(options.skipRelease).toBe(true);
		});

		it("should parse multiple options", () => {
			process.argv = ["node", "bun-deploy", "--major", "--dry-run", "--skip-git"];
			const options = parseArgs();
			
			expect(options).toEqual({
				releaseType: "major",
				dryRun: true,
				skipGit: true,
				skipRelease: false
			});
		});
	});
}); 