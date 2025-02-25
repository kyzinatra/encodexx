"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleb128 = void 0;
const custom_type_1 = require("../custom-type");
exports.sleb128 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readSleb128();
    },
    encode(val, buffer) {
        buffer.writeSleb128(val);
    },
    guard(data) {
        return typeof data === "bigint";
    },
    name: "sleb128",
});
