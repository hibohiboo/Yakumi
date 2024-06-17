import { Settings } from '@yakumi-app/domain/card/types';
import { convertExtraTagsFromSpreadsheet } from '@yakumi-app/domain/vsRankCharacter/extraTags/extraTagsFromSpreadsheet';
import { createVSRankUdonariumMap } from '@yakumi-app/domain/vsRankCharacter/map/downLoadMap';
import { valuesToCharacterSheetPropsCard } from '@yakumi-app/domain/vsRankCharacter/sheetToCharacter/valuesToCharacterSheetPropsCard';
import {
  createVSRankCharasheetAndDeckToUdonarium,
  createVSRankCharasheetAndDeckToUdonariumBlob,
} from '@yakumi-app/domain/vsRankCharacter/udonarium/useUdonarium';
import { useAppDispatch } from '@yakumi-app/store/hooks';
import { useGetSheetDataQuery } from '@yakumi-app/store/services/spreadSheetApi';
import { uidSelector } from '@yakumi-app/store/slices/userSlice';
import {
  cardListWithTypeSelector,
  cardTypeSpreadsheetSelector,
  characterIdSelector,
  characterListSelector,
  characterNameSelector,
  characterParameters,
  characterSrcSelector,
  extraTagsSpreadsheetSelector,
  saveVSRankCharacterAction,
  selectCharacterAction,
  selectedCards,
  selectedExtraTagsSelector,
  setCardList,
  setCardTypeList,
  setCharacterName,
  setCharacterSrc,
  setExtraTags,
  setSheetInfo,
  spreadSheetCardListSelector,
  spreadSheetSelector,
} from '@yakumi-app/store/slices/vsRankCharacterPageSlice';
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

export const useVSRankCharacterPageHooks = () => {
  const dispatch = useAppDispatch();
  const state = useSelector(spreadSheetSelector);
  const items = useSelector(spreadSheetCardListSelector);
  const params = useSelector(characterParameters);
  const selectedItems = useSelector(selectedCards);
  const itemsWithTypes = useSelector(cardListWithTypeSelector);
  const selectedExtraTags = useSelector(selectedExtraTagsSelector);
  const uid = useSelector(uidSelector);
  const characterName = useSelector(characterNameSelector);
  const characterSrc = useSelector(characterSrcSelector);
  const characterId = useSelector(characterIdSelector);
  const characterList = useSelector(characterListSelector);
  const { data } = useGetSheetDataQuery(state);
  const cardTypeState = useSelector(cardTypeSpreadsheetSelector);
  const { data: cardTypeData } = useGetSheetDataQuery(cardTypeState);
  const extraTagsState = useSelector(extraTagsSpreadsheetSelector);
  const { data: extraTagsData } = useGetSheetDataQuery(extraTagsState);
  const [isLoading, setIsloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [characterImageFile, setCharacterImageFile] = useState<
    File | undefined
  >();
  useEffect(() => {
    const values = data?.values || [];
    dispatch(setCardList(valuesToCharacterSheetPropsCard(values)));
  }, [data, dispatch]);
  useEffect(() => {
    if (!cardTypeData?.values) return;

    const values = cardTypeData?.values.filter(([a, b]) => a && b) || [];
    dispatch(setCardTypeList(values.map(([type, label]) => ({ type, label }))));
  }, [cardTypeData, dispatch]);
  useEffect(() => {
    if (!extraTagsData?.values) return;
    const extraTags = convertExtraTagsFromSpreadsheet(extraTagsData?.values);
    dispatch(setExtraTags(extraTags));
  }, [extraTagsData, dispatch]);

  const listRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const backRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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
    const characterName = (form.get('characterName') as string) || '';
    const characterImage = (form.get('characterImage') as File) || undefined;
    const deckName = `${characterName}デッキ`;
    const size = '3';
    const description = `${characterName}のデッキ`;

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
    createVSRankCharasheetAndDeckToUdonarium(
      listRefs.current,
      selectedItems,
      backRef,
      {
        ...setting,
        deckName,
        size,
        description,
      },
      { name: characterName, image: characterImage, params, src: characterSrc },
      selectedExtraTags,
    ).finally(() => setIsloading(false));
  };
  const sheetInfoSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const spreadSheetId = (form.get('spreadSheetId') as string) || '';
    const sheetName = (form.get('sheetName') as string) || '';
    const range = (form.get('range') as string) || '';
    dispatch(setSheetInfo({ spreadSheetId, sheetName, range }));
  };
  const onCardClick = (name: string) => {
    dispatch(
      setCardList(
        items.map((item) =>
          item.name === name
            ? { ...item, count: item.count > 0 ? 0 : 1 }
            : item,
        ),
      ),
    );
  };
  const onCharacterNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCharacterName(event.target.value));
  };
  const onCharacterSrcChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const [file] = event.target.files;
    if (!file) return;
    const src = URL.createObjectURL(file);
    setCharacterImageFile(file);
    dispatch(setCharacterSrc(src));
  };
  const downloadMap = () => {
    createVSRankUdonariumMap(mapRef);
  };
  const saveCharacterHandler = async () => {
    setIsSaving(true);
    const image = characterImageFile;
    setIsloading(true); // CSS漏れでカードが黄色くなること対策
    const blob = await createVSRankCharasheetAndDeckToUdonariumBlob(
      listRefs.current,
      selectedItems,
      backRef,
      setting,
      { name: characterName, image, params, src: characterSrc },
      selectedExtraTags,
    );
    setIsloading(false);
    const data = {
      uid,
      characterId,
      name: characterName,
      src: characterSrc,
      cards: selectedItems,
      props: params,
      extraTags: selectedExtraTags,
    };
    await dispatch(saveVSRankCharacterAction({ data, blob, image }));
    setIsSaving(false);
    setIsSaved(true);
  };
  const selectCharacter = async (id: string) => {
    await dispatch(selectCharacterAction(id));
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
    selectedItems,
    params,
    characterName,
    onCharacterNameChange,
    characterSrc,
    onCharacterSrcChange,
    itemsWithTypes,
    mapRef,
    downloadMap,
    selectedExtraTags,
    saveCharacterHandler,
    characterList,
    characterId,
    selectCharacter,
    dispatch,
    isSaving,
    isSaved,
    uid,
  };
};

export type UseVSRankCharacterPageViewModel = ReturnType<
  typeof useVSRankCharacterPageHooks
>;
