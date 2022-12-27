import { Line } from "react-chartjs-2";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
function LastTenDaysLineChart({ data, options }) {
  const today = new Date();
  const todayString = new Date().toISOString().split("T")[0];

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  const tenDaysAgoDate = tenDaysAgo.toISOString().split("T")[0];

  const fromWhenRef = useRef();

  const [fromHowManyDays, setFromHowManyDays] = useState(10);
  const [convertedData, setConvertedData] = useState({
    allDates: [],
    allWrong: [],
    allRight: [],
    allTimes: [],
  });

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
    console.log(dateArr);
    setConvertedData({
      allDates: dateArr,
      allWrong: data.allWrong.slice(0, dateArr.length),
      allRight: data.allRight.slice(0, dateArr.length),
      allTimes: data.allTimes.slice(0, dateArr.length),
    });
  }, [data.allDates, fromHowManyDays]);

  const answersData = {
    labels:
      convertedData.allDates.length === 1
        ? convertedData.allDates
            .concat(convertedData.allDates[0])
            .map((date) => date.slice(0, 10))
        : convertedData.allDates.map((date) => date.slice(0, 10)),
    datasets: [
      {
        label: "Total",
        data:
          convertedData.allDates.length === 1
            ? convertedData.allRight
                .concat(convertedData.allRight[0])
                .map((num, i) => num + convertedData.allWrong[0])
            : convertedData.allRight.map(
                (num, i) => num + convertedData.allWrong[i]
              ),
        backgroundColor: "rgba(95,77,238,.5)",
        borderColor: "rgba(95,77,238,1)",
        pointBackgroundColor: "#2810e8",
        pointBorderColor: "#2810e8",
        pointRadius: 1.33,
      },
      {
        label: "Wrong",
        data:
          convertedData.allDates.length === 1
            ? convertedData.allWrong
                .concat(convertedData.allWrong[0])
                .map((wrong) => wrong)
            : convertedData.allWrong.map((wrong) => wrong),
        backgroundColor: "red",
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: "rgba(255,0,0,1)",
        pointBackgroundColor: "#c51236",
        pointBorderColor: "#c51236",
        pointRadius: 1.33,
      },
      {
        label: "Right",
        data:
          convertedData.allDates.length === 1
            ? convertedData.allRight
                .concat(convertedData.allRight[0])
                .map((right) => right)
            : convertedData.allRight.map((right) => right),
        backgroundColor: "green",
        backgroundColor: "rgba(100, 255, 100, .5)",
        borderColor: "rgba(0, 255, 0, 1)",
        pointBackgroundColor: "#3dc269",
        pointBorderColor: "#3dc269",
        pointRadius: 1.33,
      },
    ],
  };

  return convertedData.allDates.length !== 0 ? (
    <>
      <h2>
        {fromHowManyDays !== 0
          ? `Your answers from ${fromHowManyDays} days ago:`
          : "Your today answers:"}
      </h2>
      <form>
        <input
          ref={fromWhenRef}
          onChange={changeFromWhenDisplayStats}
          type="date"
          min={convertedData.allDates[0].slice(0, 10)}
          max={convertedData.allDates[convertedData.allDates.length - 1].slice(
            0,
            10
          )}
          defaultValue={tenDaysAgoDate}
        />
      </form>
      <Line drawOnChartArea={true} data={answersData} options={options} />
    </>
  ) : (
    ""
  );
}

export default LastTenDaysLineChart;
