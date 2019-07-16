<template>
  <div class="makePoint">
    <div id="map"></div>
    <div class="makePointButton">
      <button id="makePoint" @click="sendPoint">创建标注</button>
    </div>
    <model @close="close" v-show="hasModel" :lat="point_lat" :lng="point_lng" @makePoint="makePoint"></model>
    <AlertTip :alert-text="alertText" @closeAlert="close" v-show="hasAlert"></AlertTip>
    <pointInfo :pointInfo="pointInfo" v-if="hasPointMessage" @closePointMessage="close" @deletePoint="deletePoint"></pointInfo>
  </div>
</template>

<script>
import Model from '../../../components/model'
import API from '../../../api/api'
import AlertTip from '../../../components/alert_tip'
import PointInfo from '../../../components/PointInfo'

export default {
  name: 'makePoint',

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
      pointId: ''
    }
  },

  mounted () {
    // eslint-disable-next-line no-undef
    this.map = new BMap.Map('map')
    // eslint-disable-next-line no-undef
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    this.map.enableScrollWheelZoom(true)
  },

  methods: {
    close () {
      this.hasModel = false
      this.hasAlert = false
      this.hasPointMessage = false
      this.map.removeEventListener('click', this.showInfo)
    },

    showInfo (e) {
      this.hasModel = true
      this.point_lng = e.point.lng
      this.point_lat = e.point.lat
    },

    sendPoint () {
      if (this.$store.state.hasLogin) {
        this.map.addEventListener('click', this.showInfo)
      } else {
        this.hasAlert = true
        this.alertText = '请先登录'
      }
    },

    makePoint () {
      this.hasModel = false
      this.autoPoint()
      this.map.removeEventListener('click', this.showInfo)
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

  .makePoint {
    height: 100%;
  }

  .makePointButton {
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 999;
    transform:translate(0, -50%);
  }

  #makePoint {
    height: 70px;
    width: 70px;
    border-radius: 15px;
    background-color: gray;
    border: none;
    padding: 0;
    outline: none;
  }

  #map {
    height: 100%;
  }
</style>
