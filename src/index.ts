import { Serializer } from "./libs/serializer";

export { Serializer } from "./libs/serializer";
export { t } from "./libs/type/common";
export { TSchema } from "./libs/serializer/index.type";
export { ArraySingle, ExtractObj } from "./types/types";
export { customType } from "./libs/type/custom-type";

const schema1 = {};
const schema2 = {};

console.log(Serializer.equal(schema1, schema2));
