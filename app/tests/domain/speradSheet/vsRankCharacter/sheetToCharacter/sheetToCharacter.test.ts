import { valuesToCharacterSheetPropsCard } from '@yakumi-app/domain/vsRankCharacter/sheetToCharacter/valuesToCharacterSheetPropsCard';

describe('valuesToCharacterSheetPropsCard', () => {
  describe('自動取得カードが表現されること', () => {
    test('typeAのカウントが1となること', () => {
      const ret = valuesToCharacterSheetPropsCard([
        [
          '',
          'A',
          '0',
          '仕切り直し',
          '手番',
          '10',
          '0',
          '0',
          '自身の使用済カード置き場にあるカードをすべて手札に戻す',
          '仕切り直しだ。まだやれる。',
          '自動取得',
          'HP',
          'リソース',
          '10',
          'numberResource',
          'reuse',
        ],
      ]);
      expect(ret[0]).toEqual({
        id: '',
        type: 'A',
        cp: 0,
        name: '仕切り直し',
        timing: '手番',
        countdown: '10',
        range: '0',
        cost: '0',
        content: '自身の使用済カード置き場にあるカードをすべて手札に戻す',
        flavor: '仕切り直しだ。まだやれる。',
        tags: ['自動取得'],
        sheetPropsName: 'HP',
        sheetPropsResourceName: 'リソース',
        sheetPropsValue: '10',
        sheetPropsResourceType: 'numberResource',
        effectType: 'reuse',
        currentValue: 10,
        count: 1,
        index: 0,
      });
    });
    test('typeA以外のカウントが0となること', () => {
      const ret = valuesToCharacterSheetPropsCard([
        [
          '',
          'D',
          '10',
          '王宮剣術',
          '手番',
          '5',
          '1',
          'なし',
          '1体のHPに1D6+{攻撃力}+({器用さ}/5)ダメージ。\n【剣】タグを持つ装備をしていない場合、プレイできない。',
          '洗練された型は攻守ともに秀でている',
          '攻撃,上流',
          '防御力',
          '戦闘能力値',
          '2',
          '',
          'weaponAttack',
          '1D6+{攻撃力}+({器用さ}/5)',
        ],
      ]);
      expect(ret[0]).toEqual({
        id: '',
        type: 'D',
        cp: 10,
        name: '王宮剣術',
        timing: '手番',
        countdown: '5',
        range: '1',
        cost: 'なし',
        content:
          '1体のHPに1D6+{攻撃力}+({器用さ}/5)ダメージ。\n【剣】タグを持つ装備をしていない場合、プレイできない。',
        flavor: '洗練された型は攻守ともに秀でている',
        tags: ['攻撃', '上流'],
        sheetPropsName: '防御力',
        sheetPropsResourceName: '戦闘能力値',
        sheetPropsValue: '2',
        effectType: 'weaponAttack',
        effectVariable: '1D6+{攻撃力}+({器用さ}/5)',
        count: 0,
        index: 0,
      });
    });
  });
});
