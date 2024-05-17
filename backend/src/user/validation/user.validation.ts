import { joiPtBr } from './joi-pt-br';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';


@Injectable()
export class UserValidation{

  constructor( 
    private userService: UserService
  ) {}

  private baseSchemaCreated = joiPtBr.object({
    name: joiPtBr.string().required(),
    email: joiPtBr.string().email().required(),
    password: joiPtBr.string().min(6).required()
  });
  
  
  public createUserSchema = this.baseSchemaCreated.custom(async (value, helpers) => {

    const users = await this.userService.listUsersService();
  
    const userExists = users.some(user => user.email === value.email);
    if (userExists) {
      throw new Error('Este email já está cadastrado!');
    }
  
    return value;
  });
  
  public updateUserSchema = joiPtBr.object({
    name: joiPtBr.string().optional(),
    email: joiPtBr.string().email().optional(),
    password: joiPtBr.string().min(6).optional()
  });
}
  
  


