import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbjobService } from 'src/dbjob/dbjob.service';
import { VehicalService } from 'src/vehicalData/vehical.service';
import { vehicalEntity } from 'src/vehicalData/vehical.entity';
import { CsvUploadController } from './csvUpload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([vehicalEntity])],
  controllers: [CsvUploadController],
  providers: [DbjobService, VehicalService, vehicalEntity]
})
export class CsvUploadModule { }
