import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UsePipes } from '@nestjs/common';
import { VehicalDTO } from './vehical.dto';
import { VehicalService } from './vehical.service';

@Controller('idea')

export class vehicalController {
    private logger = new Logger('IdeaController');
    constructor(private vehicalService: VehicalService) { }

     //this is the major one others optional
    //other routes just created for testing
    @Post()
    createVehical(@Body() data: VehicalDTO) {

        this.logger.log(JSON.stringify(data));
        return this.vehicalService.create(data)
    }

}
