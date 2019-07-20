<template>
  <div class="watchPoint">
    <div class="head"></div>
    <div id="watchMap"></div>
    <transition name="fade">
      <div class="infoBox" v-for="item in infoBox" :key="item.id">
        <img alt="标题图" :src="item.src">
        <span id="topic">{{item.topic}}</span>
        <span id="content">{{item.content}}</span>
      </div>
    </transition>
    <AlertTip :alert-text="alertText" @closeAlert="close" v-show="hasAlert"></AlertTip>
    <pointInfo :pointInfo="pointInfo" v-if="hasPointMessage" @closePointMessage="close" @deletePoint="deletePoint"></pointInfo>
  </div>
</template>

<script>
import Model from '../../../components/model'
import API from '../../../api/api'
import AlertTip from '../../../components/alert_tip'
import PointInfo from '../../../components/PointInfo'
import { mapActions } from 'vuex'

export default {
  name: 'watchPoint',

  components: {PointInfo, AlertTip, Model},

  data () {
    return {
      map: '',
      hasModel: false,
      point_lng: '',
      point_lat: '',
      hasAlert: '',
      alertText: '',
      hasPointMessage: false,
      pointInfo: '',
      markerName: '',
      pointId: '',
      infoBox: ''
    }
  },

  mounted () {
    // eslint-disable-next-line no-undef
    this.map = new BMap.Map('watchMap')
    // eslint-disable-next-line no-undef
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 5)
    this.map.enableScrollWheelZoom(true)
    this.changeRoute('watchPoint')
    this.autoPoint()
    this.getInfoBox()
  },

  methods: {
    ...mapActions(['changeRoute']),

    close () {
      this.hasModel = false
      this.hasAlert = false
      this.hasPointMessage = false
      this.map.removeEventListener('click', this.showInfo)
    },

    async getInfoBox () {
      this.infoBox = await API.getInfoBox()
      if (this.infoBox.tip) {
        this.hasAlert = true
        this.alertText = this.pointInfo.tip
      } else if (this.infoBox.status) {
        this.hasAlert = true
        this.alertText = this.infoBox.message
      }
    },

    async getOnePoint (markerName) {
      this.pointInfo = await API.getOnePoint(markerName)
      if (this.pointInfo.tip) {
        this.hasAlert = true
        this.alertText = this.pointInfo.tip
      } else if (this.pointInfo.response.message !== '成功') {
        this.hasAlert = true
        this.alertText = this.pointInfo.response.message
      }
      this.hasPointMessage = true
    },

    async deletePoint () {
      let response = await API.deletePoint(this.pointId)
      if (response.tip) {
        this.hasAlert = true
        this.alertText = response.tip
      } else if (response.response.message !== '成功') {
        this.hasAlert = true
        this.alertText = response.response.message
      } else if (response.response.message === '成功') {
        this.map.removeOverlay(this.markerName)
      }
    },

    async autoPoint () {
      let pointPosition = await API.getAllPoint()
      if (pointPosition.tip) {
        this.hasAlert = true
        this.alertText = pointPosition.tip
      } else if (pointPosition.response.message !== '成功') {
        this.hasAlert = true
        this.alertText = pointPosition.response.message
      }
      for (let i = 0; i < pointPosition.data.length; i++) {
        let markerName = pointPosition.data[i]['id']
        // eslint-disable-next-line no-undef
        markerName = new BMap.Marker(new BMap.Point(pointPosition.data[i]['lng'], pointPosition.data[i]['lat']))
        this.map.addOverlay(markerName)
        markerName.addEventListener('click', () => {
          this.getOnePoint(pointPosition.data[i]['id'])
          this.pointId = pointPosition.data[i]['id']
          this.markerName = markerName
        })
      }
    }
  }
}
</script>

<style scoped>
  .watchPoint {
    height: 100%;
    background-color: white;
  }

  .infoBox {
    margin: 10px auto;
    width: 90%;
    height: 123px;
    border-radius: 10px;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.15);
    position: relative;
  }

  .infoBox img {
    position: relative;
    transform: translate(0, -50%);
    top: 50%;
    left: 10px;
  }

  #topic {
    position: absolute;
    left: 120px;
    top: 25px;
  }

  #content {
    position: absolute;
    left: 120px;
    bottom: 25px;
  }

  .head {
    height: 90px;
  }

  #watchMap {
    height: 30%;
    position: fixed;
  }
</style>
