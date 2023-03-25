<template>
    <div>
      <b-overlay
            :show="loading"
            rounded="sm"
            spinner-variant="primary"
            variant="transparent"
        >
          <div id="gjs">
          </div>
        </b-overlay>
    </div>
</template>

<script>
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import exportPlugin from 'grapesjs-plugin-export';
import gjsForms from 'grapesjs-plugin-forms';
import gjsBasics from 'grapesjs-blocks-basic';


import panels from '../editor/grapesjs/panels'
import blocks from '../editor/grapesjs/blocks'
import components from '../editor/grapesjs/components'
import config from '../editor/grapesjs/config'

import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab,
    BFormInput, BFormGroup, BForm, BFormTextarea, BOverlay
} from 'bootstrap-vue'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios';
export default {
    components: {
        ToastificationContent,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab,
        BFormInput, BFormGroup, BForm, BFormTextarea, BOverlay
    },
    data(){
        return {
            editor: null,
            loading: false,
            htmlData: `
              <h1 style="color: var(--bs-secondary)">Hello World Component!</h1><button class="btn btn-primary">test</button>
              <div data-gjs-type="stars" data-gjs-number="3"></div>
            `
        }
    },
    mounted(){
        document.documentElement.setAttribute('dir', 'ltr')
        this.editor = grapesjs.init({
            container : '#gjs',
            fromElement: true,
            height: '100%',
            storageManager: false,
            selectorManager:{
              componentFirst: true,
            },
            plugins: [grapesjsPresetWebpage, exportPlugin, gjsForms, gjsBasics],
            pluginsOpts: {
              [grapesjsPresetWebpage]: {
                blocks: [],
                modalImportTitle: 'Import Template',
                modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                modalImportContent: function(editor) {
                  return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
                },
              },
              [gjsForms]: {
                blocks: []
              },
              [gjsBasics]: {
                blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'image', 'video', 'map']
              },
            },
            canvas: {
              styles: [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css'
              ],
              scripts: [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js',
                "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
                "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
                "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js",
                "http://sfhat.io/ProductsForm.js",
                "http://sfhat.io/ProductsForm2.js",
              ],
            }
        });


        // panels
        this.editor.Panels.removePanel('devices-c')
        this.editor.Panels.removePanel('views')
        this.editor.Panels.removePanel('options')
        panels(this.editor)

        components(this.editor, this.$route.params.id);

        this.editor.Commands.add('save-in-db', {
            run: editor => {
                editor.store();
                console.log(this.editor.getCss());
                // this.editor.setStyle(':root{--bs-secondary: #c725c2;--bs-primary: #31dbc6} html {direction: rtl;}');
                // this.editor.Css.setRule(':root','--bs-secondary: #c725c2;--bs-primary: #31dbc6');
                console.log(this.editor.getCss());
                const data = {
                    html: this.editor.getHtml(),
                    css: this.editor.getCss(),
                    js: this.editor.getJs()
                }
                axios.post(`/templates/${this.$route.params.id}/save_html/`, data)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                })
                this.loading = true
                setTimeout(()=> {this.loading=false}, 1000)
            }
        });

        // this.editor.Components.addType('stars', components.stars);
        // this.editor.Blocks.add('stars', {
        //   label: 'Stars',
        //   category: 'Basic',
        //   attributes: { class: 'fa fa-star' },
        //   content: { type: 'stars' },
        // });

        // this.editor.Components.addType('productsForm', components.products);
        // this.editor.Blocks.add('productsForm', {
        //   label: 'productsForm',
        //   category: 'Forms',
        //   attributes: { class: 'fa fa-user' },
        //   content: { type: 'productsForm' },
        // });

        // this.editor.Blocks.add('productsForm2', {
        //   label: 'productsForm2',
        //   category: 'Forms',
        //   attributes: { class: 'fa fa-home' },
        //   content: { type: 'productsForm2' },
        // });
        
        for(let i=0; i<blocks.length; i++){
          this.editor.BlockManager.add(blocks[i].label, blocks[i])
        }
        // this.editor.BlockManager.add('Input', blocks.input)
        // this.editor.BlockManager.add('Textarea', blocks.textarea)
        // this.editor.BlockManager.add('Select', blocks.select)
        // this.editor.BlockManager.add('Link', blocks.link)
        // this.editor.BlockManager.add('Button', blocks.button)

        // this.editor.setStyle('html {direction: rtl;}')
        // this.editor.addStyle(':root{--bs-secondary: #F5D260;--bs-primary: #B7C226}');
        this.editor.Css.addRules('html {direction: rtl;} :root{--bs-secondary: #F5D260;--bs-primary: #B7C226}');

        // init editor
        this.editor.addComponents(`
        <section>
        <div class="container-fluid" style="padding-left: 0px;padding-right: 0px;"><img src="https://landing.socialbot.dev/static/assets/img/hero.png" style="width: 100%;"></div>
    </section>
    <section>
        <div class="container">
            <div class="d-flex justify-content-start align-items-end pt-0 mt-2">
                <stars data-gjs-type="stars" data-gjs-number="5"></stars><span class="d-flex text-muted me-1" style="font-size: 12px;">48,120</span>
            </div>
            <h2 style="font-size: 30px;" class="mb-3">زيت زيتون صفوة الجوف</h2>
            <h3 style="font-size: 16px;color: #333;" class="mb-2">بكر ممتاز عصرة اولى</h3>
            <p style="font-size: 16px;color: #333;" class="mb-2">زيت زيتون صفوة الجوف، بمثابة الذهب الخالص، انتقيناه من أفضل محاصيلنا مزارعنا بالجوف، حيث يتم إنتاج زيت زيتون بكرة عضوي ١٠٠٪؜ عصرة أولى على البارد.</p><img src="https://landing.socialbot.dev/static/assets/img/Rectangle%201249.png" style="width: 100%;margin-top: 22px;">
        </div>
    </section>
    <section class="mt-4">
        <div class="container">
            <h3 style="font-size: 16px;font-weight: bold;" class="mb-4">العرض</h3>
            <div id="swiperSlider-1" class="swiper-container" style="margin-bottom: 57px;overflow: hidden;">
                <div class="swiper-wrapper" style="cursor: pointer;">
                    <div class="swiper-slide active" style="width: 145px;padding-bottom: 9px;padding-left: 8px;padding-right: 8px;padding-top: 0px;margin-left: 11px;background-color: #f2f2f2;border-radius: 8px;border-style: solid;border-color: transparent;">
                        <div style="width: 70px;height: 70px;background: #fff;border-radius: 10px;margin-bottom: 10px;position: relative;margin-top: 15px;">
                            <div style="position: absolute;width: 75px;left: -22px;"><img src="https://landing.socialbot.dev/static/assets/img/Image%2017.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 26px;top: -10px;">4 لتر<br></span></div>
                            <div style="position: absolute;width: 75px;left: 16px;"><img src="https://landing.socialbot.dev/static/assets/img/Image%2017.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 26px;top: -10px;">4 لتر<br></span></div>
                            <div style="position: absolute;width: 75px;left: 1px;top: 10px;"><img src="https://landing.socialbot.dev/static/assets/img/Image%2017.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 26px;top: -5px;">4 لتر<br></span></div>
                        </div>
                        <h3 style="font-size: 16px;">عرض الـ 4 لتر</h3>
                        <h4 style="font-size: 12px;">3 عبوات بإجمالي 12 لتر</h4>
                        <p style="color: #999A9A;text-decoration: line-through;">720 ر.س</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p style="color: #E5423B;margin-top: 0px;margin-bottom: 6px;white-space: nowrap;">480 ر.س</p><span style="font-size: 9px;background: #EB6A64;color: #ffff;border-radius: 17px;padding: 3px 7px 3px;white-space: nowrap;">الاكثر توفيراً</span>
                        </div>
                    </div>
                    <div class="swiper-slide" style="width: 145px;padding-bottom: 9px;padding-left: 8px;padding-right: 8px;padding-top: 0px;margin-left: 11px;background-color: #f2f2f2;border-radius: 8px;border: 1px solid transparent;">
                        <div style="width: 70px;height: 70px;background: #fff;border-radius: 10px;margin-bottom: 10px;position: relative;margin-top: 15px;margin-right: 10px;">
                            <div style="position: absolute;width: 85px;left: -30px;top: -15px;"><img src="https://landing.socialbot.dev/static/assets/img/Image%2015.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 33px;top: 5px;">2 لتر<br></span></div>
                            <div style="position: absolute;width: 85px;left: 16px;top: -15px;"><img src="https://landing.socialbot.dev/static/assets/img/Image%2015.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 34px;top: 5px;">2 لتر<br></span></div>
                            <div style="position: absolute;width: 85px;left: -7px;top: 10px;"><img src="https://landing.socialbot.dev/static/assets/img/Image%2015.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 33px;top: 5px;">2 لتر<br></span></div>
                        </div>
                        <h3 style="font-size: 16px;">عرض الـ 2 لتر</h3>
                        <h4 style="font-size: 12px;">3 عبوات بإجمالي 6 لتر</h4>
                        <p style="color: #999A9A;text-decoration: line-through;">450 ر.س</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p style="color: #E5423B;margin-top: 0px;margin-bottom: 6px;white-space: nowrap;">300 ر.س</p>
                        </div>
                    </div>
                    <div class="swiper-slide" style="width: 145px;padding-bottom: 9px;padding-left: 8px;padding-right: 8px;padding-top: 0px;margin-left: 11px;background-color: #f2f2f2;border-radius: 8px;border: 1px solid transparent;">
                        <div style="width: 70px;height: 70px;background: #fff;border-radius: 10px;margin-bottom: 10px;position: relative;margin-top: 15px;">
                            <div style="position: absolute;width: 50px;left: -13px;"><img src="https://landing.socialbot.dev/static/assets/img/1L-emoty.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 17px;top: -10px;">1 لتر<br></span></div>
                            <div style="position: absolute;width: 50px;left: 29px;"><img src="https://landing.socialbot.dev/static/assets/img/1L-emoty.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 17px;top: -10px;">1 لتر<br></span></div>
                            <div style="position: absolute;width: 50px;left: 10px;top: 10px;"><img src="https://landing.socialbot.dev/static/assets/img/1L-emoty.png" style="width: 100%;"><span style="position: absolute;font-size: 7px;color: #343434;background: #F5D260;border-radius: 3px;padding: 0px 5px;left: 15px;top: -5px;">1 لتر<br></span></div>
                        </div>
                        <h3 style="font-size: 16px;">عرض الـ 1 لتر</h3>
                        <h4 style="font-size: 12px;">3 عبوات بإجمالي 3 لتر</h4>
                        <p style="color: #999A9A;text-decoration: line-through;">234 ر.س</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p style="color: #E5423B;margin-top: 0px;margin-bottom: 6px;white-space: nowrap;">156 ر.س</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <h3 style="font-size: 16px;font-weight: bold;">الكمية</h3>
                <div class="d-flex justify-content-between align-items-center" style="width: 250px;padding: 10px 25px;border-radius: 5px;color: rgb(0,0,0);border: 1px solid #F2F2F2;"><i class="fas fa-minus disabled" id="quantity-minus-1" style="color: var(--bs-primary);"></i><span id="quantity-text-1" style="font-size: 18px;">1</span><i class="fas fa-plus" id="quantity-plus-1" style="color: var(--bs-primary);"></i></div>
            </div>
            <div style="border-bottom: 1px solid #F2F2F2;margin-top: 25px;margin-bottom: 15px;" class="mb-4"></div>
        </div>
    </section>
    <section>
        <div class="container">
            <div style="box-shadow: 0px 5px 12px #f2f2f2;border: 1px solid #f2f2f2;border-radius: 8px;" class="px-2 pb-3">
                <h1 style="font-size: 30px;text-align: center;" class="mb-4 mt-3">اطلبه الآن</h1>
                <form>
                    <div class="mb-2"><input class="form-control py-2" type="text" placeholder="الاسم" style="background: #f2f2f2;border-style: none;"></div>
                    <div class="mb-2" style="position: relative;"><input class="form-control py-2" type="text" placeholder="xx xxx xxx" style="background: #f2f2f2;border-style: none;padding-left: 83px;direction: ltr;">
                        <div class="d-flex align-items-center" style="position: absolute;top: 50%;transform: translateY(-50%);left: 20px;"><span>05&nbsp;&nbsp;</span><img src="https://landing.socialbot.dev/static/assets/img/saudi-arabia-flag-icon.png" style="width: 20px;"></div>
                    </div>
                    <div class="mb-2" style="position: relative;"><select class="form-select py-2" style="padding-right: 12px;padding-left: 34px;border-style: none;background: #f2f2f2;">
                            <option value="1">جدة</option>
                            <option value="2">مكة</option>
                            <option value="3">الرياض</option>
                        </select><i class="fas fa-chevron-down" style="position: absolute;top: 50%;transform: translateY(-50%);left: 20px;"></i></div>
                    <div class="d-flex justify-content-between mt-3" style="color: #343434;"><span>عرض الـ 4 لتر</span><span>x1</span></div>
                    <div class="d-flex justify-content-between mt-2" style="color: #343434;"><span>السعر شامل الضريبة</span><span>100 ر.س</span></div>
                    <div class="d-flex justify-content-between mt-2" style="color: #343434;"><span>الشحن السريع</span><span>مجاني</span></div>
                    <div style="border-bottom: 1px solid #F2F2F2;margin-top: 25px;margin-bottom: 15px;" class="mb-0"></div>
                    <div class="d-flex justify-content-between mt-2" style="color: #343434;"><span style="font-weight: bold;">الاجمالي</span><span style="font-weight: bold;">100 ر.س</span></div><a class="btn btn-primary mt-4 py-2" role="button" style="width: 100%;background: var(--bs-primary);border-style: none;border-radius: 4px;margin-top: 34px;">شراء</a>
                </form>
            </div>
        </div>
    </section>
        <section class="mt-5 pb-0" style="padding-bottom: 0px;">
        <div class="container-fluid px-0" style="position: relative;"><img style="width: 100%;max-width: 400px;" src="https://landing.socialbot.dev/static/assets/img/olivia.webp"><img src="https://landing.socialbot.dev/static/assets/img/Logo%20(Black%20Name).png" style="width: 80px;position: absolute;top: 20px;left: 20px;"></div>
    </section>
    <section style="background: #FBF4EA;margin-top: -194px;padding-top: 196px;">
        <div class="container" style="padding-bottom: 38px;">
            <h2 style="font-size: 40px;color: #343434;" class="mb-3 mt-5">لماذا صفوة الجوف؟</h2>
            <p style="font-size: 16px;color: #343434;">لأننا نقدم منتج فاخر وعضوي ١٠٠٪ يعتني بجودة غذائكم وصحتكم.</p>
            <div>
                <h2 style="font-size: 30px;color: #343434;" class="mb-3 mt-4"><i class="fas fa-check" style="color: var(--bs-primary);"></i>&nbsp;جودة المحاصيل</h2>
                <p style="font-size: 16px;color: #343434;">في مزرعتنا أكثر من ٨٠٠,٠٠٠ شجرة زيتون ُتنتج أفضل محصول سنوياً، ومع ذلك نقوم بجرد المحصول لاستبعاد حبات الزيتون المعيبة لضمان أفضل زيت وقت العصر.</p>
            </div>
            <div>
                <h2 style="font-size: 30px;color: #343434;" class="mb-3 mt-3"><i class="fas fa-check" style="color: var(--bs-primary);"></i>&nbsp;حموضة أقل</h2>
                <p style="font-size: 16px;color: #343434;">انخفاض حموضة الزيت دليل على جودته ونفخر في صفوة الجوف بأن زيتنا يملك أقل نسبة حموضة في المنطقة بنسبة تصل إلى 0,3</p>
            </div>
            <div>
                <h2 style="font-size: 30px;color: #343434;" class="mb-3 mt-3"><i class="fas fa-check" style="color: var(--bs-primary);"></i>&nbsp;طعم مميز</h2>
                <p style="font-size: 16px;color: #343434;">زيت صفوة الجوف إضافة شهية لأطباقك تنقل نكهتها لمرحلة مختلفة من اللذة، بفضل طعمه الممتاز الخالي من المرارة.</p>
            </div><button class="btn btn-primary py-2" type="button" style="width: 100%;background: var(--bs-primary);border-style: none;border-radius: 4px;margin-top: 34px;">اطلبه الآن</button>
        </div>
    </section>
    <section class="pt-4">
        <div class="container">
            <h1 style="text-align: center;font-size: 30px;"><span style="font-weight: bold;font-family: sans-serif;">+200,000</span>&nbsp;عميل<br>يثقون بصفوة الجوف</h1>
            <div class="d-flex justify-content-center align-items-end pt-0 mt-3">
                <div><stars data-gjs-type="stars" data-gjs-number="5"></div><span class="d-flex text-muted me-1" style="font-size: 12px;color: #333!important;">4.8 من 5</span>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">عبدالله الذياب</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;" class="py-1 px-3 nowrap"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">أفضل وأروع منتج</p>
                </div>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">إسماعيل حسين</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span class="py-1 px-3 nowrap" style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">زيت عصرة أولى ماعليه كلام</p>
                </div>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">Hozaifa Alsafwa</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span class="py-1 px-3 nowrap" style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">زيت زيتون عضوي خورافييييي - طعم ولا اروع في الأكل والسلطات بالذات مع سطلة الفيتا واو واو واو - اشتري وانت مغمض</p>
                </div>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">عباد القثامي</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span class="py-1 px-3 nowrap" style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">عباد القثامي</p>
                </div>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">وعد الحربي</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span class="py-1 px-3 nowrap" style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">افضل زيت زيتون جربته 👌🏻❤️</p>
                </div>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">أم ريثان وجيانا غزاوي</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span class="py-1 px-3 nowrap" style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">ممتاز وفاااخر ولذييييذ جدا استمتعت فيه انا وآسرتي❤️شكرا صفوة الجوف ❤️❤️الله يبارك لكم في رزقكم كل ما اخلصتو في العمل</p>
                </div>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">رائد الشريف</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span class="py-1 px-3 nowrap" style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">زيت اصلي واسعار مناسبة</p>
                </div>
            </div>
            <div class="d-flex mt-4 py-4 px-2" style="border-radius: 8px;border: 1px solid #f2f2f2;">
                <div class="ms-2"><img src="https://landing.socialbot.dev/static/assets/img/avatar.jpg" style="width: 40px;border-radius: 50%;"></div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div><span style="font-weight: bold;">ضيف الله الازوري</span>
                            <div class="mt-1 mb-1 nowrap" style="font-size: 12px;"><stars data-gjs-type="stars" data-gjs-number="5"></div>
                        </div><span class="py-1 px-3 nowrap" style="font-size: 12px;color: var(--bs-black);background: var(--bs-secondary);border-radius: 50px;"><i class="fas fa-check"></i>&nbsp;قام بالشراء</span>
                    </div>
                    <p class="mt-2 mb-0">ممتاز وتشكرون على تعاملكم</p>
                </div>
            </div><a class="btn btn-primary py-2 my-3 mb-2" role="button" style="width: 100%;border-radius: 8px;margin-top: 34px;background: transparent;color: #000;border-style: solid;border-color: #000;" href="https://safwat-aljawf.com">للمزيد زر&nbsp;Safwat-aljawf.com</a>
        </div>
    </section>
        `)
        
    },
    methods: {
    }
}
</script>

<style lang="scss">
// $primaryColor: #444;
// $secondaryColor: #ddd;
// $tertiaryColor: #804f7b;
// $quaternaryColor: #4469ee;

// @import "grapesjs/src/styles/scss/main.scss";

/* Reset some default styling */
.gjs-editor-cont{
    width: 100% !important;
    height: 100vh !important;
}

/* We can remove the border we've set at the beginnig */
#gjs {
  border: none;
}
/* Theming */

/* Primary color for the background */
.gjs-one-bg {
  background-color: #090446;
}


/* Secondary color for the text color */
.gjs-two-color {
  color: #f1f1f1 !important;
}

/* Tertiary color for the background */
.gjs-three-bg {
  background-color: #8e87e1;
  color: rgb(255, 255, 255);
}

.gjs-off-prv{
  background-color: #090446;
}

/* Quaternary color for the text color */
.gjs-four-color,
.gjs-four-color-h:hover {
  color: #8e87e1;
}


.gjs-btn-import {
  margin-top: 10px;
}

.gjs-pn-options{
  margin-right: 10px;
}

.gjs-pn-commands{
  height: 47px;
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
</style>
