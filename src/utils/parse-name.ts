export function parseName(name: string | symbol) {
	if (typeof name === "symbol") return name.description;
	return name;
}
