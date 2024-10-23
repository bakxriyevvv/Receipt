import { Controller, Get, Post, Body, Param, Patch, Delete, Render,Res,Query } from '@nestjs/common';
import { ReceiptService } from './recept.service';
import { CreateReceiptDto, UpdateReceiptDto } from './dto';
import { Receipt as ReceiptInterface } from './interfaces';

@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}


  @Get()
  async findAll(): Promise<ReceiptInterface[]> {
    return await this.receiptService.findAll(); 
  }
  @Get('details:id')
  @Render('/details.ejs') // details.ejs sahifasini render qiladi
  renderDetails(@Query('id') id: string) {
      return { receiptId: id }; // EJS fayliga id ni uzatadi
  }

  @Post()
  async create(@Body() createReceiptDto: CreateReceiptDto): Promise<ReceiptInterface> {
    return await this.receiptService.create(createReceiptDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReceiptInterface> {
    return await this.receiptService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReceiptDto: UpdateReceiptDto,
  ): Promise<ReceiptInterface> {
    return await this.receiptService.update(id, updateReceiptDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.receiptService.remove(id);
  }
}
