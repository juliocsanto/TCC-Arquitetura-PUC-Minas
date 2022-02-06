import { ReJSON } from 'redis-modules-sdk' 

function initDb(): ReJSON {
    return new ReJSON({
        host: 'redisdb_mcd',
        port: 6379
    });
}  

export default {
    initDb
}
