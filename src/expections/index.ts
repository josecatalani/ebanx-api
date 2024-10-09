// Classe base genérica para erros personalizados
export class CustomError extends Error {
    constructor(message: string, name: string) {
      super(message);
      this.name = name;
    }
  }
  
  // Erros específicos herdando da classe base
  export class InsufficientFundsError extends CustomError {
    constructor(message: string = "Insufficient funds for this transaction.") {
      super(message, "InsufficientFundsError");
    }
  }
  
  export class InvalidDepositAmountError extends CustomError {
    constructor(message: string = "The deposit amount must be greater than zero.") {
      super(message, "InvalidDepositAmountError");
    }
  }