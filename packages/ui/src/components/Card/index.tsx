import React from 'react';
import HandoutCard from './templates/Handout/HandoutCard';
import PCCard from './templates/PC/PCCard';
import SceneCard from './templates/Scene/SceneCard';
import NPCCard from './templates/NPC/NPCCard';
import InfoCard from './templates/Info/InfoCard';
import AttributeCard from './templates/Attribute/AttributeCard';

export const itemToCard = (item: any, i: number) => {
  switch (item.type) {
    case '配役': {
      return <HandoutCard {...item} key={i} />;
    }
    case 'PC': {
      return <PCCard {...item} key={i} />;
    }
    case 'シーン': {
      return <SceneCard {...item} key={i} />;
    }
    case 'NPC': {
      return <NPCCard {...item} key={i} />;
    }
    case '情報': {
      return <InfoCard {...item} key={i} />;
    }
  }
  return <AttributeCard {...item} key={i} />;
};
