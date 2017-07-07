<template>
  <div id="app">
    <div class="abs bg"></div>
    <div class="content">
      <ul>
        <li>
          <router-link :to="{path:'/menu',query:{target:'forum'}}" >国际智慧教育 高峰论坛</router-link>
        </li>
        <li>
          <router-link :to="{path:'/menu',query:{target:'classes'}}" >2017第二届两岸智慧 好课堂邀请赛</router-link>
        </li>
      </ul>
      <img src="../static/images/logo1.png" class="abs logo1" alt="">
      <img src="../static/images/logo2.png" class="abs logo2" alt="">
    </div>
    <transition name="fade">
      <div class="abs pageBg" v-if="pageBg"></div>
    </transition>
    <transition name="page">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
        return {
          pageBg : false
        }
    },
    created () {
      let _this = this
      this.$router.afterEach(function (a) {
        if(a.path == "/"){
          _this.pageBg = false
        }else{
          _this.pageBg = true
        }
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
#app {
  position: fixed;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  display: none;
  z-index: 10;
  .bg{
    background-image: url(../static/images/bg.jpg);
  }
  .pageBg{
    background-image: url(../static/images/pageBg.jpg);
    z-index: 20;

    &.fade-enter-active,&.fade-leave-active{
      transition: all 0.4s ease;
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
    }
    &.fade-leave-active{
      z-index: 5;
    }
  }
  &.active{
    display: block;
    .content{
      ul{
        li{
          &:nth-child(1){
            transform: translateX(0);
          }
          &:nth-child(2){
            transform: translateX(0);
          }
        }
      }
      .logo1{
        transform: translateX(-50%) scale(1);
      }
      .logo2{
        transform: translateX(-50%) translateY(0);
      }
    }
  }
  .content{
    position: relative;
    height: 100%;
    z-index: 10;
    ul{
      width: 5rem;
      position: absolute;
      left: 0.8rem;
      bottom: 50%;
      margin-bottom: -0.2rem;
      li{
        height: 1.55rem;
        margin-bottom: 0.5rem;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
        transition: transform 1s ease;
        &:after{
          content: '点击进入报名通道';
          position: absolute;
          width: 100%;
          text-align: center;
          font-size: 10px;
          top: 100%;
          color: #158084;
        }
        a{
          display: block;
          height:100%;
          text-indent: -9999rem;
        }
        &:nth-child(1){
          background-image: url(../static/images/label2.png);
          transform: translateX(-100%);
        }
        &:nth-child(2){
          background-image: url(../static/images/label1.png);
          transform: translateX(100%);
        }
      }
    }
    .logo1{
      width: 1.96rem;
      left: 50%;
      transition: transform 1s ease;
      transform: translateX(-50%) scale(2);
      top:50%;
    }
    .logo2{
      width: 3.77rem;
      left: 50%;
      transition: transform 1s ease;
      transform: translateX(-50%) translateY(100%);
      bottom: 0.3rem;
    }
  }
}
</style>
