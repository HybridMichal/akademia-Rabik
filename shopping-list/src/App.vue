<template>
  <div id="app">
    <h1>Shopping List</h1>
    <input v-model="newItem.name" placeholder="Enter an item" @keyup.enter="addItem">
    <button @click="addItem">Add</button>
    <ul>
      <li v-for="item in validItems" :key="item.id" class="item">
        {{ item.name }}
        <button @click="removeItem(item)">Remove</button>
      </li>
    </ul>
    <h2>Removed Items</h2>
    <ul>
      <li v-for="removedItem in removedItems" :key="removedItem.id" class="item" :style="{ 'text-decoration': 'line-through' }">
        {{ removedItem.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      newItem: { name: '', isRemoved: false },
      items: [],
    };
  },
  methods: {
    addItem() {
      if (this.newItem.name.trim() !== '') {
        this.items.push({ ...this.newItem, id: Date.now() });
        this.newItem.name = '';
      }
    },
    removeItem(item) {
      item.isRemoved = !item.isRemoved;
    }
  },
  computed: {
    validItems() {
      return this.items.filter(item => !item.isRemoved);
    },
    removedItems() {
      return this.items.filter(item => item.isRemoved);
    }
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  width: 25%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li.item button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
