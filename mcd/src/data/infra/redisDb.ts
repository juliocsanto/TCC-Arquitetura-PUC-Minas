import { Redis, ReJSON } from 'redis-modules-sdk' 
import { RedisModuleOptions } from 'redis-modules-sdk/lib/modules/module.base';
// import { createClient, RedisClientType  } from 'redis';

function initDb(): ReJSON {
    // const options: typeof Redis.RedisOptions  = {

    // }
    // const client: RedisClientType = createClient();
    const client: ReJSON = new ReJSON({
        host: '127.0.0.1',
        port: 6379
    });

    

    // await client.connect();
    
    // const c2 = createClient()
    // c2.on('connect', () => { console.log('connected')})
    // client.rejson_module_set()
    // client.on ('error', (err: any) => console.log('Redis Client Error', err));
    // client.on('connect', () => { console.log('connected')})

    // await client.json_set()
    // await client.json.set('mcd', '.', );
    // const value = await client.get('key');
    // console.log(value)

    return client
}  

export default {
    initDb
}
