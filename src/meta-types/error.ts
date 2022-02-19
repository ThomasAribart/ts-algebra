export type ErrorTypeId = "error";

export type Error<M extends string = "Unknown error"> = $Error<M>;

export type $Error<M = "Unknown error"> = {
  type: ErrorTypeId;
  message: M;
};

export type ErrorType = {
  type: ErrorTypeId;
  message: string;
};

export type ErrorMessage<E extends ErrorType> = E["message"];
