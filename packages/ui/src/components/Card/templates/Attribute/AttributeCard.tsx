import React from 'react';
import CardWrapper from '../../layouts/CardWrapper';
import { CardContent, CardId, CardName, CardType } from '../../layouts/Components';

export default function AttributeCard(props: {
  name: string;
  content: string;
  id: string;
  type: string;
  src?: string;
}) {
  return (
    <CardWrapper>
      <CardName>{props.name}</CardName>
      {props.src && (
        <figure style={{ maxHeight: '150px', overflow: 'hidden' }}>
          <img src={props.src} style={{ width: '100%' }} />
        </figure>
      )}
      <CardContent style={{ fontSize: '12px' }}>{props.content}</CardContent>
      <CardType>{props.type}</CardType>
      <CardId>{props.id}</CardId>
    </CardWrapper>
  );
}
