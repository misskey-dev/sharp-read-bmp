import { sharpBmp } from '../src';
import { fileTypeFromFile, fileTypeFromBuffer } from 'file-type';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import {expect, jest, test, describe} from '@jest/globals';
import { rimraf } from 'rimraf';
import { mkdirp } from 'mkdirp';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

await rimraf(resolve(_dirname, 'exports'));
await mkdirp(resolve(_dirname, 'exports'));

const favicon = resolve(_dirname, 'favicon.ico');
const faviconPng = resolve(_dirname, 'exports', 'favicon.png');
const bmp = resolve(_dirname, 'test.bmp');
const bmpPng = resolve(_dirname, 'exports', 'test.bmp.png');

describe('test', () => {
    test('check file-type works', async () => {
        const type = await fileTypeFromFile(favicon);
        expect(type?.mime).toBe('image/x-icon');
    });
    test('favicon.ico (string)', async () => {
        const type = await fileTypeFromFile(favicon);
        if (!type) throw new Error('file type not found');
        const sharpCtx = await sharpBmp(favicon, type.mime);
        const metadata = await sharpCtx.metadata();
        expect(metadata.format).toBe('raw');
        expect(metadata.width).toBe(128);
        expect(metadata.height).toBe(128);

        await sharpCtx.png().toFile(faviconPng);
        const pngType = await fileTypeFromFile(faviconPng);
        expect(pngType?.mime).toBe('image/png');
    });
    test('favicon.ico (buffer)', async () => {
        const type = await fileTypeFromFile(favicon);
        if (!type) throw new Error('file type not found');
        const buffer = await readFile(favicon);
        const sharpCtx = await sharpBmp(buffer, type.mime);
        const metadata = await sharpCtx.metadata();
        expect(metadata.format).toBe('raw');
        expect(metadata.width).toBe(128);
        expect(metadata.height).toBe(128);
    });
    test('favicon.png', async () => {
        const type = await fileTypeFromFile(faviconPng);
        if (!type) throw new Error('file type not found');
        const sharpCtx = await sharpBmp(faviconPng, type.mime);
        expect(sharpCtx).toBeTruthy();
        expect((await sharpCtx.metadata()).format).toBe('png');
    });
    test('test.bmp', async () => {
        const type = await fileTypeFromFile(bmp);
        if (!type) throw new Error('file type not found');
        const sharpCtx = await sharpBmp(bmp, type.mime);
        const metadata = await sharpCtx.metadata();
        expect(metadata.format).toBe('raw');
        expect(metadata.width).toBe(640);
        expect(metadata.height).toBe(360);

        await sharpCtx.png().toFile(bmpPng);
        const pngType = await fileTypeFromFile(bmpPng);
        expect(pngType?.mime).toBe('image/png');
    });
});
