<template>
    <div>
        <div class="mb-2">

            <!-- Table Top -->
            <b-row>
                <!-- Per Page -->
                <b-col
                    cols="7"
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
                    cols="5"
                >
                    <div class="d-flex align-items-center justify-content-end">
                    <b-form-input
                        v-model="filter"
                        class="d-inline-block mr-1"
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
                    :items="shares"
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
                    <template #cell(created_at)="data">
                        {{moment(data.value).locale('ar').startOf('second').fromNow()}}
                    </template>
                    <template #cell(phone_number)="data">
                        <span dir="ltr" class="text-primary">{{ '+9665'+data.value }}</span>
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
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, 
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, 
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend, BFormCheckbox, vSelect
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
        this.getShares()
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
                {key: 'phone_number', label: 'الدولة', sortable: true},
                {key: 'city', label: 'المدينة', sortable: true},
                {key: 'created_at', label: 'التاريخ'},
            ],
            shares: []
        }
    },
    methods:{
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getShares(){
            axios.get(`/shares?template_id=${this.template.id}`)
            .then((response) => {
                this.shares = response.data
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>