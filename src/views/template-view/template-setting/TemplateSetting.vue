<template>
    <div>
        <b-row align-v="stretch">
            <b-col cols="12" xl="8" lg="8" sm="8">
                <b-card>
                    <b-tabs pills>
                        <b-tab lazy title="البيانات الأساسية" active>
                            <template-setting-general @reloadComp="reloadComp" :template="template" />
                        </b-tab>
                        <b-tab lazy title="الصور">
                            <template-setting-images @reloadComp="reloadComp" :template="template" />
                        </b-tab>
                        <b-tab lazy title="المنتجات">
                            <template-setting-products @reloadComp="reloadComp" :template="template" />
                        </b-tab>
                        <b-tab lazy title="تقييمات العملاء">
                            <template-setting-reviews @reloadComp="reloadComp"/>
                        </b-tab>
                        <b-tab lazy title="الميزات">
                            <template-setting-features @reloadComp="reloadComp"/>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
            <b-col cols="12" xl="4" lg="4" sm="4">
                <template-setting-preview :key="reloadComponent" :app_id="template.id"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import TemplateSettingFeatures from './TemplateSettingFeatures.vue'
import TemplateSettingImages from './TemplateSettingImages.vue'
import TemplateSettingGeneral from './TemplateSettingGeneral.vue'
import TemplateSettingPreview from './TemplateSettingPreview.vue'
import TemplateSettingProducts from './TemplateSettingProducts.vue'
import TemplateSettingReviews from './TemplateSettingReviews.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab } from 'bootstrap-vue'
export default {
    components:{
        TemplateSettingFeatures,
        TemplateSettingImages,
        TemplateSettingGeneral,
        TemplateSettingPreview,
        TemplateSettingProducts,
        TemplateSettingReviews,
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
    props: {
        template: {
            type: Object,
            default: () => {},
        }
    },
    data(){
        return {
            reloadComponent: 0,
            newTemplate: {}
        }
    },
    methods:{
        reloadComp(){
            this.reloadComponent += 1
        }
    }
}
</script>
