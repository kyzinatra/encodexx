"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = schema;
const serializer_1 = require("../../serializer");
const custom_type_1 = require("../custom-type");
function schema(type, discriminateBy) {
    const serializer = new serializer_1.Serializer(type, { resetCursor: false });
    const field = discriminateBy && type[discriminateBy];
    const guardSerializer = field ? new serializer_1.Serializer(field, { resetCursor: false }) : null;
    return (0, custom_type_1.customType)({
        decode: (buff) => serializer.decode(buff),
        encode: (val, buff) => serializer.encode(val, buff),
        guard: (val) => {
            if (guardSerializer && discriminateBy)
                return guardSerializer.guard(val?.[discriminateBy]);
            return serializer.guard(val);
        },
        name: `Schema<${serializer.name}>`,
    });
}
