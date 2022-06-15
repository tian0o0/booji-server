module.exports = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "booji",
  entities: [`src/**/**.entity{.ts,.js}`],
  migrations: [`src/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `src/migrations`,
  },
  synchronize: true,
  // cache: {
  //   duration: 60000,
  //   type: 'redis',
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //   },
  // },
};
