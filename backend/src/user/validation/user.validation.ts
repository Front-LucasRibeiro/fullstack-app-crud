import { joiPtBr } from './joi-pt-br';
import { UserRepository } from '../user.repository';

const baseSchemaCreated = joiPtBr.object({
  name: joiPtBr.string().required(),
  email: joiPtBr.string().email().required(),
  password: joiPtBr.string().min(6).required()
});


export const createUserSchema = baseSchemaCreated.custom(async (value, helpers) => {
  const userRepository = new UserRepository();
  const users = await userRepository.list();

  const userExists = users.some(user => user.email === value.email);
  if (userExists) {
    throw new Error('Este email já está cadastrado!');
  }

  return value;
});

export const updateUserSchema = joiPtBr.object({
  name: joiPtBr.string().optional(),
  email: joiPtBr.string().email().optional(),
  password: joiPtBr.string().min(6).optional()
});


