"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uleb128 = void 0;
const custom_type_1 = require("../custom-type");
exports.uleb128 = (0, custom_type_1.customType)({
    decode(buff) {
        return buff.readUleb128();
    },
    encode(buffer, val) {
        buffer.writeUleb128(val);
    },
    guard(data) {
        return typeof data === "bigint" && data >= 0n;
    },
    name: "uleb128",
});
