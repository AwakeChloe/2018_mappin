<template>
  <div class='fullScream'>
    <div class='model'>
      <div v-show="watcher">
        <div class="topic">{{pointInfo.data.topic}}</div>
        <div class="content">{{pointInfo.data.content}}</div>
      </div>
      <div v-show="watcher === false">
        <div>
          <label for="topic">标题</label>
          <input name="topic" id="topic" type="text" v-model="editTopic"/>
        </div>
        <div>
          <label for="content">内容</label>
          <input name="content" id="content" type="text" v-model="editContent"/>
        </div>
      </div>
      <button v-show="watcher" @click="close">关闭</button>
      <button v-show="watcher" @click="edit">编辑</button>
      <button v-show="watcher === false" @click="sendNewPoint">确定</button>
      <button v-show="watcher === false" @click="changeWatcher">取消</button>
      <button v-show="watcher" @click="deletePoint">删除</button>
    </div>
    <alertTip v-show="hasAlert" :alert-text="alertText" @closeAlert="closeAlert"></alertTip>
  </div>
</template>

<script>
import API from '../api/api'
import alertTip from './alert_tip'

export default {
  name: 'PointInfo',
  components: {alertTip},
  data () {
    return {
      watcher: true,
      editTopic: this.pointInfo.data.topic,
      editContent: this.pointInfo.data.content,
      hasAlert: '',
      alertText: ''
    }
  },

  props: {
    pointInfo: {
      type: Object
    }
  },

  methods: {
    closeAlert () {
      this.hasAlert = false
    },

    close () {
      this.$emit('closePointMessage')
    },

    edit () {
      this.watcher = false
    },

    changeWatcher () {
      this.watcher = true
    },

    deletePoint () {
      this.$emit('deletePoint')
      this.close()
    },

    async sendNewPoint () {
      let data = {
        topic: this.editTopic,
        content: this.editContent
      }
      let response = await API.sendNewPoint(data)
      if (response.tip) {
        this.hasAlert = true
        this.alertText = response.tip
      } else if (response.response.message !== '成功') {
        this.hasAlert = true
        this.alertText = response.response.message
      } else if (response.response.message === '成功') {
        this.$emit('closePointMessage')
      }
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
