<template>
    <div>
        <b-row align-v="stretch">
            <b-col cols="12" xl="8" lg="8" sm="8">
                <b-row>
                    <b-col cols="12" class="mt-1">
                        <div class="d-flex align-items-center mb-1">
                            <b-avatar rounded variant="light-success">
                                <feather-icon size="18" icon="ShoppingBagIcon" />
                            </b-avatar>
                            <h2 class="mb-0 ml-75">
                                المنتجات
                            </h2>
                        </div>
                    </b-col>
                    <b-col cols="12">
                        <app-collapse accordion type="margin">
                            <!-- main template products -->
                            <app-collapse-item :title="'صفحة ' + template.template_name + '  (الأساسية)'">
                                <template-setting-products @reloadComp="reloadComp" :template="template" />
                            </app-collapse-item>

                            <app-collapse-item v-for="t in templates" :key="t.id" :title="'صفحة ' + t.template_name">
                                <template-setting-products @reloadComp="reloadComp" :template="t" />
                            </app-collapse-item>
                        </app-collapse>
                    </b-col>
                    <b-col cols="12" class="mt-3">
                        <div class="d-flex align-items-center mb-1">
                            <b-avatar rounded variant="light-success">
                                <feather-icon size="18" icon="SearchIcon" />
                            </b-avatar>
                            <h2 class="mb-0 ml-75">
                                تحسين محركات البحث (SEO)
                            </h2>
                        </div>
                    </b-col>
                    <b-col cols="12">
                        <app-collapse accordion type="margin">
                            <app-collapse-item :title="'صفحة ' + template.template_name + '  (الأساسية)'">
                                <p>soon</p>
                            </app-collapse-item>

                            <app-collapse-item v-for="t in templates" :key="t.id" :title="'صفحة ' + t.template_name">
                                <p>soon</p>
                            </app-collapse-item>
                        </app-collapse>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" xl="4" lg="4" sm="4">
                <template-setting-preview :key="reloadComponent" :app_id="template.id"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import TemplateSettingFeatures from './TemplateSettingFeatures.vue'
import TemplateSettingImages from './TemplateSettingImages.vue'
import TemplateSettingGeneral from './TemplateSettingGeneral.vue'
import TemplateSettingPreview from './TemplateSettingPreview.vue'
import TemplateSettingProducts from './TemplateSettingProducts.vue'
import TemplateSettingReviews from './TemplateSettingReviews.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab } from 'bootstrap-vue'
import axios from 'axios'
export default {
    components:{ 
        TemplateSettingFeatures, TemplateSettingImages, TemplateSettingGeneral, TemplateSettingPreview, TemplateSettingProducts, TemplateSettingReviews, 
        BCard, BCardText, BRow, BCol, BButton, BLink, BAvatar, BBadge, BTabs, BTab,
        AppCollapse, AppCollapseItem
    },
    props: {
        template: {
            type: Object,
            default: () => {},
        }
    },
    data(){
        return {
            templates: [],
            reloadComponent: 0,
            newTemplate: {}
        }
    },
    mounted(){
        this.getTemplates();
    },
    methods:{
        getTemplates(){
            axios.get(`/templates/children?template_id=${this.$route.params.id}`)
            .then(response => {
                this.templates = response.data
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
        },
        reloadComp(){
            this.reloadComponent += 1
        }
    }
}
</script>
