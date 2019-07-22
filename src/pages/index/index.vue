<template>
  <div class="app">
    <vtoper class="vtoper"/>
    <transition name="fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import vtoper from '../../components/vtoper'
import API from '../../api/api'
import { mapActions } from 'vuex'
import '../../../static/autoload'
import '../../../static/2dwidget'

export default {
  name: 'index',

  created () {
    this.tokenVerify()
    // eslint-disable-next-line no-undef
    L2Dwidget.init({
      'model': {
        'scale': 0.5
      },
      'display': {
        'position': 'right',
        'width': 180,
        'height': 260,
        'hOffset': 0,
        'vOffset': -20
      },
      'mobile': {
        'show': true,
        'scale': 0.5
      },
      'react': {
        'opacityDefault': 0.7,
        'opacityOnHover': 0.2
      }
    })
  },

  methods: {
    ...mapActions(['login']),

    async tokenVerify () {
      let data = {
        token: window.localStorage['token']
      }
      let userInfo = await API.tokenVerify(data)
      if (userInfo.status === 1) {
        this.login()
        this.$router.push({name: 'makePoint'})
      }
    }
  },

  components: {
    vtoper
  }
}
</script>

<style>
  html, body, .app {
    margin: 0;
    height: 100%;
  }

  .vtoper {
    position: absolute;
    height: 60px;
    z-index: 10;
    top: 10px;
    left: 50%;
    transform:translate(-50%, 0);
    width: 90%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-enter-active {
    transition: all .3s ease;
  }

  .slide-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  #live2d-widget #live2dcanvas {
    border: none;
  }

  #waifu-toggle {
    position: fixed;
    writing-mode: vertical-rl;
    bottom: 66px;
    left: 0px;
    background-color: #fa0;
    color: #fff;
    border-radius: 5px;
    padding: 5px 2px 5px 5px;
    font-size: 12px;
    width: 60px;
    cursor: pointer;
  }
  #waifu {
    position: fixed;
    bottom: -1000px;
    left: 0;
    z-index: 1;
    line-height: 0;
    transition: transform .3s ease-in-out;
    transform: translateY(3px);
  }
  #waifu:hover {
    transform: translateY(0);
  }
  @media (max-width: 768px) {
    #waifu {
      display: none;
    }
  }
  #waifu-tips {
    opacity: 0;
    width: 250px;
    min-height: 70px;
    margin: -30px 20px;
    padding: 5px 10px;
    border: 1px solid rgba(224, 186, 140, 0.62);
    border-radius: 12px;
    background-color: rgba(236, 217, 188, 0.5);
    box-shadow: 0 3px 15px 2px rgba(191, 158, 118, 0.2);
    font-size: 14px;
    line-height: 24px;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    animation: shake 50s ease-in-out 5s infinite;
  }
  #waifu #live2d {
    position: relative;
    cursor: grab;
    cursor: -webkit-grab;
    cursor: -o-grab;
    cursor: -ms-grab;
  }
  #waifu #live2d:active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
    cursor: -o-grabbing;
    cursor: -ms-grabbing;
  }
  #waifu-tool {
    display: none;
    color: #aaa;
    top: 70px;
    right: -10px;
    position: absolute;
    opacity: 0;
    transition: opacity 1s;
  }
  #waifu:hover #waifu-tool {
    opacity: 1;
  }
  #waifu-tool span {
    display: block;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
    color: #5b6c7d;
    transition: color .3s;
  }
  #waifu-tool span:hover {
    color: #0684bd;/* #34495e */
  }
  @keyframes shake {
    2% {
      transform: translate(0.5px, -1.5px) rotate(-0.5deg);
    }
    4% {
      transform: translate(0.5px, 1.5px) rotate(1.5deg);
    }
    6% {
      transform: translate(1.5px, 1.5px) rotate(1.5deg);
    }
    8% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }
    10% {
      transform: translate(0.5px, 2.5px) rotate(0.5deg);
    }
    12% {
      transform: translate(1.5px, 1.5px) rotate(0.5deg);
    }
    14% {
      transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }
    16% {
      transform: translate(-1.5px, -0.5px) rotate(1.5deg);
    }
    18% {
      transform: translate(0.5px, 0.5px) rotate(1.5deg);
    }
    20% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }
    22% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }
    24% {
      transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    }
    26% {
      transform: translate(1.5px, 0.5px) rotate(1.5deg);
    }
    28% {
      transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
    }
    30% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }
    32% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }
    34% {
      transform: translate(2.5px, 2.5px) rotate(-0.5deg);
    }
    36% {
      transform: translate(0.5px, -1.5px) rotate(0.5deg);
    }
    38% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }
    40% {
      transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    }
    42% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }
    44% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    46% {
      transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    }
    48% {
      transform: translate(2.5px, -0.5px) rotate(0.5deg);
    }
    50% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    52% {
      transform: translate(-0.5px, 1.5px) rotate(0.5deg);
    }
    54% {
      transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    }
    56% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }
    58% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }
    60% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }
    62% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }
    64% {
      transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    }
    66% {
      transform: translate(0.5px, 2.5px) rotate(1.5deg);
    }
    68% {
      transform: translate(2.5px, -1.5px) rotate(1.5deg);
    }
    70% {
      transform: translate(2.5px, 2.5px) rotate(0.5deg);
    }
    72% {
      transform: translate(-0.5px, -1.5px) rotate(1.5deg);
    }
    74% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }
    76% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }
    78% {
      transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    }
    80% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }
    82% {
      transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    }
    84% {
      transform: translate(-0.5px, 0.5px) rotate(1.5deg);
    }
    86% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }
    88% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }
    90% {
      transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
    }
    92% {
      transform: translate(-1.5px, -1.5px) rotate(1.5deg);
    }
    94% {
      transform: translate(0.5px, 0.5px) rotate(-0.5deg);
    }
    96% {
      transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    }
    98% {
      transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
    }
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
</style>
