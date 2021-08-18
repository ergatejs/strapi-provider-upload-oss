# @ergatejs/strapi-provider-upload-oss

> strapi-provider-upload with aliyun oss.

## Install

```sh
yarn add @ergatejs/strapi-provider-upload-oss
```

> modify package.json

```js
{
  // ...,
  "strapi-provider-upload-oss": "npm:@ergatejs/strapi-provider-upload-oss@1.0.2",
}
```

## Config

### plugin

```js
// config/plugins.js

module.exports = ({ env }) => ({
  upload: {
    provider: 'oss',
    providerOptions: {
      accessKeyId: env('OSS_ACCESS_KEY_ID'),
      accessKeySecret: env('OSS_ACCESS_KEY_SECRET'),
      region: env('OSS_REGION'),
      bucket: env('OSS_BUCKET'),
      baseDir: env('OSS_BASE_DIR'),
      baseUrl: env('OSS_BASE_URL'),
    }
  },
});
```

### environment

```env
# .env

OSS_ACCESS_KEY_ID=
OSS_ACCESS_KEY_SECRET=
OSS_REGION=
OSS_BUCKET=
OSS_BASE_DIR=
OSS_BASE_URL=
```
