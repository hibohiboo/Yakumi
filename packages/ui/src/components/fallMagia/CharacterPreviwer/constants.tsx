import { GiWolfHowl } from 'react-icons/gi';
import { GiClockwork } from 'react-icons/gi';
import { GiSecretBook } from 'react-icons/gi';
import { GiSalamander } from 'react-icons/gi';
const size = 50;
export const factions = {
  幻獣界: {
    label: '幻獣界 ミストリア',
    icon: <GiWolfHowl size={size} />,
  },
  機工次元: {
    label: '機工次元 アルカノテック',
    icon: <GiClockwork size={size} />,
  },
  魔法図書館: {
    label: '古き知識の森 リブラアーカイブ',
    icon: <GiSecretBook size={size} />,
  },
  精霊領域: {
    label: '精霊領域 スピリトリア',
    icon: <GiSalamander size={size} />,
  },
};
