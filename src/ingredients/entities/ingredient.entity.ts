import { Column, Entity,PrimaryGeneratedColumn} from 'typeorm';
@Entity()
export class Ingredient {
@PrimaryGeneratedColumn()
IngredientId: number;
@Column({ default: 'no-image.jpg' })
IngredientImage: string;
@Column({ unique: true })
nameIngredient : string;
@Column()
supplier: string;
@Column()
minimun: number;
@Column()
unit : string;
@Column()
quantityInStock : number;
@Column({ type: 'decimal', precision: 10, scale: 2 })
quantityPerUnit: number;
}
