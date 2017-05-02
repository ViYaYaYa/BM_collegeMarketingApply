<template>
  <section class="m_finish">
    <img class="img" src="../assets/finish_logo.png" alt="">
    <h2 class="title">高校公益营销大赛<span class="title-sub">报名表</span></h2>
    <div>
      <h3 class="congrats">恭喜您报名成功！</h3>
      <h3 class="congrats">预祝获得好成绩！</h3>
    </div>
  </section>
</template>
<script>
  export default {}
</script>
<style lang="less" scoped>
  .m_finish {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: url("../assets/bg.png") top no-repeat #5db3ff;
    background-size: cover;
    text-align: center;
    padding-top: 44px;
  }

  .img {
    display: block;
    margin: 0 auto;
    width: 164px;
    max-width: 100%;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    margin: 32px 0 52px;
  }

  .title-sub {
    font-weight: normal;
    font-size: 14px;
    vertical-align: middle;
  }

  .congrats {
    font-weight: bold;
    color: #fff;
    font-size: 20px;
    margin: 0;
  }
</style>
