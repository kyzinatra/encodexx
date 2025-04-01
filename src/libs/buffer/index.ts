import { TNumberTypes, TYPES_RANGES } from "../constants/types";
import { OutOfRangeError } from "../error/out-of-range";

const KB = 1024;

export class DataBuffer {
	private _cursor: number = 0;

	private ensureCapacity(requiredCapacity: number) {
		this.size = Math.max(this.size, requiredCapacity);
		const newBuffer = new ArrayBuffer(this.size);
		const newUnitView = new Uint8Array(newBuffer);
		newUnitView.set(this.unitView, 0);

		this._buffer = newBuffer;
		this.unitView = newUnitView;
		this.view = new DataView(newBuffer);
	}

	private set cursor(n: number) {
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
	private _buffer: ArrayBuffer;
	private view: DataView;
	private unitView: Uint8Array;

	get buffer() {
		return this._buffer.slice(0, this.cursor);
	}
	get uint8Array() {
		return this.unitView.slice(0, this.cursor);
	}
	get length() {
		return this.cursor;
	}

	private textDecoder = new TextDecoder();
	private textEncoder = new TextEncoder();

	constructor(newBuffer?: ArrayBuffer, private size = KB) {
		this._buffer = newBuffer ? newBuffer : new ArrayBuffer(size);
		this.size = this._buffer.byteLength;
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

		//@ts-expect-error we know that _buffer is Uint8Array
		this.cursor += _buffer.length;
		//@ts-expect-error we know that _buffer is Uint8Array
		this.unitView.set(_buffer, this.cursor - _buffer.length);
	}
	readBuffer(length: number) {
		const data = this.unitView.subarray(this.cursor, this.cursor + length);
		this.cursor += length;
		return data;
	}

	writeUlebNumber128(value: number) {
		while (value > 0x7f) {
			this.unitView[this.cursor] = (value & 0x7f) | 0b10000000;
			this.cursor++;
			value >>= 7;
		}

		this.unitView[this.cursor] = value & 0x7f;
		this.cursor++;
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
	readUleb128Number() {
		let result = 0;
		let shift = 0;

		while (true) {
			const byte = this.unitView[this.cursor];
			this.cursor++;
			result |= (byte & 0x7f) << shift;
			shift += 7;

			if ((byte & 0b10000000) === 0) {
				break;
			}
		}

		return result;
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

		this.cursor += 1;
		this.unitView[this.cursor - 1] = val & 0xff;
	}
	readInt8() {
		return (this.readUint8() << 24) >> 24;
	}

	writeUint8(val: number) {
		this.check(val, "uint8");
		this.cursor += 1;
		this.unitView[this.cursor - 1] = val & 0xff;
	}
	readUint8() {
		this.cursor += 1;
		return this.unitView[this.cursor - 1];
	}

	writeInt16(val: number) {
		this.check(val, "int16");

		this.cursor += 2;
		this.unitView[this.cursor - 2] = val & 0xff;
		this.unitView[this.cursor - 1] = (val >> 8) & 0xff;
	}
	readInt16() {
		return (this.readUint16() << 16) >> 16;
	}

	writeUint16(val: number) {
		this.check(val, "uint16");

		this.cursor += 2;
		this.unitView[this.cursor - 2] = val & 0xff;
		this.unitView[this.cursor - 1] = (val >> 8) & 0xff;
	}
	readUint16() {
		this.cursor += 2;
		return this.unitView[this.cursor - 2] | (this.unitView[this.cursor - 1] << 8);
	}

	writeInt32(val: number) {
		this.check(val, "int32");

		this.cursor += 4;
		this.unitView[this.cursor - 4] = val & 0xff;
		this.unitView[this.cursor - 3] = (val >> 8) & 0xff;
		this.unitView[this.cursor - 2] = (val >> 16) & 0xff;
		this.unitView[this.cursor - 1] = (val >> 24) & 0xff;
	}
	readInt32() {
		this.cursor += 4;
		return (
			this.unitView[this.cursor - 4] |
			(this.unitView[this.cursor - 3] << 8) |
			(this.unitView[this.cursor - 2] << 16) |
			(this.unitView[this.cursor - 1] << 24)
		);
	}

	writeUint32(val: number) {
		this.check(val, "uint32");

		this.cursor += 4;
		this.unitView[this.cursor - 4] = val & 0xff;
		this.unitView[this.cursor - 3] = (val >> 8) & 0xff;
		this.unitView[this.cursor - 2] = (val >> 16) & 0xff;
		this.unitView[this.cursor - 1] = (val >> 24) & 0xff;
	}
	readUint32() {
		this.cursor += 4;
		return (
			(this.unitView[this.cursor - 4] |
				(this.unitView[this.cursor - 3] << 8) |
				(this.unitView[this.cursor - 2] << 16) |
				(this.unitView[this.cursor - 1] << 24)) >>>
			0
		);
	}

	writeFloat32(val: number) {
		this.cursor += 4;
		this.view.setFloat32(this.cursor - 4, val, true);
	}
	readFloat32() {
		this.cursor += 4;
		return this.view.getFloat32(this.cursor - 4, true);
	}

	writeFloat64(val: number) {
		this.cursor += 8;
		this.view.setFloat64(this.cursor - 8, val, true);
	}
	readFloat64() {
		this.cursor += 8;
		return this.view.getFloat64(this.cursor - 8, true);
	}

	writeBigInt64(val: bigint) {
		this.check(val, "bigint64");
		this.cursor += 8;
		this.view.setBigInt64(this.cursor - 8, val, true);
	}
	readBigInt64() {
		this.cursor += 8;
		return this.view.getBigInt64(this.cursor - 8, true);
	}

	writeBigUint64(val: bigint) {
		this.check(val, "biguint64");
		this.cursor += 8;
		this.view.setBigUint64(this.cursor - 8, val, true);
	}
	readBigUint64() {
		this.cursor += 8;
		return this.view.getBigUint64(this.cursor - 8, true);
	}

	writeString(val: string) {
		if (this._buffer.byteLength - this.cursor < val.length * 4 + 4) {
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
