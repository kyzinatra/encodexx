"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.or = or;
const custom_type_1 = require("../custom-type");
function or(...types) {
    if (types.length > 255)
        throw new Error("Too many types provided: Maximum allowed is 255");
    return (0, custom_type_1.customType)({
        decode(buff) {
            const index = buff.readUint8();
            return types[index].decode(buff);
        },
        encode(buffer, val) {
            const typeIndex = types.findIndex((el) => el.guard(val));
            if (typeIndex === -1)
                throw new Error("No matching type found among the provided types");
            buffer.writeUint8(typeIndex);
            types[typeIndex].encode(buffer, val);
        },
        guard(data) {
            return types.some((el) => el.guard(data));
        },
        name: `Or<${types.map((el) => el.name).join("|")}>`,
    });
}
