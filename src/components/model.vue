<template>
  <transition name="fade">
    <div class="fullScream">
      <div class="model">
        <div class="modelCenter">
          <div>
            <label for="topic">名称</label>
            <input name="topic" id="topic" type="text" v-model="topic"/>
          </div>
          <hr/>
          <div>
            <label for="content"></label>
            <textarea placeholder="输入文字..." name="content" id="content" type="text" v-model="content"></textarea>
          </div>
          <div class="selectImg">
            <img alt="选择图片" src="../../static/selectImg.png">
            <input type="file" @change="selectImg()" multiple accept="image/*" ref="file">
          </div>
          <div class="previewImg">
            <div v-for="(file) in files" :key="file.id">
              <img :src="file.src" alt="预览图">
            </div>
          </div>
        </div>
        <div align="center" class="modelFoot">
          <button class="confirm" @click="confirm">确认</button>
          <button class="close" @click="close">关闭</button>
        </div>
      </div>
      <alertTip v-show="hasAlert" :alert-text="alertText" @closeAlert="closeAlert"></alertTip>
    </div>
  </transition>
</template>

<script>
import API from '../api/api'
import alertTip from './alert_tip'

export default {
  name: 'model',

  components: {alertTip},

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
      info: '',
      files: [], // 文件缓存
      index: 0, // 序列号
      maxLength: 9, // 图片最大数量
      maxSize: 10240000 // 图片限制为10M内
    }
  },

  methods: {
    selectImg () {
      let fileList = this.$refs.file.files
      if (fileList.length > 9) {
        this.hasAlert = true
        this.alertText = '最多同时上传9张图片'
        return 0
      }
      for (let i = 0, len = fileList.length; i < len; i++) {
        let fileItem = {
          id: this.index++,
          name: fileList[i].name,
          size: fileList[i].size,
          file: fileList[i]
        }
        // 将图片文件转成Base64
        let reader = new FileReader()
        reader.onloadend = e => {
          this.getBase64(e.target.result).then(url => {
            this.$set(fileItem, 'src', url)
          })
        }
        if (fileItem.size > this.maxSize) {
          this.hasAlert = true
          this.alertText = '文件大小不能超过10MB'
        } else {
          reader.readAsDataURL(fileList[i])
          this.files.push(fileItem)
        }
      }
      this.files.splice(9)
    },

    getBase64 (url) {
      let Img = new Image()
      let dataURL = ''
      Img.src = url
      let p = new Promise(function (resolve, reject) {
        Img.onload = function () {
          // 要先确保图片完整获取到，这是个异步事件
          let canvas = document.createElement('canvas') // 创建canvas元素
          let width = Img.width // 确保canvas的尺寸和图片一样
          let height = Img.height
          // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
          let ratio = width / height
          let maxLength = 100
          let newHeight = height
          let newWidth = width
          // 在长宽超过最大长度时，按图片长宽比例等比缩小
          if (width > maxLength || height > maxLength) {
            if (width > height) {
              newWidth = maxLength
              newHeight = maxLength / ratio
            } else {
              newWidth = maxLength * ratio
              newHeight = maxLength
            }
          }
          canvas.width = newWidth
          canvas.height = newHeight
          canvas.getContext('2d').drawImage(Img, 0, 0, newWidth, newHeight) // 将图片绘制到canvas中
          dataURL = canvas.toDataURL('image/jpeg', 0.5) // 转换图片为dataURL
          resolve(dataURL)
        }
      })
      return p
    },

    close () {
      this.$emit('close')
      this.files = []
    },

    closeAlert () {
      this.hasAlert = false
    },

    async confirm () {
      let data = {
        topic: this.topic,
        content: this.content,
        lat: this.lat,
        lng: this.lng,
        url: this.files.src
      }
      let info = await API.sendPoint(data)
      if (info.tip) {
        this.hasAlert = true
        this.alertText = info.tip
      } else if (info.data.response.message !== '成功') {
        this.hasAlert = true
        this.alertText = info.data.response.message
      } else if (info.data.response.message === '成功') {
        this.files = []
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
    z-index: 11;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .selectImg {
    width: 80px;
    height: 80px;
    position: relative;
  }

  .selectImg img {
    width: 80px;
    height: 80px;
  }

  .selectImg input {
    width: 80px;
    height: 80px;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
  }

  .previewImg div{
    height: 33%;
    width: 33%;
    display: inline-block;
  }

  .previewImg div img {
    border-radius: 15px;
  }

  .modelCenter {
    width: 90%;
    height: 85%;
    margin: 0 auto;
  }

  input, textarea {
    width: 75%;
    outline: none;
    border: none;
  }

  #topic {
    margin-top: 10px;
    height: 40px;
  }

  #content {
    height: 100px;
    width: 100%;
  }

  .close {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: none;
    margin: 10px;
    outline: none;
  }

  .confirm {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: none;
    margin: 10px;
    outline: none;
    background-color: rgb(255,179,0);
  }

  .model {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
  }
</style>
