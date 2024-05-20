import { useState } from 'react';
import { scene2Questions } from '../services/scene2Questions';

export const useFallMagiaScene2Hooks = () => {
  const [selectedQA, setSelectedWQA] = useState<{
    q: string;
    a: string;
    b: string;
  }>(scene2Questions[0]);
  const setQA: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const item = scene2Questions.find((i) => i.q === event.target.value);
    if (!item) return;
    setSelectedWQA(item);
  };
  return {
    selectedQA,
    setQA,
    scene2Questions,
  };
};
