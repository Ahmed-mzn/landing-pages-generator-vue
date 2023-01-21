<template>
    <div class="mt-2">
        <b-overlay
            :show="showFormLoader"
            rounded="sm"
            spinner-variant="primary"
        >
        <b-row>
            <b-col cols="10">
                <v-select
                    v-model="selected1"
                    dir="rtl"
                    multiple
                    :options="products"
                    label="title"
                    class="select-size-lg"
                    placeholder="حدد المنتجات"
                >
                    <template #option="{ title, description, image, price }">
                        <div
                            class="d-flex justify-content-start align-items-center"
                        >
                            <b-img
                                rounded=""
                                :src="image"
                                blank-color="#ccc"
                                width="40"
                                alt="placeholder"
                                class="mr-2"
                            />
                            <div class="user-page-info">
                                <h6 class="mb-0">
                                {{title}}
                                </h6>
                                <small class="text-muted">{{description}}</small>
                            </div>
                            <div class="ml-auto">
                                <b-badge variant="light-primary">SAR {{price}}</b-badge>
                            </div>
                        </div>
                    </template>
                </v-select>
            </b-col>
            <b-col cols="2">
                <b-button
                    variant="primary"
                    class="btn-icon"
                    size="lg"
                >
                    <feather-icon icon="PlusIcon" />
                </b-button>
            </b-col>
        </b-row>
            <div class="media-list media-bordered">
                <b-media v-for="product in products" :key="product.id">
                    <template #aside>
                        <b-img
                        :src="product.image"
                        blank-color="#ccc"
                        width="64"
                        alt="placeholder"
                        />
                    </template>
                    <div class="float-right">
                        <b-button
                            variant="flat-success"
                            class="btn-icon rounded-circle mr-1"
                            size="sm"
                            @click="showEditModal(product)"
                            >
                            <feather-icon icon="EditIcon" />
                        </b-button>
                        <b-button
                            variant="flat-danger"
                            class="btn-icon rounded-circle"
                            size="sm"
                            @click="deleteProduct(product.id)"
                        >
                            <feather-icon icon="Trash2Icon" />
                        </b-button>
                    </div>
                    <h4 class="media-heading">
                        {{product.title}}
                    </h4>
                    <b-card-text class="mb-0">
                        {{product.description}}
                    </b-card-text>
                    <!-- <h6 class="item-price mt-0 float-right">$200</h6> -->
                    <div class="float-right" v-if="product.price_after_discount">
                        <b-badge variant="light-primary mr-1"><del>SAR {{product.price}}</del></b-badge>
                        <b-badge variant="light-primary">SAR {{product.price_after_discount}}</b-badge>
                    </div>
                    <div class="float-right" v-else>
                        <b-badge variant="light-primary">SAR {{product.price}}</b-badge>
                    </div>
                </b-media>
            </div>
            <validation-observer ref="simpleRules">
                <b-form>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="عنوان المنتج"
                                label-for="title"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="عنوان المنتج"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="product.title"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="عنوان المنتج"
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
                                    v-model="product.description"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="وصف قصير"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="رابط صورة المنتج"
                                label-for="image"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="رابط صورة المنتج"
                                rules="required|url"
                                >
                                <b-form-input
                                    id="image"
                                    v-model="product.image"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="رابط صورة المنتج"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="السعر"
                                label-for="price"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="السعر"
                                rules="required|numbers"
                                >
                                <b-form-input
                                    id="price"
                                    v-model="product.price"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="السعر"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <b-form-checkbox
                                    checked="true"
                                    name="check-button"
                                    v-model="activateDiscount"
                                    @change="resetDiscountPrice()"
                                    switch
                                    inline
                                >
                                تفعيل الخصم
                                </b-form-checkbox>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="activateDiscount">
                            <b-form-group
                                label="السعر بعد الخصم"
                                label-for="price"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="السعر بعد الخصم"
                                    :rules="activateDiscount ? 'required|numbers' : ''"
                                >
                                <b-form-input
                                    id="price"
                                    v-model="product.price_after_discount"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="السعر بعد الخصم"
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
                                أضف المنتج
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
                <b-form @submit.stop.prevent="updateProduct()">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="عنوان المنتج"
                                label-for="title"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="عنوان المنتج"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="productEdit.title"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="عنوان المنتج"
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
                                    v-model="productEdit.description"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="وصف قصير"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="رابط صورة المنتج"
                                label-for="image"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="رابط صورة المنتج"
                                rules="required|url"
                                >
                                <b-form-input
                                    id="image"
                                    v-model="productEdit.image"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="رابط صورة المنتج"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="السعر"
                                label-for="price"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="السعر"
                                rules="required|numbers"
                                >
                                <b-form-input
                                    id="price"
                                    v-model="productEdit.price"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="السعر"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group>
                                <b-form-checkbox
                                    checked="true"
                                    name="check-button"
                                    v-model="activateDiscount2"
                                    @change="resetDiscountPrice2()"
                                    switch
                                    inline
                                >
                                تفعيل الخصم
                                </b-form-checkbox>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="activateDiscount2">
                            <b-form-group
                                label="السعر بعد الخصم"
                                label-for="price"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="السعر بعد الخصم"
                                    :rules="activateDiscount2 ? 'required|numbers' : ''"
                                >
                                <b-form-input
                                    id="price"
                                    v-model="productEdit.price_after_discount"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="السعر بعد الخصم"
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
    BOverlay, VBModal, BFormCheckbox, BModal
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import { required, url, numbers } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components:{
        ToastificationContent, ValidationProvider, ValidationObserver, BCard, BCardText, BRow, BCol, BButton, 
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, VBModal, 
        BModal, BFormCheckbox, vSelect
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
      selected1: [
      ],
      books: [
        {
          title: 'Database',
          icon: 'DatabaseIcon',
        },
        {
          title: 'Codepen',
          icon: 'CodepenIcon',
        },
        {
          title: 'Aperture ',
          icon: 'ApertureIcon',
        },
        {
          title: 'Command',
          icon: 'CommandIcon',
        },
      ],
            showFormLoader: false,
            products: [],
            activateDiscount: false,
            activateDiscount2: false,
            product: {
                template: this.$route.params.id,
                title: '',
                description: '',
                image: '',
                price: null,
                price_after_discount: null
            },
            productEdit: {
                id: null,
                title: '',
                description: '',
                image: '',
                price: null,
                price_after_discount: null
            },
            editModalShow: false,
            required,
            url,
            numbers
        }
    },
    created(){
        this.getProducts()
        localize('ar')
    },
    methods: {
        showEditModal(product){
            this.productEdit.id = product.id
            this.productEdit.title = product.title
            this.productEdit.description = product.description
            this.productEdit.image = product.image
            this.productEdit.price = product.price
            this.productEdit.price_after_discount = product.price_after_discount
            if(product.price_after_discount){
                this.activateDiscount2 = true;
            }
            this.editModalShow = true
        },
        resetModal(){
            this.productEdit.id = null
            this.productEdit.title = ''
            this.productEdit.description = ''
            this.productEdit.image = ''
            this.productEdit.price = null
            this.activateDiscount2 = false
            // this.$refs.simpleRules2.reset();
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.updateProduct()
        },
        updateProduct(){
            this.$refs.simpleRules2.validate().then(success => {
                if(success){
                    axios.patch(`/products/${this.productEdit.id}/`, this.productEdit)
                    .then((response) => {
                        this.$emit('reloadComp')
                        console.log(response);
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث المنتج بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getProducts()
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
                            text: 'حدث خطأ أثناء تحديث المنتج.',
                            variant: 'danger',
                            },
                        })
                        JSON.stringify(error);
                    })
                }
            });
        },
        resetDiscountPrice(){
            this.product.price_after_discount = null;
        },
        resetDiscountPrice2(){
            this.productEdit.price_after_discount = null;
        },
        deleteProduct(id){
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
                    axios.delete(`/products/${id}`)
                    .then((response) =>{
                        this.$emit('reloadComp')
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحذف!',
                            text: 'تم حذف المنتج بنجاح.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getProducts();
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
                    axios.post('/products/', this.product)
                    .then((response) => {
                        this.$emit('reloadComp')
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم اضافة المنتج بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getProducts()
                        this.product.title = ''
                        this.product.description = ''
                        this.product.image = ''
                        this.product.price = null
                        this.product.price_after_discount = null
                        this.$refs.simpleRules.reset();
                        this.showFormLoader = false
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'حدث خطأ أثناء إضافة المنتج.',
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
        getProducts(){
            axios.get(`/products/?template_id=${this.$route.params.id}`)
            .then((response) => {
                console.log(response);
                this.products = response.data
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
    }
}
</script>
<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>