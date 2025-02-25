"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = optional;
const serializer_1 = require("../../serializer");
const custom_type_1 = require("../custom-type");
function optional(type) {
    const ser = new serializer_1.Serializer(type, { resetCursor: false });
    return (0, custom_type_1.customType)({
        decode(buffer) {
            if (buffer.readBoolean())
                return;
            return ser.decode(buffer);
        },
        encode(value, buffer) {
            if (value === undefined)
                return buffer.writeBoolean(true);
            buffer.writeBoolean(false);
            return ser.encode(value, buffer);
        },
        guard(data) {
            if (data === undefined)
                return true;
            return ser.guard(data);
        },
        name: `Optional${ser.name}`,
    });
}
