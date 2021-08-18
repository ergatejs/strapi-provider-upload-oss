'use strict';

const path = require('path');
const Client = require('ali-oss');

const formatKeys = [
  'small',
  'medium',
  'thumbnail',
];

module.exports = {
  init(config) {

    const client = new Client({
      region: config.region,
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      bucket: config.bucket,
    });

    return {
      upload(file) {

        return new Promise((resolve, reject) => {
          const baseDir = config.baseDir ? `${config.baseDir}/` : '';
          const filePath = file.path ? `${file.path}/` : '';
          const fileName = `${file.hash}${file.ext}`;
          const fileData = Buffer.from(file.buffer, 'binary');
          const ossKey = path.join(baseDir, filePath, fileName);

          client
            .put(ossKey, fileData)
            .then(res => {
              if (config.baseUrl) {
                let baseUrl = config.baseUrl.replace(/\/$/, '');
                let name = (res.name || '').replace(/^\//, '');
                file.url = `${baseUrl}/${name}`;
              } else {
                file.url = result.url;
              }
              resolve();

            }).catch(err => {
              reject(err);
            });
        });
      },

      delete(file) {

        return new Promise((resolve, reject) => {
          let assets = [file];

          if (file.formats) {
            formatKeys.map(formatKey => {
              if (file.formats[formatKey]) {
                assets.push(file.formats[formatKey]);
              }
            });
          }

          Promise.all([...assets, file].map(async format => {
            const baseDir = config.baseDir ? `${config.baseDir}/` : '';
            const filePath = format.path ? `${format.path}/` : '';
            const fileName = `${format.hash}${format.ext}`;
            const ossKey = path.join(baseDir, filePath, fileName);
            await client.delete(ossKey);
          })).then(() => {
            resolve();
          }).catch(err => {
            reject(err)
          });
        });
      },
    };
  },
};
