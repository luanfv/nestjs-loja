import { IsEmail, IsNotEmpty } from 'class-validator';

export class AutenticacaoDTO {
  @IsEmail(undefined, { message: 'Precisa informar um e-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'Precisa informar a senha' })
  senha: string;
}
