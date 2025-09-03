import {NetworkDataSource} from "./NetworkDataSource";
import axios from "axios";
import {plainToInstance} from "class-transformer";
import {LoginRequest} from "../../../entity/LoginRequest.ts";
import {LoginResponse} from "../../../entity/LoginResponse.ts";

export class NetworkDataSourceImpl implements NetworkDataSource {

    private url: string = "https://reqres.in/"

    async login(email: string, password: string): Promise<string> {
        const data = axios.post(this.url + "api/login", new LoginRequest(email, password))

        const loginResponse = plainToInstance(LoginResponse,data)

        return loginResponse.token;
    }

}