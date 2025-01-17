import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [UserModule, TodoModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
