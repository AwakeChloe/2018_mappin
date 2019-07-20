<template>
  <div class="makePoint">
    <div id="map"></div>
    <div class="search" ref="searchBox">
      <div>
        <img alt="search" src="../../../../static/search.svg">
        <label for="search"></label>
        <input placeholder="搜地点" name="search" id="search" type="text" ref="searchText" v-model="search"/>
        <button @click="startSearch">搜索</button>
      </div>
    </div>
    <div class="makePointButton">
      <button id="makePoint" @click="sendPoint">
        <span>创建标注</span>
        <img id="create" src="../../../../static/create.svg" alt="创建"/>
      </button>
      <button id="geolocation" @click="geolocation">
        <span>当前位置</span>
        <img id="geolocationImg" src="../../../../static/geolocation.svg" alt="定位"/>
      </button>
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
import { mapActions } from 'vuex'

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
      pointId: '',
      search: '',
      searchAC: '',
      searchButton: ''
    }
  },

  mounted () {
    // eslint-disable-next-line no-undef
    this.map = new BMap.Map('map')
    // eslint-disable-next-line no-undef
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
    this.map.enableScrollWheelZoom(true)
    this.changeRoute('makePoint')
    // eslint-disable-next-line no-undef
    this.searchAC = new BMap.Autocomplete({
      'input': this.$refs.searchText,
      'location': this.map,
      'baseDom': this.$refs.searchBox
    })
    // eslint-disable-next-line no-undef
    this.searchButton = new BMap.LocalSearch(this.map, {renderOptions: {map: this.map}})
    this.autoPoint()
  },

  methods: {
    ...mapActions(['changeRoute']),

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

    geolocation () {
      // eslint-disable-next-line no-undef
      let geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((r) => {
        // eslint-disable-next-line no-undef
        let mk = new BMap.Marker(r.point)
        this.map.addOverlay(mk)
        this.map.panTo(r.point)
      }, {enableHighAccuracy: true})
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

    startSearch () {
      this.searchButton.clearResults()
      // 失去焦点收起手机上的键盘
      this.$refs.searchText.blur()
      // 隐藏autocomplete
      this.searchAC.hide()
      this.search = this.$refs.searchText.value
      this.searchButton.search(this.search)
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
    z-index: 10;
    box-shadow: -1px 0 20px 7px rgba(0,0,0,0.16);
    transform:translate(0, -50%);
    border-radius: 15px;
    width: 70px;
  }

  .search {
    width: 90%;
    height: 40px;
    background-color: white;
    border-radius: 15px;
    position: absolute;
    transform:translate(-50%, 0);
    box-shadow: 0 6px 20px 3px rgba(0,0,0,0.16);
    top: 100px;
    left: 50%;
  }

  .search div {
    width: 100%;
    height: 40px;
    border-radius: 15px;
    position: relative;
  }

  .search div button {
    width: 60px;
    height: 40px;
    border-radius: 15px;
    outline: none;
    background-color: rgb(255,179,0);
    position: absolute;
    border: none;
    right: 0;
  }

  input {
    width: 70%;
    padding-left: 5px;
    border: white;
    outline: none;
    border-radius: 15px;
    position: absolute;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  #makePoint, #geolocation {
    height: 70px;
    width: 70px;
    background-color: rgb(255,255,255);
    border: none;
    padding: 0;
    outline: none;
    float: right;
  }

  #makePoint {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  #geolocation {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .search img {
    height: 17px;
    width: 17px;
    position: relative;
    z-index: 11;
    transform: translate(0, -50%);
    top: 50%;
    left: 15px;
  }

  #create {
    height: 32px;
    width: 23px;
    position: relative;
    bottom: 18px;
  }

  #geolocationImg {
    height: 32px;
    width: 32px;
    position: relative;
    bottom: 18px;
  }

  span {
    position: relative;
    top: 40px;
  }

  #map {
    height: 100%;
  }
</style>
