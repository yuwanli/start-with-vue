<template>
  <div class="menu" >
    <div class="wrapper" ref="wrapper">
      <ul>
        <li v-for="(tab,index) in tabs">
            <router-link v-if="index==0" :to="{path:tab.href,query:{id:index,target:target}}">{{tab.name}}</router-link>
            <router-link v-else :to="{path:'/menu/'+tab.href,query:{id:index,target:target}}">{{tab.name}}</router-link>
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view  v-on:alertInfo="alertInfo" v-on:hideFixed="hideFixed"></router-view>
    </keep-alive>
    <fixed v-on:toggleFixed="toggleFixed" :target="target" :menu-data="menuData" v-show="ifShow" :active="active"></fixed>
    <transition name="fade">
      <alert :alertContent="alertContent" v-show="alertActive" v-on:hideAlert="hideAlert"></alert>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
    import fixed from '../fixed/fixed'
    import alert from '../alert/alert'
    export default {
      data () {
        return {
          tabs:[],
          target:"",
          active:false,
          ifShow:false,
          alertActive:false,
          alertContent:{
              "title":"提示",
              "desc":"",
              "button":[
                {
                  "text":"确定",
                  "type":"close"
                }
              ]
          },
          menuData:[]
        }
      },
      methods : {
        _initData (s) {
          this.target = this.$route.query.target
          this.tabs = jsonData[s]['tabs']
          this.menuData = jsonData[s]['tabs']
        },
        toggleFixed (){
            this.active = !this.active
        },
        hideFixed () {
          this.active = false
        },
        hideAlert () {
            this.alertActive = false
        },
        alertInfo (s,o) {
          this.alertContent.title='提示'
          this.alertContent.desc=s
          this.alertContent.button = [
            {
              "text":"确定",
              "type":"close"
            }
          ]
          if(typeof s == 'object'){
            this.alertContent.title='提示'
            this.alertContent.desc=s.desc
            this.alertContent.button[0]=s.btn
          }
          if(typeof s != 'object'&&o){
            this.alertContent.button[0].text="取消"
            this.alertContent.button.push(o)
          }else if(o){
            this.alertContent.button.push(o)
          }
          this.alertActive = true
        }
      },
      components : {
        fixed,
        alert
      },
      created () {
        let _this = this
        _this._initData(_this.$route.query.target)
        this.$router.afterEach(function (a) {
          if(a.path == "/menu"){
            _this.$refs.wrapper.style.opacity="1"
            _this._initData(_this.$route.query.target)
            _this.ifShow = false
          }else{
              _this.ifShow = true
            _this.$refs.wrapper.style.opacity="0"
          }
        })
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .menu{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    z-index: 100;
    transition: all 0s linear;
    &.page-enter-active,&.page-leave-active{
      /*transform: translateX(0);*/
      opacity: 1;
    }
    &.page-enter, &.page-leave-active {
      /*transform: translateX(0);*/
      opacity: 0;
    }
    .wrapper{
      transition: opacity 0.4s ease;
      ul{
        position: absolute;
        width: 100%;
        left: 0;
        top:50%;
        transform: translateY(-50%);
        li{
          width: 4.22rem;
          height: 0.91rem;
          background-image: url(menu_li.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          margin-bottom: 0.4rem;
          position: relative;
          transform: translateX(-100%);
          opacity: 0;
          &:nth-child(1){
            animation: menuLi 1s ease forwards;
          }
          &:nth-child(2){
            animation: menuLi 1s 0.2s ease forwards;
          }
          &:nth-child(3){
            animation: menuLi 1s 0.4s ease forwards;
          }
          &:nth-child(4){
            animation: menuLi 1s 0.6s ease forwards;
          }
          &:nth-child(5){
            animation: menuLi 1s 0.8s ease forwards;
          }
          &:nth-child(6){
            animation: menuLi 1s 1s ease forwards;
          }
          a{
            position: absolute;
            width: 2rem;
            height: 0.6rem;
            top:0.05rem;
            right: 0;
            text-align: center;
            line-height: 0.6rem;
            color: #00f7ff;
            font-weight: bold;
            font-style: italic;
            letter-spacing: 2px;
            font-size: 0.36rem;
          }
          &:last-child{
            margin-bottom: 0;
          }
        }
      }

    }

  }
  @keyframes menuLi {
    0%{
      transform: translateX(-100%);
      opacity: 0;
    }
    100%{
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
