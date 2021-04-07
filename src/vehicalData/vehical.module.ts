import { Module } from '@nestjs/common';
import { vehicalController } from './vehical.controller';

import { VehicalService } from './vehical.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vehicalEntity as vehicalEntity } from './vehical.entity';

@Module({
  imports:[TypeOrmModule.forFeature([vehicalEntity])],   
  controllers: [vehicalController],
  providers: [ VehicalService]
})
export class VehicalModule {}
