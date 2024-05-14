import { joiPtBr } from './joi-pt-br';
import { UserRepository } from './user.repository';

export const createUserSchema = joiPtBr.object({
  nome: joiPtBr.string().required(),
  email: joiPtBr.string()
    .email()
    .required()
    .custom((value, helpers) => {
      // if (haveUser) {
      //   return helpers.message('Este email já está cadastrado!');
      // }
    }),
  senha: joiPtBr.string().min(6).required()
});


export const updateUserSchema = joiPtBr.object({
  nome: joiPtBr.string(),
  email: joiPtBr.string().email(),
  senha: joiPtBr.string().min(6)
});
