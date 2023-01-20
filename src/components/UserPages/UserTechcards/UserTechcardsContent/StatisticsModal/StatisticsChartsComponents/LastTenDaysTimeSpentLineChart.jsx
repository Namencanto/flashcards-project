import { Line } from "react-chartjs-2";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
function LastTenDaysTimeSpentLineChart({ data, options }) {
  const today = new Date();
  const todayString = new Date().toISOString().split("T")[0];

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  const tenDaysAgoDate = tenDaysAgo.toISOString().split("T")[0];

  const fromWhenRef = useRef();

  const [fromHowManyDays, setFromHowManyDays] = useState(10);
  const [convertedData, setConvertedData] = useState({
    allDates: [],
    allTimes: [],
  });

  const oldestDate = new Date(
    Math.min(...data.allDates.map((d) => new Date(d)))
  )
    .toISOString()
    .slice(0, 10);

  const changeFromWhenDisplayStats = () => {
    const currentDate = new Date(fromWhenRef.current.value);
    const differenceInTime = today.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setFromHowManyDays(Math.floor(differenceInDays));
  };

  useEffect(() => {
    function isDateInRange(dateString) {
      const date = new Date(dateString);
      const currentDate = new Date(
        !fromWhenRef.current?.value
          ? tenDaysAgoDate
          : fromWhenRef.current?.value
      );
      return date >= currentDate;
    }
    let dateArr = [];
    for (const date of data.allDates) {
      if (isDateInRange(date.split("T")[0])) {
        dateArr.push(date);
      }
    }

    setConvertedData({
      allDates: dateArr,
      allTimes: data.allTimes.slice(0, dateArr.length),
    });
  }, [data.allDates, fromHowManyDays]);

  const timeSpentData = {
    labels:
      convertedData.allDates.length === 1
        ? convertedData.allDates
            .concat(convertedData.allDates[0])
            .map((date) => date.slice(0, 10))
        : convertedData.allDates.map((date) => date.slice(0, 10)),
    datasets: [
      {
        label: "Time spent (minutes)",
        data:
          convertedData.allDates.length === 1
            ? convertedData.allTimes
                .concat(convertedData.allTimes[0])
                .map((time) => Math.round(time / 60))
            : convertedData.allTimes.map((time) => Math.floor(time / 60)),
        backgroundColor: "red",
        backgroundColor: "rgba(49, 140, 231,.5)",
        borderColor: "rgb(49, 140, 231,1)",
        pointBackgroundColor: "#1873cd ",
        pointBorderColor: "#1873cd ",
        pointRadius: 1.33,
      },
    ],
  };

  return convertedData.allDates.length !== 0 ? (
    <>
      <h2>
        {fromHowManyDays !== 0
          ? `Your time spent from ${fromHowManyDays} days ago:`
          : "Your today time spent:"}
      </h2>
      <form>
        <input
          ref={fromWhenRef}
          onChange={changeFromWhenDisplayStats}
          type="date"
          min={oldestDate}
          max={convertedData.allDates[convertedData.allDates.length - 1]?.slice(
            0,
            10
          )}
          defaultValue={tenDaysAgoDate}
        />
      </form>
      <Line drawOnChartArea={true} data={timeSpentData} options={options} />
    </>
  ) : (
    ""
  );
}

export default LastTenDaysTimeSpentLineChart;
