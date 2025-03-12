import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    console.log(createDocumentDto, 'createDocumentDto');

    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  getAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const document = await this.documentsService.findOne(+id);

    if (!document) {
      throw new NotFoundException('Invalid document');
    }

    return document;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto
  ) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.documentsService.delete(+id);
  }
}
