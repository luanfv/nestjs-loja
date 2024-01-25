import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashSenhaPipe implements PipeTransform {
  private readonly HASH_SALT: string;

  constructor(private readonly configService: ConfigService) {
    this.HASH_SALT =
      this.configService.get<string>('HASH_SALT') ??
      '$2a$04$JqftxLG3IH8.689MGoiOeunUBavmcdRwNwaYgHbOXvfB6W78QGNuO';
  }

  transform(senha: string) {
    const hashSenha = bcrypt.hashSync(senha, this.HASH_SALT);

    return hashSenha;
  }
}
