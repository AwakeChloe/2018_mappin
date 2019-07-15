<template>
  <div class="fullScream">
    <div class="model">
      <div class="modelContain">
        <div>
          <label for="topic">标题:</label>
          <input name="topic" id="topic" type="text" v-model="topic"/>
        </div>
        <div>
          <label for="content">内容:</label>
          <input name="content" id="content" type="text" v-model="content"/>
        </div>
        <input type="file" @change="selectImgs()" multiple accept="image/*" ref="file">
      </div>
      <div class="modelFoot">
        <button @click="confirm">确认</button>
        <button @click="close">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/api'

export default {
  name: 'model',

  props: {
    lat: '',
    lng: ''
  },

  data () {
    return {
      topic: '',
      content: '',
      hasAlert: false,
      alertText: '',
      info: ''
    }
  },

  methods: {
    selectImgs () {
      let reader = new FileReader()
      let AllowImgFileSize = 2100000 // 上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
      let file = this.$refs.file.files
      if (file) {
        // 将文件以Data URL形式读入页面
        let imgUrlBase64 = reader.readAsDataURL(file)
        console.log(imgUrlBase64)
        reader.onload = function (e) {
          // var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
          if (AllowImgFileSize !== 0 && AllowImgFileSize < reader.result.length) {
            alert('上传失败，请上传不大于2M的图片！')
          } else {
            // 执行上传操作
            alert(reader.result)
          }
        }
      }
    },

    close () {
      this.$emit('close')
    },

    async confirm () {
      let data = {
        topic: this.topic,
        content: this.content,
        lat: this.lat,
        lng: this.lng
      }
      let info = await API.sendPoint(data)
      if (info.tip) {
        this.hasAlert = true
        this.alertText = info.tip
      } else if (info.data.response.message !== '成功') {
        this.hasAlert = true
        this.alertText = info.data.response.message
      }
      this.$emit('makePoint')
    }
  }
}
</script>

<style scoped>
  .fullScream {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .model {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30%;
    height: 40%;
    transform:translate(-50%, -50%);
    background-color: white;
  }
</style>
