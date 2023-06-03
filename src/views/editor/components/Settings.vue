<template>
    <div>
        <b-modal
            id="modal-lg"
            ok-title="احفظ التغييرات"
            cancel-title="إلغاء"
            cancel-variant="outline-secondary"
            
            scrollable
            size="lg"
            title="إعدادات الصفحة"
            v-model="show"
            @ok="submit"
            @hide="hideModal"
        >
            <div class="container">
                <validation-observer ref="simpleRules">
                    <b-form>
                        <b-row>
                            <h6 class="section-label mx-1 mb-2">طريقة الدفع</h6>
                            <b-col
                                cols="12"
                                class="mb-2"
                            >
                                <b-form-checkbox
                                    id="auto_ship_cod"
                                    name="auto_ship_cod"
                                    v-model="template.cod_payment"
                                    switch
                                    inline
                                >
                                    <span>الدفع عند الاستلام</span>
                                </b-form-checkbox>
                            </b-col>
                            <b-col
                                cols="12"
                                class="mb-2"
                            >
                                <b-form-checkbox
                                    id="auto_ship_cc"
                                    v-model="template.card_payment"
                                    name="auto_ship_cc"
                                    switch
                                    inline
                                >
                                    <span>الدفع الالكتروني</span>
                                </b-form-checkbox>
                            </b-col>
                            <h6 class="section-label mx-1 mb-2">SEO</h6>
                            <b-col md="12">
                                <input ref="logoImage" @input="updateImage" style="display: none;" type="file" accept="image/*">
                                <b-link v-if="template.logo" class="d-inline-block m1" @click="changeImage" @mouseenter="showEditImage=true" @mouseleave="showEditImage=false">
                                    <b-overlay opacity="1" variant="transperant" :show="showEditImage">
                                        <b-img
                                            height="75" width="75"
                                            :src="template.logo"
                                            class="d-inline-block mr-1 mb-1 m1 border"
                                            rounded
                                        />
                                        <template #overlay>
                                            <div class="text-center">
                                                <b-button
                                                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                                                    variant="flat-success"
                                                    class="btn-icon mr-75 mb-75"
                                                    size="sm"
                                                >
                                                    <feather-icon icon="Edit2Icon" />
                                                </b-button>
                                            </div>
                                        </template>
                                    </b-overlay>
                                </b-link>
                                <b-link v-else @click="changeImage">
                                    <b-avatar
                                        rounded="sm"
                                        variant="white"
                                        size="75"
                                        class="d-inline-block mr-1 mb-1 popular"
                                    >
                                        <feather-icon icon="PlusIcon" class="text-primary" size="50" />
                                    </b-avatar>
                                </b-link>
                            </b-col>
                            <b-col md="12">
                                <b-form-group
                                    label="Meta Title"
                                    label-for="meta_title"
                                >
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Meta Title"
                                        rules="required"
                                    >
                                        <b-form-input
                                            id="meta_title"
                                            v-model="template.meta_title"
                                            :state="errors.length > 0 ? false:null"
                                            placeholder="meta title"
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="12">
                                <b-form-group
                                    label="Meta Keywords"
                                    label-for="meta_keywords"
                                >
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Meta Keywords"
                                        rules="required"
                                    >
                                        <b-form-input
                                            id="meta_keywords"
                                            v-model="template.meta_keywords"
                                            :state="errors.length > 0 ? false:null"
                                            placeholder="keyword, keyword..."
                                        />
                                        <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="12">
                                <b-form-group
                                    label="Meta Description"
                                    label-for="meta_description"
                                >
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Meta Description"
                                        rules="required"
                                    >
                                    <b-form-textarea
                                        id="meta_description"
                                        v-model="template.meta_description"
                                        rows="3"
                                        :state="errors.length > 0 ? false:null"
                                        placeholder="meta description"
                                    />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <h6 class="section-label mx-1 mb-2">المنتجات</h6>
                            <b-col cols="12">
                                <template-setting-products :key="template.id" :template="template" />
                            </b-col>
                        </b-row>
                    </b-form>
                </validation-observer>
            </div>
        </b-modal>
    </div>
</template>

<script>
import TemplateSettingProducts from '@/views/template-view/template-setting/TemplateSettingProducts.vue'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, BInputGroupAppend, BFormCheckbox, BFormTextarea
} from 'bootstrap-vue'
import axios from 'axios'
import { required } from '@validations'
export default {
    components: { 
        ToastificationContent, BCard, BCardText, BRow, BCol, BButton, BAvatar, ValidationProvider, ValidationObserver,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
        BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, BInputGroupAppend, BFormCheckbox, BFormTextarea,
        TemplateSettingProducts
    },
    directives: {
        'b-modal': VBModal,
        Ripple,
    },
    props: {
        // template_id: {
        //     type: Object,
        //     default: () => {},
        // },
        show: {
            type: Boolean,
            default: () => false
        }
    },
    data(){
        return {
            showModal: this.show,
            showEditImage: false,
            template: {}
        }
    },
    mounted(){
        localize('ar');
        if(this.show){
            this.getTemplate()
        }
    },
    methods:{
        updateImage(){
            let formData = new FormData()
            formData.append('logo', this.$refs.logoImage.files[0])

            axios.patch(`/templates/${this.template.id}/`, formData, {headers:{"Content-Type": "multipart/form-data"}})
            .then((response) => {
                console.log(response);
                this.getTemplate()
            })
            .catch(error => {
                console.log(error);
            })
        },
        changeImage(){
            this.$refs.logoImage.click()
        },
        hideModal(bvModalEvt){
            bvModalEvt.preventDefault()
            this.$emit('hideSettingTemplate')
        },
        submit(bvModalEvt){
            bvModalEvt.preventDefault()
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    const data = {
                        meta_title: this.template.meta_title,
                        meta_description: this.template.meta_description,
                        meta_keywords: this.template.meta_keywords,
                        cod_payment: this.template.cod_payment,
                        card_payment: this.template.card_payment,
                    }
                    axios.patch(`/templates/${this.template.id}/`, data)
                    .then((response) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث إعدادات الصفحة بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.$emit('hideSettingTemplate')
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إنذار',
                                icon: 'AlertCircleIcon',
                                text: 'هناك خطأ أثناء تحديث إعدادات الصفحة.',
                                variant: 'danger',
                            },
                        })
                        console.log(error)
                    })
                }
            });
        },
        getTemplate(){
            axios.get(`/templates/${this.$route.params.id}/short_details`)
            .then(response => {
                console.log(response);
                this.template = response.data
            })
        }
    }
}
</script>