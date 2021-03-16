import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: '24-Hour PSI Value'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        let psiReadings = {}
        let color = ["#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              '#000000']
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            // console.log(response.data)
            response.data.items.forEach(timestamp => {
                // console.log(timestamp.readings.psi_twenty_four_hourly)
                Object.entries(timestamp.readings.psi_twenty_four_hourly).forEach(([key, value]) => {
                    // console.log(key, value)
                    if (!Object.keys(psiReadings).includes(key)) {
                        psiReadings[key] = [value]
                    } else {
                        psiReadings[key].push(value)
                    }
                })
                this.datacollection.labels.push(timestamp.timestamp)
            })
            console.log(psiReadings)
            return (psiReadings)
        }).then(readings => {
            Object.entries(readings).forEach(([key, value], index) => {
                console.log(key)
                let dataObject = {
                    data: value,
                    fill: false,
                    borderColor: color[index],
                    label: key
                }
                this.datacollection.datasets.push(dataObject)
            })
            console.log(this.datacollection)
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}