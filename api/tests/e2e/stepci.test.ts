import * as path from 'path';
import { runFromFile } from '@stepci/runner';

describe('Test Workflow', () => {
  test('Check Open API Schema', async () => {
    const { result } = await runFromFile(
      path.join(__dirname, './geranated.stepci.yml'),
    );
    expect(result.passed).toBe(true);
  });
  test('Check Response Status', async () => {
    const { result } = await runFromFile(
      path.join(__dirname, './workflow.stepci.yml'),
    );
    expect(result.passed).toBe(true);
  });
});
