
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost:27017/bgbox';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.KDB = urlDB;

process.env.EXP_TOKEN = 60 * 60 * 24 * 30;

process.env.SEED = process.env.SEED || 'maple-seeds-in-development';
