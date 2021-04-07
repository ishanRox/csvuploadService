import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DbjobService } from "src/dbjob/dbjob.service";
import { VehicalService } from "src/vehicalData/vehical.service";

@Controller("csv")
export class CsvUploadController {


  constructor(private dbjobService: DbjobService,private vehicalService: VehicalService) {

  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  
  async uploadSingle(@UploadedFile() file) {
    console.log(file);
    this.dbjobService.saveCsvToPostgres(file);

  }


  //multi file upload not fully implemented yet
  // @Post("uploads")
  // @UseInterceptors(FilesInterceptor("file[]", 10, { dest: "./uploads" }))
  // async uploadMultiple(@UploadedFiles() files) {
  //   console.log(files);
  // }
}