export interface LocalDataSource {
    saveCustomerId(customerId : string);

    getCustomerId(customerId: string): string;
}