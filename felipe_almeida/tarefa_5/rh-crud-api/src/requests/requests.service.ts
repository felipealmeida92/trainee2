import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestMapper } from './mappers/request.mapper';


@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) { }


  async create(dto: CreateRequestDto): Promise<Request> {
    const entity = this.requestRepository.create(dto);
    return this.requestRepository.save(entity);
  }


  async findAll(): Promise<Request[]> {
    return await this.requestRepository.find();
  }


  async findOne(id: string): Promise<Request> {
    const request = await this.requestRepository.findOneBy({ id });
    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    return request;
  }


  async update(id: string, updateRequestDto: UpdateRequestDto): Promise<Request> {
    const request = await this.findOne(id);
    const updated = this.requestRepository.merge(request, updateRequestDto);
    return await this.requestRepository.save(updated);
  }


  async remove(id: string): Promise<void> {
    const request = await this.findOne(id);
    await this.requestRepository.remove(request);
  }
}

