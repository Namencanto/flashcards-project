import classes from "./Statistics.module.scss";
import classNames from "classnames/bind";

function StatisticsData({ joinedDate, learned, allCounts }) {
  const cx = classNames.bind(classes);
  return (
    <div className={classNames(cx("statistics-data"))}>
      <p>Joined: {joinedDate}</p>
      <p>Time spend:</p>
      <p>Learned: {learned}</p>
      <p>Ranking place:</p>
      <p>Created folders: {allCounts.createdFolders}</p>
      <p>Created lists: {allCounts.createdLists}</p>
      <p>Created techcards: {allCounts.createdTechcards}</p>
    </div>
  );
}

export default StatisticsData;
