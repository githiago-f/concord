export interface Invalid {
  message: string;
  code: number;
}

export class Either<L extends Invalid, R> {
  private constructor(private Left: L, private Right: R) { }

  static left<L extends Invalid>(val: L) {
    return new Either(val, null);
  }

  static right<R>(val: R) {
    return new Either(null, val);
  }

  left(predicate: (l: L) => void) {
    if (this.Left) {
      return predicate(this.Left);
    }
    return this.Right;
  }

  right<T>(predicate: (v: R) => T): Either<L, T> {
    if (this.Left) {
      return Either.left(this.Left);
    }
    return Either.right(predicate(this.Right));
  }

  flatMap<T>(predicate: (v: R) => Either<L, T>): Either<L, T> {
    if (this.Left) {
      return Either.left(this.Left);
    }
    return predicate(this.Right);
  }
}
