import React from "react";
import { Bar } from "react-chartjs-2";

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// };
const arbitraryStackKey = "stack1";

// const options = {
//   scales: {
//     xAxes: [
//       {
//         stacked: true,
//       },
//     ],
//     yAxes: [
//       {
//         stacked: true,
//       },
//     ],
//   },
// };

// let data = {
//   datasets: [
//     {
//       label: "test1",
//       data: [1,2],
//     },
//     {
//       label: "test2",
//       data: [2],
//     },
//   ],
//   labels: ["ECM", "MATHEMATIQUE"],
// };
const data = {
  labels: ["a", "b", "c", "d", "e"],
  datasets: [
    // These two will be in the same stack.
    {
      stack: arbitraryStackKey,
      label: "data1",
      data: [1, 2, 3, 4, 5],
    },
    {
      stack: arbitraryStackKey,
      label: "data2",
      data: [5, 4, 3, 2, 1],
    },
  ],
};

const VerticalBar = () => (
  <>
    <h1>Partication aux tests</h1>
    <Bar data={data} />
  </>
);

export default VerticalBar;
