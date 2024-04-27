<template>
  <div v-if="error">
    Error NetWork
  </div>
  <div
    v-else-if="loading"
    style="text-align: center;margin-top: 20px;"
  >
    Loading...
  </div>
  <div
    v-else
    class="outer"
  >
    <div class="pc">
      <div class="pc_left">
        <div class="pc_left_top_box">
          <div class="pc_logo">
            <div class="pc_logo_text MonaSans">
              {{ $t('PC.subTitle') }}
            </div>
          </div>
          <div class="flag CalSans">
            {{ $t('PC.title') }}
          </div>
          <div class="flag_des MonaSans">
            {{ $t('PC.description') }}
          </div>
        </div>

        <div class="pc_buttons">
          <a
            class="button"
            :class="{ active: active === 'win' }"
            :href="json.winPath"
          >
            <Window />
            <div class="text">
              <div class="title CalSans">Windows</div>
            </div>
          </a>
          <a
            class="button"
            :class="{ active: active === 'mac' }"
            :href="json.macIntelPath"
          >
            <MAC />
            <div class="text">
              <div class="title CalSans">MacOS</div>
              <div class="msg">{{ $t('PC.forIntelChips') }}</div>
            </div>
          </a>
          <a
            class="button"
            :class="{ active: active === 'mac_m' }"
            :href="json.macPath"
          >
            <MAC />
            <div class="text">
              <div class="title CalSans">MacOS</div>
              <div class="msg">{{ $t('PC.forAppleSilicon') }}</div>
            </div>
          </a>
        </div>
        <div
          class="line_btn_wrap"
          style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap"
        >
          <a class="line_btn" :href="$t('PC.link1')" target="_blank">{{$t('PC.linkText1')}}</a>
          <a class="line_btn" :href="$t('PC.link2')" target="_blank">{{$t('PC.linkText2')}}</a>
          <a class="line_btn" :href="$t('PC.link3')" target="_blank">{{$t('PC.linkText3')}}</a>
          <a class="line_btn" :href="$t('PC.link4')" target="_blank">{{$t('PC.linkText4')}}</a>
        </div>
      </div>
      <div class="pc_right">
        <img
          src="../assets/pcbg.png"
          alt=""
          style="width: 100%"
        />
      </div>
    </div>
    <div class="pc_bottom">
      <p class="pc_bottom_title CalSans">
        {{ $t('PC.titleBottom') }}
      </p>
      <div class="pc_bottom_content">
        <div class="pc_bottom_content_tab">
          <div class="pc_bottom_content_tab_icon">
            <Book />
          </div>
          <div class="pc_bottom_content_tab_label MonaSans">
            {{ $t('PC.subTitleBox1') }}
          </div>
        </div>
        <div class="pc_bottom_content_tab">
          <div class="pc_bottom_content_tab_icon">
            <Grid />
          </div>
          <div class="pc_bottom_content_tab_label MonaSans">
            {{ $t('PC.subTitleBox2') }}
          </div>
        </div>
        <div class="pc_bottom_content_tab">
          <div class="pc_bottom_content_tab_icon">
            <Setting />
          </div>
          <div class="pc_bottom_content_tab_label MonaSans">
            {{ $t('PC.subTitleBox3') }}
          </div>
        </div>
        <div class="pc_bottom_content_img">
          <img
            src="../assets/pc_bottom_img.jpg"
            alt="From Concept to Creation"
            style="width: 100%; border-radius: 10px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, reactive, onMounted } from 'vue'
const { tm } = useI18n()

import Window from '../components/icon/Window.vue'
import MAC from '../components/icon/MAC.vue'
import Book from '../components/icon/Book.vue'
import Grid from '../components/icon/Grid.vue'
import Setting from '../components/icon/Setting.vue'

// import { isMobile, isWin } from '~/utils/custom_utils'

const active = ref<'' | 'win' | 'mac' | 'mac_m'>('')
const json = reactive({
  winPath: '',
  macPath: '',
  macIntelPath: ''
})
const loading = ref(true)
const error = ref(false)
onMounted(() => {
  const { winPath, macPath, macIntelPath } = tm('PC') as any
  json.winPath = winPath
  json.macPath = macPath
  json.macIntelPath = macIntelPath
  loading.value = false

  if(!isMobile()){
    window.location.href=window.location.href.replace('m_software', 'software')
  }
  window.addEventListener('resize', function () {
    if(!isMobile()){
      window.location.href=window.location.href.replace('m_software', 'software')
    }
  })
})

onBeforeMount(() => {
  // const { seo } = tm('PC') as any
  // useSeoMeta({
  //   title: seo?.title,
  //   ogTitle: seo?.title,
  //   keywords: seo?.keywords,
  //   description: seo?.description,
  //   ogDescription: seo?.description
  // })


  if (!isMobile()) {
    const cores = navigator.hardwareConcurrency
    if (isWin()) {
      active.value = 'win'
    } else if (cores >= 8) {
      active.value = 'mac_m'
    } else {
      active.value = 'mac'
    }
  }
})
</script>
<style>
body {
  background: linear-gradient(0deg, rgba(251, 250, 248, 0.9), rgba(251, 250, 248, 0.9)),
    linear-gradient(180deg, #fffcee 3%, #fbf1c9 100%);
}
</style>
<style lang="scss" scoped>
.outer {
  --page-width: 1306px;
  .CalSans {
    font-family: 'Cal Sans';
  }
  .MonaSans {
    font-family: Mona-Sans;
  }
}
.pc {
  max-width: var(--page-width);
  margin: auto;
  padding: 30px;
  display: flex;
  align-items: center;
  position: relative;
  &_logo {
    display: flex;
    align-items: flex-end;
    img {
      width: 54px;
    }
    &_text {
      font-size: 20px;
      //margin-left: 10px;
      font-weight: 300;
      color: #353535;
    }
  }
  &_left {
    flex: 1;
    min-width: 1px;
  }
  &_left_top_box {
    max-width: 543px;
  }
  &_right {
    max-width: 614px;
    font-size: 0;
    padding-top: 100px;
  }
  .flag {
    font-size: 50px;
    font-weight: 600;
    margin-top: 18px;
  }
  .flag_des {
    font-size: 14px;
    font-weight: 400;
    margin-top: 18px;
    color: #333333;
    line-height: 22px;
    //word-break: break-all;
    text-align: justify
  }
  &_buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-bottom: 21px;
    gap: 10px;
    .button {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      color: #000;
      padding: 15px 25px;
      //background: #d9d9d9;
      background: #ffffff;
      border-radius: 8px;
      transition: 0.3s ease-in-out;
      order: 1;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
      .msg {
        font-family: Mona-Sans;
        font-size: 14px;
        font-weight: normal;
        margin-top: 3px;
        color: #969696;
      }
      svg {
        width: 32px;
        height: 32px;
      }
      &.active {
        //box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5) !important;
        //background: linear-gradient(93.17deg, #fce14a 0%, #fbca37 100%) !important;
        //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
        //transform: translateY(-5px) scale(1.02) !important;
        //order: 0 !important;
      }
      &:hover {
        background-color: #FFD605;
        //box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
        //background: linear-gradient(93.17deg, #fce14a 0%, #fbca37 100%);
        //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
        //transform: translateY(-5px) scale(1.02);
      }
    }
  }
  .line_btn {
    font-family: Mona-Sans;
    font-size: 14px;
    color: #0a84ff;
    //margin-top: 21px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.pc_bottom {
  background: #fbd13d;
  width: 100%;
  margin-top: 103px;
  .pc_bottom_title {
    color: #000000;
    text-align: center;
    font-size: 50px;
    font-weight: 600;
    line-height: 60px;
    padding: 99px 20px 36px;
  }
  .pc_bottom_content {
    max-width: var(--page-width);
    margin: auto;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    justify-content: center;
    .pc_bottom_content_tab {
      box-sizing: border-box;
      background-color: #ffffff;
      max-width: 410px;
      height: 160px;
      padding: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      .pc_bottom_content_tab_icon {
      }
      .pc_bottom_content_tab_label {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        color: #000000;
        word-break: break-all;
        text-align: justify;
      }
    }
    .pc_bottom_content_img {
      //padding: 0 30px;
    }
  }
}
//@media (max-width: 1024px) {
//  .pc {
//    flex-direction: column-reverse;
//    gap: 60px;
//    .line_btn_wrap {
//      gap: 10px !important;
//    }
//  }
//}
@media (max-width: 768px) {
  .pc {
    flex-direction: column-reverse;
    gap: 60px;
    padding: 0 20px;
    .line_btn_wrap {
      gap: 10px !important;
    }
  }
}
@media (max-width: 1280px) {
  .pc {
    flex-direction: column-reverse;
    gap: 60px;
    .line_btn_wrap {
      gap: 10px !important;
    }
  }
  .pc_bottom_content {
    padding: 0 30px;
  }
  .pc_bottom_content_tab {
    justify-content: flex-start !important;
    max-width: 100% !important;
    width: 100% !important;
    height: 140px !important;
  }

}

</style>
