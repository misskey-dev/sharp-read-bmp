# sharp-read-bmp
Function for reading bmp and ico and returning a sharp instance

Installation
----------------------------------------------------------------
```
npm install git+https://github.com/misskey-dev/sharp-read-bmp.git
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
