import { PartialType } from '@nestjs/swagger';
import { CreateInteractiveDto } from './create-interactive.dto';

export class UpdateInteractiveDto extends PartialType(CreateInteractiveDto) {}
