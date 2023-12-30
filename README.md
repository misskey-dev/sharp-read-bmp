# sharp-read-bmp
Function for reading bmp and ico and returning a sharp instance

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
c