import { isLetterCorrect, finishTraining } from '../model/training';
import {
  getWordsForCurrentTraining,
  isWordCompleted,
  increaseErrorsCount,
  isMaxErrors,
} from '../model/word';

import {
  renderShuffledWord,
  renderCorrectWord,
  renderStats,
  renderCurrentQuestionNumber,
  renderTotalQuestionsNumber,
  clearAnswer,
  highlightError,
  renderErrorWord,
} from '../view/trainingView';

import { Word } from '../types';
import { sleep } from '../utils';

let currentWordIndex: number = 0;
let isHandlingKeyPress: boolean = false;
let words: Word[] = [];

export const startTraining = (): void => {
  words.length = 0;
  words.push(...getWordsForCurrentTraining());
  currentWordIndex = 0;

  renderCurrentQuestionNumber(currentWordIndex + 1);
  renderTotalQuestionsNumber(words.length);
  renderShuffledWord(words[currentWordIndex].shuffledWord);
};

export const goNextStep = (): void => {
  currentWordIndex += 1;

  if (currentWordIndex < words.length) {
    renderCurrentQuestionNumber(currentWordIndex + 1);
    renderShuffledWord(words[currentWordIndex].shuffledWord);
  } else {
    renderStats(finishTraining(words));
  }
};

export const onLetterElementClick = async (letter: string): Promise<void> => {
  const currentWord = words[currentWordIndex];

  if (isLetterCorrect(currentWord, letter)) {
    renderShuffledWord(currentWord.shuffledWord);
    renderCorrectWord(letter);
  } else {
    highlightError(letter);
    increaseErrorsCount(currentWord);
  }

  try {
    if (isMaxErrors(currentWord)) {
      renderErrorWord(currentWord.originalWord);
      await sleep(1000);
      clearAnswer();
      goNextStep();
    } else if (isWordCompleted(currentWord)) {
      await sleep(500);
      clearAnswer();
      goNextStep();
    }
  } catch (error: unknown) {
    console.error('error:', error);
  }
};

export const handleKeyPress = (event: KeyboardEvent): void => {
  if (isHandlingKeyPress) {
    return;
  }

  isHandlingKeyPress = true;
  document.documentElement.focus();

  const keyPressed = event.key.toLowerCase();

  if (/^[a-z]$/i.test(keyPressed) && currentWordIndex < words.length) {
    onLetterElementClick(keyPressed)
      .then(() => {
        isHandlingKeyPress = false;
      })
      .catch((error: Error) => {
        console.error('error keypress:', error);
        isHandlingKeyPress = false;
      });
  } else {
    isHandlingKeyPress = false;
  }
};
