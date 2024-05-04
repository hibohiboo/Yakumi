import { z } from 'zod';
import { YakumiCharacterSchema } from '../generated/zod';
export type YakumiCharacter = z.infer<typeof YakumiCharacterSchema>;
