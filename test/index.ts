import { sharpBmp } from '../src';
import { fileTypeFromFile } from 'file-type';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {expect, jest, test, describe, beforeEach, afterEach} from '@jest/globals';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

describe('test', () => {
    test('check file-type works', async () => {
        const type = await fileTypeFromFile('test/icon.ico');
        expect(type?.mime).toBe('image/x-icon');
    });
});
