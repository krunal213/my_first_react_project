import {NetworkDataSource} from "./NetworkDataSource";
import axios from "axios";
import {plainToInstance} from "class-transformer";
import {LoginRequest} from "../../../entity/LoginRequest.ts";
import {LoginResponse} from "../../../entity/LoginResponse.ts";

export class NetworkDataSourceImpl implements NetworkDataSource {

    private url: string = "https://dummyjson.com/"

    async login(email: string, password: string): Promise<string> {
        const response = await axios.post(this.url + "auth/login", new LoginRequest(email, password))

        console.log("Data : "+response.data)

        const loginResponse = plainToInstance(LoginResponse,response.data)

        return loginResponse.accessToken;
    }

}

