<template>
    <div>
        <div class="d-flex justify-content-start">
            <!-- <b-avatar size="lg" variant="light-primary">
            </b-avatar> -->
                
                <b-avatar to="#" variant="default">
                    <feather-icon href="#" @click="$router.go(-1)" class="text-primary" size="30" icon="ArrowRightIcon" />
                </b-avatar>
            <div class="d-flex flex-column ml-1">
                <div class="mb-1">
                    <h4 class="mb-0">
                        صفحة هبوط {{ template.template_name }}
                    </h4>
                    <template v-if="template.domain">
                        <span class="card-text">
                            <feather-icon icon="LinkIcon" size="13" />
                            <b-link :href="'http://'+handleDomainName(template.domain) + '/' + template.template_name" target="_blank">
                                http://{{handleDomainName(template.domain) + '/'+ template.template_name}}
                            </b-link>
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
                        <b-button
                            v-if="template.domain"
                            variant="flat-warning"
                            class="ml-2"
                            @click="showDomainModal = true"
                        >
                            <feather-icon
                            icon="EditIcon"
                            class="mr-20"
                            />
                                تعديل النطاق
                        </b-button>
                    </template>
                    <template v-else>
                        <span class="card-text">
                            <b-badge
                                href="#"
                                variant="danger"
                                class="ml-1"
                            >
                                <feather-icon
                                icon="LinkIcon"
                                class="mr-25"
                                />
                                <span>لايوجد نطاق</span>
                            </b-badge>
                            <b-badge
                                href="#"
                                variant="warning"
                                class="ml-1"
                            >
                                <feather-icon
                                icon="AlertTriangleIcon"
                                class="mr-25"
                                />
                                <span>الصفحة غير منشورة</span>
                            </b-badge>
                        </span>
                        <b-button
                            variant="flat-warning"
                            class="ml-2"
                            @click="showDomainModal = true"
                        >
                            <feather-icon
                            icon="EditIcon"
                            class="mr-20"
                            />
                                إضافة نطاق
                        </b-button>
                    </template>
                </div>
            </div>
        </div>
        <b-tabs>
            <template v-if="template.is_child">
                <b-tab lazy active>
                    <template #title>
                        <feather-icon icon="ToolIcon" />
                        <span>التصميم</span>
                    </template>
                    <template-setting :template="template"/>
                </b-tab>
            </template>
            <template v-else>
                <b-tab lazy active>
                    <template #title>
                        <feather-icon icon="HomeIcon" />
                        <span>الرئيسية</span>
                    </template>
                    <template-main :key="reloadComponent" :template="template"/>
                </b-tab>
                <b-tab lazy>
                    <template #title>
                        <feather-icon icon="ToolIcon" />
                        <span>إعدادت </span>
                    </template>
                    <template-setting :template="template"/>
                </b-tab>
            </template>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="ActivityIcon" />
                    <span>التحليلات</span>
                </template>
                <template-analytics/>
            </b-tab>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="ShoppingCartIcon" />
                    <span>الطلبات</span>
                </template>
                <b-card no-body class="mb-0">
                    <template-orders :template="template"/>
                </b-card>
            </b-tab>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="TrendingUpIcon" />
                    <span>الزيارات</span>
                </template>
                <b-card no-body class="mb-0">
                    <template-visit :template="template"/>
                </b-card>
            </b-tab>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="ExternalLinkIcon" />
                    <span>المشاركات</span>
                </template>
                <b-card no-body class="mb-0">
                    <template-shares :template="template"/>
                </b-card>
            </b-tab>
        </b-tabs>

    <!-- update domain modal -->
    <b-modal
      v-model="showDomainModal"
      id="modal-center"
      centered
      size="lg"
      cancel-variant="outline-secondary"
      title="تحديث النطاق"
      cancel-title="إلغاء"
      ok-title="احفظ"
      @hidden="resetModalUpdateDomain"
      @ok="handleOkUpdateDomain"
    >
      <validation-observer ref="simpleRules3">
        <b-form @submit.prevent="handleOkUpdateDomain" class="mt-1 mb-3">
          <b-row>
                <b-col cols="12">
                    <label class="label">اختر النطاق</label>
                </b-col>
                <b-col cols="12">
                    <b-form-group> 
                        <validation-provider
                            #default="{ errors }"
                            name="اختر نطاق"
                            rules="required"
                        >
                            <v-select
                                v-model="domainForm.domain"
                                :state="errors.length > 0 ? false:null"
                                :dir="'rtl'"
                                label="name"
                                :options="domains"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group
                        label="اسم الصفحة"
                        label-for="largeInput"
                    >
                        <validation-provider
                            #default="{ errors }"
                            name="اسم الصفحة"
                            rules="required|alphaNumDash"
                            vid="template_name"
                        >
                        <b-input-group aria-label="aaa" :append="getAppendDomain">
                            <b-form-input
                                :state="errors.length > 0 ? false:null"
                                id="largeInput" v-model="domainForm.template_name" placeholder="اسم الصفحة"
                            />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                </b-col>
          </b-row>
          <button class="d-none" type="submit">s</button>
        </b-form>
      </validation-observer>
    </b-modal>
    </div>
</template>

<script>
import TemplateOrders from './TemplateOrders.vue'
import TemplateAnalytics from './template-analytic/TemplateAnalytics.vue'
import TemplateSetting from './template-setting/TemplateSetting.vue'
import TemplateVisit from './TemplateVisit.vue'
import TemplateMain from './TemplateMain.vue'
import TemplateShares from './TemplateShares.vue'

import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { BTabs, BTab, BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge } from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components:{
        TemplateSetting, TemplateOrders, TemplateAnalytics, TemplateVisit, TemplateMain, TemplateSetting, TemplateShares,
        ToastificationContent, ValidationProvider,  ValidationObserver, BTabs, BTab,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
        BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
        BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, vSelect
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            reloadComponent: 0,
            template: {domain:{name: ''}},
            domainForm:{
                domain:{
                    id: null,
                    name: '',
                    type: '',
                },
                template_name: ''
            },
            domains: [],
            showDomainModal: false,
            required, url, domain, alphaNumDash, domainExist, domainExist2
        }
    },
    computed: {
        getAppendDomain(){
            if(this.domainForm.domain){
                return '/https://'+this.domainForm.domain.name
            }
            return '/https://'
        },
    },
    created(){
        this.getTemplate();
    },
    mounted(){
        localize('ar');
        this.getDomains()
    },
    methods:{
        handleDomainName(domain){
            if(domain){
                return domain.name
            } else {
                return ''
            }
        },
        getTemplate(){
            axios.get(`/templates/${this.$route.params.id}`)
            .then((response) => {
                this.template = response.data
                if(response.data.domain){
                    this.domainForm.domain = response.data.domain
                    this.domainForm.template_name = response.data.template_name
                } else {
                    this.domainForm.domain.name = ''
                    this.domainForm.domain.type = 'normal'
                    this.domainForm.template_name = response.data.template_name
                }
            })
            .catch((error) => {
                // this.$router.push("/error-404");
                console.log(JSON.stringify(error));
            })
        },
        handleOkUpdateDomain(bvModalEvt) {
            bvModalEvt.preventDefault()

            this.$refs.simpleRules3.validate().then(success => {
                if (success) {
                    axios.post(`/domains/${this.domainForm.domain.id}/check_template_name/`, {template_name: this.domainForm.template_name})
                        .then(response => {
                            if (response.data.result){
                                this.$refs.simpleRules3.setErrors({template_name: ['اسم الصفحة مأخوذ الرجاء اختيار واحد آخر']});
                            } else {
                                this.updateDomain()
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
        },
        resetModalUpdateDomain(){
            this.domainForm.domain = this.template.domain
            this.domainForm.template_name = this.template.template_name
        },
        updateDomain(){
            const data = {
                template_name: this.domainForm.template_name,
                domain: this.domainForm.domain.id
            }
            axios.post(`/templates/${this.template.id}/update_url/`, data)
            .then(() => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تحديث النطاق بنجاح.',
                        variant: 'success',
                    },
                })
                this.getTemplate()
                this.showDomainModal = false
                this.reloadComponent += 1
            })
            .catch((error) => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء تحديث النطاق.',
                    variant: 'danger',
                    },
                })
                console.log(JSON.stringify(error));
            })
        },
        getDomains(){
            axios.get("/domains")
            .then(response => {
                this.domains = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>