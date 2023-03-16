<template>
    <div class="mt-2">
        <div class="mb-2">

            <!-- Table Top -->
            <b-row>
                <!-- Per Page -->
                <b-col
                    cols="12"
                    md="6"
                    class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
                    <label>عرض</label>
                    <v-select
                        v-model="perPage"
                        dir="rtl"
                        :options="pageOptions"
                        :clearable="false"
                        class="per-page-selector d-inline-block mx-50"
                    />
                    <label>إدخالات</label>
                </b-col>

                <!-- Search -->
                <b-col
                    cols="12"
                    md="6"
                >
                    <div class="d-flex align-items-center justify-content-end">
                        <b-form-input
                            v-model="filter"
                            class="d-inline-block mr-1"
                            placeholder="بحث..."
                        />
                        <b-button
                            variant="primary"
                            @click="addModalShow = true"
                        >
                            <span class="text-nowrap">أضف منتج</span>
                        </b-button>
                    </div>
                </b-col>
            </b-row>

        </div>
        <b-row>
            <b-col cols="12">
                <b-table
                    hover
                    responsive
                    class="position-relative"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :items="products"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    :filter="filter"
                    show-empty
                    empty-text="No matching records found"
                    :filter-included-fields="filterOn"
                    @filtered="onFiltered"
                >
                    <template #cell(image)="data">
                        <b-avatar :src="data.value" />
                    </template>

                    <template #cell(price)="data">
                        <b-badge 
                            v-if="data.item.price_after_discount"
                            variant="light-primary mr-1"
                        >
                            <del>SAR {{data.value}}</del>
                        </b-badge>
                            <b-badge 
                                v-else
                                variant="light-primary mr-1"
                            >
                                SAR {{data.value}}
                            </b-badge>
                    </template>

                    <template #cell(price_after_discount)="data">
                        <b-badge 
                            v-if="data.value"
                            variant="light-primary mr-1"
                        >
                            SAR {{data.value}}
                        </b-badge>
                        <b-badge 
                            v-else
                            variant="light-warning mr-1"
                        >
                            لايوجد خصم
                        </b-badge>
                    </template>

                    <template #cell(actions)="data">
                        <b-row>
                            <b-col
                                cols="12"
                                class="d-flex align-items-center justify-content-start"
                            >
                                <b-button
                                    variant="flat-success"
                                    class="btn-icon rounded-circle mr-1"
                                    size="sm"
                                    @click="showEditModal(data.item)"
                                    >
                                    <feather-icon icon="EditIcon" />
                                </b-button>
                                <b-button
                                    variant="flat-danger"
                                    class="btn-icon rounded-circle"
                                    size="sm"
                                    @click="deleteProduct(data.item.id)"
                                >
                                    <feather-icon icon="Trash2Icon" />
                                </b-button>
                            </b-col>
                        </b-row>
                    </template>
                </b-table>
            </b-col>
        </b-row>

        <b-row>
            <b-col
                cols="12"
            >
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    class="mb-0 mt-1 mt-sm-0"
                    pills
                    first-number
                    last-number
                    prev-class="next-item"
                    next-class="prev-item"
                />
            </b-col>
        </b-row>
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
                                    accept="image/*"
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
    BOverlay, VBModal, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend
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
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend, vSelect, BFormCheckbox
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            perPage: 5,
            pageOptions: [3, 5, 10],
            totalRows: 1,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            file: null,
            products: [],
            activateDiscount: false,
            activateDiscount2: false,
            fields: [
                {key: 'image', label: 'المنتج'},
                {key: 'title', label: 'عنوان'},
                {key: 'description', label: 'وصف قصير'},
                {key: 'price', label: 'السعر'},
                {key: 'price_after_discount', label: 'السعر بعد الخصم'},
                {key: 'actions', label: 'إجراءات'},
            ],
            product: {
                app: 0,
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
        this.getApp()
        localize('ar')
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => ({ text: f.label, value: f.key }))
        },
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
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
                    axios.delete(`/products/${id}`)
                    .then((response) =>{
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
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                let formData = new FormData()
                formData.append('title', this.product.title)
                formData.append('app', this.product.app)
                formData.append('description', this.product.description)
                formData.append('image', this.product.image)
                formData.append('price', this.product.price)
                formData.append('price_after_discount', this.product.price_after_discount)
                    axios.post('/products/', formData, {headers:{"Content-Type": "multipart/form-data"}})
                    .then((response) => {
                        this.getProducts()
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم إضافة المنتج بنجاح.',
                                variant: 'success',
                            },
                        })
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
                        JSON.stringify(error);
                    })
                }
            })
        },
        getProducts(){
            axios.get(`/products/`)
            .then((response) => {
                this.products = response.data
                this.totalRows = response.data.length
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
        getApp(){
            axios.get('/get_app')
            .then((response) => {
                this.product.app = response.data.id
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        },
    }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>