"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBuffer = void 0;
const types_1 = require("../constants/types");
const out_of_range_1 = require("../error/out-of-range");
const KB = 1024;
class DataBuffer {
    ensureCapacity(requiredCapacity) {
        this.size = Math.max(this.size, requiredCapacity);
        const newBuffer = new ArrayBuffer(this.size);
        const newUnitView = new Uint8Array(newBuffer);
        newUnitView.set(this.unitView, 0);
        this._buffer = newBuffer;
        this.unitView = newUnitView;
        this.view = new DataView(newBuffer);
    }
    set cursor(n) {
        //? rsize
        if (n >= this.size) {
            const newSize = n > this.size * 2 ? n + this.size * 2 : this.size * 2;
            this.ensureCapacity(newSize);
        }
        this._cursor = n;
    }
    get cursor() {
        return this._cursor;
    }
    resetCursor() {
        this.cursor = 0;
    }
    get buffer() {
        return this._buffer.slice(0, this.cursor);
    }
    get uint8Array() {
        return this.unitView.slice(0, this.cursor);
    }
    get length() {
        return this.cursor;
    }
    constructor(newBuffer, size = KB) {
        this.size = size;
        this._cursor = 0;
        this.textDecoder = new TextDecoder();
        this.textEncoder = new TextEncoder();
        this._buffer = newBuffer ? newBuffer : new ArrayBuffer(size);
        this.size = this._buffer.byteLength;
        this.view = new DataView(this._buffer);
        this.unitView = new Uint8Array(this._buffer);
    }
    check(val, type) {
        if (val < types_1.TYPES_RANGES[type][0] || val > types_1.TYPES_RANGES[type][1])
            throw new out_of_range_1.OutOfRangeError(type, val);
    }
    writeBuffer(_buffer) {
        if (_buffer instanceof ArrayBuffer) {
            _buffer = new Uint8Array(_buffer);
        }
        //@ts-expect-error we know that _buffer is Uint8Array
        this.cursor += _buffer.length;
        //@ts-expect-error we know that _buffer is Uint8Array
        this.unitView.set(_buffer, this.cursor - _buffer.length);
    }
    readBuffer(length) {
        const data = this.unitView.subarray(this.cursor, this.cursor + length);
        this.cursor += length;
        return data;
    }
    writeUleb128(value) {
        while (value > 0x7fn) {
            this.unitView[this.cursor] = Number((value & 0x7fn) | 128n);
            this.cursor++;
            value >>= 7n;
        }
        this.unitView[this.cursor] = Number(value & 0x7fn);
        this.cursor++;
    }
    readUleb128() {
        let result = 0n;
        let shift = 0;
        while (true) {
            const byte = this.unitView[this.cursor];
            this.cursor++;
            result |= BigInt(byte & 0x7f) << BigInt(shift);
            shift += 7;
            if ((byte & 0b10000000) === 0) {
                break;
            }
        }
        return result;
    }
    writeSleb128(value) {
        while (true) {
            let currentByte = Number(value & 0x7fn);
            const signBitSet = (currentByte & 0x40) !== 0;
            value >>= 7n;
            const done = (value === 0n && !signBitSet) || (value === -1n && signBitSet);
            if (!done) {
                currentByte |= 0x80; //  continue bit
            }
            this.unitView[this.cursor] = currentByte;
            this.cursor++;
            if (done) {
                break;
            }
        }
    }
    readSleb128() {
        let result = 0n;
        let shift = 0n;
        while (true) {
            const byte = this.unitView[this.cursor];
            this.cursor++;
            result |= BigInt(byte & 0x7f) << shift;
            shift += 7n;
            if ((byte & 0x80) === 0) {
                if ((byte & 0x40) !== 0) {
                    result -= 1n << shift;
                }
                break;
            }
        }
        return result;
    }
    writeInt8(val) {
        this.check(val, "int8");
        this.cursor += 1;
        this.view.setInt8(this.cursor - 1, val);
    }
    readInt8() {
        this.cursor += 1;
        return this.view.getInt8(this.cursor - 1);
    }
    writeUint8(val) {
        this.check(val, "uint8");
        this.cursor += 1;
        this.view.setUint8(this.cursor - 1, val);
    }
    readUint8() {
        this.cursor += 1;
        return this.view.getUint8(this.cursor - 1);
    }
    writeInt16(val) {
        this.check(val, "int16");
        this.cursor += 2;
        this.view.setInt16(this.cursor - 2, val, true);
    }
    readInt16() {
        this.cursor += 2;
        return this.view.getInt16(this.cursor - 2, true);
    }
    writeUint16(val) {
        this.check(val, "uint16");
        this.cursor += 2;
        this.view.setUint16(this.cursor - 2, val, true);
    }
    readUint16() {
        this.cursor += 2;
        return this.view.getUint16(this.cursor - 2, true);
    }
    writeInt32(val) {
        this.check(val, "int32");
        this.cursor += 4;
        this.view.setInt32(this.cursor - 4, val, true);
    }
    readInt32() {
        this.cursor += 4;
        return this.view.getInt32(this.cursor - 4, true);
    }
    writeUint32(val) {
        this.check(val, "uint32");
        this.cursor += 4;
        this.view.setUint32(this.cursor - 4, val, true);
    }
    readUint32() {
        this.cursor += 4;
        return this.view.getUint32(this.cursor - 4, true);
    }
    writeFloat32(val) {
        this.cursor += 4;
        this.view.setFloat32(this.cursor - 4, val, true);
    }
    readFloat32() {
        this.cursor += 4;
        return this.view.getFloat32(this.cursor - 4, true);
    }
    writeFloat64(val) {
        this.cursor += 8;
        this.view.setFloat64(this.cursor - 8, val, true);
    }
    readFloat64() {
        this.cursor += 8;
        return this.view.getFloat64(this.cursor - 8, true);
    }
    writeBigInt64(val) {
        this.check(val, "bigint64");
        this.cursor += 8;
        this.view.setBigInt64(this.cursor - 8, val, true);
    }
    readBigInt64() {
        this.cursor += 8;
        return this.view.getBigInt64(this.cursor - 8, true);
    }
    writeBigUint64(val) {
        this.check(val, "biguint64");
        this.cursor += 8;
        this.view.setBigUint64(this.cursor - 8, val, true);
    }
    readBigUint64() {
        this.cursor += 8;
        return this.view.getBigUint64(this.cursor - 8, true);
    }
    writeString(val) {
        if (this._buffer.byteLength - this.cursor < val.length * 4) {
            this.ensureCapacity(this.size + val.length * 4 + this.size * 2);
        }
        const { written } = this.textEncoder.encodeInto(val, this.unitView.subarray(this.cursor + 4));
        this.writeUint32(written);
        this.cursor += written;
    }
    readString() {
        const length = this.readUint32();
        const text = this.readBuffer(length);
        return this.textDecoder.decode(text);
    }
    writeBoolean(val) {
        this.writeUint8(val ? 255 : 0);
    }
    readBoolean() {
        return !!this.readUint8();
    }
    writeDate(val) {
        const date = BigInt(+val);
        this.writeBigUint64(date);
    }
    readDate() {
        return new Date(Number(this.readBigUint64()));
    }
}
exports.DataBuffer = DataBuffer;
