import { Word } from '../types';
import { randomSort } from '../utils';

const initialWords: string[] = [
  'apple',
  'function',
  'timeout',
  'task',
  'application',
  'data',
  'tragedy',
  'sun',
  'symbol',
  'button',
  'software',
];

export const createWordState = (
  originalWord: string,
  shuffledWord: string
): Word => {
  return {
    originalWord,
    shuffledWord,
    resultWord: '',
    isCompleted: false,
    errorsCount: 0,
  };
};

const shuffleWord = (word: string): string => {
  return word.split('').sort(randomSort).join('');
};

export const getWordsForCurrentTraining = (): Word[] => {
  const randomSix = [...initialWords.sort(randomSort).slice(0, 6)];
  return randomSix.map((word: string) => {
    let shuffledWord = shuffleWord(word);
    // Убеждаемся что слово перемешано в рандомный набор букв
    while (shuffledWord === word) {
      shuffledWord = shuffleWord(word);
    }
    return createWordState(word, shuffledWord);
  });
};

export const increaseErrorsCount = (word: Word): void => {
  word.errorsCount += 1;
};

export const isMaxErrors = (word: Word): boolean =>
  word.errorsCount > 2 ? true : false;

export const isWordCompleted = (word: Word): boolean => {
  if (word.originalWord === word.resultWord) {
    word.isCompleted = true;
    return true;
  }
  return false;
};
