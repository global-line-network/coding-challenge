// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const Storage = require('@google-cloud/storage').Storage;
const config = require('config');

const CLOUD_BUCKET = config.get('CLOUD_BUCKET');

const storage = new Storage({
    projectId: config.get('GCLOUD_PROJECT'),
    credentials: {
        client_email: 'bucket-access-service-account@srijobs-232614.iam.gserviceaccount.com',
        private_key:
            '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrh8kb8shmrN8S\nw4OxmO275H8sd/pZQl16bEE1YnbPtzTBn8n+8OHFbCkK6/b4DTJZAq3daWChIp7c\nD4UclaYkNYiAy85HS0hx2ioxGghUosPI9EcnIAycH6FBTd1s7rvb30pSilDltSQ9\ndMDVm907/Wa9+JxVtnIMx8rJqOuQxJavjbDSTIG+zCKthRgUJLgSE6VdCAnz3I0Z\ngriIVggVD74C5Jz9ORY46vc7H5INixiXUUXgFKpICnHySaQoSDts70RcKgrEIQo3\nPNOG5BJrUUkzJ+UmsZciighTuhbFA5dcPuxV3qe79AXvK3WyqhEnA58TjlNZGyVD\nqO8IkTRBAgMBAAECggEABxMtEjoptiNx+YEHMulw/8+ZR70kni8gsiqaJ3Cp4CAp\nPMXBlAJ9O3J+QGEycPGBZr63q2Lb7ZWDGiZJOiA5h7OOD2rolZP3N1v1YsxVNOF4\nRBcAQs69emiLEwmaRRKVPMjJVN133/ugVKkWxZC916o4ZURGdXoWmuyYMohlO/Ww\nhphURufkfmh/z5WfjTkEJaB9Hyh0bDbXp1h/XN6IysuplPeRlSLd+81UeEGibUf7\nq1bhtbzHuopkoCVdTyx6y+sZOwTHhuWvPkmUFLR0Re7e9Uu8XbSXoJ9sifAOZJUL\niktT3mGvezR0KjGIDJ0DvjJqgCxJm3h/jk36/cwHeQKBgQDcuu8qUoGo8xuvm971\nyI0oJBJlFwxGl51Jl4pQVki9u1Y9L+EbfODJBv4/Y9iJCx850lXdIHJ9RXZIzrex\n4e07KglmUL82YXLSdiwNnBMpMuyhanxkm9N3E6W3HteZ/1U0X8QPBE/CESvr3lir\nvHpNAMcmS40jvo4/UbeOhJxLaQKBgQDG8E/ihL+TGYOP6RwKd8P9xjEyGd4EnrF3\njdduC1nVHBZxvfaJ0+1SF4H7uXuaV7M5Mbj0+93wIbCRgBkYTqN0DE9wDpzXbEjw\n4b5tdZ1z4R7bK1ihrtkG58kcFAZcdvCP6lg17lZoGTC9XvLMygMsdX1KZx4aivkk\nzPgJm+c/GQKBgGIEKJwUkzsg6VRr1PAzpGsEyZ5WQ789KD07q9HM3vRRshPtpPp9\n05uxHUms3sTMSYt1mWdeNzjllYbzNKMq/htdqVrj1GUjlMdcbmeEvQV4dZegH6jV\ngWvJL7dHXNonhgCB3iAE/B3jXiuZSqrIQU7cX5LjzcLnpWb8tJP20yixAoGBAIxV\nw5SgXmAPVH51S8GaoNhpMhUMqFCL/da/aWQIf9NUoASWo86wgC4zxQ7k1muXSCel\nirrO3c3ihiLtwUYjWyym7na26C8TBRVfuayPloXDHbgwCLLtm81CPt0exyn9AVAU\nWSuaOLvwYTCFRTPvoXOAYeTVfyfsNzqdmK92mhcpAoGAZpSgWfMjyDFyRXjD0m6a\nU06g+9VCwMz9tVyfRe3W+HnOVoA6nLCFEhxH9dOJS5B3AHryzzwRgnSsVCv0OqNG\nD0K+rKirwnivWUOVlYzwF24a6bpGBfuYOaffFYXUHbUVEsQWrgEPqe33wsuIDltg\ndtyocmNJkWRAn5UV6hEMbBE=\n-----END PRIVATE KEY-----\n'
    }
});

const bucket = storage.bucket(CLOUD_BUCKET);

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
// [START public_url]
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]
function sendUploadToGCS(req, res, next) {
    if (!req.file) {
        return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        },
        resumable: false
    });

    stream.on('error', err => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });

    stream.end(req.file.buffer);
}
// [END process]

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
const Multer = require('multer');

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});
// [END multer]

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
};
