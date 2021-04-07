import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicalDTO } from './vehical.dto';
import { vehicalEntity } from './vehical.entity';

@Injectable()
export class VehicalService {

    constructor(@InjectRepository(vehicalEntity) private vehicalRepository: Repository<vehicalEntity>) { }

    async showAll() {
        return await this.vehicalRepository.find();
    }


    async create(data: VehicalDTO) {
        //calculate date
        const mdate = new Date(data.manufactured_date);
        const age = this.calculateVehicalAge(mdate);
        console.log(age)
        data.age_of_vehicle = age + "";
        //save to postgres
        const idea = await this.vehicalRepository.create(data);
        await this.vehicalRepository.save(idea);
        return idea;
    }

    calculateVehicalAge(manufactured_date) { // manuf is a date
        const ageDifMs = Date.now() - manufactured_date;
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    async read(id: string) {
        const idea = await this.vehicalRepository.findOne({ where: { id } });
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return idea;
    }
    async update(id: string, data: Partial<VehicalDTO>) {
        let idea = await this.vehicalRepository.findOne({ where: { id } });
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.vehicalRepository.update({ id }, data);
        idea = await this.vehicalRepository.findOne({ where: { id } });

        return idea;
    }
    async destroy(id: string) {
        const idea = await this.vehicalRepository.findOne({ where: { id } });
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        await this.vehicalRepository.delete({ id });
        return idea;
    }
}
