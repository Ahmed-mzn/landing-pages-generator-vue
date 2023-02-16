<template>
    <div>
        <b-tabs>
            <b-tab lazy active>
                <template #title>
                    <feather-icon icon="ToolIcon" />
                    <span>صفحات الهبوط</span>
                </template>

                <templates />
            </b-tab>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="UserIcon" />
                    <span>المنتجات</span>
                </template>
                
                <b-card title="المنتجات المؤرشفة">
                    <products />
                </b-card>
            </b-tab>
        </b-tabs>
    </div>
</template>


<script>
import Products from './Products.vue'
import Templates from './Templates.vue'

import { BTabs, BTab, BCard } from 'bootstrap-vue'
export default {
    components: {
        Products, Templates,
        BCard, BTabs, BTab,
    },
}
</script>