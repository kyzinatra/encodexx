export class OutdatedError extends Error {
	constructor(v1: string, v2: string) {
		super(`Buffer is outdated. Version ${v1} not equal ${v2}`);
	}
}
