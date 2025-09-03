import {LoginRepository} from "../repository/LoginRepository";

export class LoginUseCase {
    constructor(private loginRepository : LoginRepository) {}

    async execute(email: string, password: string): Promise<boolean> {
        return this.loginRepository.login(email, password);
    }
}
