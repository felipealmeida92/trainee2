import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '051981',
    database: 'rh',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true,
};

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions)],
})
export class DatabaseModule { }
