export abstract class Result<T> {}

export class Loading<T> extends Result<T> {}

export class Success<T> extends Result<T> {
    constructor(public data: T) {
        super();
    }
}

export class Failure<T> extends Result<T> {
    constructor(public exception: Error) {
        super();
    }
}
