<template>
    <div class="mt-2">
        <!-- Miscellaneous Charts -->
        <b-row class="match-height">
            <b-col
                lg="2"
                cols="6"
            >
                <card-statistic-order-chart />
            </b-col>
            <b-col
                lg="2"
                cols="6"
            >
                <card-statistic-profit-chart />
            </b-col>
            <b-col
                lg="8"
                cols="12"
            >
                <card-statistics-group />
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
                statistic="36.9k"
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
                statistic="97.8k"
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
                statistic="26.8"
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
            template: null
        }
    }
}
</script>