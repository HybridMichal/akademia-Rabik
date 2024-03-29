<template>
    <div class="shopping-lists-container">
        <div class="header">
            <h3>Shopping List</h3>
        </div>
        <div class="shopping-listes-content-container">
            <div class="shopping-lists-sidebar">
                <ul>
                    <li @click="showAllLists">All Lists</li>
                    <li
                        v-for="list in shoppingLists"
                        :key="list.id"
                        :class="{ active: selectedList === list.id }"
                    >
                        <a @click="selectList(list.id)">{{ list.title }}</a>
                    </li>
                </ul>
            </div>

            <div class="shopping-lists-content">
                <h1>Lists</h1>

                <template v-if="!shoppingLists">
                    <p>Loading data</p>
                </template>

                <template v-else-if="shoppingLists.error">
                    Error loading data: {{ shoppingLists.error }}
                </template>

                <template v-else>
                    <div class="shopping-lists">
                        <ul>
                            <li
                                v-for="list in shoppingLists"
                                :key="list.id"
                                class="shopping-list-item"
                                v-show="selectedList === list.id || showAll"
                            >
                                <ul>
                                    <li
                                        v-for="item in list.items"
                                        :key="item.id"
                                        class="shopping-list-item"
                                    >
                                        <input type="checkbox" class="item-checkbox" />
                                        <span class="item-name">{{ item.name }}</span>
                                        <span class="item-unit">{{ item.unit }}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            shoppingLists: null,
            selectedList: null,
            showAll: false,
        };
    },

    async mounted() {
        try {
            const {
                data: { data: shoppingLists },
            } = await axios.get("/api/v1/shopping-lists");
            this.shoppingLists = shoppingLists;
            console.log("Data from the second axios request:", shoppingLists);
            if (shoppingLists.length > 0) {
                this.selectedList = shoppingLists[0].id;
            }
        } catch (error) {
            console.error("Error:", error);
            this.shoppingLists = { error };
        }
    },

    methods: {
        selectList(listId) {
            this.selectedList = listId;
            this.showAll = false;
        },

        showAllLists() {
            this.showAll = true;
        },

        openShoppingListDetail({ id }) {
            this.$router.push({ name: "Shopping List - Detail", params: { id } });
        },
    },
};
</script>

<style scoped>
.header {
    display: flex;
    background-color: #333;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding: 10px;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.shopping-lists-container {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
}

.shopping-listes-content-container {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.shopping-lists-sidebar {
    flex: 1;
    padding: 10px 0;
    height: 100vh;
    background-color: #333;
}

.shopping-lists-sidebar h2 {
    margin-top: 0;
}

.shopping-lists-sidebar ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.shopping-lists-sidebar li {
    margin-bottom: 5px;
}

.shopping-lists-sidebar li a {
    text-decoration: none;
}

.shopping-lists-sidebar li.active {
    font-weight: bold;
}

.shopping-lists-sidebar button {
    margin-top: 10px;
}

.shopping-lists-content {
    flex: 3;
    padding: 10px;
}

.shopping-lists {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.shopping-list-item {
    margin-bottom: 10px;
}

.shopping-list-item ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.shopping-list-item li {
    margin-bottom: 5px;
}

.shopping-list-item {
    display: flex;
    align-items: center;
}

.item-checkbox {
    margin-right: 5px;
}

.item-name {
    flex: 1;
}

.item-unit {
    margin-left: 5px;
    padding: 5px;
    border-radius: 5px;
}

.full-width {
    width: 100%;
    margin: 0;
}
</style>
