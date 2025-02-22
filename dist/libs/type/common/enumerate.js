"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerate = enumerate;
const type_match_1 = require("../../error/type-match");
const custom_type_1 = require("../custom-type");
function enumerate(...strs) {
    if (strs.length > 65535)
        throw new Error("Max enumeration items length is 64535");
    return (0, custom_type_1.customType)({
        decode(buffer) {
            return strs[buffer.readUint16()];
        },
        encode(buffer, value) {
            const index = strs.indexOf(value);
            if (index === -1)
                throw new type_match_1.TypeMatchError(`Enum doesn't contain ${value}`);
            buffer.writeUint16(index);
        },
        guard(data) {
            return strs.includes(String(data));
        },
        name: `Enum<${strs.join("|")}>`,
    });
}
