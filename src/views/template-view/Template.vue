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
                    <span class="card-text">
                        <feather-icon icon="LinkIcon" size="13" />
                        <b-link :href="'https://'+handleDomainName(template.domain) + '/' + template.template_name" target="_blank">
                            https://{{handleDomainName(template.domain) + '/'+ template.template_name}}
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
                        {{!template.is_child ? 'تعديل النطاق' : 'تعديل اسم الصفحة'}}
                  </b-button>
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
                    <template-main :template="template"/>
                </b-tab>
                <b-tab lazy>
                    <template #title>
                        <feather-icon icon="ToolIcon" />
                        <span>التصميم</span>
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
                <b-card>
                    <template-orders :template="template"/>
                </b-card>
            </b-tab>
            <b-tab lazy>
                <template #title>
                    <feather-icon icon="TrendingUpIcon" />
                    <span>الزيارات</span>
                </template>
                <b-card>
                    <template-visit :template="template"/>
                </b-card>
            </b-tab>
        </b-tabs>

    <!-- create template modal -->
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
            <template v-if="!template.is_child">
                <b-col cols="12">
                <b-form-group label="تريد إضافة نطاق خاص بك؟">
                    <b-form-radio-group
                    v-model="domainForm.type"
                    :options="DomainOptions"
                    @change="domainTypeChange"
                    class="demo-inline-"
                    name="radio-inline"
                    />
                </b-form-group>
                </b-col>
                <b-col cols="12" v-if="domainForm.type == 'custom'">
                <b-form-group
                    label="اسم النطاق"
                    label-for="largeInput"
                >
                    <validation-provider
                    #default="{ errors }"
                    name="اسم النطاق"
                    rules="required|domain|domainExist"
                    >
                    <b-input-group aria-label="aaa" size="lg" >
                        <b-form-input
                        :state="errors.length > 0 ? false:null"
                        id="largeInput" v-model="domainForm.name" placeholder="مثال: store.com"
                        />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                </b-col>
                <b-col cols="12" v-else>
                <b-form-group
                    label="اسم النطاق"
                    label-for="largeInput"
                >
                    <validation-provider
                    #default="{ errors }"
                    name="اسم النطاق"
                    rules="required|alphaNumDash|domainExist2"
                    >
                    <b-input-group aria-label="aaa" append="//:https" prepend="sfhat.io" size="lg" >
                        <b-form-input
                        :state="errors.length > 0 ? false:null"
                        id="largeInput" v-model="domainForm.name" placeholder="اسم النطاق"
                        />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                </b-form-group>
                </b-col>
            </template>
            <b-col cols="12">
              <b-form-group
                label="اسم الصفحة"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="اسم الصفحة"
                  rules="required|alphaNumDash"
                >
                  <b-input-group aria-label="aaa" size="lg" :append="'/https://'+domainForm.name">
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

import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { BTabs, BTab, BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge } from 'bootstrap-vue'

import axios from 'axios'
export default {
    components:{
        TemplateSetting, TemplateOrders, TemplateAnalytics, TemplateVisit, TemplateMain, TemplateSetting,
        ToastificationContent, ValidationProvider,  ValidationObserver, BTabs, BTab,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
        BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
        BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            template: {domain:{name: ''}},
            DomainOptions: [
                { text: 'نعم', value: 'custom' },
                { text: 'لا', value: 'normal' }
            ],
            domainForm:{
                id: null,
                name: '',
                type: '',
                template_name: ''
            },
            showDomainModal: false,
            required, url, domain, alphaNumDash, domainExist, domainExist2
        }
    },
    created(){
        this.getTemplate();
    },
    mounted(){
        localize('ar');
    },
    methods:{
        handleDomainName(domain){
            if(domain){
                return domain.name
            } else {
                return 'no.domain'
            }
        },
        getTemplate(){
            axios.get(`/public/apps/templates/${this.$route.params.id}`)
            .then((response) => {
                this.template = response.data
                if(response.data.domain){
                    this.domainForm.name = response.data.domain.name
                    this.domainForm.type = response.data.domain.type
                    this.domainForm.template_name = response.data.template_name
                } else {
                    this.domainForm.name = ''
                    this.domainForm.type = 'normal'
                    this.domainForm.template_name = response.data.template_name
                }
            })
            .catch((error) => {
                // this.$router.push("/error-404");
                console.log(JSON.stringify(error));
            })
        },
        handleOkUpdateDomain(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            if(this.domainForm.name == this.template.domain.name){
                this.updateTemplateName()
            } else {
                this.$refs.simpleRules3.validate().then(success => {
                    if (success) {
                        this.updateDomain()
                    }
                })
            }
        },
        resetModalUpdateDomain(){
            this.domainForm.template_name = this.template.template_name
            this.domainForm.name = this.template.domain.name
            this.domainForm.type = this.template.domain.type
        },
        domainTypeChange(){
            if(this.template.domain.type == this.domainForm.type){
                this.resetModalUpdateDomain()
            } else {
                this.domainForm.name = ''
            }
            this.$refs.simpleRules3.reset();
        },
        updateDomain(){
            const data = {
                name: this.domainForm.name,
                type: this.domainForm.type
            }
            axios.put(`/domains/${this.template.domain.id}`, data)
            .then((response) => {
                this.updateTemplateName()
                this.getTemplate()
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
        updateTemplateName(){
            axios.patch(`/templates/${this.template.id}/`, {template_name: this.domainForm.template_name})
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
        }
    }
}
</script>