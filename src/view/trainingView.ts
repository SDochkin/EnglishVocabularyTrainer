import { onLetterElementClick } from '../controller/trainingController';
import { TrainingStats } from '../types';

export const renderShuffledWord = (word: string): void => {
  const lettersContainer = document.getElementById('letters');
  if (lettersContainer) {
    lettersContainer.innerHTML = '';
    for (let letter of word) {
      const letterElement = document.createElement('button');
      letterElement.textContent = letter;
      letterElement.classList.add('btn', 'btn-primary', 'button');
      letterElement.addEventListener('click', () =>
        onLetterElementClick(letter)
      );
      lettersContainer.appendChild(letterElement);
    }
  }
};

export const renderCorrectWord = (letter: string): void => {
  const lettersContainer = document.getElementById('answer');

  if (lettersContainer) {
    const letterElement = document.createElement('button');

    letterElement.textContent = letter;
    letterElement.classList.add('btn', 'btn-primary', 'button');
    setTimeout(() => {
      letterElement.classList.add('btn-success');
    }, 100);
    lettersContainer.appendChild(letterElement);
  }
};

export const renderErrorWord = (word: string): void => {
  const lettersContainer = document.getElementById('answer');
  if (lettersContainer) {
    lettersContainer.innerHTML = '';
    for (let letter of word) {
      const letterElement = document.createElement('button');
      letterElement.textContent = letter;
      letterElement.classList.add('btn', 'btn-danger', 'button');
      lettersContainer.appendChild(letterElement);
    }
  }
};

export const renderStats = ({
  amountWordsWithoutErrors,
  amountErrors,
  maxErrorsWord,
}: TrainingStats): void => {
  const statsContainer = document.getElementById('stats');
  if (statsContainer) {
    statsContainer.innerHTML = `
        <p>Число собранных слов без ошибок: ${amountWordsWithoutErrors}</p>
        <p>Число ошибок: ${amountErrors}</p>
        <p>Слово с самым большим числом ошибок: ${maxErrorsWord}</p>
        `;
  }
};

export const highlightError = (letter: string) => {
  const lettersContainer = document.getElementById('letters');
  if (lettersContainer) {
    const buttons = lettersContainer.querySelectorAll('button');
    buttons.forEach((button) => {
      if (button.textContent === letter) {
        button.classList.add('btn-danger', 'focus');
        setTimeout(() => {
          button.classList.remove('btn-danger', 'focus');
        }, 500);
      }
    });
  }
};

export const clearAnswer = (): void => {
  const lettersContainer = document.getElementById('answer');
  if (lettersContainer) {
    lettersContainer.innerHTML = '';
  }
};

export const renderCurrentQuestionNumber = (number: number) => {
  const currentQuestionElement = document.getElementById('current_question');
  if (currentQuestionElement) {
    currentQuestionElement.textContent = `${number}`;
  }
};

export const renderTotalQuestionsNumber = (number: number) => {
  const totalQuestionsElement = document.getElementById('total_questions');
  if (totalQuestionsElement) {
    totalQuestionsElement.textContent = `${number}`;
  }
};
