<template>
  <section class="m_test">
    <h1>测试专用页</h1>
    <div>
      <input class="c_block" type="text" placeholder="这是一个普通得不能再普通得输入框" autofocus>
    </div>
    <label class="ui-cell">
      <span class="ui-cell-key">在右边输很长的内容</span>
      <input class="ui-cell-value" type="text" placeholder="这是一个用了cell样式的输入框">
    </label>
    <textarea>这是最原始的textarea</textarea>
    <input type="file" accept="image/*" @change="testJavascriptLoadImage">
  </section>
</template>
<script>
  export default {
    methods: {
      testJavascriptLoadImage (ev) {
        let file = ev.target.files[0]
        this.$tools.loadImage.parseMetaData(file, (data) => {
          // console.log(data.exif.getAll())
          console.log(data)
        }, {
          maxMetaDataSize: 200000,
          disableImageHead: false,
          disableExifThumbnail: true
        })
      }
    }
  }
</script>
<style>
  .m_test {
    color: #000;
  }

  .c_block {
    border: 1px solid red;
  }
</style>
