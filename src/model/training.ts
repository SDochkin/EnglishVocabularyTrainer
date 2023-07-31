import { TrainingStats, Word } from '../types';

export const isLetterCorrect = (word: Word, letter: string): boolean => {
  const correctLetter = word.originalWord[word.resultWord.length];

  if (correctLetter === letter) {
    word.shuffledWord = word.shuffledWord.replace(letter, '');
    word.resultWord += letter;
    return true;
  }

  return false;
};

const getMaxErrorsWord = (prevWord: Word | null, currentWord: Word): string => {
  if (!prevWord) {
    prevWord = currentWord;
    return prevWord.originalWord;
  } else {
    prevWord =
      currentWord.errorsCount > prevWord?.errorsCount ? currentWord : prevWord;
    return prevWord?.originalWord;
  }
};

export const finishTraining = (words: Word[]): TrainingStats => {
  let amountWordsWithoutErrors = 0;
  let amountErrors = 0;
  let currentMaxErrorsWord: Word | null = null;
  let maxErrorsWord: string = 'Не ошибся ни в одном слове, ты молодец!';

  for (let word of words) {
    amountErrors += word.errorsCount;
    if (word.errorsCount === 0) {
      amountWordsWithoutErrors += 1;
    }
    if (word.errorsCount > 0) {
      maxErrorsWord = getMaxErrorsWord(currentMaxErrorsWord, word);
    }
  }

  return {
    amountWordsWithoutErrors,
    amountErrors,
    maxErrorsWord,
  };
};
