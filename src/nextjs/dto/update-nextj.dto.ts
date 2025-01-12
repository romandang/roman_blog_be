import { PartialType } from '@nestjs/swagger';
import { CreateNextjDto } from './create-nextj.dto';

export class UpdateNextjDto extends PartialType(CreateNextjDto) {}
