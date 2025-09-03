import {useState} from "react";
import {ClientError, EmailEmptyError, PasswordEmptyError} from "../exception/errors.ts";
import {Result, Loading, Success, Failure} from "../result/Result.ts";
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

            if (await loginUseCase.execute(email, password)) {
                setResult(
                    new Success("Login successful!")
                );
            }
        } catch (error) {
            if (error instanceof EmailEmptyError) {
                setEmailError(error.message);
                setResult(null);
            } else if (error instanceof PasswordEmptyError) {
                setPasswordError(error.message);
                setResult(null);
            } else if (error instanceof ClientError) {
                setResult(
                    new Failure(error)
                );
            } else {
                setResult(
                    new Failure(error)
                );
            }
        }
    };

    return {login, emailError, passwordError, result};
}
