import CardWrapper from './CardWrapper';
import { CardContent, CardName, CardProp, TagArea } from './Components';

export default function AttributeCard(props: {
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
  return (
    <CardWrapper selected={props.selected} onClick={props.onClick}>
      <CardName>{props.name}</CardName>
      {props.src && (
        <figure
          style={{
            maxHeight: '150px',
            overflow: 'hidden',
            borderBottom: 'solid 1px #000',
            textAlign: 'center',
          }}
        >
          <img src={props.src} style={{ height: '100%' }} />
        </figure>
      )}
      <div style={{ display: 'flex' }}>
        <CardProp
          label="タイミング"
          contentStyle={{ width: '44px' }}
          labelStyle={{ width: '50px' }}
        >
          {props.timing}
        </CardProp>
        <CardProp
          label="CP"
          style={{ borderLeft: 'none' }}
          contentStyle={{ width: '45px' }}
          labelStyle={{ width: '25px' }}
        >
          {props.cp}
        </CardProp>
      </div>
      <div style={{ display: 'flex', borderTop: 'solid 1px #000' }}>
        <CardProp
          label="カウント"
          contentStyle={{ width: '44px' }}
          labelStyle={{ width: '50px' }}
        >
          {props.countdown}
        </CardProp>
        <CardProp
          label="射程"
          style={{ borderLeft: 'none' }}
          contentStyle={{ width: '45px' }}
          labelStyle={{ width: '25px', fontSize: '0.7rem' }}
        >
          {props.range}
        </CardProp>
      </div>
      <CardProp
        label="コスト"
        labelStyle={{ width: '50px' }}
        style={{ borderTop: '1px #000 solid' }}
      >
        {props.cost}
      </CardProp>
      <CardContent content={props.content} flavor={props.flavor}></CardContent>
      <TagArea tags={props.tags} />
      {/* <CardType>{props.type}</CardType>
      <CardId>{props.id}</CardId> */}
    </CardWrapper>
  );
}
