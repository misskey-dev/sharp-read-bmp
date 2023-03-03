import sharp from 'sharp';
import decodeIco from 'decode-ico';
import decodeBmp from 'decode-bmp';
import { readFile } from 'node:fs/promises';

export async function sharpBmp(
    source: Buffer | Int8Array | Uint8Array | Uint8ClampedArray | string,
    type: string,
    options: sharp.SharpOptions = {}
): Promise<sharp.Sharp> {
    if (type === 'image/x-icon' || type === 'image/vnd.microsoft.icon') {
        const icon = decodeIco(typeof source === 'string' ? await readFile(source, { encoding: null }) : source);

        // Choose the largest icon
        const chosen = icon.reduce((prev, curr) => {
            const prevSize = prev.width * prev.height;
            const currSize = curr.width * curr.height;
            if (prevSize < currSize) {
                // Larger icon
                return curr;
            } else if (prevSize === currSize && curr.type === 'png') {
                // PNG is preferred over BMP
                return curr;
            }
            return prev;
        }, icon[0]);

        if (chosen.type === 'png') {
            return sharp(chosen.data, options);
        } else {
            return sharp(chosen.data, {
                ...options,
                raw: {
                    width: chosen.width,
                    height: chosen.height,
                    channels: 4,
                },
            });
        }
    }

    if (type === 'image/x-bmp' || type === 'image/bmp' || type === 'image/x-ms-bmp') {
        const bmp = decodeBmp(typeof source === 'string' ? await readFile(source, { encoding: null }) : source);
        return sharp(bmp.data, {
            ...options,
            raw: {
                width: bmp.width,
                height: bmp.height,
                channels: 4,
            },
        });
    }

    return sharp(source, options);
}
