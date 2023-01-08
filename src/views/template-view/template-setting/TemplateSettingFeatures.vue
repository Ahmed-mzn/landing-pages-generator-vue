<template>
    <div class="mt-3">
        <b-overlay
            :show="showFormLoader"
            rounded="sm"
            spinner-variant="primary"
        >
            <div
                class="d-flex justify-content-start align-items-center mt-2"
                v-for="feature in features"
                :key="feature.id"
            >
                <b-avatar
                    variant="light-primary"
                    class="mr-50"
                    size="40"
                >
                    <feather-icon icon="AwardIcon" />
                </b-avatar>
                <div class="user-page-info">
                    <h6 class="mb-0">
                    {{feature.title}}
                    </h6>
                    <small class="text-muted">{{feature.description}}</small>
                </div>
                <div class="ml-auto">
                    <b-button
                        variant="flat-success"
                        class="btn-icon rounded-circle mr-1"
                        size="sm"
                        @click="showEditModal(feature)"
                        >
                        <feather-icon icon="EditIcon" />
                    </b-button>
                    <b-button
                        variant="flat-danger"
                        class="btn-icon rounded-circle"
                        size="sm"
                        @click="deleteFeature(feature.id)"
                    >
                        <feather-icon icon="Trash2Icon" />
                    </b-button>
                </div>
            </div>
            <validation-observer ref="simpleRules">
                <b-form class="mt-3">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="عنوان الميزة"
                                label-for="title"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="عنوان الميزة"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="feature.title"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="عنوان الميزة"
                                    id="title"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="وصف قصير"
                                label-for="description"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="وصف قصير"
                                rules="required"
                                >
                                <b-form-input
                                    id="description"
                                    v-model="feature.description"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="وصف قصير"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-button
                                variant="primary"
                                type="submit"
                                @click.prevent="submitForm"
                            >
                                أضف التقييم
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
        </b-overlay>
        <!-- basic modal -->
        <b-modal
            id="modal-1"
            ref="modal-edit"
            v-model="editModalShow"
            title="تحديث المنتج"
            ok-title="احفظ التغييرات"
            cancel-title="إلغاء"
            cancel-variant="outline-secondary"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <validation-observer ref="simpleRules2">
                <b-form class="mt-3" @submit.stop.prevent="updateFeature()">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="عنوان الميزة"
                                label-for="title"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="عنوان الميزة"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="featureEdit.title"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="عنوان الميزة"
                                    id="title"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="وصف قصير"
                                label-for="description"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="وصف قصير"
                                rules="required"
                                >
                                <b-form-input
                                    id="description"
                                    v-model="featureEdit.description"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="وصف قصير"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
        </b-modal>
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, VBModal, BFormRating, BModal
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import { required, url, numbers } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import axios from 'axios'
export default {
    components:{
        ToastificationContent,
        ValidationProvider,
        ValidationObserver,
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
        BMedia,
        BImg,
        BFormInput,
        BFormGroup,
        BForm,
        BOverlay,
        VBModal,
        BModal,
        BFormRating
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            showFormLoader: false,
            features: [],
            feature: {
                template: this.$route.params.id,
                title: '',
                description: '',
            },
            featureEdit: {
                id: null,
                title: '',
                description: '',
            },
            editModalShow: false,
            required,
            url,
            numbers
        }
    },
    created(){
        this.getFeatures()
        localize('ar')
    },
    methods: {
        showEditModal(feature){
            this.featureEdit.id = feature.id
            this.featureEdit.title = feature.title
            this.featureEdit.description = feature.description
            this.editModalShow = true
        },
        resetModal(){
            this.feature.title = ''
            this.feature.description = ''
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.updateFeature()
        },
        updateFeature(){
            this.$refs.simpleRules2.validate().then(success => {
                if(success){
                    axios.patch(`/features/${this.featureEdit.id}/`, this.featureEdit)
                    .then((response) => {
                        this.$emit('reloadComp')
                        console.log(response);
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث الميزة بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getFeatures()
                        // Hide the modal manually
                        this.$nextTick(() => {
                            this.$refs['modal-edit'].toggle('#toggle-btn')
                        })
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'حدث خطأ أثناء تحديث الميزة.',
                            variant: 'danger',
                            },
                        })
                        JSON.stringify(error);
                    })
                }
            });
        },
        deleteFeature(id){
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
                    axios.delete(`/features/${id}`)
                    .then((response) =>{
                        this.$emit('reloadComp')
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحذف!',
                            text: 'تم حذف الميزة بنجاح.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getFeatures();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    })
                }
            })
        },
        submitForm(){
            this.showFormLoader = true;
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    axios.post('/features/', this.feature)
                    .then((response) => {
                        this.$emit('reloadComp')
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم اضافة التقييم بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getFeatures()
                        this.feature.title = ''
                        this.feature.description = ''
                        this.$refs.simpleRules.reset();
                        this.showFormLoader = false
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'حدث خطأ أثناء إضافة التقييم.',
                            variant: 'danger',
                            },
                        })
                        this.showFormLoader = false;
                        JSON.stringify(error);
                    })
                } else {
                    this.showFormLoader = false;
                }
            })
        },
        getFeatures(){
            axios.get(`/features/?template_id=${this.$route.params.id}`)
            .then((response) => {
                console.log(response);
                this.features = response.data
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
    }
}
</script>