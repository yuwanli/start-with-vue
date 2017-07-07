<template>
  <div class="schools" ref="schools">
    <div class="content-wrapper">
      <h1><span>{{content.name}}</span></h1>
      <div class="map">
        <div class="con" ref="mapBg">
          <div class="item" v-for="(item,index) in content.content" :style="{left:item.left+'%',top:item.top+'%'}">
            <router-link :to="{path:'/menu/school',query:{id:index}}">
              <span>{{item.mapText}}</span>
            </router-link>
          </div>
        </div>

      </div>
      <img src="../../../static/images/logo.png" class="logo" alt="">
      <div class="remark">
        <p v-for="item in content.remark">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods : {
          _initData (i,t) {
            this.content = jsonData[t]['tabs'][i]
          }
        },
        created () {
          let _this = this
          this._initData(this.$route.query.id,this.$route.query.target)
          this.$nextTick(function () {
            _this.$refs.schools.addEventListener("touchmove",function () {
              _this.$emit("hideFixed")
            })
            window.addEventListener("deviceorientation",function (pos) {
              let x = -1.2+1.2*Math.sin(pos.gamma*Math.PI/90/2)
              let y = -0.65+0.65*Math.sin(pos.beta**Math.PI/360/4*0.01)
              _this.$refs.mapBg.style.transform = `translate(${x}rem,${y}rem)`
            })
          })
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .schools{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    z-index: 1;
    overflow-x: hidden;
    background: #030f30;
    text-align: center;
    .content-wrapper{
      padding-top: 1.2rem;
      h1{
        width: 2.79rem;
        height: 0.72rem;
        margin-left: -0.3rem;
        background-image: url(common_title.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        margin-bottom: 0.8rem;
        color: #00f7ff;
        font-style: italic;
        span{
          height: 0.68rem;
          width: 2rem;
          right: 0;
          top:0;
          text-align: center;
          font-size: 0.36rem;
          line-height: 0.68rem;
          position: absolute;
        }
      }
      .logo{
        display: inline-block;
        width: 1.5rem;
        margin-top: 0.4rem;

      }
      .map{
        height: 3.55rem;
        width: 100%;
        position: relative;
        overflow: hidden;
        margin-bottom: 0.2rem;

        .con{
          position: absolute;
          width: 8.8rem;
          height: 4.85rem;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url(map.jpg);
          transform: translate(-1.2rem,-0.65rem);
          .item{
            position: absolute;
            width: 3.11rem;
            height: 0.8rem;
            background-image: url(map_li.png);
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            a{
              color: #00f7ff;
            }
            span{
              display: block;
              height: 0.5rem;
              line-height: 0.5rem;
              text-align: left;
              font-size: 0.2rem;
              box-sizing: border-box;
              padding: 0 0.2rem;
              overflow: hidden;
            }
          }
        }
      }
      .remark{
        padding: 0.4rem 0.8rem;
        p{
          font-size: 0.24rem;
          line-height: 1.5em;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
</style>
