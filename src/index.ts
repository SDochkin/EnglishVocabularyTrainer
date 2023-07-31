import { handleKeyPress, startTraining } from './controller/trainingController';

import './styles.css';

document.addEventListener('keypress', handleKeyPress);

startTraining();
