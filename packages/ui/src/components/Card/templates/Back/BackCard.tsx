import CardWrapper from '../../layouts/CardWrapper';

export default function BackCard({ url }: { url: string }) {
  return (
    <CardWrapper
      style={{
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
        userSelect: 'none',
      }}
    >
      <img style={{ maxWidth: '100%' }} src={url} />
    </CardWrapper>
  );
}
