import { TCustomType } from "../custom-type";
import { or } from "./or";
import { undef } from "./undef";

export function optional<T extends TCustomType>(type: T) {
	return or(type, undef);
}
