export const getOptionsLine = (minWidth1000) => {
  return {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
    aspectRatio: minWidth1000 ? 0.8 : 1.5,
    elements: {
      line: {
        borderWidth: 2,
        lineTension: 0.1,
        borderCapStyle: "butt",
        fill: true,
        borderJoinStyle: "round",
      },
    },
  };
};

export const getOptionsAnswersPie = (minWidth1000) => {
  return {
    aspectRatio: minWidth1000 ? 0.92 : 1.5,
    elements: {
      arc: {
        hoverBorderColor: ["#007700", "#770000"],
        hoverBorderWidth: 2,
      },
    },
  };
};

export const getOptionsStatusesPie = (minWidth1000) => {
  return {
    aspectRatio: minWidth1000 ? 0.8 : 1.34,
    elements: {
      arc: {
        hoverBorderWidth: 2,
      },
    },
  };
};
