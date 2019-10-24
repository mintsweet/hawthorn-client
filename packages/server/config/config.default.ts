import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    keys: `${appInfo.name}__1567071459644_5288`,

    saltPassword: 'hawthorn',

    middleware: [],

    mongoose: {
      url: 'mongodb://localhost:27017/hawthorn',
    },

    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 3,
      },
    },

    security: {
      csrf: {
        enable: false,
      },
    },
  } as PowerPartial<EggAppConfig>;

  return config;
};
