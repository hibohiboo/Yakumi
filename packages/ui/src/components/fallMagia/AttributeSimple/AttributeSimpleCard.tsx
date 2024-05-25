import CardWrapper from './CardWrapper';
import { CardContent, CardName, CardProp, TagArea } from './Components';

export default function AttributeSimpleCard(props: {
  name: string;
  content: string;
  timing: string;
  cp: number;
  cost: string;
  countdown: string;
  range: string;
  flavor: string;
  tags: string[];
  id?: string;
  type?: string;
  src?: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  const text = props.content ? props.content : props.flavor;
  return (
    <CardWrapper selected={props.selected} onClick={props.onClick}>
      <CardName>{props.name}</CardName>
      <CardProp label="CP">{props.cp}</CardProp>
      <CardContent text={text} />
      <TagArea tags={props.tags} />
    </CardWrapper>
  );
}
