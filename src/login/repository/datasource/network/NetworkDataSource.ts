export interface NetworkDataSource {
    login(email: string, password: string): Promise<string>;
}