import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehical')
export class vehicalEntity {

    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @Column({nullable: true }) vid: string;

    @Column('text') first_name: string;

    @Column('text') last_name: string;

    @Column('text') email: string;

    @Column('text') car_make: string;

    @Column('text') car_model: string;

    @Column('text') vin_number: string;

    @Column({ type: 'date',nullable: true }) manufactured_date: Date;

    @Column('text') age_of_vehicle: string;

    // id,first_name,last_name,email,car_make,car_model,vin_number,manufactured_date
    //1,  Heath,     Tootell,Karlskoga,GMC,    1500,  WBALW7C58CD028568  ,3/2/1985


}