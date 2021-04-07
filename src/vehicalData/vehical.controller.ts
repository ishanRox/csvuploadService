import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UsePipes } from '@nestjs/common';
import { VehicalDTO } from './vehical.dto';
import { VehicalService } from './vehical.service';

@Controller('idea')

export class vehicalController {
    private logger = new Logger('IdeaController');
    constructor(private vehicalService: VehicalService) { }

    @Get()
    showAllIdeas() {
        return this.vehicalService.showAll();
    }

    //this is the major one others optional
    //just created for testing
    @Post()
    createVehical(@Body() data: VehicalDTO) {

        this.logger.log(JSON.stringify(data));
        return this.vehicalService.create(data)
    }




    @Get(':id')
    readIdea(@Param('id') id: string) {

        return this.vehicalService.read(id);
    }

    @Put(':id')
    updateIdea(@Param('id') id: string, @Body() data: Partial<VehicalDTO>) {
        this.logger.log(JSON.stringify(data));
        return this.vehicalService.update(id, data);
    }

    @Delete(':id')
    destroyIdea(@Param('id') id: string) {
        return this.vehicalService.destroy(id);
    }
}
