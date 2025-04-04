export declare class DataBuffer {
    private size;
    private _cursor;
    private ensureCapacity;
    private set cursor(value);
    get cursor(): number;
    resetCursor(): void;
    private _buffer;
    private view;
    private unitView;
    get buffer(): ArrayBuffer;
    get uint8Array(): Uint8Array<ArrayBuffer>;
    get length(): number;
    private textDecoder;
    private textEncoder;
    constructor(newBuffer?: ArrayBuffer, size?: number);
    private check;
    writeBuffer(_buffer: ArrayBuffer | Uint8Array): void;
    readBuffer(length: number): Uint8Array<ArrayBufferLike>;
    writeUlebNumber128(value: number): void;
    writeUleb128(value: bigint): void;
    readUleb128Number(): number;
    readUleb128(): bigint;
    writeSleb128(value: bigint): void;
    readSleb128(): bigint;
    writeInt8(val: number): void;
    readInt8(): number;
    writeUint8(val: number): void;
    readUint8(): number;
    writeInt16(val: number): void;
    readInt16(): number;
    writeUint16(val: number): void;
    readUint16(): number;
    writeInt32(val: number): void;
    readInt32(): number;
    writeUint32(val: number): void;
    readUint32(): number;
    writeFloat32(val: number): void;
    readFloat32(): number;
    writeFloat64(val: number): void;
    readFloat64(): number;
    writeBigInt64(val: bigint): void;
    readBigInt64(): bigint;
    writeBigUint64(val: bigint): void;
    readBigUint64(): bigint;
    writeString(val: string): void;
    readString(): string;
    writeBoolean(val: boolean): void;
    readBoolean(): boolean;
    writeDate(val: Date): void;
    readDate(): Date;
}
