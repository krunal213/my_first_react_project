import { useState } from "react";
import { EmailEmptyError, PasswordEmptyError } from "../exception/errors.ts";
import { Result, Loading, Success, Failure } from "../result/Result.ts";
import {LoginUseCase} from "../usecase/LoginUseCase";

export function useLoginViewModel(loginUseCase: LoginUseCase) {

    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [result, setResult] = useState<Result<string> | null>(null);

    const login = async (email: string, password: string) => {
        setEmailError(null);
        setPasswordError(null);
        setResult(new Loading());

        try {
            if (!email) throw new EmailEmptyError();
            if (!password) throw new PasswordEmptyError();

            await new Promise((resolve) => setTimeout(resolve, 1000));

            if(await loginUseCase.execute(email, password)){
                setResult(
                    new Success("Login successful!")
                );
            } else {
                throw new Error();
            }
        } catch (error) {
            if (error instanceof EmailEmptyError) {
                setEmailError(error.message);
                setResult(null);
            } else if (error instanceof PasswordEmptyError) {
                setPasswordError(error.message);
                setResult(null);
            } else {
                setResult(
                    new Failure(error instanceof Error ? error : new Error("Unknown error"))
                );
            }
        }
    };

    return { login, emailError, passwordError, result };
}
