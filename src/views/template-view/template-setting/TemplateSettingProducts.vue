<template>
    <div class="mt-2">
        <b-overlay
            :show="showFormLoader"
            rounded="sm"
            spinner-variant="primary"
        >
            <b-row class="mt-3">
                <b-col cols="12">
                    <label class="label">اختر المنتجات</label>
                </b-col>
                <b-col cols="10">
                    <v-select
                        v-model="selectedProducts"
                        dir="rtl"
                        multiple
                        :options="allProducts"
                        label="title"
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
                        @click="addModalShow = true"
                    >
                        <feather-icon icon="PlusIcon" />
                    </b-button>
                </b-col>
            </b-row>
            <b-button
                class="mt-2 mb-2"
                variant="primary"
                type="submit"
                @click="assignProduct"
            >
                أضف المنتجات
            </b-button>
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
        </b-overlay>
        <!-- update modal -->
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
                            <!-- Media -->
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar
                                        :src="productEdit.image"
                                        text="avatarText"
                                        variant="light-primary"
                                        size="90px"
                                        rounded
                                    />
                                </template>
                                <h5 class="mb-1">
                                    صورة المنتج
                                </h5>
                                <div class="d-flex flex-wrap ">
                                    <b-button
                                        variant="success"
                                        @click="$refs.refInputEl.click()"
                                    >
                                    <input
                                        ref="refInputEl"
                                        type="file"
                                        class="d-none"
                                        accept="image/*"
                                        @input="updateImage()"
                                    >
                                    <span class="d-none d-sm-inline">تغيير</span>
                                    <feather-icon
                                        icon="EditIcon"
                                        class="d-inline ml-1"
                                    />
                                    </b-button>
                                </div>
                            </b-media>
                        </b-col>
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

        <!-- add modal -->
        <b-modal
            id="modal-2"
            ref="modal-add"
            v-model="addModalShow"
            title="أضف منتج"
            ok-title="أضف المنتج"
            cancel-title="إلغاء"
            cancel-variant="outline-secondary"
            @hidden="resetAddModal"
            @ok="handleOkAddModal"
        >
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
                                    @change="titleChange"
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
                                label="صورة المنتج"
                                label-for="image"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="صورة المنتج"
                                rules="required"
                                >
                                <b-form-file
                                    v-model="product.image"
                                    :state="Boolean(product.image)"
                                    placeholder="اختر صورة أو أسقطها هنا ..."
                                    drop-placeholder="أسقط الصورة هنا ..."
                                    browse-text="تصفح"
                                >
                                    <template
                                        slot="file-name"
                                        slot-scope="{ names }"
                                    >
                                        <b-badge variant="primary">
                                            {{ names[0] }}
                                        </b-badge>
                                    </template>
                                </b-form-file>
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
                    </b-row>
                </b-form>
            </validation-observer>
        </b-modal>
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, VBModal, BFormCheckbox, BModal, BFormFile
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import { required, url, numbers } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import axios from 'axios'
import { temp } from '@/@core/directives/animations'
export default {
    components:{
        ToastificationContent, ValidationProvider, ValidationObserver, BCard, BCardText, BRow, BCol, BButton, 
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, VBModal, 
        BModal, BFormCheckbox, vSelect, BFormFile
    },
    props: {
        template: {
            type: Object,
            default: () => {},
        }
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            file: null,
            selectedProducts: [],
            showFormLoader: false,
            allProducts:[],
            products: [],
            activateDiscount: false,
            activateDiscount2: false,
            product: {
                app: this.template.app,
                title: '',
                description: '',
                image: null,
                price: null,
                price_after_discount: 0
            },
            productEdit: {
                id: null,
                title: '',
                description: '',
                image: null,
                price: null,
                price_after_discount: 0
            },
            editModalShow: false,
            addModalShow: false,
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
        validateSetup(){
            if (this.products.length == 0){
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'هناك خطأ، الرجاء إدخال على الأقل منتج واحد.',
                        variant: 'danger',
                    },
                })
                return false;
            } else {
                return true;
            }
        },
        titleChange(){
            axios.post("/products/get_product_description", {title: this.product.title})
            .then(response => {
                this.product.description = response.data.result
            })
        },
        async updateImage(){

            let formData = new FormData()
            formData.append('image', this.$refs['refInputEl'].files[0])

            await axios.patch(`/products/${this.productEdit.id}/`, formData, {headers:{"Content-Type": "multipart/form-data"}})
            .then((response) => {
                this.productEdit.image = response.data.image
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تحديث الصورة بنجاح.',
                        variant: 'success',
                    },
                })
                this.getProducts()
            })
            .catch((error) => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'هناك خطأ أثناء تحديث الصورة.',
                        variant: 'danger',
                    },
                })
                JSON.stringify(error)
            })
        },
        assignProduct(){
            this.showFormLoader = true
            this.selectedProducts.forEach(element => {
                axios.post(`/templates/${this.$route.params.id}/assign_product/${element.id}`)
                .then(response => {
                    this.$emit('reloadComp')
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم إضافة المنتج بنجاح.',
                            variant: 'success',
                        },
                    })
                    this.selectedProducts = []
                    this.getProducts()
                    this.showFormLoader = false
                })
                .catch(error => {
                    this.showFormLoader = false
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء إضافة المنتج.',
                        variant: 'danger',
                        },
                    })
                    JSON.stringify(error);
                })
            });
        },
        resetAddModal(){
            this.product.title = ''
            this.product.description = ''
            this.product.price = null
            this.product.image = null
            this.product.price_after_discount = 0
        },
        handleOkAddModal(bvModalEvt){
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.submitForm()
        },
        async showEditModal(product){
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
                    delete this.productEdit.image
                    axios.patch(`/products/${this.productEdit.id}/`, this.productEdit)
                    .then((response) => {
                        this.$emit('reloadComp')
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
                        console.log(JSON.stringify(error));
                    })
                }
            });
        },
        resetDiscountPrice(){
            this.product.price_after_discount = 0;
        },
        resetDiscountPrice2(){
            this.productEdit.price_after_discount = 0;
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
                    axios.delete(`/templates/${this.$route.params.id}/assign_product/${id}`)
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
                let formData = new FormData()
                formData.append('title', this.product.title)
                formData.append('app', this.template.app)
                formData.append('description', this.product.description)
                formData.append('image', this.product.image)
                formData.append('price', this.product.price)
                formData.append('price_after_discount', this.product.price_after_discount)
                    axios.post('/products/', formData, {headers:{"Content-Type": "multipart/form-data"}})
                    .then((response) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم إضافة المنتج بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getAllProducts()
                        this.product.title = ''
                        this.product.description = ''
                        this.product.image = null
                        this.product.price = null
                        this.product.price_after_discount = 0
                        this.$refs.simpleRules.reset();
                        // Hide the modal manually
                        this.$nextTick(() => {
                            this.$refs['modal-add'].toggle('#toggle-btn')
                        })
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
                this.products = response.data
                this.getAllProducts()
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
        getAllProducts(){
            axios.get(`/products/`)
            .then((response) => {
                this.allProducts = []
                response.data.forEach(element => {
                    if (!this.checkProductById(element.id)){
                        this.allProducts.push(element)
                    }
                })
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
        checkProductById(id){
            let result = false;
            this.products.forEach(element => {
                if (element.id == id){
                    result = true;
                }
            })
            return result;
        }
    }
}
</script>
<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>