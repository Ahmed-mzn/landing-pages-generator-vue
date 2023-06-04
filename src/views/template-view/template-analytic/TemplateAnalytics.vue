<template>
    <div class="mt-2">
        <b-card no-body>
            <b-row>
                <b-col cols="12">
                    <div class="d-flex align-items-center pl-1 pt-1 mb-1">
                        <feather-icon
                            icon="TrendingUpIcon"
                            size="18"
                        />
                        <h4 class="mb-0 ml-75">الزيارات</h4>
                    </div>
                </b-col>
                <b-col cols="12 mb-2">
                    <b-table-simple hover responsive>
                        <b-thead>
                            <b-tr>
                                <b-th>الصفحة</b-th>
                                <b-th>الزيارات</b-th>
                                <b-th>الطلبات</b-th>
                                <b-th>الطلبات المدفوعة</b-th>
                                <b-th>العملاء</b-th>
                                <!-- <b-th>income</b-th> -->
                                <b-th>المشاركات</b-th>
                            </b-tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr>
                                <b-td>
                                    <div
                                        class="d-flex justify-content-start align-items-center"
                                    >
                                        <b-img
                                            rounded=""
                                            :src="statistics.template.preview_image"
                                            blank-color="#ccc"
                                            width="90"
                                            alt="placeholder"
                                            class="mr-2"
                                        />
                                        <div class="user-page-info">
                                            <h6 class="mb-0">{{statistics.template.template_name}}</h6>
                                            <small class="text-muted">
                                                <b-link>
                                                    https://test.com
                                                </b-link>
                                            </small>
                                        </div>
                                    </div>
                                </b-td>
                                <b-td>{{ statistics.template.visits }}</b-td>
                                <b-td>{{ statistics.template.orders }}</b-td>
                                <b-td>{{ statistics.template.orders_paid }}</b-td>
                                <b-td>{{ statistics.template.customers }}</b-td>
                                <!-- <b-td>{{ statistics.template.income }}</b-td> -->
                                <b-td>{{ statistics.template.shares }}</b-td>
                            </b-tr>
                            <b-tr v-for="template in statistics.templates_child" :key="template.template_name">
                                <b-td>
                                    <div
                                        class="d-flex justify-content-start align-items-center"
                                    >
                                        <b-img
                                            rounded=""
                                            :src="template.preview_image"
                                            blank-color="#ccc"
                                            width="90"
                                            alt="placeholder"
                                            class="mr-2"
                                        />
                                        <div class="user-page-info">
                                            <h6 class="mb-0">{{template.template_name}}</h6>
                                            <small class="text-muted">
                                                <b-link>
                                                    https://test.com
                                                </b-link>
                                            </small>
                                        </div>
                                    </div>
                                </b-td>
                                <b-td>{{ template.visits }}</b-td>
                                <b-td>{{ template.orders }}</b-td>
                                <b-td>{{ template.orders_paid }}</b-td>
                                <b-td>{{ template.customers }}</b-td>
                                <!-- <b-td>{{ template.income }}</b-td> -->
                                <b-td>{{ template.shares }}</b-td>
                            </b-tr>
                        </b-tbody>
                    </b-table-simple>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BTableSimple, BThead, BTbody, BTh, BTr, BTd,
    BImg 
} from 'bootstrap-vue'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'

import CardStatisticOrderChart from './CardStatisticOrderChart.vue'
import CardStatisticProfitChart from './CardStatisticProfitChart.vue'
import CardStatisticsGroup from './CardStatisticsGroup.vue'
import axios from 'axios'

export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, BLink, BAvatar, BBadge, BTabs, BTab, BTableSimple, BThead, BTbody, BTh, BTr, BTd,
        BImg, StatisticCardVertical, CardStatisticOrderChart, CardStatisticProfitChart, CardStatisticsGroup,
    },
    data(){
        return {
            data: {
                visits: '',
                orders: '',
                orders_paid: '',
                customers: '',
                income: '',
                products: '',
                shares: ''
            },
            statistics: {
                template: {},
                templates_child: []
            }
        }
    },
    mounted(){
        this.getStatistics()
    },
    methods: {
        getStatistics(){
            axios.get(`/templates/${this.$route.params.id}/statistics`)
            .then(response => {
                console.log(response);
                this.statistics = response.data
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>