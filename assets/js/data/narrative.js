// ===== NARRATIVA — registry de las 5 sesiones =====
import { narrativeS1 } from './narrative-s1.js';
import { narrativeS2 } from './narrative-s2.js';
import { narrativeS3 } from './narrative-s3.js';
import { narrativeS35 } from './narrative-s35.js';
import { narrativeS4 } from './narrative-s4.js';

export const narratives = {
  s1: narrativeS1,
  s2: narrativeS2,
  s3: narrativeS3,
  s35: narrativeS35,
  s4: narrativeS4,
};

export function getNarrative(sessionId) {
  return narratives[sessionId];
}
