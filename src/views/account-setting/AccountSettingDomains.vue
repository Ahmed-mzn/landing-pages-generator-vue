<template>
    <div>
        <b-row class="mb-2">
            <b-col cols="4">
                <h2>النطاقات</h2>
            </b-col>
            <b-col cols="8">
                <div class="float-right">
                    <b-button
                        variant="primary"
                        @click="addModalShow = true"
                    >
                        <span class="text-nowrap">إضافة نطاق</span>
                    </b-button>
                </div>
            </b-col>
        </b-row>
        <b-table
            responsive
            :items="domains"
            :fields="fields"
            class="mb-0"
        >
            <template #cell(actions)="data">
                <b-row>
                    <b-col
                        cols="12"
                        class="d-flex align-items-center justify-content-start"
                    >
                    <b-dropdown
                        no-caret
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="link"
                    >
                        <template #button-content>
                            <feather-icon
                                icon="MoreVerticalIcon"
                                size="16"
                                class="text-body align-middle mr-25"
                            />
                        </template>

                        <b-dropdown-item v-if="data.item.type == 'custom'" @click="dnsModalShow = true" >
                            <feather-icon icon="InfoIcon" />
                            <span class="align-middle ml-50">DNS معلومات</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="deleteDomain(data.item.id)">
                            <feather-icon icon="Trash2Icon" />
                            <span class="align-middle ml-50">حذف</span>
                        </b-dropdown-item>
                    </b-dropdown>
                    </b-col>
                </b-row>
            </template>

            <template #cell(type)="data">
                <div v-if="data.value == 'custom'">
                    <b-badge variant="light-success">
                        <feather-icon
                            icon="StarIcon"
                            class="mr-25"
                        />
                        <span>نطاق مخصص</span>
                    </b-badge>
                </div>
                <div v-else>
                    <b-badge variant="light-primary">
                        <span>نطاق @sfhat</span>
                    </b-badge>
                </div>
            </template>

            <template #cell(index)="data">
                {{ data.index + 1 }}
            </template>
        </b-table>
        
        <!-- add domain modal -->
        <b-modal
            v-model="addModalShow"
            id="modal-center"
            centered
            size="lg"
            cancel-variant="outline-secondary"
            title="إضافة نطاق جديدة"
            cancel-title="إلغاء"
            ok-title="إنشاء"
            @hidden="resetModalAddDomain"
            @ok="handleOkAddDomain"
        >
            <validation-observer ref="simpleRules3">
            <b-form class="mt-1 mb-3">
            <b-row>
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
            </b-row>
            <h1 class="mb-2">اختر الفئة</h1>
            <b-card no-body class="p-1 popular">
                <b-link>
                <b-row class="d-flex flex-row">
                    <b-col cols="10">
                    <b-media>
                        <template #aside>
                        <b-avatar
                            rounded
                            variant="light-info"
                            size="55"
                        >
                            <feather-icon size="25" icon="BriefcaseIcon" />
                        </b-avatar>
                        </template>
                        <h6 class="media-heading ">
                        صفحة هبوط عروض أفقيًا
                        </h6>
                        <small class="text-muted">
                        وصف هنا أيضا.
                        </small>
                    </b-media>
                    </b-col>
                    <b-col cols="2" class="align-self-center">
                    <b-form-radio
                        name="some-radios"
                        value="template_one"
                    />
                    </b-col>
                </b-row>
                </b-link>
            </b-card>
            <b-card no-body class="p-1" >
                <b-link>
                <b-row class="d-flex flex-row ">
                    <b-col cols="10">
                    <b-media>
                        <template #aside>
                        <b-avatar
                            rounded
                            variant="light-warning"
                            size="55"
                        >
                            <feather-icon size="25" icon="ShoppingBagIcon" />
                        </b-avatar>
                        </template>
                        <h6 class="media-heading">
                        صفحة هبوط عروض عموديا
                        </h6>
                        <small class="text-muted">
                        وصف هنا أيضا.
                        </small>
                    </b-media>
                    </b-col>
                    <b-col cols="2" class="align-self-center">
                    <b-form-radio
                        name="some-radios"
                        value="template_two"
                    />
                    </b-col>
                </b-row>
                </b-link>
            </b-card>
            <button class="d-none" type="submit">s</button>
            </b-form>
        </validation-observer>
        </b-modal>

        <!-- dns domain modal -->
        <b-modal
            v-model="dnsModalShow"
            id="modal-center2"
            centered
            size="lg"
            cancel-variant="outline-secondary"
            title="التعليمات لإعداد سجلات DNS Records"
            ok-title="حسنا"
            ok-only
        >
            <div class="p-1">
                <h3 class="mb-3">اتبع هذه التعليمات لإعداد سجلات DNS RECORDS الخاصة بك</h3>
                <app-timeline>
                    <app-timeline-item
                        title="تسجيل الدخول إلى مزود المجال"
                        subtitle="قم بتسجيل الدخول إلى موقع الويب الخاص بمسجل النطاق"
                        icon="LogInIcon"
                        variant="danger"
                    />

                    <app-timeline-item
                        title="إعدادات DNS Records"
                        subtitle="انتقل إلى قسم سجلات DNS Records"
                        icon="Navigation2Icon"
                        variant="info"
                    />

                    <app-timeline-item
                        title="إضافة سجل"
                        subtitle="أضف سجل CNAME جديدًا"
                        icon="PlusCircleIcon"
                        variant="warning"
                    />

                    <app-timeline-item
                        title="حقل HOST"
                        subtitle="في حقل HOST ، اكتب أي شيء تريده"
                        icon="Edit3Icon"
                    />

                    <app-timeline-item
                        title="ربط نطاق بخوادمنا"
                        subtitle="في الحقل POINTS TO / VALUE ، اكتب"
                        icon="LinkIcon"
                        variant="info"
                    >
                        <b-row>
                            <b-col cols="12">
                                <b-form-group
                                    label-cols="5"
                                    label-cols-lg="5"
                                    label-size="Default"
                                    label="في الحقل POINTS TO / VALUE ، اكتب"
                                    label-for="input-sm"
                                >
                                    <b-input-group size="sm">
                                        <b-form-input id="input-sm" readonly v-model="server_host" />
                                        <b-input-group-prepend>
                                            <b-button @click="copyServerHost(server_host)" variant="outline-primary">
                                                <feather-icon icon="CopyIcon" />
                                            </b-button>
                                        </b-input-group-prepend>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </app-timeline-item>

                    <app-timeline-item
                        title="الانتهاء من الإعداد"
                        subtitle="بمجرد الانتهاء من كل هذه الخطوات ، احفظ وانقر فوق التالي"
                        icon="CheckCircleIcon"
                        variant="success"
                    />
                </app-timeline>
            </div>
        </b-modal>
    </div>
</template>


<script>
import { useClipboard } from '@vueuse/core'
import { useToast } from 'vue-toastification/composition'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BTabs, BTab, BInputGroupPrepend, BFormCheckboxGroup, BFormCheckbox, 
    BFormRadio, BMedia, BDropdown, BDropdownItem,
    BInputGroup, BFormInput, BFormGroup, BFormRadioGroup, BForm, BImg, BOverlay, BModal, VBModal, BTable, BBadge, VBTooltip } from 'bootstrap-vue'

import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
    components:{
        ValidationProvider, ValidationObserver, FormWizard, TabContent, ToastificationContent,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BTabs, BTab, BImg, BOverlay, BModal, VBModal, BTable, BBadge, VBTooltip,
        BInputGroup, BFormInput, BFormGroup, BFormRadioGroup, BForm, BInputGroupPrepend, BFormCheckboxGroup, BFormCheckbox,
        BFormRadio, BMedia, BDropdown, BDropdownItem, AppTimeline, AppTimelineItem
    },
    directives: {
        'b-modal': VBModal,
        'b-tooltip': VBTooltip,
        Ripple
    },
    data(){
        return {
            server_host: '37873y8u.sfhat.io',
            dnsModalShow: false,
            DomainOptions: [
                { text: 'نعم', value: 'custom' },
                { text: 'لا', value: 'normal' }
            ],
            addModalShow: false,
            domains: [],
            domainForm: {
                id: 0,
                name: '',
                type: 'custom'
            },
            fields: [
                { key:'index', label: '#' },
                { key: 'name', label: 'اسم النطاق' },
                { key: 'type', label: 'نوع النطاق'},
                { key: 'actions', label: 'إجراءات' }
            ],
            required,
            url,
            domain,
            alphaNumDash,
            domainExist,
            domainExist2
        }
    },
    setup(){
        const { copy } = useClipboard()
        const toast = useToast()
        const copyServerHost = server_host => {
            copy(server_host)

            toast({
                component: ToastificationContent,
                props: {
                    title: 'تم نسخ اسم المضيف',
                    icon: 'CopyIcon',
                    variant: 'success',
                },
            })
        }

        return {
            copyServerHost
        }
    },
    mounted(){
        this.getDomains()
    },
    methods:{
        deleteDomain(id){
            this.$swal({
                title: 'هل أنت متأكد؟',
                text: "لن تتمكن من التراجع عن هذا!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'إلغاء',
                confirmButtonText: 'نعم ، احذفه!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    axios.delete(`/domains/${id}`)
                    .then((response) =>{
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحذف!',
                            text: 'تم حذف النطاق بنجاح.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getDomains();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    })
                }
            })
        },
        getDomains(){
            axios.get('/domains/')
            .then(response => {
                this.domains = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        createDomain(){
            axios.post('/domains/', this.domainForm)
            .then(response => {
                if(response.status == 400 || response.status == 500){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء إضافة النطاق.',
                        variant: 'danger',
                        },
                    })
                } else{
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم إضافة النطاق بنجاح.',
                            variant: 'success',
                        },
                    })
                    this.getDomains();
                    this.addModalShow = false
                }
            })
            .catch(error => {
                console.log(error);
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء إضافة النطاق.',
                    variant: 'danger',
                    },
                })
            })
        },
        handleOkAddDomain(bvModalEvt){
            bvModalEvt.preventDefault()

            this.$refs.simpleRules3.validate().then(success => {
                if (success) {
                    this.createDomain()
                }
            })
        },
        resetModalAddDomain(){
            this.domainForm.name = ''
            this.domainForm.type = 'custom'
        },
        domainTypeChange(){
            this.domainForm.name = ''
            this.$refs.simpleRules3.reset()
        }
    }
}
</script>
