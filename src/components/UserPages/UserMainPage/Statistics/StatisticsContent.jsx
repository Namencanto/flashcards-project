function StatisticsContent({
  mainStats,
  allActivity,
  optionsLine,
  allAnswers,
  optionsAnswersPie,
  allStatuses,
  optionsStatusesPie,
  StatisticsData,
  LastTenDaysLineChart,
  FutureRepetitionsLineCharts,
  LastTenDaysTimeSpentLineChart,
  AllAnswersPieChart,
  AllStatusesPieChart,
}) {
  return (
    <>
      <StatisticsData
        mainStats={mainStats}
        totalTime={allActivity.allTimes.reduce((a, b) => a + b, 0)}
      />
      <LastTenDaysLineChart data={allActivity} options={optionsLine} />
      <FutureRepetitionsLineCharts statisticsIds="all" options={optionsLine} />
      {allActivity.allDates.length > 0 ? (
        <LastTenDaysTimeSpentLineChart
          data={allActivity}
          options={optionsLine}
        />
      ) : (
        ""
      )}
      <AllAnswersPieChart data={allAnswers} options={optionsAnswersPie} />
      <AllStatusesPieChart
        statuses={allStatuses}
        options={optionsStatusesPie}
      />
    </>
  );
}

export default StatisticsContent;
