import React from "react";
import { Pie } from "react-chartjs-2";
import ModalInfo from "../user/ModalInfo";

const backgroundColor = [
  "rgba(255, 99, 132)",
  "rgba(255, 159, 64)",
  "rgba(255, 205, 86)",
  "rgba(75, 192, 192)",
  "rgba(54, 162, 235)",
  "rgba(153, 102, 255)",
  "rgba(201, 203, 207)",
  "rgba(200, 210, 192)",
  "rgba(10, 51, 235)",
  "rgba(100, 5, 255)",
  "rgba(200, 10, 207)",
];

const borderColor = [
  "rgba(255, 99, 132)",
  "rgba(255, 159, 64)",
  "rgba(255, 205, 86)",
  "rgba(75, 192, 192)",
  "rgba(54, 162, 235)",
  "rgba(153, 102, 255)",
  "rgba(201, 203, 207)",
  "rgba(200, 210, 192)",
  "rgba(10, 51, 235)",
  "rgba(100, 5, 255)",
  "rgba(200, 10, 207)",
];

class VerticalBar extends React.Component {
  state = {
    show: false,
    info: null,
    data: null,
    matter: [],
    options: {
      plugins: {
        legend: {
          onClick: (e, item) => this.showDetailsOfTest(e, item),
        },
      },
    },
  };

  componentDidMount() {
    let labelsMatter = [];
    let dataSetMatter = [];
    let tablePercent = [];
    const datas = this.props.dataStat.slice();

    datas.forEach((label) => {
      if (label.tests.length != 0) {
        labelsMatter.push(label.matiere);
        tablePercent.push(label.pourcentage);
      }
    });
    this.setState({ matter: labelsMatter });
    const data = {
      labels: labelsMatter,
      datasets: [
        {
          label: "Pourcentage des tests par matiere",
          data: tablePercent,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(200, 210, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    this.setState({
      data: data,
    });
  }

  showDetailsOfTest = (event, item) => {
    this.props.dataStat.forEach((elt) => {
      if (elt.matiere == item.text) this.setState({ info: elt });
    });
    this.setState({ show: true });
  };

  changeValue = (val) => this.setState({ show: val });

  render() {
    return (
      <>
        <ModalInfo
          show={this.state.show}
          info={this.state.info}
          changeValue={this.changeValue}
        />
        <Pie data={this.state.data} options={this.state.options} />
      </>
    );
  }
}

export default VerticalBar;
