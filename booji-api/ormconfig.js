const SOURCE_PATH = process.env.NODE_ENV === "production" ? "dist" : "src";
const PASSWORD = process.env.NODE_ENV === "production" ? "666666" : "";

module.exports = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: "root",
  password: PASSWORD,
  database: "booji",
  entities: [`${SOURCE_PATH}/**/**.entity{.ts,.js}`],
  migrations: [`${SOURCE_PATH}/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${SOURCE_PATH}/migrations`,
  },
  synchronize: true,
  cache: true,
  // cache: {
  //   duration: 60000,
  //   type: 'redis',
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //   },
  // },
};
