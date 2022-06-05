const SOURCE_PATH = process.env.NODE_ENV === "production" ? "dist" : "src";

module.exports = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: "root",
  password: "",
  database: "booji",
  entities: [`${SOURCE_PATH}/**/**.entity{.ts,.js}`],
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
