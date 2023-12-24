import { IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  userId: string;
}
