<template>
    <div>
        <test />
    </div>
</template>

<script>
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab } from 'bootstrap-vue'
import Test from '@/views/error/Test.vue'
export default {
    props: {
        app_id: {
            type: Number,
            default: () => 0,
        }
    },
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
        Test
    },
    data(){
        return {
            template: null
        }
    }
}
</script>