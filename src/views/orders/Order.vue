<template>
    <div>
        <b-button
            variant="flat-primary"
            class="mb-2"
            @click="$router.go(-1)"
        >
            <feather-icon
                icon="ArrowRightIcon"
                size="20"
                class="mr-50"
            />
            <span class="align-middle h4 text-primary">رجوع </span>
        </b-button>
        <b-card no-body>
            <b-row>
                <b-col cols="12">
                    <div class="d-flex align-items-center pl-1 pt-1 mb-1">
                        <feather-icon
                            icon="ClipboardIcon"
                            size="18"
                        />
                        <h2 class="mb-0 ml-75">
                            معلومات الطلب - #{{order.id}}
                        </h2>
                    </div>
                </b-col>
            </b-row>
        </b-card>

        <b-card no-body>
            <b-row>
                <b-col cols="12">
                    <div class="d-flex align-items-center pl-1 pt-1 mb-1">
                        <feather-icon
                            icon="ClipboardIcon"
                            size="18"
                        />
                        <h4 class="mb-0 ml-75 text-primary">#{{order.id}}</h4>
                    </div>
                </b-col>

                <b-col cols="12 mb-2">
                    <b-table responsive="sm" :items="orderDetails" :fields="orderDetailsFields">
                        <template #cell(shipping_company)="data">
                            <template v-if="data.value">
                                <strong>Company: </strong> {{ data.item.shipping_company.name }} <br>
                                <strong>AWB: </strong> {{ data.item.shipping_tracking_id }}
                            </template>
                        </template>

                        <template #cell(created_at)="data">
                            {{ moment(data.value).format('MMMM Do YYYY, H:MM:SS') }}
                        </template>

                        <template #cell(payment_type)="data">
                            <b-badge :variant="data.item.payment_type == 'cod' ? 'light-warning' : 'light-success'">
                                <feather-icon
                                    :icon="data.item.payment_type == 'cod' ? 'DollarSignIcon' : 'CreditCardIcon'"
                                    class="mr-25"
                                />
                                <span v-html="data.item.payment_type == 'cod' ? 'الدفع عند الاستلام' : 'مسبق الدفع'"></span>
                            </b-badge>
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
                    </b-table>
                </b-col>
            </b-row>
        </b-card>

        <section class="invoice-preview-wrapper">
            <b-row class="invoice-preview">
                <b-col
                    cols="12"
                >
                    <b-card-actions no-body title="معلومات العميل"  actionCollapse class="invoice-preview-card">
                        <!-- Invoice Client & Payment Details -->
                        <b-card-body
                            class="invoice-padding pt-0"
                        >
                            <b-row>

                                <!-- Col: Invoice To -->
                                <b-col
                                    cols="12"
                                    xl="4"
                                    class="p-0"
                                >
                                    <h2 class="mb-2">العنوان :</h2>
                                    <h6 class="mb-25">{{ order.lead.name }}</h6>
                                    <p class="card-text mb-25">{{ order.lead.phone_number }}</p>
                                    <p class="card-text mb-25">{{ order.lead.city.main_city.name_ar }}</p>
                                    <p class="card-text mb-25"> <strong>العنوان: </strong>المملكة العربية السعودية</p>
                                    <p class="card-text mb-0">{{ order.lead.address }}</p>
                                </b-col>

                                <!-- Col: Payment Details -->
                                <b-col
                                    xl="4"
                                    cols="12"
                                    class="p-0 mt-xl-0 mt-2 d-flex justify-content-xl-end"
                                >
                                    <div>
                                        <h2 class="mb-2">نقطة الالتقاط :</h2>
                                        <template v-if="order.warehouse">
                                            <h6 class="mb-25">{{ order.warehouse.name }}</h6>
                                            <p class="card-text mb-25">{{ order.warehouse.phone_number }}</p>
                                            <p class="card-text mb-25">{{ order.warehouse.email }}</p>
                                            <p class="card-text mb-25"> <strong>العنوان: </strong>المملكة العربية السعودية</p>
                                            <p class="card-text mb-0">{{ order.warehouse.address }}</p>
                                        </template>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card-actions>
                </b-col>
            </b-row>
        </section>

        <section class="invoice-preview-wrapper">
            <b-row class="invoice-preview">
                <b-col
                    cols="12"
                >
                    <b-card-actions no-body title="المنتجات"  actionCollapse class="invoice-preview-card">
                        <b-table responsive="sm" :items="orderItems" :fields="orderItemsFields">
                            <template #cell(product)="data">
                                <b-media vertical-align="center">
                                    <template #aside>
                                        <b-avatar
                                            size="32"
                                            :src="data.item.product.image"
                                        />
                                    </template>
                                    <b-link
                                        class="font-weight-bold d-block text-nowrap"
                                        
                                    >
                                        {{ data.item.product.title }}
                                    </b-link>
                                    <small class="text-muted">{{ data.item.product.description }}</small>
                                </b-media>
                            </template>
                        </b-table>

                        <!-- Invoice Description: Total -->
                        <b-card-body class="invoice-padding">
                            <b-row>

                            <!-- Col: Sales Persion -->
                            <b-col
                                cols="12"
                                md="6"
                                class="mt-md-0 mt-3"
                                order="2"
                                order-md="1"
                            >
                                <!-- <b-card-text class="mb-0">
                                    <span class="font-weight-bold">Salesperson:</span>
                                    <span class="ml-75">Alfie Solomons</span>
                                </b-card-text> -->
                            </b-col>

                            <!-- Col: Total -->
                            <b-col
                                cols="12"
                                md="6"
                                class="mt-md-6 d-flex justify-content-end"
                                order="1"
                                order-md="2"
                            >
                                <div class="invoice-total-wrapper">
                                <div class="invoice-total-item">
                                    <p class="invoice-total-title">
                                        المجموع الفرعي:
                                    </p>
                                    <p class="invoice-total-amount">
                                    SAR {{ order.amount }}
                                    </p>
                                </div>
                                <div class="invoice-total-item">
                                    <p class="invoice-total-title">
                                        تخفيض:
                                    </p>
                                    <p class="invoice-total-amount">
                                    SAR 0
                                    </p>
                                </div>
                                <div class="invoice-total-item">
                                    <p class="invoice-total-title">
                                        ضريبة:
                                    </p>
                                    <p class="invoice-total-amount">
                                    SAR 0
                                    </p>
                                </div>
                                <hr class="my-50">
                                <div class="invoice-total-item">
                                    <p class="invoice-total-title">
                                        المجموع:
                                    </p>
                                    <p class="invoice-total-amount">
                                    SAR {{ order.amount }}
                                    </p>
                                </div>
                                </div>
                            </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card-actions>
                </b-col>
            </b-row>
        </section>


        <b-card-actions v-if="order.shipping_company" no-body title="بيانات الشحن" actionCollapse>
            <b-row class="container my-2">
                <b-col cols="8">
                    <h4 class="mb-1">التتبع :</h4>
                    <app-timeline>
                        <app-timeline-item
                            v-if="order.shipping_company.type == 'jonex'"
                            title="تم إلغاء الشحن"
                            subtitle="تم إنشاء الشحنة, تم إرسال الشحنة إلى شركة الشحن"
                            :time="order.created_at"
                            :variant="variants[4]"
                        >
                            <div>
                                <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
                                    <h6>جاري التوصيل</h6>
                                    <small class="text-muted">{{ order.created_at }}</small>
                                </div>
                                <p>تم إنشاء الشحنة, تم إرسال الشحنة إلى شركة الشحن</p>
                                <p>
                                    <b-img
                                        :src="require('@/assets/images/icons/pdf.png')"
                                        height="auto"
                                        width="20"
                                        class="mr-1"
                                    />
                                    <span class="align-bottom"><b-link :href="order.shipping_awb" target="_blank">awb.pdf</b-link></span>
                                </p>
                            </div>
                        </app-timeline-item>
                        <app-timeline-item
                            v-for="tracking, index in tracking_info" :key="index"
                            :title="tracking.code == 'cancelled' ? 'تم إلغاء الشحن' : 'جاري التوصيل'"
                            :subtitle="tracking.description"
                            :time="tracking.created_at"
                            :variant="variants[index]"
                        >
                            <div v-if="index == tracking_info.length-1 && order.shipping_company.type != 'jonex'">
                                <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
                                    <h6>جاري التوصيل</h6>
                                    <small class="text-muted">{{ tracking.created_at }}</small>
                                </div>
                                <p>{{ tracking.description }}</p>
                                <p>
                                    <b-img
                                        :src="require('@/assets/images/icons/pdf.png')"
                                        height="auto"
                                        width="20"
                                        class="mr-1"
                                    />
                                    <span class="align-bottom"><b-link :href="order.shipping_awb" target="_blank">invoice.pdf</b-link></span>
                                </p>
                            </div>
                        </app-timeline-item>
                    </app-timeline>
                </b-col>
                <b-col
                    cols="4"
                    class="p-0"
                >
                    <div class="float-right">
                        <b-img
                            :src="require(`@/assets/images/channels/${order.shipping_company.type}.png`)"
                            width="104"
                            alt="placeholder"
                        />
                        <p class="card-text mt-1 mb-25"> <strong>الناقل : </strong>{{order.shipping_company.name.toUpperCase()}}</p>
                        <p class="card-text mb-25"> <strong>الهوية : </strong>{{order.shipping_tracking_id}}</p>
                    </div>
                </b-col>
            </b-row>
        </b-card-actions>

    </div>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, BInputGroupAppend, BTooltip,
    BDropdown, BDropdownItem, BCardBody, BCardHeader, BCardTitle
} from 'bootstrap-vue'
import axios from 'axios'
export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, ToastificationContent,
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, 
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, BInputGroupAppend, BFormCheckbox,
        BTooltip, BDropdown, BDropdownItem, BCardBody, BCardHeader, BCardTitle, BCardActions, AppTimeline, AppTimelineItem
    },
    data(){
        return {
            variants: ['primary', 'info', 'success', 'warning', 'secondary', 'primary', 'info', 'success', 'warning', 'secondary'],
            order: {
                lead: {
                    name: '',
                    phone_number: '',
                    address: '',
                    city: {main_city: {name_ar: ''}}
                },
                shipping_company: {name: 'aymakan', type: 'aymakan'}
            },
            orderDetails: [],
            orderDetailsFields: [
                {key: 'created_at', label: 'تاريخ الطلب'},
                {key: 'amount', label: 'قيمة الطلب'},
                {key: 'is_paid', label: 'حالة الدفع'},
                {key: 'payment_type', label: 'طريقة الدفع'},
                {key: 'shipping_company', label: 'تفاصيل الشحنة'},
            ],
            orderItems: [],
            orderItemsFields: [
                {key: 'product', label: 'المنتج'},
                {key: 'amount', label: 'السعر'},
                {key: 'quantity', label: 'الكمية'},
                {key: 'total', label: 'المبلغ الإجمالي'},
            ],
            tracking_info: []
        }
    },
    mounted(){
        this.getOrder()
        this.getTrackingInfo()
    },
    methods: {
        getTrackingInfo(){
            axios.get(`/orders/${this.$route.params.id}/tracking`)
            .then(response => {
                console.log(response);
                this.tracking_info = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        getOrder(){
            axios.get(`/orders/${this.$route.params.id}/`)
            .then(response => {
                console.log(response);
                this.order = response.data
                this.orderDetails.push({
                    created_at: response.data.created_at,
                    amount: response.data.amount,
                    is_paid: response.data.is_paid,
                    payment_type: response.data.payment_type,
                    shipping_company: response.data.shipping_company,
                    shipping_tracking_id: response.data.shipping_tracking_id,
                })

                response.data.items.forEach(item => {
                    this.orderItems.push({
                        product: item.product,
                        amount: item.product.price,
                        total: item.amount,
                        quantity: item.quantity,
                    })
                })
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {

  // Global Styles
  body {
    background-color: transparent !important;
  }
  nav.header-navbar {
    display: none;
  }
  .main-menu {
    display: none;
  }
  .header-navbar-shadow {
    display: none !important;
  }
  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }
  footer.footer {
    display: none;
  }
  .card {
    background-color: transparent;
    box-shadow: none;
  }
  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
              > .col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}
</style>
