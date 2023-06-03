<template>
    <div>
        <b-overlay
            :show="loading"
            rounded="sm"
            spinner-variant="primary"
            variant="transparent"
        >
            <b-card no-body>
                <b-card-header class="pb-50">
                    <h3>فلتر </h3>
                </b-card-header>
                <b-card-body>
                    <b-row>
                        <b-col
                            cols="12"
                            md="4"
                            class="mb-md-0 mb-2"
                        >
                            <label>الحالة</label>
                            <v-select
                                dir="rtl"
                                v-model="statusFilter"
                                :options="statusOptions"
                                class="w-100"
                                @input="filterOrders"
                                label="ar"
                                :reduce="val => val.en"
                            />
                        </b-col>
                        <b-col
                            cols="12"
                            md="4"
                            class="mb-md-0 mb-2"
                        >
                            <label>طريقة الدفع</label>
                            <v-select
                                dir="rtl"
                                v-model="paymentFilter"
                                :options="paymentOptions"
                                class="w-100"
                                @input="filterOrders"
                                label="ar"
                                :reduce="val => val.en"
                            />
                        </b-col>
                        <b-col
                            cols="12"
                            md="4"
                            class="mb-md-0 mb-2"
                        >
                            <label>الصفحة</label>
                            <v-select
                                dir="rtl"
                                v-model="templateFilter"
                                :options="templates"
                                class="w-100"
                                @input="filterOrders"
                                :reduce="val => val.id"
                                label="template_name"
                            >
                                <template #option="{ preview_image, template_name, is_child, domain }">
                                    <div
                                        class="d-flex justify-content-start align-items-center"
                                    >
                                        <b-img
                                            rounded=""
                                            :src="preview_image"
                                            blank-color="#ccc"
                                            width="40"
                                            alt="placeholder"
                                            class="mr-2"
                                        />
                                        <div class="user-page-info">
                                            <h6 class="mb-0">{{template_name}}</h6>
                                            <small class="text-muted">{{('https://' + domain.name + '/' + template_name).substring(0, 30)}}</small>
                                        </div>
                                        <div class="ml-auto">
                                            <b-badge v-if="!is_child" variant="light-primary">الأساسية</b-badge>
                                        </div>
                                    </div>
                                </template>
                            </v-select>
                        </b-col>
                        <b-col
                            cols="12"
                            md="4"
                            class="mb-md-0 mb-2"
                        >
                            <label>حالة الدفع</label>
                            <v-select
                                dir="rtl"
                                v-model="is_paidFilter"
                                :options="is_paidOptions"
                                class="w-100"
                                @input="filterOrders"
                                label="ar"
                                :reduce="val => val.en"
                            />
                        </b-col>
                    </b-row>
                </b-card-body>
            </b-card>
            <b-card no-body class="mb-0">
                <div class="m-2">

                    <!-- Table Top -->
                    <b-row>
                        <!-- Per Page -->
                        <b-col
                            cols="5"
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
                        <b-col
                            cols="3"
                        >
                            <div class="d-flex align-items-center justify-content-end">
                                <b-button
                                    variant="primary"
                                    @click="download"
                                >
                                    <feather-icon
                                        icon="DownloadIcon"
                                        class="mr-50"
                                    />
                                    <span class="align-middle" v-html="selected.length == 0 ? 'تنزيل' : `تنزيل (${selected.length})`"></span>
                                </b-button>
                            </div>
                        </b-col>
                        <!-- Search -->
                        <b-col
                            cols="4"
                        >
                            <div class="d-flex align-items-center justify-content-end">
                                <b-form-input
                                    v-model="filter"
                                    class="d-inline-block mr-1 ml-1"
                                    placeholder="بحث..."
                                />
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
                            :items="orders"
                            :fields="fields"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            :filter="filter"
                            show-empty
                            empty-text="لم يتم العثور على سجلات مطابقة"
                            :filter-included-fields="filterOn"
                            @filtered="onFiltered"
                            @row-clicked="onRowClicked"
                        >

                            <template v-slot:head(select)>
                                <b-form-checkbox
                                    value="all"
                                    class="custom-control-primary"
                                    v-model="select_all"
                                    @change="selectAll"
                                />
                            </template>

                            <template #cell(template)="data">
                                <div
                                    class="d-flex justify-content-start align-items-center"
                                >
                                    <b-img
                                        rounded=""
                                        :src="data.item.template.preview_image"
                                        blank-color="#ccc"
                                        width="64"
                                        alt="placeholder"
                                        class="mr-2"
                                    />
                                    <div class="user-page-info">
                                        <h6 class="mb-0">{{data.item.template.template_name}}</h6>
                                        <small class="text-muted">
                                            <b-link :href="'https://' + data.item.template.domain.name + '/' + data.item.template.template_name" target="_blank">
                                                {{('https://' + data.item.template.domain.name + '/' + data.item.template.template_name).substring(0, 17) + '...'}}
                                            </b-link>
                                        </small>
                                    </div>
                                </div>
                            </template>

                            <!-- Column: Id -->
                            <template #cell(id)="data">
                                <b-link
                                    class="font-weight-bold"
                                    :to="{name: 'order', params: {id: data.item.id}}"
                                >
                                {{ data.value }}#
                                </b-link><br>
                                <small>{{ moment(data.item.created_at).format('MMMM Do YYYY, H:MM:SS') }}</small><br>
                                <b-badge :variant="data.item.payment_type == 'cod' ? 'light-warning' : 'light-success'">
                                    <feather-icon
                                        :icon="data.item.payment_type == 'cod' ? 'DollarSignIcon' : 'CreditCardIcon'"
                                        class="mr-25"
                                    />
                                    <span v-html="data.item.payment_type == 'cod' ? 'الدفع عند الاستلام' : 'مسبق الدفع'"></span>
                                </b-badge>
                            </template>

                            <template #cell(lead)="data">
                                <b-media vertical-align="center">
                                    <template #aside>
                                        <b-avatar
                                            size="32"
                                            :id="`invoice-row-${data.item.id}`"
                                        />
                                        <b-tooltip
                                            :target="`invoice-row-${data.item.id}`"
                                            placement="bottom"
                                            variant="secondary"
                                        >
                                            <p class="mb-0">
                                                {{data.item.lead.name}}
                                            </p>
                                            <p class="mb-0">
                                                هاتف: {{'966'+data.item.lead.phone_number}}
                                            </p>
                                            <p class="mb-0">
                                                عنوان: {{data.item.lead.address}}
                                            </p>
                                        </b-tooltip>
                                    </template>
                                    <b-link
                                        class="font-weight-bold d-block text-nowrap"
                                        
                                    >
                                        {{ data.item.lead.name }}
                                    </b-link>
                                    <small class="text-muted">{{ '966'+data.item.lead.phone_number }}</small>
                                </b-media>
                            </template>

                            <template #cell(status)="data">
                                <b-badge v-if="data.value == 'pending'" variant="light-warning">في انتظار التأكيد</b-badge>
                                <b-badge v-if="data.value == 'confirmed'" variant="light-primary">تم التأكيد</b-badge>
                                <b-badge v-if="data.value == 'progress'" variant="light-info">قيد المعالجة</b-badge>
                                <b-badge v-if="data.value == 'indelivery'" variant="light-info">جاري التوصيل</b-badge>
                                <b-badge v-if="data.value == 'delivered'" variant="light-success">تم التوصيل</b-badge>
                                <b-badge v-if="data.value == 'canceled'" variant="light-danger">تم إلغاء الطلب</b-badge>
                            </template>

                            <template #cell(shipping_company)="data">
                                <b-link v-if="data.value" :href="data.item.shipping_awb" target="_blank">
                                    {{ data.value.name }}
                                    <br>
                                    <b-img
                                        :src="require(`@/assets/images/channels/${data.item.shipping_company.type}.png`)"
                                        width="60"
                                        alt="placeholder"
                                    />
                                </b-link>
                            </template>

                            <template #cell(select)="data">
                                <b-form-checkbox
                                    v-model="selected"
                                    :value="data.item.id"
                                    class="custom-control-primary"
                                />
                            </template>

                            <template #cell(is_paid)="data">
                                <strong style="font-size: 9pt;">{{data.item.amount + ' SAR'}}</strong><br>
                                <b-badge :variant="data.value ? 'light-success' : 'light-danger'">
                                    <feather-icon
                                        :icon="data.value ? 'CheckCircleIcon' : 'XCircleIcon'"
                                        class="mr-25"
                                    />
                                    <span v-html="data.value ? 'تم الدفع' : 'غير مدفوع'"></span>
                                </b-badge>
                            </template>

                            <!-- Column: Actions -->
                            <template #cell(actions)="data">
                                <div class="text-nowrap">
                                    <template v-if="data.item.status != 'indelivery' && data.item.status != 'delivered'">
                                        <feather-icon
                                            :id="`invoice-row-${data.item.id}-send-icon`"
                                            icon="SendIcon"
                                            class="cursor-pointer"
                                            size="16"
                                            @click="shipModal=true; order=data.item"
                                        />
                                        <b-tooltip
                                            title="Ship Order"
                                            class="cursor-pointer"
                                            :target="`invoice-row-${data.item.id}-send-icon`"
                                        />
                                    </template>
                                    <template v-else>
                                        <feather-icon
                                            :id="`invoice-row-${data.item.id}-cancel-icon`"
                                            icon="XIcon"
                                            class="cursor-pointer"
                                            size="16"
                                            @click="cancelShipModal=true; order=data.item"
                                        />
                                        <b-tooltip
                                            title="Cancel Order"
                                            class="cursor-pointer"
                                            :target="`invoice-row-${data.item.id}-cancel-icon`"
                                        />
                                    </template>

                                    <feather-icon
                                        :id="`invoice-row-${data.item.id}-preview-icon`"
                                        icon="EyeIcon"
                                        size="16"
                                        class="mx-1"
                                        @click="$router.push({name: 'order', params: {id: data.item.id}})"
                                    />
                                    <b-tooltip
                                        title="Preview Invoice"
                                        :target="`invoice-row-${data.item.id}-preview-icon`"
                                    />
                                </div>
                            </template>

                        </b-table>
                    </b-col>
                </b-row>

                <div class="mx-2 mb-2">
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
                </div>
            </b-card>

            <template #overlay>
                <div class="text-center">
                    <b-avatar
                        size="lg"
                        :src="require('@/assets/images/logo_round.jpg')"
                    />
                    <br>
                    <b-spinner class="mt-1" variant="primary"/>
                </div>
            </template>
        </b-overlay>

        <!-- Ship Modal -->
        <b-modal
            id="modal-1"
            v-model="shipModal"
            title="Ship Modal"
            ok-title="Accept"
            cancel-title="Cancel"
            @ok="placeOrder"
        >
            <b-card-text>
                <strong>Order ID:</strong> {{ order.id }} <br/>
                <strong>Customer:</strong> {{ order.lead.name }} <br/>
                <strong>Address:</strong> {{ order.lead.address }} <br/>
            </b-card-text>
        </b-modal>

        <!-- Cancel Modal -->
        <b-modal
            id="modal-1"
            v-model="cancelShipModal"
            title="Cancel Order"
            ok-title="Accept"
            cancel-title="Cancel"
            @ok="cancelOrder"
        >
            <b-card-text>
                <strong>Order ID:</strong> {{ order.id }} <br/>
                <strong>Customer:</strong> {{ order.lead.name }} <br/>
                <strong>Address:</strong> {{ order.lead.address }} <br/>
            </b-card-text>
        </b-modal>
    </div>
</template>

<script>
require('js-file-download');
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, BInputGroupAppend, BTooltip,
    BDropdown, BDropdownItem, BCardBody, BCardHeader, BSpinner
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
import fileDownload from 'js-file-download';
export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, ToastificationContent, BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, 
        BFormInput, BFormGroup, BForm, BOverlay, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, BInputGroupAppend,
        BFormCheckbox, vSelect, BTooltip, BDropdown, BDropdownItem, BCardBody, BCardHeader, BSpinner
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => ({ text: f.label, value: f.key }))
        },
    },
    mounted(){
        this.getOrders()
        this.getTemplates()
        this.getChannels()
    },
    data(){
        return {
            loading: false,
            statusOptions: [
                {ar: 'في انتظار التأكيد', en: 'pending'}, {ar: 'تم التأكيد', en: 'confirmed'}, 
                {ar: 'قيد المعالجة', en: 'progress'}, {ar: 'جاري التوصيل', en: 'indelivery'}, {ar: 'تم التوصيل', en: 'delivered'},
                {ar: 'تم إلغاء الطلب', en: 'canceled'}
            ],
            statusFilter: null,
            paymentOptions: [{ar: 'الدفع عند الاستلام', en: 'cod'}, {ar: 'مسبق الدفع', en: 'card'}],
            paymentFilter: null,
            templateFilter: null,
            is_paidFilter: null,
            is_paidOptions: [{ar: 'تم الدفع', en: true}, {ar: 'غير مدفوع', en: false}],
            perPage: 25,
            pageOptions: [10, 25, 50, 100],
            totalRows: 1,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            fields: [
                {key: 'select', label: ''},
                {key: 'id', label: 'الطلب'},
                {key: 'template', label: 'الصفحة'},
                {key: 'lead', label: 'العميل'},
                {key: 'shipping_company', label: 'شركة الشحن'},
                {key: 'is_paid', label: 'حالة الدفع'},
                // {key: 'amount', label: 'المبلغ الإجمالي'},
                {key: 'status', label: 'الحالة'},
                // {key: 'created_at', label: 'التاريخ'},
                {key: 'actions', label: 'أجراءات'},
            ],
            orders: [],
            db_orders: [],
            selected: [],
            templates: [],
            shipModal: false,
            order: {id: 0, lead: {name: '', address: ''}},
            cancelShipModal: false,
            select_all: ''
        }
    },
    methods:{
        selectAll(){
            console.log(this.select_all);
            this.selected = []
            if (this.select_all){
                for (let i=0; i< this.perPage; i++){
                    this.selected.push(this.orders[i].id)
                }
            }
        },
        cancelOrder(){
            if (this.order.id){
                axios.post(`/orders/${this.order.id}/cancel_order/`)
                .then(response => {
                    this.getOrders();
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم إلغاء الطلب بنجاح',
                            variant: 'success',
                        },
                    })
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        placeOrder(){
            if (this.order.id){
                axios.post(`/orders/${this.order.id}/place_order/`)
                .then(response => {
                    this.getOrders();
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم إرسال الطلب بنجاح إلى شركة الشحن.',
                            variant: 'success',
                        },
                    })
                })
                .catch(error => {
                    console.log(error);
                })
            }
        },
        filterOrders(){
            var new_data = this.db_orders
            if (this.paymentFilter){
                new_data = new_data.filter(item => item.payment_type == this.paymentFilter)
            }

            if (this.statusFilter){
                new_data = new_data.filter(item => item.status == this.statusFilter)
            }

            if (this.templateFilter){
                new_data = new_data.filter(item => item.template.id == this.templateFilter)
            }

            if (this.is_paidFilter){
                new_data = new_data.filter(item => item.is_paid == this.is_paidFilter)
            }
            // console.log(new_data);
            // console.log(this.is_paidFilter);
            this.orders = []
            new_data.forEach(item => this.orders.push(item))
        },
        onRowClicked(item, index, event){
            let exist = false
            this.selected.forEach(val => {
                if (val == item.id){
                    exist = true
                }
            })

            if (!exist) {
                this.selected.push(item.id)
            } else {
                this.selected = this.selected.filter(val => val != item.id)
            }
        },
        async download(){
            this.loading = true
            await axios.post("/orders/bulk_awb/", {orders: this.selected}, {responseType: 'blob'})
            .then(response => {
                fileDownload(response.data, 'orders.pdf')
                this.loading = false
            })
            .catch(error => {
                this.loading = false
                console.log(error);
            })
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getChannels(){
            axios.get('/channels')
            .then((response) => {
                this.channels = response.data
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        },
        getTemplates(){
            axios.get('/templates/short')
            .then((response) => {
                this.templates = response.data
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        },
        getOrders(){
            axios.get('/orders')
            .then((response) => {
                this.db_orders = response.data
                this.orders = response.data
                this.totalRows = response.data.length
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>