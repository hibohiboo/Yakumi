export default function CircleChar(props: {
  value: string;
  style?: React.CSSProperties;
  x: number;
  y: number;
}) {
  return (
    <div
      style={{
        border: 'solid 3px red',
        width: '30px',
        height: '30px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        backgroundColor: 'white',
        position: 'absolute',
        top: `${props.y}px`,
        left: `${props.x}px`,
        transform: 'scale(0.8)',
        ...props.style,
      }}
    >
      {props.value}
    </div>
  );
}
