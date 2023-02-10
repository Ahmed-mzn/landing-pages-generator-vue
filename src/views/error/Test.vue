<style>
:root {
  --mp-secondary: #f5d260;
  --mp-secondary-rgb: 245, 210, 96;
  --mp-primary: #b7c226;
  --mp-primary-rgb: 183, 194, 38;
}

@font-face {
  font-family: "HelveticaNeueLT Arabic 55 Roman";
  src: url(~@/assets/fonts/subset-HelveticaNeueLTArabic-Roman.woff2)
      format("woff2"),
    url(~@/assets/fonts/subset-HelveticaNeueLTArabic-Roman.woff) format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.mp-frame {
  position: relative;
  max-width: 285px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  background: url(~@/assets/images/mobile-preview/phone-frame.png);
  background-size: 100%;
  border-radius: 40px;
}

.mp-frame::before {
  content: "";
  position: absolute;
  top: 22px;
  width: 59px;
  height: 17px;
  left: 50%;
  transform: translateX(-50%);
  background: url(~@/assets/images/mobile-preview/phone_bar.jpg);
  background-size: 100%;
  border-radius: 10px;
  z-index: 10;
}

.mp-container {
  font-family: "HelveticaNeueLT Arabic 55 Roman", sans-serif;
  width: 100%;
  overflow-y: scroll;
  background-color: #fff;
  border-radius: 31px;
  height: 550px;
}

.mp-container p,
.mp-container span,
.mp-container h1,
.mp-container h2,
.mp-container h3,
.mp-container h4 {
  text-align: left;
}

.mp-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.swiper-slide.active {
  background-color: transparent !important;
  border: 1px solid #000 !important;
}

#quantity-minus.disabled {
  color: #d4d7b3 !important;
}

/* Center the loader */
.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 120px;
    height: 120px;
    margin: -76px 0 0 -76px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid var(--mp-primary);
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Add animation to "page content" */
.animate-bottom {
    position: relative;
    -webkit-animation-name: animatebottom;
    -webkit-animation-duration: 1s;
    animation-name: animatebottom;
    animation-duration: 1s
}

@-webkit-keyframes animatebottom {
    from { bottom:-100px; opacity:0 }
    to { bottom:0px; opacity:1 }
}

@keyframes animatebottom {
    from{ bottom:-100px; opacity:0 }
    to{ bottom:0; opacity:1 }
}

#myDiv {
    display: none;
    text-align: center;
}
</style>

<template>
    <div class="mp-frame">
        <div class="mp-container" dir="rtl">
            <div class="loader"></div>
            <div style="display: none;"  class="animate-bottom main-preview">
                <section>
                    <div
                    class="container-fluid"
                    style="padding-left: 0px; padding-right: 0px"
                    >
                    <img
                        :src="template.main_image"
                        style="width: 100%"
                    />
                    </div>
                </section>
                <section>
                    <div class="container">
                        <div class="d-flex justify-content-start align-items-end pt-0 mt-1">
                            <div>
                            <span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i
                            ></span>
                            </div>
                            <span class="d-flex text-muted me-1" style="font-size: 12px"
                            >48,120</span
                            >
                        </div>
                        <h2 style="font-size: 30px" class="mb-1">{{template.meta_title}}</h2>
                        <!-- <h3 style="font-size: 16px; color: #333" class="mb-2">
                            بكر ممتاز عصرة اولى
                        </h3> -->
                        <p style="font-size: 16px; color: #333">
                            {{template.description}}
                        </p>
                        <img
                            :src="template.medals_image"
                            style="width: 100%; margin-top: 22px"
                        />
                    </div>
                </section>
                <section class="mt-2">
                    <div class="container">
                        <h3 style="font-size: 16px; font-weight: bold" class="mb-2">العرض</h3>
                        <div
                            id="swiperSlider"
                            class="swiper-container"
                            style="margin-bottom: 57px; overflow: hidden"
                        >
                            <div class="swiper-wrapper" style="cursor: pointer">
                                <div
                                    v-for="(product, index) in template.products" :key="product.id" class="swiper-slide" :class="getDivClass(index)"
                                    @click="selectProduct(product)"
                                    style="
                                        width: 145px;
                                        padding-bottom: 9px;
                                        padding-left: 8px;
                                        padding-right: 8px;
                                        padding-top: 0px;
                                        margin-left: 11px;
                                        background-color: #f2f2f2;
                                        border-radius: 8px;
                                        border-style: solid;
                                        border-color: transparent;
                                    "
                                >
                                    <div
                                        style="
                                            width: 70px;
                                            height: 70px;
                                            border-radius: 10px;
                                            margin-bottom: 10px;
                                            position: relative;
                                            margin-top: 15px;
                                        "
                                    >
                                        <div style="position: absolute; width: 75px; left: -22px">
                                            <img
                                            :src="product.image"
                                            style="width: 100%"
                                            />
                                        </div>
                                    </div>
                                    <h3 style="font-size: 16px">{{product.title}}</h3>
                                    <h4 style="font-size: 12px">3 {{product.description}}</h4>
                                    <template v-if="product.price_after_discount">
                                        <p style="color: #999a9a; text-decoration: line-through">
                                        {{product.price}} ر.س
                                        </p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p
                                                style="
                                                color: #e5423b;
                                                margin-top: 0px;
                                                margin-bottom: 6px;
                                                white-space: nowrap;
                                                "
                                            >
                                                {{product.price_after_discount}} ر.س
                                            </p>
                                            <span
                                                style="
                                                font-size: 9px;
                                                background: #eb6a64;
                                                color: #ffff;
                                                border-radius: 17px;
                                                padding: 3px 7px 3px;
                                                white-space: nowrap;
                                                "
                                                >الاكثر توفيراً</span
                                            >
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p style="color: #999a9a; text-decoration: line-through">
                                        {{product.price}} ر.س
                                        </p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p
                                                style="
                                                color: #e5423b;
                                                margin-top: 0px;
                                                margin-bottom: 6px;
                                                white-space: nowrap;
                                                "
                                            >
                                                {{product.price}} ر.س
                                            </p>
                                            <span
                                                style="
                                                font-size: 9px;
                                                background: #eb6a64;
                                                color: #ffff;
                                                border-radius: 17px;
                                                padding: 3px 7px 3px;
                                                white-space: nowrap;
                                                "
                                                >الاكثر توفيراً</span
                                            >
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <h3 style="font-size: 16px; font-weight: bold">الكمية</h3>
                            <div
                            class="d-flex justify-content-between align-items-center"
                            style="
                                width: 250px;
                                padding: 10px 25px;
                                border-radius: 5px;
                                color: rgb(0, 0, 0);
                                border: 1px solid #f2f2f2;
                            "
                            >
                            <i
                                @click="decreaseQty()"
                                class="fas fa-minus disabled"
                                id="quantity-minus"
                                style="color: var(--mp-primary)"
                            ></i
                            ><span id="quantity-text" style="font-size: 18px">1</span
                            ><i
                                @click="increaseQty()"
                                class="fas fa-plus"
                                id="quantity-plus"
                                style="color: var(--mp-primary)"
                            ></i>
                            </div>
                        </div>
                        <a
                            href="#order_now"
                            @click="success = false"
                            class="btn btn-primary py-1"
                            type="button"
                            style="
                            width: 100%;
                            background: var(--mp-primary) !important;
                            border-style: none;
                            border-radius: 4px;
                            margin-top: 34px;
                            "
                        >
                            اطلبه الآن
                        </a>
                        <div
                            style="
                            border-bottom: 1px solid #f2f2f2;
                            margin-top: 25px;
                            margin-bottom: 15px;
                            "
                        ></div>
                        <h3 style="font-size: 16px; font-weight: bold">
                            حفظ هذا العرض لوقت لاحق
                        </h3>
                        <a
                            class="
                            btn btn-primary
                            d-flex
                            justify-content-center
                            align-items-end
                            "
                            role="button"
                            style="
                            width: 100%;
                            background: #f2f2f2 !important;
                            border-style: none;
                            border-radius: 4px;
                            color: #000 !important;
                            padding-top: 10px;
                            padding-bottom: 16px;
                            "
                            ><i class="fab fa-whatsapp" style="font-size: 20px"></i>&nbsp;<span
                            >ارسله لي عبر الوتس اب<br /></span
                            >&nbsp;</a
                        >
                        <div
                            style="
                            border-bottom: 1px solid #f2f2f2;
                            margin-top: 25px;
                            margin-bottom: 15px;
                            "
                            class="mb-2"
                        ></div>
                    </div>
                </section>
                <section v-if="!success" id="order_now">
                    <div class="container">
                        <div
                            style="
                            box-shadow: 0px 5px 12px #f2f2f2;
                            border: 1px solid #f2f2f2;
                            border-radius: 8px;
                            "
                            class="px-1 pb-1"
                        >
                            <h1 style="font-size: 30px; text-align: center" class="mb-2 mt-1">
                            اطلبه الآن
                            </h1>
                            <form>
                            <div class="mb-1">
                                <input
                                    v-model="form.name"
                                    id="formName"
                                    class="form-control py-1"
                                    type="text"
                                    placeholder="الاسم"
                                    style="background: #f2f2f2; border-style: none"
                                />
                                <div id="formNameError" style="color: var(--mp-primary)" class="invalid-feedback"></div>
                            </div>
                            <div class="mb-1" style="position: relative">
                                <input
                                    v-model="form.phone_number"
                                    id="formPhone"
                                    class="form-control py-1"
                                    type="text"
                                    placeholder="xx xxx xxx"
                                    style="
                                        background: #f2f2f2;
                                        border-style: none;
                                        padding-left: 83px;
                                        direction: ltr;
                                    "
                                />
                                <div
                                    id="formPhoneFlag"
                                    class="d-flex align-items-center"
                                    style="
                                        position: absolute;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        left: 20px;
                                    "
                                >
                                    <span>05&nbsp;&nbsp;</span
                                    ><img
                                        :src="
                                        require('@/assets/images/mobile-preview/saudi-arabia-flag-icon.png')
                                        "
                                        style="width: 20px"
                                    />
                                </div>
                                <div id="formPhoneError" style="color: var(--mp-primary)" class="invalid-feedback"></div>
                            </div>
                            <div class="mb-1" style="position: relative">
                                <select
                                    v-model="form.city"
                                    class="form-select py-1"
                                    style="
                                        padding-right: 12px;
                                        padding-left: 12px;
                                        border-style: none;
                                        background: #f2f2f2;
                                    "
                                >
                                <option v-for="city in template.cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                </select>
                            </div>
                            <div class="mb-1">
                                <input
                                    v-model="form.address"
                                    id="formAddress"
                                    class="form-control py-1"
                                    type="text"
                                    placeholder="العنوان (الحي، الشارع)"
                                    style="background: #f2f2f2; border-style: none"
                                />
                                <div id="formAddressError" style="color: var(--mp-primary)" class="invalid-feedback"></div>
                            </div>
                            <div
                                class="d-flex justify-content-between mt-1"
                                style="color: #343434"
                            >
                                <span>{{form.product_obj.title}}</span><span>x{{form.quantity}}</span>
                            </div>
                            <div
                                class="d-flex justify-content-between mt-1"
                                style="color: #343434"
                            >
                                <span>السعر شامل الضريبة</span><span>{{form.product_obj.price_after_discount ? form.product_obj.price_after_discount : form.product_obj.price}} ر.س</span>
                            </div>
                            <div
                                class="d-flex justify-content-between mt-1"
                                style="color: #343434"
                            >
                                <span>الشحن السريع</span><span>مجاني</span>
                            </div>
                            <div
                                style="
                                border-bottom: 1px solid #f2f2f2;
                                margin-top: 25px;
                                margin-bottom: 15px;
                                "
                                class="mb-0"
                            ></div>
                            <div
                                class="d-flex justify-content-between mt-1"
                                style="color: #343434"
                            >
                                <span style="font-weight: bold">الاجمالي</span
                                ><span style="font-weight: bold">{{form.product_obj.price_after_discount ? form.quantity * form.product_obj.price_after_discount : form.quantity * form.product_obj.price}} ر.س</span>
                            </div>
                            <a
                                @click="submitForm()"
                                class="btn btn-primary py-1 mt-2"
                                role="button"
                                style="
                                width: 100%;
                                background: var(--mp-primary) !important;
                                border-style: none;
                                border-radius: 4px;
                                margin-top: 34px;
                                "
                                >شراء</a
                            >
                            </form>
                        </div>
                    </div>
                </section>
                <section v-else>
                    <div class="container">
                        <div style="box-shadow: 0px 5px 12px #f2f2f2;border: 1px solid #f2f2f2;border-radius: 8px;" class="px-2 pb-3">
                            <!-- <h1 style="font-size: 30px;text-align: center;" class="mb-4 mt-3">اطلبه الآن</h1> -->
                            <div class="text-center p-2">
                                <span class="display-4" style="color: var(--mp-primary);margin-left: 5px;"><i class="fas fa-check-circle"></i></span>
                                <h1 style="font-size: 30px; text-align: center" >شكرا لك</h1>
                                <p style="font-size: 15px; text-align: center">تم استقبال طلبك بنجاح</p>

                                <p style="font-size: 10px; text-align: center">سنقوم بأكيد طلبك عبر الواتس اب</p>
                                <p style="text-align: center;color: var(--mp-primary);">{{this.form.phone_number}}</p>
                            </div>
                            
                            <!-- <a class="btn btn-primary py-3 mt-4" role="button" style="width: 100%;background: var(--mp-primary);border-style: none;border-radius: 4px;margin-top: 34px;">شارك العرض مع صديق</a> -->
                            <a
                            href="#order_now"
                            @click="success = false"
                            class="btn btn-primary py-1"
                            type="button"
                            style="
                                width: 100%;
                                background: var(--mp-primary) !important;
                                border-style: none;
                                border-radius: 4px;
                            "
                            >
                                شارك العرض مع صديق
                            </a>
                        </div>
                    </div>
                </section>
                <section class="mt-3 pb-0" style="padding-bottom: 0px">
                    <div class="container-fluid px-0" style="position: relative">
                        <img
                            style="width: 100%; max-width: 400px"
                            :src="template.second_image"
                        />
                    </div>
                </section>
                <section
                    style="background: #fbf4ea; margin-top: -194px; padding-top: 196px"
                >
                    <div class="container" style="padding-bottom: 38px">
                        <h2 style="font-size: 40px; color: #343434" class="mb-1 mt-3">
                            لماذا صفوة الجوف؟
                        </h2>
                        <!-- <p style="font-size: 16px; color: #343434">
                            لأننا نقدم منتج فاخر وعضوي ١٠٠٪ يعتني بجودة غذائكم وصحتكم.
                        </p> -->
                        <div v-for="feature in template.features" :key="feature.id">
                            <h2 style="font-size: 30px; color: #343434" class="mb-1 mt-1">
                            <i class="fas fa-check" style="color: var(--mp-primary)"></i
                            >{{feature.title}}
                            </h2>
                            <p style="font-size: 16px; color: #343434">{{feature.description}}</p>
                        </div>
                        <a
                            href="#order_now"
                            class="btn btn-primary py-1"
                            type="button"
                            style="
                            width: 100%;
                            background: var(--mp-primary) !important;
                            border-style: none;
                            border-radius: 4px;
                            margin-top: 34px;
                            "
                        >
                            اطلبه الآن
                        </a>
                    </div>
                </section>
                <section class="pt-4">
                    <div class="container">
                        <h1 style="text-align: center; font-size: 30px">{{template.review_text}}</h1>
                        <div class="d-flex justify-content-center align-items-end pt-0 mt-1">
                            <div>
                            <span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i></span
                            ><span style="color: var(--mp-secondary); margin-left: 3px"
                                ><i class="fas fa-star"></i
                            ></span>
                            </div>
                            <span
                            class="d-flex text-muted me-1"
                            style="font-size: 12px; color: #333 !important"
                            >4.8 من 5</span
                            >
                        </div>
                        <div
                            v-for="review in template.reviews" :key="review.id"
                            class="d-flex mt-2 py-2 px-1"
                            style="border-radius: 8px; border: 1px solid #f2f2f2"
                        >
                            <div class="ms-2">
                            <img
                                :src="require('@/assets/images/mobile-preview/avatar.jpg')"
                                style="width: 35px; border-radius: 50%"
                            />
                            </div>
                            <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <span style="font-weight: bold">{{review.username}}</span>
                                    <div v-html="getStars(review)" style="font-size: 10px" class="mt-1 mb-1"></div>
                                </div>
                                <span
                                style="
                                    font-size: 12px;
                                    color: var(--bs-black);
                                    background: var(--mp-secondary);
                                    border-radius: 50px;
                                    padding: 1px 4px;
                                    white-space: nowrap;
                                "
                                ><i class="fas fa-check"></i>&nbsp;قام بالشراء</span
                                >
                            </div>
                            <p class="mb-0">{{review.comment}}</p>
                            </div>
                        </div>
                        <a
                            class="btn btn-primary py-1 mt-2 mb-2"
                            role="button"
                            style="
                            width: 100%;
                            border-radius: 8px;
                            margin-top: 34px;
                            background: transparent !important;
                            color: #000 !important;
                            border-style: solid;
                            border-color: #000;
                            "
                            :href="'https://'+template.customer_website"
                            target="_blank"
                            >للمزيد زر&nbsp;{{template.customer_website}}</a
                        >
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
// require("@/assets/preview/bootstrap/js/bootstrap.min.js");
// require("@/assets/preview/js/app.js");
import axios from "axios";
// import Swiper from "swiper";
export default {
    data() {
        return {
            success: false,
            form: {
                product_obj: {
                    title: "",
                    price: "",
                },
                template: 0,
                product: 0,
                quantity: 1,
                name: "",
                phone_number: "",
                city: "",
                address: "",
            },
            session: {
                template: 0,
                ip_address: "",
                city: "",
                region: "",
                country: "",
                location: "",
                duration: 0,
            },
            template: {
                id: 0,
                template_code: "",
                description: "",
                meta_title: "",
                meta_description: "",
                meta_keywords: "",
                logo: "",
                main_image: "",
                medals_image: "",
                second_image: "",
                review_text: "",
                primary_color: "",
                secondary_color: "",
                products: [],
                features: [],
                reviews: [],
                cities: [],
                created_at: "",
                updated_at: "",
            },
        };
    },
    mounted() {
        console.log('moun');
        this.getTemplate();
        
        setTimeout(()=> {
            let slider = new Swiper("#swiperSlider", {
            grabCursor: true,
            freeMode: true,
            slidesPerView: "auto",
            spaceBetween: 10,
            });

            const slides = document.querySelectorAll(".swiper-slide");

            slides.forEach((slide) => {
                slide.addEventListener("click", function (event) {
                    slides.forEach((slide) => {
                        slide.classList.remove("active");
                    });
                    slide.classList.add("active");
                });
            });

            const quantityText = document.getElementById("quantity-text");

            const quantityPlus = document.getElementById("quantity-plus");

            const quantityMinus = document.getElementById("quantity-minus");
            let counter = 1;
            quantityText.textContent = counter;
            quantityPlus.addEventListener("click", function () {
            counter++;
            quantityText.textContent = counter;
            quantityMinus.classList.remove("disabled");
            });
            quantityMinus.addEventListener("click", function () {
            if (counter > 1) {
                counter--;
                quantityText.textContent = counter;
            }
            if (counter == 1) {
                quantityMinus.classList.add("disabled");
            }
            })

            const loaders = document.querySelectorAll(".loader");
            loaders.forEach((loader) => {
                loader.style.display = "none";
            });

            const mainPreviews = document.querySelectorAll(".main-preview");
            mainPreviews.forEach((item) => {
                item.style.display = "block";
            });

        }, 500);
    },
    methods: {
        getStars(review){
            let star = '<span style="color: var(--mp-secondary); margin-left: 3px"><i class="fas fa-star"></i></span>'
            return star.repeat(review.rating)
        },
        selectProduct(product){
            this.form.product_obj = product;
            this.form.product = product.id;
        },
        decreaseQty(){
            this.form.quantity = this.form.quantity - 1;
        },
        increaseQty(){
            this.form.quantity = this.form.quantity + 1;
        },
        getDivClass(index){
            if(index == 0){
                return "active";
            } else {
                return "";
            }
        },
        getTemplate() {
            axios
                .get("/public/apps/templates/" + this.$route.params.id)
                .then((response) => {
                    this.template = response.data;
                    if(response.data.products.length != 0){
                        this.form.product = this.template.products[0].id;
                        this.form.product_obj = this.template.products[0];
                    }
                    let root = document.documentElement;
                    root.style.setProperty('--mp-primary', this.template.primary_color);
                    root.style.setProperty('--mp-secondary', this.template.secondary_color);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                });
        },
        submitForm(){
            var valid = true;

            if(this.form.name == ''){
                valid = false;
                document.getElementById("formName").style = "background: #f2f2f2;border-color: var(--mp-primary);"
                document.getElementById("formName").classList.add("is-invalid");
                document.getElementById("formNameError").textContent = "يرجى إدخال الاسم";
            } else {
                document.getElementById("formName").style = "background: #f2f2f2;border-style: none;"
                document.getElementById("formName").classList.remove("is-invalid");
                document.getElementById("formNameError").textContent = "";
            }

            let isnum = /^\d+$/.test(this.form.phone_number);
            if(this.form.phone_number == '' || !isnum || this.form.phone_number.length != 8){
                valid = false;
                document.getElementById("formPhone").style = "background: #f2f2f2;border-color: var(--mp-primary);padding-left: 83px;direction: ltr;"
                document.getElementById("formPhone").classList.add("is-invalid");
                document.getElementById("formPhoneError").textContent = "يرجى إدخال رقم جوال صحيح";
                document.getElementById("formPhoneFlag").style = "position: absolute;top: 35%;transform: translateY(-50%);left: 20px;";
            } else {
                document.getElementById("formPhone").style = "background: #f2f2f2;border-style: none;padding-left: 83px;direction: ltr;"
                document.getElementById("formPhone").classList.remove("is-invalid");
                document.getElementById("formPhoneError").textContent = "";
                document.getElementById("formPhoneFlag").style = "position: absolute;top: 50%;transform: translateY(-50%);left: 20px;";
            }

            if(this.form.address == ''){
                valid = false;
                document.getElementById("formAddress").style = "background: #f2f2f2;border-color: var(--mp-primary);"
                document.getElementById("formAddress").classList.add("is-invalid");
                document.getElementById("formAddressError").textContent = "يرجى إدخال العنوان";
            } else {
                document.getElementById("formAddress").style = "background: #f2f2f2;border-style: none;"
                document.getElementById("formAddress").classList.remove("is-invalid");
                document.getElementById("formAddressError").textContent = "";
            }

            if(valid){
                this.success = true;
            }
        },
    },
};
</script>
