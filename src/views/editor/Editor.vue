<template>
    <div>
        <b-overlay
            :show="loading"
            rounded="sm"
            spinner-variant="primary"
            variant="transparent"
        >
            <b-row>
                <b-col cols="12" md="8" lg="9" xl="9" style="width: 100%;margin 0;padding: 0;padding-left: 10px;">
                    <div id="gjs2">
                    </div>
                </b-col>
                <b-col cols="12" md="4" lg="3" xl="3" style="width: 100%;margin 0;padding: 0;padding-right: 10px;">
                    <b-tabs v-model="tabIndex" fill style="width: 100%;">
                        <b-tab>
                            <template #title>
                                <feather-icon icon="ToolIcon" />
                                <span>التصميم</span>
                            </template>
                            <div id="style-manager" style="width: 100%;height: 90vh; overflow: auto;">
                                <div class="container">
                                    <b-row>
                                        <b-col cols="3">
                                            <b-form-input
                                                id="input-sm"
                                                size="sm"
                                                type="color"
                                                v-model="primary_color"
                                                @input="primaryColorChange"
                                            />
                                        </b-col>
                                        <b-col style="text-align: right;" cols="9">
                                            <label style="font-size: 1rem;">لون الأساسية</label>
                                        </b-col>
                                        <b-col cols="3" class="mt-1">
                                            <b-form-input
                                                id="input-sm"
                                                size="sm"
                                                type="color"
                                                v-model="secondary_color"
                                                @input="secondaryColorChange"
                                            />
                                        </b-col>
                                        <b-col style="text-align: right;" class="mt-1" cols="9">
                                            <label style="font-size: 1rem;">لون ثانوية</label>
                                        </b-col>
                                    </b-row>
                                </div>
                                <div id="selectors-container"></div>
                                <div id="traits-container"></div>
                                <div id="style-manager-container"></div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template #title>
                                <feather-icon icon="GridIcon" />
                                <span>العناصر</span>
                            </template>
                            <div class="pr-2" style="height: 90vh;overflow: auto;">
                                <p style="font-size: 1.5rem;" class="text-center">قم بسحب وإسقاط عنصر لإضافتها</p>
                                <b-input-group class="input-group-merge">
                                    <b-input-group-prepend is-text>
                                        <feather-icon icon="SearchIcon" />
                                    </b-input-group-prepend>
                                    <b-form-input size="sm" v-model="block_query" @keyup="searchBlock" placeholder="Search" />
                                </b-input-group>
                                <div id="blocks"></div>
                            </div>
                        </b-tab>
                        <b-tab>
                            <template #title>
                                <feather-icon icon="LayersIcon" />
                                <span>الأقسام</span>
                            </template>
                            <div class="pr-2">
                                <p style="font-size: 1.5rem;" class="text-center">قم بالسحب والإفلات لإعادة ترتيب العناصر</p>
                                <div id="layers" style="width: 100%;">
                                    <div id="layers-container"></div>
                                    <b-button @click="showSectionModal = true" class="mt-2" variant="primary" size="sm" block>إضافة قسم</b-button>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
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
  
        <!-- modal Scrolling Content inside Modal-->
        <b-modal
            id="modal-scrollable"
            scrollable
            size="xl"
            title="إضافة قسم"
            cancel-title="إلغاء"
            ok-title="ضف"
            cancel-variant="outline-secondary"
            v-model="showSectionModal"
            @ok="handleOkAddSection"
            @hidden="resetAddSection"
        >
            <b-row>
                <b-col cols="2">
                    <b-form-group label="Category">
                        <b-form-checkbox
                            v-for="option in options"
                            :key="option.value"
                            v-model="selected"
                            :value="option.value"
                            name="flavour-3a"
                            class="mt-1"
                        >
                            {{ option.text }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-col>
                <b-col cols="10">
                    <b-row align-v="start" align-h="start">
                        <b-col class="mt-2" cols="4" v-for="section in sections" :key="section.id">
                            <b-link @click="selectSection(section)">
                                <b-overlay :show="section.id == selected_section.id" variant="primary" >
                                    <b-img src="/test.png" fluid alt="Responsive image" />
                                    <template #overlay>
                                        <div class="text-center">
                                            <feather-icon size="50" class="text-white" icon="CheckIcon" />
                                        </div>
                                    </template>
                                </b-overlay>
                            </b-link>
                        </b-col>
  
                        <b-col class="mt-2" cols="4"><b-img src="https://assets.swipepages.com/templates/section/intro-7/image.jpg" fluid alt="Responsive image" /></b-col>
                        <b-col class="mt-2" cols="4"><b-img src="https://assets.swipepages.com/templates/section/intro-1/image.jpg" fluid alt="Responsive image" /></b-col>
                        <b-col class="mt-2" cols="4"><b-img src="https://assets.swipepages.com/templates/section/intro-5/image.jpg" fluid alt="Responsive image" /></b-col>
                        <b-col class="mt-2" cols="4"><b-img src="https://assets.swipepages.com/templates/section/content-18/image.jpg" fluid alt="Responsive image" /></b-col>
                        <b-col class="mt-2" cols="4"><b-img src="https://assets.swipepages.com/templates/section/content-3/image.jpg" fluid alt="Responsive image" /></b-col>
                        <b-col class="mt-2" cols="4"><b-img src="https://assets.swipepages.com/templates/section/content-2/image.jpg" fluid alt="Responsive image" /></b-col>
                        <b-col class="mt-2" cols="4"><b-img src="https://assets.swipepages.com/templates/section/content-15/image.jpg" fluid alt="Responsive image" /></b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-modal>
    </div>
  </template>
  
  <script>
  import 'grapesjs/dist/css/grapes.min.css';
  import grapesjs from 'grapesjs';
  import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
  import exportPlugin from 'grapesjs-plugin-export';
  import gjsForms from 'grapesjs-plugin-forms';
  import gjsBasics from 'grapesjs-blocks-basic';
  import customCodePlugin from 'grapesjs-custom-code';
  
  
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  
  import blocks from './grapesjs/blocks';
  import components from './grapesjs/components';
  import panels from './grapesjs/panels';
  import commands from './grapesjs/commands';
  import config from './grapesjs/config'
  
  import Ripple from 'vue-ripple-directive'
  
  import { BTabs, BTab, BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
  BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
  BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BFormCheckboxGroup, BFormCheckbox, BSpinner } from 'bootstrap-vue'
  import axios from 'axios';
  export default {
    components:{
        ToastificationContent, BTabs, BTab,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
        BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
        BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BFormCheckboxGroup, BFormCheckbox, BSpinner
    },
    directives: {
        'b-modal': VBModal,
        Ripple,
    },
    data(){
        return {
            loading: true,
            template: null,
            editor: null,
            tabIndex: 0,
            block_query: '',
            primary_color: '#B7C226',
            secondary_color: '#FBF4EA',
            selected: ['all'],
            options: [
                { text: 'كل', value: 'all' },
                { text: 'Intro', value: 'intro' },
                { text: 'Content', value: 'content' },
                { text: 'Features', value: 'features' },
            ],
            sections: [],
            sections_categories: [],
            selected_section: {
                id: 0,
                content: ''
            },
            showSectionModal: false,
        }
    },
    beforeDestroy(){
        this.$store.commit('appConfig/UPDATE_SKIN', 'light')
        document.documentElement.setAttribute('dir', 'rtl')
    },
    mounted(){
        this.$store.commit('appConfig/UPDATE_SKIN', 'dark')
        document.documentElement.setAttribute('dir', 'ltr')
        
        this.editor = grapesjs.init(config);
  
        this.editor.Panels.removePanel('devices-c')
        this.editor.Panels.removePanel('views')
        this.editor.Panels.removePanel('options')
        this.editor.Panels.addPanel({
            id: "commands",
        })
  
        panels(this.editor)
        commands(this, axios)
        components(this.editor, this.$route.params.id);
  
        for(let i=0; i<blocks.length; i++){
          this.editor.BlockManager.add(blocks[i].label, blocks[i])
        }
  
        // this.editor.Css.addRules('html {direction: rtl;} :root{--bs-secondary2: #F5D260;--bs-primary: #B7C226}');
        this.editor.on('component:selected', () => {
            this.tabIndex = 0;
        });
        
        this.getTemplate()
        this.getSections()
    },
    methods: {
        getTemplate(){
            axios.get(`/templates/${this.$route.params.id}`)
            .then(response => {
                this.template = response.data
                console.log(response.data);
                if (response.data.project_data == '' || response.data.project_data == null){
                    console.log('ok');
                    // this.editor.setStyle(response.data.css)
                    this.editor.addComponents(response.data.html)
                } else {
                    try{
                        this.editor.loadProjectData(JSON.parse(response.data.project_data))
                    } catch(error){
                        console.log('canot convert project data to json');
                    }
                }
                setTimeout(()=> {this.loading=false}, 2000)
            })
            .catch(error => {
                console.log(error);
            })
        },
        handleOkAddSection(bvModalEvt){
            bvModalEvt.preventDefault()
            if (this.selected_section.id){
                this.editor.addComponents(this.selected_section.content)
                this.showSectionModal = false
                this.resetAddSection()
            }
        },
        resetAddSection(){
            this.selected_section.id = 0
            this.selected_section.content = ''
        },
        selectSection(section){
            this.selected_section.id = section.id
            this.selected_section.content = section.content
        },
        getSections(){
            axios.get("/sections/")
            .then(response => {
                this.sections = response.data
                response.data.forEach(item => {
                    this.sections_categories.push(item.category)
                })
            })
            .catch(error => {
                console.log(error);
            })
        },
        searchBlock(){
            console.log(this.editor.BlockManager.getAll());
            for(let i=0; i<blocks.length; i++){
                this.editor.BlockManager.add(blocks[i].label, blocks[i])
            }
  
            if(this.block_query != ''){
                const blocks = this.editor.BlockManager.getAll();
                const blocks_id = []
                for(let i = 0; i< blocks.length; i++){
                    if(!blocks.models[i].attributes.label.toLowerCase().includes(this.block_query.toString().toLowerCase())){
                        blocks_id.push(blocks.models[i].cid)
                    }
                }
                blocks_id.forEach(id => {
                    this.editor.BlockManager.remove(id)
                })
            }
        },
        primaryColorChange(){
            this.editor.Css.setRule(':root',`--bs-secondary: #F5D260;--bs-secondary2: ${this.secondary_color};--bs-primary: ${this.primary_color}`);
        },
        secondaryColorChange(){
            this.editor.Css.setRule(':root',`--bs-secondary: #F5D260;--bs-secondary2: ${this.secondary_color};--bs-primary: ${this.primary_color}`);
        }
    }
  }
  </script>
  <style>
  .gjs-one-bg {
  background-color: #161d31;
  }
  .gjs-two-color {
  color: #d0d2d6 !important;
  }
  .gjs-editor-cont {
    width: 100% !important;
    height: 100vh !important;
  }
  .gjs-four-color,
  .gjs-four-color-h:hover {
  color: #7367f0 !important;
  }
  
  .gjs-cv-canvas{
    width: 99%;
    
  }
  .gjs-pn-commands{
    height: 47px;
    width: 100%;
  }
  .gjs-pn-options{
    right: 1%;
  }
  
  .gjs-pn-btn.gjs-pn-active {
    background-color: #283046;
    box-shadow: 0 0 3px rgb(0 0 0 / 25%) inset;
  }
  
  
  .fa-desktop {
    content: url('~@/assets/icons/screen.svg');
  }
  .fa-tablet {
    content: url('~@/assets/icons/tablet.svg');
  }
  .fa-mobile {
    content: url('~@/assets/icons/mobile.svg');
  }
  .fa-pen {
  content: url('~@/assets/icons/pen-tool.svg');
  }
  
  .fa-setting {
  content: url('~@/assets/icons/settings.svg');
  }
  
  .fa-layers {
  content: url('~@/assets/icons/layers.svg');
  }
  .fa-add {
  content: url('~@/assets/icons/plus-square.svg');
  }
  .fa-square {
  content: url('~@/assets/icons/square.svg');
  }
  .fa-eye {
  content: url('~@/assets/icons/eye.svg');
  }
  .fa-eye-slash {
  content: url('~@/assets/icons/eye-off.svg') !important;
  }
  .fa-full {
  content: url('~@/assets/icons/maximize.svg');
  }
  .fa-code {
  content: url('~@/assets/icons/code.svg');
  }
  .fa-undo {
  content: url('~@/assets/icons/rotate-ccw.svg');
  }
  .fa-redo {
  content: url('~@/assets/icons/rotate-cw.svg');
  }
  .fa-import {
  content: url('~@/assets/icons/download.svg');
  }
  .fa-clear {
  content: url('~@/assets/icons/trash.svg');
  }
  .fa-save {
  content: url('~@/assets/icons/save-success.svg');
  }
  .fa-arrow-left {
  content: url('~@/assets/icons/arrow-left.svg');
  }
  .fa-arrow-right {
  content: url('~@/assets/icons/arrow-right.svg');
  }
  .fa-plus-circle {
  content: url('~@/assets/icons/plus-circle.svg');
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,.2);
  }
  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,.1);
  }
  </style>
  