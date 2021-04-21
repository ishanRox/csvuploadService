import { Injectable } from '@nestjs/common';
import { VehicalService } from 'src/vehicalData/vehical.service';

@Injectable()
export class DbjobService {
    csv = require('csv-parser');
    fs = require('fs');
    Queue = require('bull');


    constructor(private vehicalService: VehicalService) {
    }

    async saveCsvToPostgres(fileInfo) {
        var vehicalService = this.vehicalService;

        var csvQueue = new this.Queue('csvJobs', 'redis://127.0.0.1:6379');

        csvQueue.process(async function (job, done) {
            try {
                
                const fs = require('fs');
                const getStream = require('get-stream');
                const parse = require('csv-parse');

                let readCSVData = async (filePath): Promise<any> => {
                    const parseStream = parse({ delimiter: ',' });
                    const data = await getStream.array(fs.createReadStream(filePath).pipe(parseStream));
                    return data;
                }

                readCSVData(job.data.path).then(async (result) => {
                    //remove column name
                    result = result.slice(1);

                    await result.map(async result => {
                        const dto = {
                            vid: result[0],
                            first_name: result[1],
                            last_name: result[2],
                            email: result[3],
                            car_make: result[4],
                            car_model: result[5],
                            vin_number: result[6],
                            manufactured_date: new Date(result[7]),
                            age_of_vehicle: ''
                        };
                        console.log(dto);

                        const dbrow = await vehicalService.create(dto);
                        console.log(dbrow);
                    });

                    done(null, { status: 'successful' /* etc... */ });
                }).catch((err) => {
                    console.log(err);
                });
            } catch (error) {
                console.log(error);
            }

        });

        const myJob = await csvQueue.add(fileInfo, { delay: 5000 });
        let status = await myJob.finished();
        console.log(status);


    }

}
