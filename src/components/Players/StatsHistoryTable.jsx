import { Table } from 'react-bootstrap';
import { DateTime } from 'luxon';

const StatsHistoryTable = ({ history = [] }) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Level</th>
          <th>HP</th>
          <th>SP</th>
          <th>GP</th>
          <th>Online Treasures</th>
          <th>Average Field Level</th>
        </tr>
      </thead>
      <tbody>
        {history.map((p, i) => (
          <tr key={i}>
            <td>
              {DateTime.fromISO(p.updatedAt).toLocaleString(
                DateTime.DATETIME_MED_WITH_WEEKDAY,
              )}
            </td>
            <td>{p.level}</td>
            <td>{p.currentHp}</td>
            <td>{p.currentSp}</td>
            <td>{p.currentGp}</td>
            <td>{p.onlineTreasures}</td>
            <td>{p.averageFieldLevel}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StatsHistoryTable;
