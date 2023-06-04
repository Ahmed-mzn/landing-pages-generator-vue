<template>
    <div class="mt-2">
        <b-overlay
            :show="show"
            opacity="1"
            spinner-variant="primary"
            variant="white"
            rounded="lg"
        >
            <b-row>
                <b-col cols="8">
                    <h3>الصفحات المرتبطة</h3>
                </b-col>
                <b-col cols="4">
                    <div class="float-right">
                        <b-button
                            variant="outline-primary"
                            @click="showVariantModal = true; resetVariantModal()"
                            class="btn-icon mr-1"
                        >
                        <feather-icon
                            icon="SettingsIcon"
                        />
                            التحكم بالتوجهات
                        </b-button>
                        <b-button
                            variant="primary"
                            @click="showTemplateModal = true"
                            class="btn-icon"
                            v-if="template.domain"
                        >
                        <feather-icon
                            icon="PlusIcon"
                        />
                            إنشاء صفحة
                        </b-button>
                    </div>
                </b-col>
            </b-row>
            <b-row align-v="stretch" class="mt-1">
                <b-col class="mb-2" cols="6" xl="3" lg="3" md="4">
                    <b-card
                        class="mb-0"
                        no-body
                    >
                        <b-card-header>
                            <h6>{{handleTemplateName(template.template_name)}}   (<span class="text-primary">الأساسية</span>)</h6>
                            <b-badge variant="light-primary">
                                <feather-icon
                                    icon="TrendingUpIcon"
                                    class="mr-25"
                                />
                                <span>12%</span>
                            </b-badge>
                        </b-card-header>
                        <b-card-body>
                            <b-link :to="getTemplateRoute(template)">
                                <b-img
                                    fluid
                                    class="mb-1"
                                    :src="template.preview_image_url ? template.preview_image_url : require('@/assets/images/pages/skeleton400_still.gif')"
                                />
                            </b-link>
                            <b-card-text>
                                <b-row>
                                    <b-col cols="9">
                                        <small class="text-muted">{{moment(template.updated_at).locale('ar').fromNow()}}</small>
                                    </b-col>
                                    <!-- <b-link @click="moreTemplate"><feather-icon class="float-right" icon="MoreVerticalIcon" /></b-link> -->
                                    <b-col cols="3">
                                        <b-dropdown
                                            no-caret
                                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                            variant="link"
                                            v-if="template.domain"
                                        >
                                        <template #button-content>
                                            <feather-icon
                                                icon="MoreVerticalIcon"
                                                size="16"
                                                class="text-body align-middle mr-25"
                                            />
                                        </template>

                                            <b-dropdown-item @click="createCopyTemplate(template)" >
                                                <feather-icon icon="CopyIcon" />
                                                <span class="align-middle ml-50">اعمل نسخة</span>
                                            </b-dropdown-item>
                                            <b-dropdown-item :href="'http://'+handleDomainName(template.domain)+'/'+template.template_name" target="_blank">
                                                <feather-icon icon="EyeIcon" />
                                                <span class="align-middle ml-50">معاينة</span>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                    </b-col>
                                </b-row>
                            </b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col class="mb-2" cols="6" xl="3" lg="3" md="4" v-for="t in templates" :key="t.id">
                    <b-card
                        class="mb-0"
                        no-body
                    >
                        <b-card-header>
                            <h6>{{handleTemplateName(t.template_name)}}</h6>
                            <b-badge variant="light-primary">
                                <feather-icon
                                    icon="TrendingUpIcon"
                                    class="mr-25"
                                />
                                <span>12%</span>
                            </b-badge>
                        </b-card-header>
                        <b-card-body>
                            <b-link :to="getTemplateRoute(t)">
                                <b-img
                                    fluid
                                    class="mb-1"
                                    :src="t.preview_image_url ? t.preview_image_url : require('@/assets/images/pages/skeleton400_still.gif')"
                                />
                            </b-link>
                            <b-card-text>
                                <b-row>
                                    <b-col cols="9">
                                        <small class="text-muted">{{moment(t.updated_at).locale('ar').fromNow()}}</small>
                                    </b-col>
                                    <!-- <b-link @click="moreTemplate"><feather-icon class="float-right" icon="MoreVerticalIcon" /></b-link> -->
                                    <b-col cols="3">
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
                                            <b-dropdown-item @click="createCopyTemplate(t)" >
                                                <feather-icon icon="CopyIcon" />
                                                <span class="align-middle ml-50">اعمل نسخة</span>
                                            </b-dropdown-item>
                                            <b-dropdown-item @click="openRenameTemplateModal(t)" >
                                                <feather-icon icon="EditIcon" />
                                                <span class="align-middle ml-50">إعادة تسمية</span>
                                            </b-dropdown-item>
                                            <b-dropdown-item @click="deleteTemplate(t)" >
                                                <feather-icon icon="TrashIcon" />
                                                <span class="align-middle ml-50">حذف</span>
                                            </b-dropdown-item>
                                            <b-dropdown-item :href="'http://'+handleDomainName(template.domain)+'/'+t.template_name" target="_blank">
                                                <feather-icon icon="EyeIcon" />
                                                <span class="align-middle ml-50">معاينة</span>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                    </b-col>
                                </b-row>
                            </b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col v-if="template.domain" class="mb-2" cols="6" xl="3" lg="3" md="4">
                    <b-card
                        style="height: 100%; display:flex; justify-content: center;align-items: center;"
                        border-variant="primary"
                        bg-variant="transparent"
                        class="shadow-none"
                        no-body
                    >
                    <b-card-body style="width: 100%;height: 100%;">
                        <b-link style="height: 100%;" @click="showTemplateModal = true">
                            <div style="height: 100%; display:flex; justify-content: center;align-items: center;">
                                <feather-icon class="text-primary" size="60" icon="PlusIcon" />
                            </div>
                        </b-link>
                    </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-overlay>
        <!-- rename template modal -->
        <b-modal
            v-model="showRenameTemplateModal"
            id="modal-center"
            centered
            size="lg"
            cancel-variant="outline-secondary"
            title="تحديث اسم صفحة الهبوط"
            cancel-title="إلغاء"
            ok-title="تحديث"
            @hidden="resetModalRenameTemplate"
            @ok="handleOkRenameTemplate"
        >
        <validation-observer ref="simpleRules5">
            <b-form @submit.stop.prevent="renameTemplate()" class="mt-1 mb-3">
                <b-row>
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
                        <b-input-group>
                            <b-form-input
                            :state="errors.length > 0 ? false:null"
                            id="largeInput" v-model="rename_template.template_name" placeholder="اسم الصفحة"
                            />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
        </b-modal>

        <!-- create template modal -->
        <b-modal
            v-model="showTemplateModal"
            id="modal-center"
            centered
            size="lg"
            cancel-variant="outline-secondary"
            title="إنشاء صفحة هبوط جديدة"
            cancel-title="إلغاء"
            ok-title="إنشاء"
            @hidden="resetModalAddTemplate"
            @ok="handleOkAddTemplate"
        >
        <validation-observer ref="simpleRules3">
            <b-form @submit.stop.prevent="createTemplate()" class="mt-1 mb-3">
                <b-row>
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
                        <b-input-group>
                            <b-form-input
                            :state="errors.length > 0 ? false:null"
                            id="largeInput" v-model="templateForm.template_name" placeholder="اسم الصفحة"
                            />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                    </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
        </b-modal>

        <!-- variant modal -->
        <b-modal
            v-model="showVariantModal"
            id="modal-center"
            centered
            cancel-variant="outline-secondary"
            title="التحكم بعدد التوجهات"
            cancel-title="إلغاء"
            ok-title="احفظ التغييرات"
            @hidden="resetVariantModal"
            @ok="handleOkVariant"
        >
        <validation-observer ref="simpleRules4">
            <b-form>
                <b-row>
                    <b-col md="12">
                        <b-form-group
                            label="عدد التوجهات"
                            label-for="review_text"
                        >
                            <validation-provider
                            #default="{ errors }"
                            name="عدد التوجهات"
                            rules="required|integer"
                            >
                            <b-form-input
                                id="review_text"
                                v-model="variant.total"
                                :state="errors.length > 0 ? false:null"
                                @keyup="resetVariant"
                                type="number"
                                placeholder="عدد إجمالي التوجهات"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" v-for="t in variant.templates" :key="t.id">
                        <b-row class="p-25">
                            <b-col cols="4">
                                <h6>{{' صفحة ' + t.name}}</h6>
                            </b-col>
                            <b-col cols="8">
                                <vue-slider
                                    v-model="t.redirect_numbers"
                                    :tooltip-formatter="formatterTooltip(t)"
                                    direction="rtl"
                                    :max="parseInt(variant.total)"
                                    :min="0"
                                    @change="variantChange(t)"
                                />
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
        </b-modal>
    </div>
</template>
<script>
import html2canvas from 'html2canvas';
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import VueSlider from 'vue-slider-component'
import { required, url, integer, alphaNumDash } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup
} from 'bootstrap-vue'
import axios from 'axios'
export default {
    components: { 
        ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
        BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, VueSlider
    },
    directives: {
        'b-modal': VBModal,
        Ripple
    },
    data(){
        return  {
            show: true,
            showTemplateModal: false,
            showRenameTemplateModal: false,
            showVariantModal: false,
            templateForm:{
                template: null,
                template_code: 'template_one',
                template_name: '',
                parent_template: null,
                is_copy: false
            },
            rename_template: {
                id: 0,
                template_name: ''
            },
            templates: [],
            template:{
                domain: {
                    name: '',
                    type: ''
                }
            },
            variant:{
                templates: [],
                total: 0
            },
            required,
            url,
            integer,
            alphaNumDash
        }
    },
    mounted(){
        localize('ar')
        this.getTemplate()
        this.getTemplates()
    },
    methods:{
        async getTemplateCaptureImage(template){
            var url, iframe = document.createElement('iframe');

            document.body.appendChild(iframe);

            var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
            iframedoc.body.innerHTML = template.html;

            var canvas = await html2canvas(iframedoc.body, {width: 1000, height: 500}).then(canvas => {return canvas})
            const imageURL = canvas.toDataURL("image/png");
            return imageURL
        },
        openRenameTemplateModal(template){
            this.showRenameTemplateModal = true
            this.rename_template.template_name = template.template_name
            this.rename_template.id = template.id
        },
        resetModalRenameTemplate(){
            this.rename_template.template_name = ''
            this.rename_template.id = 0
        },
        handleOkRenameTemplate(bvModalEvt){
            bvModalEvt.preventDefault()
            this.$refs.simpleRules5.validate().then(success => {
                if (success) {
                    this.renameTemplate()
                }
            })
        },
        renameTemplate(){
            axios.patch(`/templates/${this.rename_template.id}/`, this.rename_template)
            .then(response => {
                if(response.status == 400 || response.status == 500){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تحديث اسم صفحة الهبوط.',
                        variant: 'danger',
                        },
                    })
                } else{
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم تحديث اسم صفحة الهبوط بنجاح.',
                            variant: 'success',
                        },
                    })
                    this.showRenameTemplateModal = false
                    this.getTemplate();
                    this.getTemplates();
                }
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء تحديث اسم صفحة الهبوط.',
                    variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        variantChange(template){
            let newVariants = this.variant.templates.filter(t => t.id != template.id)
            var sum;

            sum = this.variant.templates.reduce((accumulator, object) => {
                return accumulator + object.redirect_numbers;
            }, 0);

            while(sum > this.variant.total) {
                sum = this.variant.templates.reduce((accumulator, object) => {
                    return accumulator + object.redirect_numbers;
                }, 0);
                if(sum > this.variant.total){
                    this.variant.templates.map((t) => {
                        if(t != template.id && t.redirect_numbers != 0){
                            t.redirect_numbers = t.redirect_numbers-1;
                        }
                        return t
                    })
                }
            }
        },  
        resetVariant(){
            this.variant.templates = []
            const obj = {
                id: this.template.id,
                name: this.template.template_name,
                is_main_template: true,
                redirect_numbers: this.template.template_redirect_numbers,
                redirect_percentage: this.template.template_redirect_percentage
            }
            this.variant.templates.push(obj)
            for(let i=0; i<this.templates.length; i++){
                const obj = {
                    id: this.templates[i].id,
                    name: this.templates[i].template_name,
                    is_main_template: false,
                    redirect_numbers: this.templates[i].template_redirect_numbers,
                    redirect_percentage: this.templates[i].template_redirect_percentage
                }
                this.variant.templates.push(obj)
            }
        },
        resetVariantModal(){
            this.variant.templates.splice(0)
            this.variant.total = this.template.total_redirect_numbers
            const obj = {
                id: this.template.id,
                name: this.template.template_name,
                is_main_template: true,
                redirect_numbers: this.template.template_redirect_numbers,
                redirect_percentage: this.template.template_redirect_percentage
            }
            this.variant.templates.push(obj)
            for(let i=0; i<this.templates.length; i++){
                const obj = {
                    id: this.templates[i].id,
                    name: this.templates[i].template_name,
                    is_main_template: false,
                    redirect_numbers: this.templates[i].template_redirect_numbers,
                    redirect_percentage: this.templates[i].template_redirect_percentage
                }
                this.variant.templates.push(obj)
            }
        },
        handleOkVariant(bvModalEvt){
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.$refs.simpleRules4.validate().then(success => {
                if (success) {
                    this.submitVariant()
                }
            })
        },
        submitVariant(){
            var is_valid = true
            this.variant.templates.forEach(item => {
                if(item.is_main_template && item.redirect_numbers == 0){
                    is_valid = false
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'حدث خطأ صفحات الهبوط الأساسية يجب أن يكون أكثر من 1.',
                            variant: 'danger',
                        },
                    })
                }
            })
            if(is_valid){
                axios.post("/templates/variant", this.variant)
                .then(response => {
                    if(response.status == 400 || response.status == 500){
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'حدث خطأ أثناء تحديث توجيه صفحات الهبوط.',
                            variant: 'danger',
                            },
                        })
                    } else{
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث توجيه صفحات الهبوط بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.showVariantModal = false
                        this.variant.templates.splice(0)
                        this.getTemplate();
                        this.getTemplates();
                    }
                })
                .catch(error => {
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تحديث توجيه صفحات الهبوط.',
                        variant: 'danger',
                        },
                    })
                    console.log(error);
                })
            }
        },
        formatterTooltip(t){
            // return `{value} توجيه (${t.redirect_percentage}%)`
            return "{value} توجيه "
        },
        handleDomainName(domain){
            if(domain){
                return domain.name
            } else {
                return 'no.domain'
            }
        },
        handleTemplateName(name){
            if(name){
                if (name.length > 120) {
                    return '...' + name.substring(0,8);
                } else {
                    return name
                }
            }
        },
        getTemplateRoute(template){
            if(template.id){
                return {name: 'editor', params: {id: template.id}}
            }
            return null
        },
        createCopyTemplate(template){
            this.templateForm.parent_template = this.$route.params.id
            this.templateForm.template = template.id
            this.templateForm.template_name = 'blank'
            this.templateForm.is_copy = true
            this.postTemplate()
        },
        createTemplate(){
            this.templateForm.parent_template = this.$route.params.id
            this.templateForm.template = this.$route.params.id
            this.templateForm.is_copy = false
            this.postTemplate()
        },
        postTemplate(){
            axios.post("/templates/children", this.templateForm)
            .then(response => {
                if(response.status == 400 || response.status == 500){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء إضافة صفحة الهبوط.',
                        variant: 'danger',
                        },
                    })
                } else{
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم إضافة صفحة الهبوط بنجاح.',
                            variant: 'success',
                        },
                    })
                    this.showTemplateModal = false
                    this.getTemplates();
                }
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء إضافة صفحة الهبوط.',
                    variant: 'danger',
                    },
                })
                console.log(JSON.stringify(error));
            })
        },
        handleOkAddTemplate(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.$refs.simpleRules3.validate().then(success => {
                if (success) {
                    this.createTemplate()
                }
            })
        },
        resetModalAddTemplate(){
            this.templateForm.template_name = ''
            this.templateForm.template_code = 'template_one'
        },
        seletcTemplate(template){
            this.templateForm.template_code = template
        },
        deleteTemplate(template){
            this.$swal({
                title: 'هل أنت متأكد؟',
                text: "لن تتمكن من التراجع عن هذا!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'إلغاء',
                confirmButtonText: 'نعم ، احذفها!',
                customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                axios.delete('/templates/'+template.id)
                .then((response) =>{
                    this.$swal({
                    icon: 'success',
                    title: 'تم الحذف!',
                    text: 'تم حذف صفحة بنجاح.',
                    confirmButtonText: 'حسنا',
                    customClass: {
                        confirmButton: 'btn btn-success',
                    },
                    })
                    this.getTemplates();
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                })
                }
            })
        },
        getTemplates(){
            axios.get(`/templates/children?template_id=${this.$route.params.id}`)
            .then(response => {
                this.templates = response.data

                setTimeout(() => {
                    this.show = false;
                }
                , 500);
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
        },
        getTemplate(){
            axios.get(`/templates/${this.$route.params.id}/`)
            .then(response => {
                this.template = response.data
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
        },
    }
}
</script>
<style lang="scss" >
@import '@core/scss/vue/libs/vue-slider.scss';
</style>