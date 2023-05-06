<template>
    <div>
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
                            <span class="align-middle">تنزيل</span>
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

                    <!-- Column: Id -->
                    <template #cell(id)="data">
                        <b-link
                            class="font-weight-bold"
                        >
                        0000{{ data.value }}#
                        </b-link>
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
                                        هاتف: {{data.item.lead.phone_number}}
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
                            <small class="text-muted">{{ data.item.lead.phone_number }}</small>
                        </b-media>
                    </template>
                    <template #cell(status)="data">
                        <b-badge variant="light-primary">{{data.value}}</b-badge>
                    </template>

                    <template #cell(created_at)="data">
                        {{moment(data.value).format('MMMM Do YYYY, H:MM:SS')}}
                    </template>

                    <template #cell(shipping_company)="data">
                        {{ data.value.name }}
                    </template>

                    <template #cell(is_paid)="data">
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
                            <feather-icon
                                :id="`invoice-row-${data.item.id}-send-icon`"
                                icon="SendIcon"
                                class="cursor-pointer"
                                size="16"
                            />
                            <b-tooltip
                                title="Send Invoice"
                                class="cursor-pointer"
                                :target="`invoice-row-${data.item.id}-send-icon`"
                            />

                            <feather-icon
                                :id="`invoice-row-${data.item.id}-preview-icon`"
                                icon="EyeIcon"
                                size="16"
                                class="mx-1"
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
    </div>
</template>

<script>
require('js-file-download');
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, BInputGroupAppend, BTooltip,
    BDropdown, BDropdownItem
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
import fileDownload from 'js-file-download';
export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, ToastificationContent,
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, 
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend, BFormCheckbox, vSelect, BTooltip, BDropdown, BDropdownItem
    },
    props: {
        template: {
            type: Object,
            default: () => {},
        }
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
    },
    data(){
        return{
            perPage: 5,
            pageOptions: [3, 5, 10],
            totalRows: 1,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            fields: [
                {key: 'id', label: '#'},
                {key: 'lead', label: 'المنتج'},
                {key: 'is_paid', label: 'رقم الهاتف', sortable: true},
                {key: 'shipping_company', label: 'المدينة', sortable: true},
                {key: 'amount', label: 'العنوان'},
                {key: 'status', label: 'الكمية', sortable: true},
                {key: 'created_at', label: 'التاريخ'},
                {key: 'actions', label: 'actions'},
            ],
            orders: []
        }
    },
    methods:{
        onRowClicked(item, index, event){
            console.log(item);
            console.log(index);
            console.log(event);
        },
        download(){
            axios.get("/templates/35/download_excel/", {responseType: 'blob'})
            .then(response => {
                if(response.status == 400 || response.status == 500){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تنزيل.',
                        variant: 'danger',
                        },
                    })
                } else{
                    fileDownload(response.data, 'orders.xls')
                }
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء تنزيل.',
                    variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getOrders(){
            axios.get(`/orders?template_id=${this.template.id}`)
            .then((response) => {
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
