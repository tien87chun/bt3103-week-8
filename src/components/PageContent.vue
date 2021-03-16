<template>
  <div>
    <div id="itemsList">
      <ul>
        <li v-for="item in items" :key="item.name">
          <p id="itemName">{{ item.name }}</p>
          <img :src="item.imageURL" />
          <p id="price">${{ item.price }}</p>
          <QuantityCounter
            id="quantity-counter"
            v-on:counter="onCounter" v-bind:item='item'
          ></QuantityCounter>
        </li>
      </ul>
    </div>
    <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";
import database from "../firebase.js";

export default {
  data() {
    return {
      items: [],
      itemsSelected: [],
    };
  },

  components: {
    QuantityCounter: QuantityCounter,
    Basket: Basket,
  },

  methods: {
    onCounter: function (item, count) {
      if (this.itemsSelected.length == 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          var found = false;

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item_name == item.name && count > 0) {
            this.itemsSelected.splice(i, 1, [
              curr_item[0],
              count,
              curr_item[2],
            ]);
            found = true;
            break;
          }

          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          else if (item_name == item.name && count == 0) {
            this.itemsSelected.splice(i, 1);
            found = true;
          }
        }

        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        if (!found) {
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },

    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            var item = doc.data();
            this.items.push(item);
          });
        });
    }
  },
  created() {
    this.fetchItems();  }
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 0spx;
  box-sizing: border-box;
  text-align: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
  font-size: 30px;
}

#quantity-counter {
  text-align: center;
  margin: 0 auto;
  margin-bottom: 10px
}
</style>