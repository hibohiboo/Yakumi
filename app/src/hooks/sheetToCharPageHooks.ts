import { Settings } from '@yakumi-app/domain/card/types';
import { createCharasheetAndDeckToUdonarium } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/useUdonarium';
import { valuesToCharacterSheetPropsCard } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/valuesToCharacterSheetPropsCard';
import { useGetSheetDataQuery } from '@yakumi-app/store/services/spreadSheetApi';
import {
  characterParameters,
  selectedCards,
  setCardList,
  setSheetInfo,
  spreadSheetCardListSelector,
  spreadSheetSelector,
} from '@yakumi-app/store/slices/sheetToCharPageSlice';
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSheetToCharPageHooks = () => {
  const dispatch = useDispatch();
  const state = useSelector(spreadSheetSelector);
  const items = useSelector(spreadSheetCardListSelector);
  const params = useSelector(characterParameters);
  const selectedItems = useSelector(selectedCards);
  const { data } = useGetSheetDataQuery(state);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const values = data?.values || [];
    dispatch(setCardList(valuesToCharacterSheetPropsCard(values)));
  }, [data, dispatch]);

  const listRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const backRef = useRef<HTMLDivElement>(null);

  const [url, setUrl] = useState('');
  const backImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];

    if (file) {
      setUrl(URL.createObjectURL(file));
    }
  };
  const [setting] = useState<Settings>({
    deckName: 'スプレッドシートデッキサンプル',
    size: '3',
    description: `デッキの説明です。

    スプレッドシートから読み込んだデッキです。`,
    state: '0',
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const deckName = (form.get('deckName') as string) || '';
    const size = (form.get('size') as string) || '';
    const description = (form.get('description') as string) || '';
    const characterName = (form.get('characterName') as string) || '';
    const characterImage = (form.get('characterImage') as File) || undefined;

    if (!characterName) {
      alert('characterName is empty');
      return;
    }
    if (selectedItems.length === 0) {
      alert('カードを1枚は選択してください');

      return;
    }
    if (!listRefs.current) {
      console.warn('listRefs is undefined');
      return;
    }
    if (!backRef.current) {
      console.warn('backRef is undefined');
      return;
    }
    setIsloading(true);
    createCharasheetAndDeckToUdonarium(
      listRefs.current,
      selectedItems,
      backRef,
      {
        ...setting,
        deckName,
        size,
        description,
      },
      { name: characterName, image: characterImage, params },
    ).finally(() => setIsloading(false));
  };
  const sheetInfoSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const spreadSheetId = (form.get('spreadSheetId') as string) || '';
    const sheetName = (form.get('sheetName') as string) || '';
    const range = (form.get('range') as string) || '';
    dispatch(setSheetInfo({ spreadSheetId, sheetName, range }));
  };
  const onCardClick = (index: number) => {
    dispatch(
      setCardList(
        items.map((item, i) =>
          i === index ? { ...item, count: item.count > 0 ? 0 : 1 } : item,
        ),
      ),
    );
  };
  return {
    items,
    setting,
    handleSubmit,
    listRefs,
    backRef,
    state,
    sheetInfoSubmit,
    url,
    backImageChange,
    onCardClick,
    isLoading,
  };
};
