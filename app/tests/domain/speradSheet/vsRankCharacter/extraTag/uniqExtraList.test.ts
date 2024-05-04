import { uniqExtraList } from '@yakumi-app/domain/vsRankCharacter/extraTags/uniqExtraList';
const template = {
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
  sheetPropsResourceType: 'numberResource' as const,
  effectType: 'reuse',
  currentValue: 10,
  count: 1,
  index: 0,
  extraTags: 'extraTags',
};
describe('uniqExtraList', () => {
  test('ユニークな状態の一覧が返ること', () => {
    const ret = uniqExtraList([{ ...template }, { ...template }]);
    expect(ret).toEqual(['extraTags']);
  });
});
