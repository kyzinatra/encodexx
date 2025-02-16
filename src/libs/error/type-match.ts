export class TypeMatchError extends TypeError {
	constructor(msg: string = "") {
		super(`The provided type does not match the given value. ${msg}`);
	}
}
