<template>
  <div>
    <div>
      <ul id="order-box">
        <li id="order-items" v-for="item in orders" :key="item.name">
          <ul v-for="(value, key) in item[1]" :key="key">
            <li>{{ key }}: {{ value }}</li>
          </ul>
          <button v-bind:id=item[0] v-on:click="deleteItem($event)">Delete</button>
          <router-link to="/modify" exact><button v-bind:id=item[0] v-on:click="route($event)">Modify</button></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: [],
    };
  },

  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.orders.push([doc.id, doc.data().order]);
          });
        });
    },

    deleteItem: function (event) {
      let doc_id = event.target.getAttribute("id");
      console.log(doc_id)
      database
        .collection("orders")
        .doc(doc_id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          location.reload()
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    route: function(event) {
      let doc_id = event.target.getAttribute("id");
        this.$router.push({ name: "Modify", params: { doc_id } });
    }
  },

  created() {
    console.log("fetching")
    this.fetchItems();
  },
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}

#order-box {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
#order-items {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

#modify,
#modify visited {
    color: black;
    text-decoration: none;
}
</style>