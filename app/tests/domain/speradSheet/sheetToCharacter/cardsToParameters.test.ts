import { cardsToParameters } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/udonarium/cardsToPatameters';

describe('cardsToParameters', () => {
  describe('正常系', () => {
    describe('一般的なパターン', () => {
      test('1つの入力で成功すること', () => {
        const cards = [
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'b',
            sheetPropsValue: 'c',
          },
        ];
        const result = cardsToParameters(cards);
        expect(result).toEqual([
          {
            name: 'a',
            items: [
              {
                name: 'b',
                value: 'c',
              },
            ],
          },
        ]);
      });
      test('2つの入力で成功すること', () => {
        const cards = [
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'b',
            sheetPropsValue: 'c',
          },
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'd',
            sheetPropsValue: 'e',
          },
        ];
        const result = cardsToParameters(cards);
        expect(result).toEqual([
          {
            name: 'a',
            items: [
              {
                name: 'b',
                value: 'c',
              },
              {
                name: 'd',
                value: 'e',
              },
            ],
          },
        ]);
      });
      test('3つの入力で成功すること', () => {
        const cards = [
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'b',
            sheetPropsValue: 'c',
          },
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'd',
            sheetPropsValue: 'e',
          },
          {
            sheetPropsResourceName: 'f',
            sheetPropsName: 'g',
            sheetPropsValue: 'h',
          },
        ];
        const result = cardsToParameters(cards);
        expect(result).toEqual([
          {
            name: 'a',
            items: [
              {
                name: 'b',
                value: 'c',
              },
              {
                name: 'd',
                value: 'e',
              },
            ],
          },
          {
            name: 'f',
            items: [
              {
                name: 'g',
                value: 'h',
              },
            ],
          },
        ]);
      });

      test('resourceTypeがnumberResourceの場合に成功すること', () => {
        const cards = [
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'b',
            sheetPropsValue: 'c',
            sheetPropsResourceType: 'numberResource',
            currentValue: 1,
          } as const,
        ];
        const result = cardsToParameters(cards);
        expect(result).toEqual([
          {
            name: 'a',
            items: [
              {
                name: 'b',
                value: 'c',
                sheetPropsResourceType: 'numberResource',
                currentValue: 1,
              },
            ],
          },
        ]);
      });
    });
    describe('特殊パターン', () => {
      test('同じパラメータ名が複数あり数値の場合に加算されること', () => {
        const cards = [
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'b',
            sheetPropsValue: '1',
            sheetPropsResourceType: 'numberResource',
            currentValue: 1,
          } as const,
          {
            sheetPropsResourceName: 'a',
            sheetPropsName: 'b',
            sheetPropsValue: '2',
            sheetPropsResourceType: 'numberResource',
            currentValue: 1,
          } as const,
        ];
        const result = cardsToParameters(cards);
        expect(result).toEqual([
          {
            name: 'a',
            items: [
              {
                name: 'b',
                value: '3',
                sheetPropsResourceType: 'numberResource',
                currentValue: 2,
              },
            ],
          },
        ]);
      });
    });
  });
  describe('異常系', () => {
    test('入力が空の場合、空の配列を返すこと', () => {
      const result = cardsToParameters([]);
      expect(result).toEqual([]);
    });
  });
});
