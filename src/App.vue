<template>
  <div id="app">
    <div id="header-bar">
      <h1>Tien's Zichar</h1>
    </div>
    <ul>
      <li><router-link class="router" to="/" exact>Menu</router-link></li>
      <li><router-link class="router" to="/order" exact>Orders</router-link></li>
      <li><router-link class="router" to="dashboard" exact>Dashboard</router-link></li>
      </ul>
    <router-view></router-view> 
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
    };
  },
};
</script>

<style scoped>
#header-bar {
  background-color: #87ceeb;
  margin-top: 0%;
  height: 100px;
  text-align: center;
  padding-top: 20px;
}

.router {
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
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
</style>
