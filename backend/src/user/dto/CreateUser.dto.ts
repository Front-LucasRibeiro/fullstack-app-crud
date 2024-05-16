export class CreateUserDTO {
    constructor(
        readonly password: string,
        readonly name: string,
        readonly email: string,
    ) {

    }
}