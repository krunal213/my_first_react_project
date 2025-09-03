import {LoginRepository} from "./LoginRepository";
import {NetworkDataSource} from "./datasource/network/NetworkDataSource";
import {LocalDataSource} from "./datasource/local/LocalDataSource";

export class LoginRepositoryImpl implements LoginRepository {

    constructor(private networkDataSource : NetworkDataSource,private localDataSource : LocalDataSource) {}

    async login(email: string, password: string): Promise<boolean> {
        const customerId = await this.networkDataSource.login(email, password)
        this.localDataSource.saveCustomerId(customerId)
        return customerId === this.localDataSource.getCustomerId(customerId) ;
    }
}
