export class EmailEmptyError extends Error {
    constructor() {
        super("Email cannot be empty");
    }
}

export class PasswordEmptyError extends Error {
    constructor() {
        super("Password cannot be empty");
    }
}

export class ClientError extends Error {
    constructor(statusText: string) {
        super(statusText)
    }
}

export class ServerError extends Error {
    constructor() {
        super("Something went wrong");
    }
}


