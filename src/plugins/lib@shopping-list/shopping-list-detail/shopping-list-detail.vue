<template>
    <div>
        <h1>Shopping List Detail</h1>
        <div v-if="shoppingList">
            <h2>{{ shoppingList.title }}</h2>
            <ul>
                <li v-for="item in shoppingList.items" :key="item.id">
                    {{ item.name }} ({{ item.unit }})
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
	data() {
		return {
			shoppingList: null
		}
	},

async mounted() {
	try {
		const { data: { data: shoppingLists } } = await axios.get('/api/v1/shopping-lists')
		this.shoppingList = shoppingLists.find(({ id }) => id == this.$route.params.id)
        console.log('Data from the second axios request:', this.shoppingList)
	} catch (error) {
		console.error('Error:', error)
		this.shoppingList = { error }
	}
}
}
</script>