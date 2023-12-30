# sharp-read-bmp
Function for reading bmp and ico and returning a sharp instance

[![][npm-badge]][npm-link]
[![][mit-badge]][mit]

Installation
----------------------------------------------------------------
```
npm install @misskey-dev/sharp-read-bmp
```

Usage
----------------------------------------------------------------

```javascript
import { sharpBmp } from 'sharp-read-bmp';
import { fileTypeFromFile } from 'file-type';

const { mime } = await fileTypeFromFile('favicon.ico');
const sharpCtx = await sharpBmp('favicon.ico', mime);

console.log(await sharpCtx.metadata());
```

License
----------------------------------------------------------------
[MIT](LICENSE)

[mit]:            http://opensource.org/licenses/MIT
[mit-badge]:      https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-link]:       https://www.npmjs.com/package/@misskey-dev/sharp-read-bmp
[npm-badge]:      https://img.shields.io/npm/v/@misskey-dev/sharp-read-bmp.svg?style=flat-square
