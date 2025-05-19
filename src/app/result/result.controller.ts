import { Body, Controller, Post } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
    constructor(private rs: ResultService) { }
    
    @Post("/mtk")
    async saveResultMTKTest(@Body() payload:any) {
        console.log(payload.score);
        console.log(payload.Nama_Lengkap);
        console.log(payload.Asal_Sekolah);
    }
}

// function onFormSubmit(e) {
//   const headers = e.source
//     .getSheetByName('Form Responses 1')
//     .getRange(1, 1, 1, e.values.length)
//     .getValues()[0];
//   const data = {};

//   headers.forEach((header, index) => {
//     data[header] = e.values[index];
//   });

//   const options = {
//     method: 'POST',
//     contentType: 'application/json',
//     payload: JSON.stringify(data),
//     headers: {
//       Authorization: 'Bearer your_custom_token',
//     },
//   };

//   UrlFetchApp.fetch('https://your-backend-url.com/api/math-result', options);
// }
  
