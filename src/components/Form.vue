<template>
  <section class="m_form">
    <header class="m_header">
      <img class="logo" src="../assets/form_logo.png" alt="">
      <h2 class="slogan">精品洗涤缔造精致生活</h2>
    </header>
    <section class="ui-card m_pages">
      <page1 class="page"></page1>
      <button class="ui-btn">下一步</button>
    </section>
  </section>
</template>

<script>
  import Page1 from '@/components/Page1.vue'
  export default {
    components: { Page1 }
  }
</script>

<style scoped lang="less">
  .m_form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: center no-repeat #5db3ff;
    padding: 12px;
    padding-top: 84px;
    overflow-y: auto;
  }

  .m_header {
    color: #fff;
    text-align: center;
    position: absolute;
    top: 16px;
    left: 0;
    width: 100%;
    .logo {
      width: 72px;
    }
    .slogan {
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
    }
  }
  
  .m_pages {
    min-height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0;
    padding-bottom: 50px;
    .page {
      height: 100%;
    }
    .ui-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      color: #fff;
    }
  }
</style>
