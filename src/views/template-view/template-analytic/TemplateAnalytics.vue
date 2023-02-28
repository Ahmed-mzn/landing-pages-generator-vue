<template>
    <div class="mt-2">
        <!-- Miscellaneous Charts -->
        <b-row class="match-height">
            <b-col
                lg="2"
                cols="6"
            >
                <card-statistic-order-chart :data="data" />
            </b-col>
            <b-col
                lg="2"
                cols="6"
            >
                <card-statistic-profit-chart :data="data" />
            </b-col>
            <b-col
                lg="8"
                cols="12"
            >
                <card-statistics-group v-if="data.visits" :data="data" />
            </b-col>
        </b-row>
        <!--/ Miscellaneous Charts -->
        <!-- Stats Card Vertical -->
        <b-row class="match-height">
            <b-col
                xl="2"
                md="4"
                sm="6"
            >
                <statistic-card-vertical
                icon="EyeIcon"
                :statistic="data.visits"
                statistic-title="الزيارات"
                color="info"
                />
            </b-col>
            <b-col
                xl="2"
                md="4"
                sm="6"
            >
                <statistic-card-vertical
                color="warning"
                icon="MessageSquareIcon"
                statistic="12k"
                statistic-title="Comments"
                />
            </b-col>
            <b-col
                xl="2"
                md="4"
                sm="6"
            >
                <statistic-card-vertical
                color="danger"
                icon="ShoppingBagIcon"
                :statistic="data.orders"
                statistic-title="الطلبات"
                />
            </b-col>
            <b-col
                xl="2"
                md="4"
                sm="6"
            >
                <statistic-card-vertical
                    color="primary"
                    icon="ShareIcon"
                    :statistic="data.shares"
                    statistic-title="المشاركات"
                />
            </b-col>
            <b-col
                xl="2"
                md="4"
                sm="6"
            >
                <statistic-card-vertical
                    color="success"
                    icon="AwardIcon"
                    statistic="689"
                    statistic-title="المراجعات"
                />
            </b-col>
            <b-col
                xl="2"
                md="4"
                sm="6"
            >
                <statistic-card-vertical
                    hide-chart
                    color="danger"
                    icon="TruckIcon"
                    statistic="2.1k"
                    statistic-title="عائدات"
                />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab } from 'bootstrap-vue'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'

import CardStatisticOrderChart from './CardStatisticOrderChart.vue'
import CardStatisticProfitChart from './CardStatisticProfitChart.vue'
import CardStatisticsGroup from './CardStatisticsGroup.vue'
import axios from 'axios'

export default {
    components:{
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
        StatisticCardVertical, 
        CardStatisticOrderChart, CardStatisticProfitChart, CardStatisticsGroup,
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
                shares: '',
            }
        }
    },
    mounted(){
        this.getStatistics()
    },
    methods: {
        getStatistics(){
            axios.get(`/templates/${this.$route.params.id}/statistics`)
            .then(res => {
                this.data = res.data
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>