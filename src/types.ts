export interface Word {
  originalWord: string;
  shuffledWord: string;
  resultWord: string;
  isCompleted: boolean;
  errorsCount: number;
}

export interface TrainingStats {
  amountWordsWithoutErrors: number;
  amountErrors: number;
  maxErrorsWord: string | null;
}
