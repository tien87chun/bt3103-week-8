<template>
  <div>
    <h2>Menu</h2>
    <ul>
      <li v-for="item in itemsSelected" :key="item.id">
        {{ item[0] }} x {{ item[1] }}
      </li>
    </ul>
    <button
      id="total-button"
      v-on:click="
        findSubTotal();
        findGrandTotal();
        toggleShowTotal();
      "
    >
      Calculate Total
    </button>
    <button id="order-button" v-on:click="sendOrder()">Send Order</button>
    <div id="total" v-show="showTotal">
      <br />
      Subtotal: ${{ subTotal }}<br /><br />
      Grand Total: ${{ grandTotal }}
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  props: {
    itemsSelected: {
      type: Array,
    },
  },

  data() {
    return {
      subTotal: 0,
      grandTotal: 0,
      showTotal: false,
      orderNumber: 0,
      menu: [],
    };
  },

  methods: {
    findSubTotal: function () {
      var i;
      this.subTotal = 0;
      for (i = 0; i < this.itemsSelected.length; i++) {
        this.subTotal += this.itemsSelected[i][2] * this.itemsSelected[i][1];
      }
      this.subTotal = this.subTotal.toFixed(2);
    },

    findGrandTotal: function () {
      this.grandTotal = (this.subTotal * 1.07).toFixed(2);
    },

    toggleShowTotal: function () {
      this.showTotal = true;
    },

    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.menu.push(doc.data().name);
          });
        });
    },

    fillInUnorderedItems: function (order) {
      console.log("running");
      var j;
      console.log(order);
      console.log(order.length);
      for (j = 0; j < this.menu.length; j++) {
        console.log("running 2");
        var menuItem = this.menu[j];
        if (!(menuItem in order)) {
          console.log("added");
          order[menuItem] = 0;
        }
      }
      console.log(order);
    },

    sendOrder: function () {
      var i;
      var order = {};

      for (i = 0; i < this.itemsSelected.length; i++) {
        order[this.itemsSelected[i][0]] = this.itemsSelected[i][1];
      }

      this.fillInUnorderedItems(order);
      this.findSubTotal();
      this.findGrandTotal();
      database.collection("orders").add(
        {
          order: order,
          subTotal: +this.subTotal,
          grandTotal: +this.grandTotal,
          }).then(function() {
              location.reload()
          }
      );
      console.log("order sent");
    },
  },

  created() {
      this.fetchItems();
      console.log(this.menu)
  }
};
</script>

<style scoped>
#total-button {
  height: 45px;
  width: 175px;
  border-radius: 5px;
  font-size: 20px;
}

#order-button {
  margin-top: 35px;
  height: 45px;
  width: 175px;
  border-radius: 5px;
  font-size: 20px;
}

li {
  margin: 20px 0;
}

#total {
  margin-top: 10px;
}
</style>