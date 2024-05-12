import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';


@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}
  create(createIngredientDto: CreateIngredientDto,
    imageFile: Express.Multer.File,) {
    try {
      const newIngredient = new Ingredient();
      newIngredient.nameIngredient = createIngredientDto.nameIngredient;
      newIngredient.supplier=createIngredientDto.supplier;
      newIngredient.minimun=createIngredientDto.minimun;
      newIngredient.unit=createIngredientDto.unit;
      newIngredient.quantityInStock = 0;
      newIngredient.quantityPerUnit=createIngredientDto.quantityPerUnit;

      if (imageFile) {
        newIngredient.IngredientImage = Buffer.from(imageFile.buffer).toString(
          'base64',
        );
      } else {
        newIngredient.IngredientImage = null;
      }

      return this.ingredientRepository.save(newIngredient);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create Ingredient',
        HttpStatus.BAD_REQUEST,
      );
    }
      

    }
    

  

  async findAll() {
    try {
      return await this.ingredientRepository.find();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}
