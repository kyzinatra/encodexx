import { TNumberTypes, TYPES_RANGES } from "../constants/types";
import { OutOfRangeError } from "../error/out-of-range";

const KB = 1024;

export class DataBuffer {
	private _cursor: number = 0;

	private set cursor(n: number) {
		//? rsize
		if (n >= this.size) {
			this.size = n > this.size * 2 ? n + KB : this.size * 2;
			const newBuffer = new ArrayBuffer(this.size);
			const newUnitView = new Uint8Array(newBuffer);
			newUnitView.set(this.unitView, 0);

			this._buffer = newBuffer;
			this.unitView = newUnitView;
			this.view = new DataView(newBuffer);
		}

		this._cursor = n;
		if (this._cursor > this.end) this.end = this._cursor;
	}
	get cursor() {
		return this._cursor;
	}
	resetCursor() {
		this.cursor = 0;
		this.end = 0;
	}
	private moveCursorBy(n: number) {
		this.cursor += n;
	}
	private end: number = 0;
	private _buffer: ArrayBuffer;
	private view: DataView;
	private unitView: Uint8Array;

	get buffer() {
		return this._buffer.slice(0, this.end);
	}
	get uint8Array() {
		return this.unitView.slice(0, this.end);
	}
	get length() {
		return this.end;
	}

	private textDecoder = new TextDecoder();
	private textEncoder = new TextEncoder();

	constructor(newBuffer?: ArrayBuffer, private size = KB) {
		this._buffer = newBuffer ? newBuffer : new ArrayBuffer(size);
		this.view = new DataView(this._buffer);
		this.unitView = new Uint8Array(this._buffer);
	}

	private check(val: number | bigint, type: keyof TNumberTypes) {
		if (val < TYPES_RANGES[type][0] || val > TYPES_RANGES[type][1]) throw new OutOfRangeError(type, val);
	}

	writeBuffer(_buffer: ArrayBuffer | Uint8Array) {
		if (_buffer instanceof ArrayBuffer) {
			_buffer = new Uint8Array(_buffer);
		}

		//? Typescript check
		if (_buffer instanceof ArrayBuffer) return;

		this.moveCursorBy(_buffer.length);
		this.unitView.set(_buffer, this.cursor - _buffer.length);
	}
	readBuffer(length: number) {
		const data = this._buffer.slice(this.cursor, this.cursor + length);
		this.moveCursorBy(length);
		return data;
	}

	writeUleb128(value: bigint) {
		while (value > 0x7fn) {
			this.unitView[this.cursor] = Number((value & 0x7fn) | 0b10000000n);
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

	writeSleb128(value: bigint) {
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

	writeInt8(val: number) {
		this.check(val, "int8");

		this.moveCursorBy(1);
		this.view.setInt8(this.cursor - 1, val);
	}
	readInt8() {
		this.moveCursorBy(1);
		return this.view.getInt8(this.cursor - 1);
	}

	writeUint8(val: number) {
		this.check(val, "uint8");

		this.moveCursorBy(1);
		this.view.setUint8(this.cursor - 1, val);
	}
	readUint8() {
		this.moveCursorBy(1);
		return this.view.getUint8(this.cursor - 1);
	}

	writeInt16(val: number) {
		this.check(val, "int16");

		this.moveCursorBy(2);
		this.view.setInt16(this.cursor - 2, val);
	}
	readInt16() {
		this.moveCursorBy(2);
		return this.view.getInt16(this.cursor - 2);
	}

	writeUint16(val: number) {
		this.check(val, "uint16");

		this.moveCursorBy(2);
		this.view.setUint16(this.cursor - 2, val);
	}
	readUint16() {
		this.moveCursorBy(2);
		return this.view.getUint16(this.cursor - 2);
	}

	writeInt32(val: number) {
		this.check(val, "int32");

		this.moveCursorBy(4);
		this.view.setInt32(this.cursor - 4, val);
	}
	readInt32() {
		this.moveCursorBy(4);
		return this.view.getInt32(this.cursor - 4);
	}

	writeUint32(val: number) {
		this.check(val, "uint32");

		this.moveCursorBy(4);
		this.view.setUint32(this.cursor - 4, val);
	}
	readUint32() {
		this.moveCursorBy(4);
		return this.view.getUint32(this.cursor - 4);
	}

	writeFloat32(val: number) {
		this.moveCursorBy(4);
		this.view.setFloat32(this.cursor - 4, val);
	}
	readFloat32() {
		this.moveCursorBy(4);
		return this.view.getFloat32(this.cursor - 4);
	}

	writeFloat64(val: number) {
		this.moveCursorBy(8);
		this.view.setFloat64(this.cursor - 8, val);
	}
	readFloat64() {
		this.moveCursorBy(8);
		return this.view.getFloat64(this.cursor - 8);
	}

	writeBigInt64(val: bigint) {
		this.check(val, "bigint64");
		this.moveCursorBy(8);
		this.view.setBigInt64(this.cursor - 8, val);
	}
	readBigInt64() {
		this.moveCursorBy(8);
		return this.view.getBigInt64(this.cursor - 8);
	}

	writeBigUint64(val: bigint) {
		this.check(val, "biguint64");
		this.moveCursorBy(8);
		this.view.setBigUint64(this.cursor - 8, val);
	}
	readBigUint64() {
		this.moveCursorBy(8);
		return this.view.getBigUint64(this.cursor - 8);
	}

	writeString(val: string) {
		const text = this.textEncoder.encode(val);
		this.writeUint32(text.length);
		this.writeBuffer(text);
	}
	readString() {
		const length = this.readUint32();
		const text = this.readBuffer(length);
		return this.textDecoder.decode(text);
	}

	writeBoolean(val: boolean) {
		this.writeUint8(val ? 255 : 0);
	}
	readBoolean() {
		return !!this.readUint8();
	}

	writeDate(val: Date) {
		const date = BigInt(+val);
		this.writeBigUint64(date);
	}
	readDate() {
		return new Date(Number(this.readBigUint64()));
	}
}
