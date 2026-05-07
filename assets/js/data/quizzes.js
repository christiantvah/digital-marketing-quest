// ===== QUIZZES — registry =====
import { quizS1 } from './quiz-s1.js';
import { quizS2 } from './quiz-s2.js';
import { quizS3 } from './quiz-s3.js';
import { quizS35 } from './quiz-s35.js';
import { quizS4 } from './quiz-s4.js';
import { bossBattle } from './boss-battle.js';

export const quizzes = {
  s1: quizS1,
  s2: quizS2,
  s3: quizS3,
  s35: quizS35,
  s4: quizS4,
  boss: bossBattle,
};

export function getQuiz(sessionId) {
  return quizzes[sessionId];
}
