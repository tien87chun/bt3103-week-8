<template>
  <div>
    <ul v-for="(value, key, index) in datapacket[0]" v-bind:key="index">
      <li class="item">
        {{ key }}: {{ value }}<br />
        <input
          class="item"
          placeholder="0"
          type="number"
          min="0"
          v-bind:id="index"
          v-bind:name="key"
        />
      </li>
    </ul>
    <button class="updateOrderButton" v-on:click="updateOrder()">
      Update Order
    </button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  name: "Modify",
  props: {
    doc_id: String,
  },

  data() {
    return {
      datapacket: [],
    };
  },

  methods: {
    fetchItems: function () {
      console.log(this.doc_id);
      database
        .collection("orders")
        .doc(this.doc_id)
        .get()
        .then((doc) => {
          this.datapacket.push(doc.data().order);
        });
      console.log(this.datapacket);
    },

    updateOrder: function () {
      let datapacketCopy = this.datapacket[0];
      for (let i = 0; i < Object.keys(datapacketCopy).length; i++) {
        var updatedQty = Number(document.getElementById(i).value);
        var name = document.getElementById(i).name;
        datapacketCopy[name] = updatedQty;
      }

      database
        .collection("orders")
        .doc(this.doc_id)
        .update({
          order: datapacketCopy,
        })
        .then(() => this.$router.push("order"));
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style>
.item {
  margin: 10px 0;
}

.updateOrderButton {
  width: 150px;
  font-size: 18px;
}
</style>