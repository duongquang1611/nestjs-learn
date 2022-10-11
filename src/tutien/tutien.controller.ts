/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import puppeteer from 'puppeteer';
import { Response } from 'express';
import ebookConverter from 'node-ebook-converter';
import { ConvertPdfDto } from './dto/convert-pdf-dto';
import { isArray } from 'class-validator';

@Controller('tutien')
export class TutienController {
  @Get()
  getNe(): string {
    return 'abc';
  }

  @Get('convert-pdf')
  async convertPdf(
    @Res() res: Response,
    @Query() query: ConvertPdfDto,
  ): Promise<Response<any, Record<string, any>>> {
    const { start, end, lists = '' } = query;
    let chapters = [];
    const listsArr = lists.split(',');

    if (!listsArr?.length || !isArray(listsArr)) {
      if (!start || !end) {
        throw new HttpException('Need start and end', HttpStatus.BAD_REQUEST);
      }
      if (Number(start) > Number(end)) {
        throw new HttpException(
          'Start must less than end',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (Number(start) < 1 || Number(end) > 6010) {
        throw new HttpException(
          'Start must greater than 0 and End must less or equal 6010',
          HttpStatus.BAD_REQUEST,
        );
      }
      for (let index = Number(start); index <= Number(end); index++) {
        chapters.push(index);
      }
    } else {
      chapters = listsArr.map((item) => Number(item));
    }

    const browser = await puppeteer.launch({ headless: true });
    const resPdf = await Promise.all(
      chapters.map(async (chapter) => {
        const webPage = await browser.newPage();
        await webPage.setDefaultNavigationTimeout(0);
        const url = `https://truyenmoii.com/vu-luyen-dien-phong/chuong-${chapter}`;

        await webPage.goto(url, {
          waitUntil: 'networkidle0',
        });
        await webPage.emulateMediaType('screen');

        return webPage.pdf({
          printBackground: true,
          path: `pdf/${chapter}-vu-luyen-dien-phong.pdf`,
          displayHeaderFooter: false,
          format: 'A4',
          omitBackground: true,
        });
      }),
    );

    await browser.close();

    // ebookConverter
    //   .convert({
    //     input: '../pdf/vu-luyen-dien-phong-3666.pdf', // Input file
    //     output: '../ebook/vu-luyen-dien-phong-3666.epub', // Output file + Extension to convert
    //     delete: false, // Does not delete input after converting
    //   })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));

    // res.set({
    //   'Content-Type': 'application/pdf',
    //   'Content-Length': pdfFinal.length,
    // });
    // res.send(pdfFinal);
    return res.json('Success convert');
  }
}
