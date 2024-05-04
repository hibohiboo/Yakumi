import { createChatPalleteText } from '@yakumi-app/domain/vsRankCharacter/chatpallete/createText';

describe('createChatPalleteText', () => {
  test('空のときは空文字が返ること', () => {
    const ret = createChatPalleteText([]);
    expect(ret).toBe('');
  });
  test('攻撃の式を取得し、割り算はユドナリウムで切り上げの式にできること', () => {
    const ret = createChatPalleteText([
      {
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
      },
    ]);
    expect(ret).toBe('1D6+{攻撃力}+({器用さ}/5U) 王宮剣術');
  });
});
