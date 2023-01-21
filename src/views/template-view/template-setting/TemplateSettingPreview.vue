<template>
    <div>
        <iframe style="border:none;" :src="'http://localhost:8080/test/'+app_id" width="100%" height="500" title="W3Schools Free Online Web Tutorials"></iframe>
    </div>
</template>

<script>
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab } from 'bootstrap-vue'
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
        BTab
    },
    data(){
        return {
            template: null
        }
    },
    mounted(){
        console.log("mounted prev");
    }
}
</script>