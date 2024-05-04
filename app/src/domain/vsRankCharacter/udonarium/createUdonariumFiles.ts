import { Settings } from '@yakumi-app/domain/card/types';
import { canvasToFile } from '@yakumi-app/domain/udonarium/canvas';
import { getDoc } from '@yakumi-app/domain/udonarium/common';
import {
  createCardWithProp,
  createXML,
} from '@yakumi-app/domain/udonarium/udonariumZip';
import html2canvas from 'html2canvas';
import { CharacterSheetPropsCard } from '../types';

export const createUdonariumFiles =
  (
    backIdentifier: string,
    setting: Settings,
    refList: React.RefObject<HTMLDivElement>[],
  ) =>
  async (item: CharacterSheetPropsCard & { index: number }) => {
    const ref = refList[item.index];
    const canvas = await html2canvas(ref.current!);
    const front = await canvasToFile(canvas);
    const props = [
      {
        title: item.name,
        props: [{ label: '種別', value: item.type, type: undefined }],
      },
      {
        title: item.type,
        props: [{ label: '', value: item.content, type: 'note' }],
      },
    ];
    const doc = getDoc();

    const card = createCardWithProp(
      doc,
      item.name,
      front.identifier,
      backIdentifier,
      props,
      setting.state,
      setting.size,
    );
    const xml = createXML(item.name, doc, card);
    return {
      xml,
      file: front.file,
      card,
      type: item.type,
      timing: item.timing,
    };
  };
