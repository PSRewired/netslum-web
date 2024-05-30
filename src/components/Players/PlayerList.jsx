'use client';

import { Table } from 'react-bootstrap';
import { CharacterClassNames } from '@/constants/Character.js';
import Link from '@/components/Router/Link.jsx';

const PlayerList = ({ players = [] }) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p, i) => (
          <tr key={i}>
            <td>
              <Link href={`/akashic-records/${p.id}`}>{p.characterName}</Link>
            </td>
            <td>{p.level}</td>
            <td>{CharacterClassNames[p.class]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PlayerList;
