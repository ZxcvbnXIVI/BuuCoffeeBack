import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Topping } from './entities/topping.entity';

@Injectable()
export class ToppingsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Topping)
    private toppingRepository: Repository<Topping>,
  ) {}

  create(createToppingDto: CreateToppingDto) {
    try {
      const newTopping = new Topping();
      newTopping.toppingName = createToppingDto.toppingName;
      newTopping.toppingPrice = createToppingDto.toppingPrice;
      return this.toppingRepository.save(newTopping);
    } catch (error) {
      throw new HttpException(
        'Failed to create topping',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    try {
      return this.toppingRepository.find();
    } catch (error) {
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    try {
      return this.toppingRepository.findOne({ where: { toppingId: id } });
    } catch (error) {
      throw new HttpException(
        'Failed to create topping',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateToppingDto: UpdateToppingDto) {
    try {
      //if not fountthrow not found exception
      const topping = await this.toppingRepository.findOne({
        where: { toppingId: id },
      });
      if (!topping) {
        throw new Error('Topping not found');
      }
      //update topping
      const updatedTopping = await this.toppingRepository.save({
        ...topping,
        ...updateToppingDto,
      });
      return updatedTopping;
    } catch (error) {
      throw new HttpException(
        'Failed to create topping',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    try {
      return this.toppingRepository.delete({ toppingId: id });
    } catch (error) {
      throw new HttpException(
        'Failed to create topping',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
