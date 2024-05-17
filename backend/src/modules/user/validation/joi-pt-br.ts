import * as Joi from '@hapi/joi';

const messages = {
  'string.base': '{{#label}} deve ser uma string',
  'string.email': '{{#label}} deve ser um e-mail válido',
  'string.min': '{{#label}} deve ter no mínimo {{#limit}} caracteres',
  'string.required': '{{#label}} é obrigatório',
};

export const joiPtBr = Joi.defaults((schema) => {
  return schema.messages(messages);
});