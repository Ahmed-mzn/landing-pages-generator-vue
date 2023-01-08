<template>
    <div>
        <b-card>
            <b-table responsive hover :items="orders"/>
        </b-card>
    </div>
</template>

<script>
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BTable } from 'bootstrap-vue'
import axios from 'axios'

export default {
    components:{
        BCard,
        BCardText,
        BRow,
        BCol,
        BButton,
        BLink,
        BAvatar,
        BBadge,
        BTabs,
        BTab,
        BTable
    },
    data(){
        return {
            template: null,
            orders: []
        }
    },
    mounted(){
        this.getOrders()
    },
    methods: {
        getOrders(){
            axios.get(`/forms?template_id=${this.$route.params.id}`)
            .then((response) => {
                console.log(response);
                this.orders = response.data
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        }
    }
}
</script>