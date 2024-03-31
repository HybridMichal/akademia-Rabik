<template>
    <div class="shopping-lists-container">
        <div class="header">
            <h3>Shopping List</h3>
        </div>
        <div class="shopping-listes-content-container">
            <div class="shopping-lists-sidebar">
                <ul>
                    <li @click="redirectToAllLists">All Lists</li>
                    <li
                        v-for="list in shoppingLists"
                        :key="list.id"
                        :class="{ active: selectedList === list.id }"
                    >
                        <a @click="redirectToDetail(list.id)">{{ list.title }}</a>
                        <button @click="removeList(list.id)">Remove</button>
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
                                v-show="selectedList === list.id"
                            >
                                <ul>
                                    <li
                                        v-for="item in list.items"
                                        :key="item.id"
                                        class="shopping-list-item"
                                    >
                                        <input type="checkbox" class="item-checkbox" :id="item.id" v-model="item.is_checked" />
                                        <span class="item-name">{{ item.name }}</span>
                                        <span class="item-unit">{{ item.unit }}</span>
                                    </li>
                                    <li class="shopping-list-item">
                                        <input type="text" class="item-input" placeholder="Enter item name" v-model="newItemName" />
                                        <button @click="addItemToList(list.id)">Add Item</button>
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
            showAll: false,
            newItemName: "",
            selectedList: null,
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
        },

        async addItemToList(listId) {
            try {
                const newItem = {
                    name: this.newItemName,
                    unit: "pcs",
                    is_checked: false,
                };

                const {
                    data: { data: updatedList },
                } = await axios.post(`/api/v1/shopping-lists/${listId}/items`, newItem);

                const listIndex = this.shoppingLists.findIndex(list => list.id === listId);
                if (listIndex !== -1) {
                    this.shoppingLists[listIndex] = updatedList;
                }

                this.newItemName = "";
            } catch (error) {
                console.error("Error:", error);
            }
        },

        async removeList(listId) {
            try {
                await axios.delete(`/api/v1/shopping-lists/${listId}`);
                this.shoppingLists = this.shoppingLists.filter(list => list.id !== listId);
                if (this.selectedList === listId) {
                    this.selectedList = null;
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },

        redirectToDetail(listId) {
            this.$router.push({ name: "Shopping List - Detail", params: { id: listId } });
        },
        
        redirectToAllLists() {
            window.location.href = "http://localhost:8080/#/"; // znemit boze moj
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
