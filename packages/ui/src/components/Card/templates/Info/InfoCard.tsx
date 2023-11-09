import React from 'react';
import AttributeCard from '../Attribute/AttributeCard';

export default function InfoCard(props: {
  name: string;
  content: string;
  id: string;
  src?: string;
}) {
  return <AttributeCard {...props} type="情報" />;
}
