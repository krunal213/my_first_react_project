import {NetworkDataSource} from "./NetworkDataSource";
import axios, {AxiosError, AxiosResponse} from "axios";
import {plainToInstance} from "class-transformer";
import {LoginRequest} from "../../../entity/LoginRequest.ts";
import {LoginResponse} from "../../../entity/LoginResponse.ts";
import {ClientError, ServerError} from "../../../exception/errors.ts";

export class NetworkDataSourceImpl implements NetworkDataSource {

    private url: string = "https://dummyjson.com/"

    async login(email: string, password: string): Promise<string> {
        try {
            const response = await axios.post(this.url + "auth/login", new LoginRequest(email, password))
            const loginResponse = plainToInstance(LoginResponse, response.data)
            return loginResponse.accessToken;
        } catch (error) {
            this.handleError(error)
        }
    }


    private handleError(error: any) {
        if (error instanceof AxiosError && error.status == 400) {
            throw new ClientError(error?.response.data.message)
        } else {
            throw new ServerError()
        }
    }

}

