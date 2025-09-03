import {LocalDataSource} from "./LocalDataSource";


export class LocalDataSourceImpl implements LocalDataSource {

    constructor(private localStorage : Storage) {}

    saveCustomerId(customerId: string) {
        this.localStorage.setItem("customerId",customerId)
    }

    getCustomerId(customerId: string): string {
        return this.localStorage.getItem("customerId");
    }

}