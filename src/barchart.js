import { Bar } from "vue-chartjs";
import database from "./firebase.js";

export default {
  extends: Bar,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Quantity",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
            ],
            data: [],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total Number of Each Dish",
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    fetchItems: function() {
      let menu = [];
      let quantity = [];
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          let menuQuantity = {};
          querySnapShot.forEach((doc) => {
            let items = doc.data().order;
            Object.entries(items).forEach(([key, value]) => {
              if (Object.keys(menuQuantity).includes(key)) {
                menuQuantity[key] += value;
              } else {
                menuQuantity[key] = value;
              }
            });
          });
          return menuQuantity;
        })
        .then((output) => {
          Object.entries(output).forEach(([key, value]) => {
            menu.push(key);
            quantity.push(value);
          });
          this.datacollection.labels = menu;
          this.datacollection.datasets[0].data = quantity;
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
