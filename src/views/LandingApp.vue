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
                        بعد تفعيل التطبيق ، يرجى الانتظار ما بين دقيقة إلى 5 دقائق حتى يشتغل.
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
            md="7"
          >
            <b-card>
              <b-row>
                <!-- User Info: Left col -->
                <b-col
                  cols="12"
                  xl="7"
                  lg="7"
                  md="7"
                  class="d-flex justify-content-between flex-column"
                >
                  <!-- User Avatar & Action Buttons -->
                  <div class="d-flex justify-content-start">
                    <b-avatar size="lg" variant="light-primary" id="tour-card">
                      <feather-icon size="30" icon="HomeIcon" />
                    </b-avatar>
                    <div class="d-flex flex-column ml-1">
                      <div class="mb-1">
                        <h3 class="mb-0">
                          تطبيق صفحات الهبوط
                        </h3>
                        <span class="card-text">
                          <feather-icon icon="LinkIcon" size="13" />
                          لتحليل الصفحات وأداءها وزياراتها بشكل أفضل
                          </span>
                      </div>
                    </div>
                  </div>
                </b-col>

                <!-- Right Col: Table -->
                <b-col
                  cols="12"
                  xl="5"
                  lg="5"
                  md="5"
                >
                  <b-button
                    variant="primary"
                    class="ml-1 float-right"
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
            md="5"
          >
            <b-card>
              <!-- User Stats -->
              <div class="d-flex align-items-center justify-content-around">
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
          <b-col cols="6" xl="3" lg="3" md="4" v-for="template in app.templates" :key="template.id">
            <b-card
              no-body
            >
              <b-card-header>
                <h6>{{handleTemplateName(template.template_name) + ' صفحة '}}</h6>
                  <b-badge :id="'step-template-'+template.id" :href="'https://' + template.domain.name" target="_blank" variant="light-primary">
                    <feather-icon
                      icon="EyeIcon"
                    />
                  </b-badge>
              </b-card-header>
              <b-card-body>
                <b-link :to="getTemplateRoute(template)">
                  <b-img
                    fluid
                    class="mb-2"
                    :src="require('@/assets/images/pages/skeleton400_still.gif')"
                  />
                </b-link>
                <b-card-text>
                  <b-row>
                    <b-col cols="9">
                      <small class="text-muted">{{moment(template.updated_at).locale('ar').startOf('second').fromNow()}}</small>
                    </b-col>
                    <!-- <b-link @click="moreTemplate"><feather-icon class="float-right" icon="MoreVerticalIcon" /></b-link> -->
                    <b-col cols="3">
                      <b-dropdown
                        no-caret
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="link"
                      >
                        <template #button-content>
                          <feather-icon
                            icon="MoreVerticalIcon"
                            size="16"
                            class="text-body align-middle mr-25"
                          />
                        </template>
                        <b-dropdown-item @click="deleteTemplate(template)">
                          <feather-icon icon="TrashIcon" />
                          <span class="align-middle ml-50">حذف</span>
                        </b-dropdown-item>
                        <b-dropdown-item :href="'http://'+template.domain.name+'/'+template.template_name" target="_blank">
                          <feather-icon icon="EyeIcon" />
                          <span class="align-middle ml-50">معاينة</span>
                        </b-dropdown-item>
                      </b-dropdown>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </template>
    </b-overlay>
    <!-- create template modal -->
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
      <validation-observer ref="simpleRules3">
        <b-form @submit.stop.prevent="createTemplate()" class="mt-1 mb-3">
          <b-row>
            <b-col cols="12">
              <b-form-group label="تريد إضافة نطاق خاص بك؟">
                <b-form-radio-group
                  v-model="templateForm.domain.type"
                  :options="DomainOptions"
                  @change="domainTypeChange"
                  class="demo-inline-"
                  name="radio-inline"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12" v-if="templateForm.domain.type == 'custom'">
              <b-form-group
                label="اسم النطاق"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="اسم النطاق"
                  rules="required|domain|domainExist"
                >
                  <b-input-group aria-label="aaa" size="lg" >
                    <b-form-input
                      :state="errors.length > 0 ? false:null"
                      id="largeInput" v-model="templateForm.domain.name" placeholder="مثال: store.com"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12" v-else>
              <b-form-group
                label="اسم النطاق"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="اسم النطاق"
                  rules="required|alphaNumDash|domainExist2"
                >
                  <b-input-group aria-label="aaa" append="//:https" prepend="sfhat.io" size="lg" >
                    <b-form-input
                      :state="errors.length > 0 ? false:null"
                      id="largeInput" v-model="templateForm.domain.name" placeholder="اسم النطاق"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="اسم الصفحة"
                label-for="largeInput"
              >
                <validation-provider
                  #default="{ errors }"
                  name="اسم الصفحة"
                  rules="required|alphaNumDash"
                >
                  <b-input-group aria-label="aaa" size="lg" :append="'/https://'+templateForm.domain.name">
                    <b-form-input
                      :state="errors.length > 0 ? false:null"
                      id="largeInput" v-model="templateForm.template_name" placeholder="اسم الصفحة"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <h1 class="mb-2">اختر الفئة</h1>
          <b-card no-body class="p-1" :class="templateForm.template_code == 'template_one' ? 'popular':''">
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
          </b-card>
          <b-card no-body class="p-1" :class="templateForm.template_code == 'template_two' ? 'popular':''">
            <b-link @click="seletcTemplate('template_two')">
              <b-row @click="seletcTemplate('template_two')" class="d-flex flex-row ">
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
          </b-card>
          <b-card no-body class="p-1" :class="templateForm.template_code == 'template_three' ? 'popular':''">
            <b-link @click="seletcTemplate('template_three')">
              <b-row @click="seletcTemplate('template_three')" class="d-flex flex-row">
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
          </b-card>
          <button class="d-none" type="submit">s</button>
        </b-form>
      </validation-observer>
    </b-modal>

    <app-tour :steps="steps" />
  </div>
</template>

<script>

import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import AppTour from '@core/components/app-tour/AppTour.vue'
import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge
} from 'bootstrap-vue'
import axios from 'axios'
export default {
  components: { ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
    BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
    BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
    BCardHeader, BCardTitle, BCardBody, BBadge, AppTour
  },
  directives: {
    'b-modal': VBModal,
    Ripple
  },
  data(){
    return {
      steps: [],
      DomainOptions: [
        { text: 'نعم', value: 'custom' },
        { text: 'لا', value: 'normal' }
      ],
      templateForm:{
        app: null,
        domain: {
          name: '',
          type: 'normal'
        },
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
        domain: {
          name: '',
          type: 'custom'
        }
      },
      editModalShow: false,
      required,
      url,
      domain,
      alphaNumDash,
      domainExist,
      domainExist2
    }
  },
  created(){
    this.getApp();
    localize('ar');
  },
  mounted(){
    setTimeout(() => {
      if (!localStorage.getItem('first_login')){
        this.$tours.vuexyTour.start()
      }
      localStorage.setItem('first_login', '0')
    }
    , 900);
  },
  methods:{
    handleTemplateName(name){
      if(name){
        if (name.length > 15) {
          return '...' + name.substring(0,11);
        } else {
          return name
        }
      }
    },
    getTemplateRoute(template){
      if(template.main_image == null || template.medals_image == null || 
        template.second_image == null || template.meta_title == '' || 
        template.customer_website == '' || template.primary_color == '' ||
        template.review_text == '' || template.description == ''
        || template.features.length == 0 || template.products.length == 0
        || template.reviews.length == 0){
        return {name: 'templates-setup', params: {id: template.id}}
      }
      else{
        return {name: 'templates', params: {id: template.id}}
      }
    },
    deleteTemplate(template){
      this.$swal({
        title: 'هل أنت متأكد؟',
        text: "لن تتمكن من التراجع عن هذا!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'إلغاء',
        confirmButtonText: 'نعم ، احذفها!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          axios.delete('/templates/'+template.id)
          .then((response) =>{
            this.$swal({
              icon: 'success',
              title: 'تم الحذف!',
              text: 'تم حذف صفحة بنجاح.',
              confirmButtonText: 'حسنا',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            this.getApp();
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
          })
        }
      })
    },
    handleOkAddTemplate(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.$refs.simpleRules3.validate().then(success => {
        if (success) {
          this.createTemplate()
        }
      })
    },
    resetModalAddTemplate(){
      this.templateForm.template_name = ''
      this.templateForm.template_code = 'template_one'
      this.templateForm.domain.name = ''
      this.templateForm.domain.type = 'normal'
    },
    seletcTemplate(template){
      this.templateForm.template_code = template
    },
    createTemplate(){
      this.templateForm.app = this.app.id
      axios.post('templates/create_blank_template', this.templateForm)
      .then(response => {
        if(response.status == 400 || response.status == 500){
          this.$toast({
              component: ToastificationContent,
              props: {
              title: 'إنذار',
              icon: 'AlertCircleIcon',
              text: 'حدث خطأ أثناء إضافة صفحة الهبوط.',
              variant: 'danger',
              },
          })
        } else{
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
        }
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
        this.steps.push(
          {
            target: '#step-template-'+this.app.templates[0].id,
            header: {
              title: 'مرحبًا',
            },
            content: 'انقر هنا للاستمتاع بأول صفحة هبوط.',
          },
        )
        // this.domainForm.name = this.app.domain.name
        // this.domainForm.id = this.app.domain.id
        // this.domainForm.type = this.app.domain.type
        setTimeout(() => {
            this.show = false;
          }
        , 500);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      })
    },
    domainTypeChange(){
      this.templateForm.domain.name = ''
      this.$refs.simpleRules3.reset();
    }
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
  .popular { border: 1px solid #7367f0; }
</style>
<style lang="scss">
@import '@core/scss/vue/libs/tour.scss';
</style>