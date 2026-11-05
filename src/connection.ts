
import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

//AQUI É CONFIGURADA A NOSSA CONEXÃO COM O BANCO DE DADOS

const dataSourceConfig = (): DataSourceOptions => {
  //INFORMA ONDE ESTÃO AS ENTIDADES (TABELAS DO BANCO)
  const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
  //INFORMA ONDE ESTÃO AS MIGRATIONS, (AS EXECUÇÕES DAS QUERYS SQL)
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{ts,js}"
  );
  //ENDEREÇO DO BANCO, EM URL
  const dbUrl: string | undefined = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL does not exists");
  }
  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [migrationsPath],
    entities: [entitiesPath]
  };
};

//APPDATASOURCE É A NOSSA VARIAVEL QUE VAI ACESSAR O BANCO NOS SERVICES
const AppDataSource = new DataSource(dataSourceConfig());
//GERAR UMA MIGRATION
//npm run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/connection.ts

//RODAR AS MIGRATIONS
//npm run typeorm migration:run -- -d ./src/connection

export { AppDataSource };