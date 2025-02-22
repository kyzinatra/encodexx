"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customType = exports.t = exports.Serializer = exports.TypeMatchError = void 0;
const serializer_1 = require("./libs/serializer");
const custom_type_1 = require("./libs/type/custom-type");
var type_match_1 = require("./libs/error/type-match");
Object.defineProperty(exports, "TypeMatchError", { enumerable: true, get: function () { return type_match_1.TypeMatchError; } });
var serializer_2 = require("./libs/serializer");
Object.defineProperty(exports, "Serializer", { enumerable: true, get: function () { return serializer_2.Serializer; } });
var common_1 = require("./libs/type/common");
Object.defineProperty(exports, "t", { enumerable: true, get: function () { return common_1.t; } });
var custom_type_2 = require("./libs/type/custom-type");
Object.defineProperty(exports, "customType", { enumerable: true, get: function () { return custom_type_2.customType; } });
const myType = (0, custom_type_1.customType)({
    decode(buffer) {
        return {
            name: buffer.readString(),
            age: buffer.readUint8(),
        };
    },
    encode(buffer, val) {
        buffer.writeString(val.name);
        buffer.writeUint8(val.age);
    },
    guard(data) {
        if (typeof data !== "object" || !data)
            return false;
        if (!("name" in data) || typeof data.name !== "string")
            return false;
        if (!("age" in data) || typeof data.age !== "number")
            return false;
        return true;
    },
    name: "myTtype",
});
new serializer_1.Serializer({
    val: myType,
});
