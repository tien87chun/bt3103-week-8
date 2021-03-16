<template>
  <div id="quantity-counter">
    <button id="increment-decrement" v-on:click="decrement">
      -
    </button>
    <p>{{ counter }}</p>
    <button id="increment-decrement" v-on:click="increment">+</button>
  </div>
</template>

<script>
export default {
  name: "quantity-counter",
  props: {
      item: Object
  },

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
      increment: function() {
        if (this.counter < 10) {
          this.counter++;
          this.$emit('counter', this.item, this.counter);
        } else {
          alert("You cannot buy more than 10 items.");
          this.$emit('counter', this.item, this.counter)
        }
      },

      decrement: function() {
          if (this.counter > 0) {
              this.counter--;
              this.$emit('counter', this.item, this.counter)
          }
      }
  }
};
</script>

<style scoped>
#quantity-counter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
}

#increment-decrement {
  height: 50px;
  width: 50px;
  border-radius: 5px;
  font-size: 20px;
}
</style>