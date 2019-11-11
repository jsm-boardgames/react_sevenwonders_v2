import React from 'react';

const ScoreRow = ({values = [], rowColor = 'grey'}) => {
  const className = `bg-${rowColor}-400`;
  return (
    <tr className={className}>
      {values.map((v, idx) => <td key={idx}>{v}</td>)}
    </tr>
  );
};

const ScoreSheet = ({ranking = []}) => {
  const rows = ranking.reduce((acc, {
    military = 0,
    coins = 0,
    wonderPoints = 0,
    cultural = 0,
    commercial = 0,
    guilds = 0,
    scienceScore = 0,
  }) => {
    acc[0].push(military);
    acc[1].push(Math.floor(coins / 3));
    acc[2].push(wonderPoints);
    acc[3].push(cultural);
    acc[4].push(commercial);
    acc[5].push(guilds);
    acc[6].push(scienceScore);
    acc[7].push(military + Math.floor(coins / 3) + wonderPoints +
        commercial + guilds + scienceScore);
    return acc;
  }, [['military'],['coins'],['wonder'],['blue'],['yellow'],['guilds'],['science'],['total'],]); 
  const headers = ranking.map(({playerName, winner}, idx) => {
    const className = winner ? 'sw-winner' : '';
    return <th key={idx} className={className}>{playerName}</th>;
  });
  const rowColors = [
    'red',
    'yellow',
    'brown',
    'blue',
    'yellow',
    'purple',
    'green',
    'grey',
  ];
  return (
    <table>
      <thead>
        <tr>
          <th></th> {/*first column is for identifiers, rest for players*/}
          {headers}
        </tr>
      </thead>
      <tbody>
        {rows.map((values, idx) => <ScoreRow rowColor={rowColors[idx]} key={idx} values={values} />)}
      </tbody>
    </table>
  );
};

export default ScoreSheet;
