function SheetToCharsheet(props: { characterName: string }) {
  return (
    <div style={{ margin: '1rem' }}>
      <table>
        <thead>
          <tr>
            <th>キャラクター名</th>
            <td>{props.characterName}</td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default SheetToCharsheet;
