<template>
    <div>
        <div class="d-flex justify-content-start">
            <!-- <b-avatar size="lg" variant="light-primary">
            </b-avatar> -->
                
                <b-avatar :to="{name:'landing-app'}" variant="default">
                    <feather-icon href="/landing-app" class="text-primary" size="30" icon="ArrowRightIcon" />
                </b-avatar>
            <div class="d-flex flex-column ml-1">
                <div class="mb-1">
                    <h4 class="mb-0">
                        صفحة هبوط 1
                    </h4>
                    <span class="card-text">
                        <feather-icon icon="LinkIcon" size="13" />
                        <b-link :href="'http://domain.xx/'+template.template_name" target="_blank">domain.xx/{{template.template_name}}</b-link>
                        <b-badge
                            href="#"
                            variant="primary"
                            class="ml-1"
                        >
                            <feather-icon
                            icon="LinkIcon"
                            class="mr-25"
                            />
                            <span>Copy URL</span>
                        </b-badge>
                    </span>
                </div>
            </div>
        </div>
        <b-tabs>
            <b-tab lazy active>
                <template #title>
                    <feather-icon icon="HomeIcon" />
                    <span>التصميم</span>
                </template>
                <template-setting :template="template"/>
            </b-tab>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="ToolIcon" />
                    <span>التحليلات</span>
                </template>
                <template-analytics/>
            </b-tab>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="UserIcon" />
                    <span>الطلبات</span>
                </template>
                <template-orders/>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import TemplateOrders from './TemplateOrders.vue'
import TemplateAnalytics from './TemplateAnalytics.vue'
import TemplateSetting from './template-setting/TemplateSetting.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab } from 'bootstrap-vue'

import axios from 'axios'
export default {
    components:{
        TemplateSetting,
        TemplateOrders,
        TemplateAnalytics,
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
        TemplateSetting
    },
    data(){
        return {
            template: {}
        }
    },
    created(){
        this.getTemplate();
    },
    methods:{
        getTemplate(){
            axios.get(`/templates/${this.$route.params.id}`)
            .then((response) => {
                this.template = response.data
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>