export class EmailEmptyError extends Error {
    constructor() {
        super("Email cannot be empty");
        this.name = "EmailEmptyError";
    }
}

export class PasswordEmptyError extends Error {
    constructor() {
        super("Password cannot be empty");
        this.name = "PasswordEmptyError";
    }
}
