import { CreateRequestDto } from '../dto/create-request.dto';
import { Request } from '../entities/request.entity';

export class RequestMapper {
  static toEntity(dto: CreateRequestDto): Request {
    const entity = new Request();
    entity.employeeName = dto.employeeName;
    entity.type = dto.type;
    entity.description = dto.description;
    console.log('🔄 Mapper - Criando entidade:', entity);
    return entity;
  }
}
