<template>
  <div>
    <b-overlay
      :show="show"
      opacity="1"
      spinner-variant="primary"
      variant="white"
      rounded="lg"
    >
      <template v-if="!appActivated">
        <b-overlay
          :show="showFormLoader"
          rounded="sm"
          spinner-variant="primary"
        >
          <b-card>
            <validation-observer ref="formValidation">
              <!-- form -->
              <b-form class="mt-2">
                <b-row>
                  <b-col cols="12">
                    <div class="d-flex align-items-center mb-2">
                      <feather-icon
                        icon="CheckCircleIcon"
                        size="18"
                      />
                      <h4 class="mb-0 ml-75">
                        تفعيل صفحات الهبوط
                      </h4>
                    </div>
                  </b-col>

                  <b-col sm="6">
                    <b-form-group>
                      <div class="d-flex justify-content-between">
                        <label for="domain">النطاق</label>
                      </div>
                      <validation-provider
                        #default="{ errors }"
                        name="النطاق"
                        rules="required"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid':null"
                        >
                        <b-input-group-prepend is-text>
                          <feather-icon icon="Link2Icon" />
                        </b-input-group-prepend>
                          <b-form-input
                            id="domain"
                            v-model="form.domain.name"
                            :state="errors.length > 0 ? false:null"
                            class="form-control-merge"
                            name="domain"
                            placeholder="النطاق"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  
                  <b-col sm="6">
                    <b-form-group>
                      <div class="d-flex justify-content-between">
                        <label for="customer-website">رابط الموقع الرئيسي</label>
                      </div>
                      <validation-provider
                        #default="{ errors }"
                        name="رابط الموقع الرئيسي"
                        rules="required|url"
                      >
                        <b-input-group
                          class="input-group-merge"
                          :class="errors.length > 0 ? 'is-invalid':null"
                        >
                        <b-input-group-prepend is-text>
                          <feather-icon icon="LinkIcon" />
                        </b-input-group-prepend>
                          <b-form-input
                            id="customer-website"
                            v-model="form.customer_website"
                            :state="errors.length > 0 ? false:null"
                            class="form-control-merge"
                            name="customer-website"
                            placeholder="رابط الموقع الرئيسي"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  
                  <!-- alert -->
                  <b-col
                    cols="12"
                    class="mt-75"
                  >
                    <b-alert
                      show
                      variant="warning"
                      class="mb-50"
                    >
                      <h4 class="alert-heading">
                        يرجى الانتباه.
                      </h4>
                      <div class="alert-body">
                        بعد تفعيل التطبيق ، يرجى الانتظار ما بين دقيقة إلى 10 دقائق حتى يشتغل.
                      </div>
                    </b-alert>
                  </b-col>
                  <!--/ alert -->

                  <b-col cols="12">
                    <b-button
                      variant="primary"
                      class="mt-2 mr-1"
                      @click.prevent="submitForm"
                    >
                      تفعيل
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </b-card>
          </b-overlay>
      </template>
      <template v-else>
        <b-row align-v="stretch">
          <b-col
            cols="12"
            xl="8"
            lg="7"
            md="6"
          >
            <b-card>
              <b-row>
                <!-- User Info: Left col -->
                <b-col
                  cols="21"
                  xl="6"
                  class="d-flex justify-content-between flex-column"
                >
                  <!-- User Avatar & Action Buttons -->
                  <div class="d-flex justify-content-start">
                    <b-avatar size="lg" variant="light-primary">
                      <feather-icon size="30" icon="HomeIcon" />
                    </b-avatar>
                    <div class="d-flex flex-column ml-1">
                      <div class="mb-1">
                        <h4 class="mb-0">
                          {{app.domain.name}}
                        </h4>
                        <span class="card-text">
                          <feather-icon icon="LinkIcon" size="13" />
                          <b-link :href="'http://'+app.customer_website" target="_blank">www.{{app.customer_website}}</b-link>
                          </span>
                      </div>
                    </div>
                  </div>
                </b-col>

                <!-- Right Col: Table -->
                <b-col
                  cols="21"
                  xl="6"
                >
                  <b-button
                    variant="outline-warning"
                    @click="editModalShow = true"
                  >
                    <feather-icon
                      icon="EditIcon"
                      class="mr-20"
                    />
                    تعديل النطاق
                  </b-button>
                  <b-button
                    variant="primary"
                    class="ml-1"
                    @click="showTemplateModal = true"
                  >
                    <feather-icon
                      icon="PlusIcon"
                      class="mr-50"
                    />
                    إنشاء صفحة
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          
          <b-col
            cols="12"
            xl="4"
            lg="5"
            md="6"
          >
            <b-card>
              <!-- User Stats -->
              <div class="d-flex align-items-center mt-1">
                <div class="d-flex align-items-center mr-2">
                  <b-avatar
                    variant="light-primary"
                    rounded
                  >
                    <feather-icon
                      icon="DollarSignIcon"
                      size="18"
                    />
                  </b-avatar>
                  <div class="ml-1">
                    <h5 class="mb-0">
                      SAR 23.3k
                    </h5>
                    <small>عدد المبيعات</small>
                  </div>
                </div>

                <div class="d-flex align-items-center">
                  <b-avatar
                    variant="light-success"
                    rounded
                  >
                    <feather-icon
                      icon="TrendingUpIcon"
                      size="18"
                    />
                  </b-avatar>
                  <div class="ml-1">
                    <h5 class="mb-0">
                      99.87k
                    </h5>
                    <small>عدد الزيارات</small>
                  </div>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>

        <b-row align-v="stretch">
          <b-col cols="6" xl="3" lg="4" md="4" v-for="template in app.templates" :key="template.id">
              <b-card
                :header="template.template_name + 'صفحة الهبوط '"
                header-tag="h6"
              >
                <b-link :to="{name: 'templates', params: {id: template.id}}">
                  <b-img
                    fluid
                    class="mb-2"
                    :src="require('@/assets/images/pages/skeleton400_still.gif')"
                  />
                </b-link>
                <b-card-text>
                  <small class="text-muted">منذ 3 دقائق</small>
                  <!-- <b-link @click="moreTemplate"><feather-icon class="float-right" icon="MoreVerticalIcon" /></b-link> -->
                    <b-dropdown
                      id="dropdown-1"
                      no-caret
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      text="Primary"
                      variant="default"
                    >
                      <template #button-content>
                        <feather-icon icon="MoreVerticalIcon" />
                      </template>
                      <b-dropdown-item>Option 1</b-dropdown-item>
                      <b-dropdown-item>Option 2</b-dropdown-item>
                      <b-dropdown-item>Option 3</b-dropdown-item>
                    </b-dropdown>
                </b-card-text>
              </b-card>
          </b-col>
        </b-row>
      </template>
    </b-overlay>
    <!-- basic modal -->
    <b-modal
        id="modal-1"
        ref="modal-edit"
        v-model="editModalShow"
        title="تحديث النطاق"
        ok-title="احفظ التغيير"
        cancel-title="إلغاء"
        cancel-variant="outline-secondary"
        @hidden="resetModal"
        @ok="handleOk"
    >
    <validation-observer ref="simpleRules">
        <b-form @submit.stop.prevent="updateDomain()">
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="رابط صورة النطاق"
                label-for="name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="رابط صورة النطاق"
                  rules="required|url"
                >
                  <b-form-input
                    id="name"
                    v-model="domainForm.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="رابط صورة النطاق"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
    </validation-observer>
    </b-modal>
    <!-- modal vertical center -->
    <b-modal
      v-model="showTemplateModal"
      id="modal-center"
      centered
      size="lg"
      cancel-variant="outline-secondary"
      title="إنشاء صفحة هبوط جديدة"
      cancel-title="إلغاء"
      ok-title="إنشاء"
      @hidden="resetModalAddTemplate"
      @ok="handleOkAddTemplate"
    >
      <validation-observer ref="simpleRules">
        <b-form class="mt-3 mb-3">
          <b-row>
            <b-col cols="11">
              <b-form-group
                label="اسم الصفحة"
                label-for="largeInput"
              >
              <b-input-group aria-label="aaa" size="lg" prepend="/https://example.com/users">
                <b-form-input id="largeInput" v-model="templateForm.template_name" placeholder="template_name" />
              </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <h1 class="mb-2">اختر الفئة</h1>
          <b-link @click="seletcTemplate('template_one')">
            <b-row class="d-flex flex-row">
              <b-col cols="10">
                <b-media>
                  <template #aside>
                    <b-avatar
                      rounded
                      variant="light-info"
                      size="55"
                    >
                      <feather-icon size="25" icon="BriefcaseIcon" />
                    </b-avatar>
                  </template>
                  <h6 class="media-heading ">
                    العنوان هنا
                  </h6>
                  <small class="text-muted">
                    وصف هنا أيضا.
                  </small>
                </b-media>
              </b-col>
              <b-col cols="2" class="align-self-center">
                <b-form-radio
                  v-model="templateForm.template_code"
                  name="some-radios"
                  value="template_one"
                />
              </b-col>
            </b-row>
          </b-link>
          <b-link @click="seletcTemplate('template_two')">
            <b-row @click="seletcTemplate('template_two')" class="d-flex flex-row mt-2">
              <b-col cols="10">
                <b-media>
                  <template #aside>
                    <b-avatar
                      rounded
                      variant="light-warning"
                      size="55"
                    >
                      <feather-icon size="25" icon="ShoppingBagIcon" />
                    </b-avatar>
                  </template>
                  <h6 class="media-heading">
                    العنوان هنا
                  </h6>
                  <small class="text-muted">
                    وصف هنا أيضا.
                  </small>
                </b-media>
              </b-col>
              <b-col cols="2" class="align-self-center">
                <b-form-radio
                  v-model="templateForm.template_code"
                  name="some-radios"
                  value="template_two"
                />
              </b-col>
            </b-row>
          </b-link>
          <b-link @click="seletcTemplate('template_three')">
            <b-row @click="seletcTemplate('template_three')" class="d-flex flex-row mt-2">
              <b-col cols="10">
                <b-media>
                  <template #aside>
                    <b-avatar
                      rounded
                      variant="light-success"
                      size="55"
                    >
                      <feather-icon size="25" icon="ShoppingCartIcon" />
                    </b-avatar>
                  </template>
                  <h6 class="media-heading">
                    العنوان هنا
                  </h6>
                  <small class="text-muted">
                    وصف هنا أيضا.
                  </small>
                </b-media>
              </b-col>
              <b-col cols="2" class="align-self-center">
                <b-form-radio
                  v-model="templateForm.template_code"
                  name="some-radios"
                  value="template_three"
                />
              </b-col>
            </b-row>
          </b-link>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>

import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, url } from '@validations'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem
} from 'bootstrap-vue'
import axios from 'axios'
export default {
  components: { ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
    BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
    BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem
  },
  directives: {
    'b-modal': VBModal,
    Ripple
  },
  data(){
    return {
      templateForm:{
        app: null,
        template_code: 'template_one',
        template_name: '',
      },
      showTemplateModal: false,
      show: true,
      app: {
        id: 0,
        app_id: '',
        customer_website: '',
        domain: '',
        templates: [],
        created_at: '',
        updated_at: ''
      },
      domainForm:{
        id: 0,
        name: '',
        type: ''
      },
      appActivated: true,
      showFormLoader: false,
      form: {
        customer_website: '',
        domain: {
          name: '',
          type: 'custom'
        }
      },
      editModalShow: false,
      required,
      url
    }
  },
  created(){
    this.getApp();
    localize('ar');
  },
  methods:{
    moreTemplate(){
      console.log('more');
    },
    handleOkAddTemplate(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.createTemplate()
    },
    resetModalAddTemplate(){
      this.templateForm.template_name = ''
      this.templateForm.template_code = 'template_one'
    },
    seletcTemplate(template){
      this.templateForm.template_code = template
    },
    createTemplate(){
      this.templateForm.app = this.app.id
      axios.post('templates/create_blank_template', this.templateForm)
      .then(response => {
        this.$toast({
            component: ToastificationContent,
            props: {
                title: 'إشعار',
                icon: 'CheckIcon',
                text: 'تم إضافة صفحة الهبوط بنجاح.',
                variant: 'success',
            },
        })
        this.showTemplateModal = false
        this.getApp();
      })
      .catch(error => {
        this.$toast({
            component: ToastificationContent,
            props: {
            title: 'إنذار',
            icon: 'AlertCircleIcon',
            text: 'حدث خطأ أثناء إضافة صفحة الهبوط.',
            variant: 'danger',
            },
        })
        console.log(JSON.stringify(error));
      })
    },
    updateDomain(){
      axios.put(`/domains/${this.app.domain.id}`, this.domainForm)
      .then(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'إشعار',
            icon: 'CheckIcon',
            text: 'تم تحديث النطاق بنجاح.',
            variant: 'success',
          },
        })
        this.getApp()
        this.editModalShow = false
      })
      .catch((error) => {
        this.$toast({
            component: ToastificationContent,
            props: {
            title: 'إنذار',
            icon: 'AlertCircleIcon',
            text: 'حدث خطأ أثناء تحديث النطاق.',
            variant: 'danger',
            },
        })
        console.log(JSON.stringify(error));
      })
    },
    resetModal(){
      this.editModalShow = false
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.updateDomain()
    },
    submitForm(){
      this.showFormLoader = true;
      this.$refs.formValidation.validate().then(success => {
        if (success) {
          axios.post('/create_app', this.form)
          .then((response) => {
            console.log(response);
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'إشعار',
                icon: 'CheckIcon',
                text: 'تم تفعيل التطبيق بنجاح.',
                variant: 'success',
              },
            })
            this.form.customer_website = ''
            this.form.domain.name = ''
            this.showFormLoader = false;
            this.getApp();
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'إنذار',
                icon: 'AlertCircleIcon',
                text: 'لديك بالفعل تطبيق نشط.',
                variant: 'danger',
              },
            })
            console.log(JSON.stringify(error));
            this.showFormLoader = false;
          })
        } else {
          this.showFormLoader = false;
        }
      })
    },
    getApp(){
      axios.get('/get_app')
      .then((response) => {
        if (response.data.app_id == ''){
          this.appActivated = false
        } else {
          this.appActivated = true
          this.app = response.data
        }
        this.domainForm.name = this.app.domain.name
        this.domainForm.id = this.app.domain.id
        this.domainForm.type = this.app.domain.type
        setTimeout(() => {
            this.show = false;
          }
        , 1000);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      })
    },
    // deleteApp(){
    //   this.$swal({
    //     title: 'هل أنت متأكد؟',
    //     text: "لن تتمكن من التراجع عن هذا!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     cancelButtonText: 'إلغاء',
    //     confirmButtonText: 'نعم ، احذفها!',
    //     customClass: {
    //       confirmButton: 'btn btn-primary',
    //       cancelButton: 'btn btn-outline-danger ml-1',
    //     },
    //     buttonsStyling: false,
    //   }).then(result => {
    //     if (result.value) {
    //       axios.delete('/apps/'+this.app.app_id)
    //       .then((response) =>{
    //         console.log(response);
    //         this.$swal({
    //           icon: 'success',
    //           title: 'تم الحذف!',
    //           text: 'تم حذف تطبيقك بنجاح.',
    //           confirmButtonText: 'حسنا',
    //           customClass: {
    //             confirmButton: 'btn btn-success',
    //           },
    //         })
    //         this.getApp();
    //       })
    //       .catch((error) => {
    //         console.log(JSON.stringify(error));
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style>

</style>
