import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateRequestTypePipe implements PipeTransform {
  private readonly allowedTypes = ['FÉRIAS', 'AFASTAMENTO', 'OUTROS'];

  transform(value: any) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Dados inválidos no corpo da requisição.');
    }

    if (!value.type) {
      throw new BadRequestException('O campo "type" é obrigatório.');
    }

    const formattedType = value.type.toUpperCase().trim();

    if (!this.allowedTypes.includes(formattedType)) {
      throw new BadRequestException(
        `Tipo de solicitação inválido. Tipos permitidos: ${this.allowedTypes.join(', ')}.`
      );
    }

    return {
      ...value,
      type: formattedType,
    };
  }
}

