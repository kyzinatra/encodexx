export class OutOfRangeError extends RangeError {
	constructor(type: string, val: number | string | bigint) {
		super(`Out of range: ${type} type cannot be assigned to the number ${val}`);
	}
}
