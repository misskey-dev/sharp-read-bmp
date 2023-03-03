/// <reference types="node" />
import sharp from 'sharp';
export declare function sharpBmp(source: Buffer | Int8Array | Uint8Array | Uint8ClampedArray | string, type: string, options?: sharp.SharpOptions): Promise<sharp.Sharp>;
