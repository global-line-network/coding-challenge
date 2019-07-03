module.exports = {
    // Databases.
    database: {
        // MongoDB.
        data: {
            host: 'localhost',
            port: 27017,
            db: 'node',
            reconnectTimeout: 5000 // ms.
        },
        // Redis.
        session: {
            host: 'localhost',
            port: 6379,
            prefix: 'node_'
        }
    },

    // Session cookie.
    session: {
        key: 'SID',
        secret: 'luke'
    },

    // Log.
    log: {
        prefix: 'api:'
    },

    secret: {
        key: 'dh67hd6sjsmcks~vls9l6@k'
    },

    google: {
        clientID: '480205801157-fa7p5mnsd5l9q4ikgmcdf30i7bpc5t14.apps.googleusercontent.com',
        clientSecret: 'TiRX1P_yScEk3698Tv_jxOfF'
    },
    facebook: {
        clientID: '1956669964452089',
        clientSecret: '20f2d8cf12a3f22dd8c7ab7d05f148ac'
    },

    CLOUD_BUCKET: 'srijobs_b1',
    GCLOUD_PROJECT: 'srijobs-232614'
};
