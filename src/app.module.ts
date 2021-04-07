import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicalModule } from './vehicalData/vehical.module';
import { CsvUploadModule } from './csvUpload/csvUpload.module';
import { DbjobService } from './dbjob/dbjob.service';

@Module({
  imports: [TypeOrmModule.forRoot(),VehicalModule, CsvUploadModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
