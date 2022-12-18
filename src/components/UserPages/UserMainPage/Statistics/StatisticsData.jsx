import classes from "./Statistics.module.scss";
import classNames from "classnames/bind";

function StatisticsData({ mainStats, totalTime }) {
  console.log(totalTime);
  const cx = classNames.bind(classes);
  function secondsToTime(seconds) {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
    }
  }
  return (
    <div className={classNames(cx("statistics-data"))}>
      <p>Joined: {mainStats.joinedDate}</p>
      <p>Total time spent: {secondsToTime(Math.floor(totalTime))} </p>

      <p>Learned: {mainStats.learnedNumber}</p>
      <p>Ranking place: {mainStats.rankingPlace}</p>
      <p>Created folders: {mainStats.createdFolders}</p>
      <p>Created lists: {mainStats.createdLists}</p>
      <p>Created techcards: {mainStats.createdTechcards}</p>
    </div>
  );
}

export default StatisticsData;
