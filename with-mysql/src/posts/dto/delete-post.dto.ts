import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePostDto {
    @IsNumber()
    @IsNotEmpty()
    authorId: number;
}
