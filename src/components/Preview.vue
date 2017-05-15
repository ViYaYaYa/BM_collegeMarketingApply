<template>
  <section class="m_preview" :style="{ 'background-image': store['photoPath'] && 'url(' + ($tools.env === 'development' ? '//tmallapi.bluemoon.com.cn' : $tools.origin) + '/angelUpload/' + store['photoPath'] + ')' }">
    <label class="ui-btn-round upload">更 换<input class="upload-control" type="file" @change="upload" accept="image/*"></label>
  </section>
</template>
<script>
  export default {
    computed: {
      store () {
        return this.$store.state
      }
    },
    methods: {
      upload (ev) {
        this.$indicator.open()
        this.$tools.loadImage(ev.target.files[0], (canvas) => {
          let base64 = canvas.toDataURL()
          this.$tools.api.post('/bluemoon-control/schoolMatch/uploadImg', {
            'imgInfo': base64.substring(22)
          }, {
            '_indicator': true,
            'timeout': 30000
          }).then(res => {
            this.store['photoPath'] = res['path']
            // this.$router.back()
          }).catch(() => {
            ev.target.value = null
          })
        }, {
          canvas: true,
          maxWidth: 500,
          maxHeight: 500,
          orientation: true
        })
      }
    }
  }
</script>
<style lang="less">
  .m_preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #fff;
  }
  .upload {
    text-align: center;
    position: absolute;
    width: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 24px;
    font-size: 12px;
    color: #fff;
    background-image: url("../assets/preview_change.png");
    background-position: 23px;
    background-repeat: no-repeat;
    background-size: 18px;
    padding-left: 28px;
  }

  .upload-control {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>
