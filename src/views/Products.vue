<template>
    <div>
        <b-card>
            <account-setting-products />
        </b-card>
    </div>
</template>


<script>
import AccountSettingProducts from '@/views/account-setting/AccountSettingProducts.vue'
import { BCard } from 'bootstrap-vue';
export default {
    components: {
        AccountSettingProducts,
        BCard
    }
}
</script>