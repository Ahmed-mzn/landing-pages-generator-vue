<template>
    <div class="mt-3">
        <b-overlay
            :show="showFormLoader"
            rounded="sm"
            spinner-variant="primary"
        >
            <div
                class="d-flex justify-content-start align-items-center mt-2"
                v-for="review in reviews"
                :key="review.id"
            >
                <b-avatar
                    src="require('@/assets/images/portrait/small/avatar-s-2.jpg')"
                    class="mr-50"
                    size="40"
                />
                <div class="user-page-info">
                    <h6 class="mb-0">
                    {{review.username}}
                    </h6>
                    <small class="text-muted">{{review.comment}}</small>
                </div>
                <div class="ml-auto">
                    <b-form-rating
                        id="rating"
                        style="direction: rtl;"
                        :value="review.rating"
                        variant="warning"
                        class="mr-3"
                        size="sm"
                        inline
                        no-border
                        readonly
                    />
                    <b-button
                        variant="flat-success"
                        class="btn-icon rounded-circle mr-1"
                        size="sm"
                        @click="showEditModal(review)"
                        >
                        <feather-icon icon="EditIcon" />
                    </b-button>
                    <b-button
                        variant="flat-danger"
                        class="btn-icon rounded-circle"
                        size="sm"
                        @click="deleteReview(review.id)"
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
                                label="اسم الشخص"
                                label-for="username"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="اسم الشخص"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="review.username"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="اسم الشخص"
                                    id="username"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="التعليق"
                                label-for="comment"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="التعليق"
                                rules="required"
                                >
                                <b-form-input
                                    id="comment"
                                    v-model="review.comment"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="التعليق"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <validation-provider
                                    #default="{ errors }"
                                    name="تقييم"
                                    rules="required"
                                >
                                    <label
                                        for="rating"
                                        class="mr-1"
                                    >تقييم</label>
                                    <!-- Rating -->
                                    <b-form-rating
                                        id="rating"
                                        style="direction: rtl;"
                                        :state="errors.length > 0 ? false:null"
                                        v-model="review.rating"
                                        variant="warning"
                                        inline
                                        no-border
                                        class="mt-1"
                                    />
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
            title="تحديث التقييم"
            ok-title="احفظ التغييرات"
            cancel-title="إلغاء"
            cancel-variant="outline-secondary"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <validation-observer ref="simpleRules2">
                <b-form class="mt-3" @submit.stop.prevent="updateProduct()">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="اسم الشخص"
                                label-for="username"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="اسم الشخص"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="reviewEdit.username"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="اسم الشخص"
                                    id="username"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="التعليق"
                                label-for="comment"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="التعليق"
                                rules="required"
                                >
                                <b-form-input
                                    id="comment"
                                    v-model="reviewEdit.comment"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="التعليق"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <validation-provider
                                    #default="{ errors }"
                                    name="تقييم"
                                    rules="required"
                                >
                                    <label
                                        for="rating"
                                        class="mr-1"
                                    >تقييم</label>
                                    <!-- Rating -->
                                    <b-form-rating
                                        id="rating"
                                        style="direction: rtl;"
                                        :state="errors.length > 0 ? false:null"
                                        v-model="reviewEdit.rating"
                                        variant="warning"
                                        inline
                                        no-border
                                        class="mt-1"
                                    />
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
            reviews: [],
            review: {
                template: this.$route.params.id,
                username: '',
                comment: '',
                rating: 1
            },
            reviewEdit: {
                id: null,
                username: '',
                comment: '',
                rating: 1
            },
            editModalShow: false,
            required,
            url,
            numbers
        }
    },
    created(){
        this.getReviews()
        localize('ar')
    },
    methods: {
        validateSetup(){
            if (this.reviews.length == 0){
                this.submitForm()
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'هناك خطأ، الرجاء إدخال على الأقل تقييم واحد.',
                        variant: 'danger',
                    },
                })
                return false;
            } else {
                return true;
            }
        },
        showEditModal(review){
            this.reviewEdit.id = review.id
            this.reviewEdit.username = review.username
            this.reviewEdit.comment = review.comment
            this.reviewEdit.rating = review.rating
            this.editModalShow = true
        },
        resetModal(){
            this.review.username = ''
            this.review.comment = ''
            this.review.rating = 1
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.updateReview()
        },
        updateReview(){
            this.$refs.simpleRules2.validate().then(success => {
                if(success){
                    axios.patch(`/reviews/${this.reviewEdit.id}/`, this.reviewEdit)
                    .then((response) => {
                        this.$emit('reloadComp')
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث التقييم بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getReviews()
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
                            text: 'حدث خطأ أثناء تحديث التقييم.',
                            variant: 'danger',
                            },
                        })
                        console.log(JSON.stringify(error));
                    })
                }
            });
        },
        deleteReview(id){
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
                    axios.delete(`/reviews/${id}`)
                    .then((response) =>{
                        this.$emit('reloadComp')
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحذف!',
                            text: 'تم حذف التقييم بنجاح.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getReviews();
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
                    axios.post('/reviews/', this.review)
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
                        this.getReviews()
                        this.review.username = ''
                        this.review.comment = ''
                        this.review.rating = 1
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
        getReviews(){
            axios.get(`/reviews/?template_id=${this.$route.params.id}`)
            .then((response) => {
                this.reviews = response.data
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
    }
}
</script>