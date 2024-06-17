import { valuesToTextImageCards } from '@yakumi-app/domain/card/spreadSheet/valuesToTextImageCards';
import { Settings } from '@yakumi-app/domain/card/types';
import { itemsToCcfoliaJson } from '@yakumi-app/domain/ccfolia/convertCardToCommand';
import { createDiceSymbolZip } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/createDiceSymbolZip';
import { createTextDeckToUdonarium } from '@yakumi-app/domain/textDeck/useUdonarium';
import { useGetSheetDataQuery } from '@yakumi-app/store/services/spreadSheetApi';
import {
  setSheetInfo,
  spreadSheetSelector,
} from '@yakumi-app/store/slices/spreadSheetPageSlice';
import {
  ChangeEvent,
  FormEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSpreadPageHooks = () => {
  const state = useSelector(spreadSheetSelector);
  const dispatch = useDispatch();
  const { data } = useGetSheetDataQuery(state);
  const values = data?.values || [];
  const items = valuesToTextImageCards(values);
  const listRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const backRef = useRef<HTMLDivElement>(null);
  const [isRandom, setIsRandom] = useState(false);
  const [deckName, setDeckName] = useState('サンプル');

  const [url, setUrl] = useState('');
  const backImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];

    if (file) {
      setUrl(URL.createObjectURL(file));
    }
  };
  const [setting] = useState<Settings>({
    deckName: deckName,
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
    if (!listRefs.current) {
      console.warn('listRefs is undefined');
      return;
    }
    if (!backRef.current) {
      console.warn('backRef is undefined');
      return;
    }

    if (isRandom) {
      createDiceSymbolZip(listRefs.current, items, {
        ...setting,
        deckName,
        size,
        description,
      });
    } else {
      createTextDeckToUdonarium(listRefs.current, items, backRef, {
        ...setting,
        deckName,
        size,
        description,
      });
    }
  };
  const changeIsRandom = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRandom(event.target.checked);
  };
  const changeDeckName = (event: ChangeEvent<HTMLInputElement>) => {
    setDeckName(event.target.value);
  };

  const sheetInfoSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const spreadSheetId = (form.get('spreadSheetId') as string) || '';
    const sheetName = (form.get('sheetName') as string) || '';
    const range = (form.get('range') as string) || '';
    dispatch(setSheetInfo({ spreadSheetId, sheetName, range }));
  };
  const ccfoliaJson = useMemo(
    () =>
      itemsToCcfoliaJson(
        items,
        deckName,
        `https://gentle-smoke-0024c9c00.5.azurestaticapps.net/app/spread-sheet/?id=${state.spreadSheetId || ''}&sheet=${state.sheetName || ''}`,
      ),
    [itemsToCcfoliaJson, items, deckName, state.spreadSheetId, state.sheetName],
  );
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
    isRandom,
    changeIsRandom,
    ccfoliaJson,
    changeDeckName,
  };
};
