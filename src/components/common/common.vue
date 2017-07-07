<template>
  <div class="common" ref="common">
    <div class="content-wrapper">
      <div class="content-main">
        <h1><span>{{content.name}}</span></h1>
        <div class="con">
          <div v-for="item in content.content">
            <p v-if="item.type == 'text'">{{item.content}}</p>
            <p style="text-indent: 0;text-align: left" v-else-if="item.type == 'head'">{{item.content}}</p>
            <p style="text-indent: 0;text-align: right" v-else-if="item.type == 'name'">{{item.content}}</p>
            <img v-else-if="item.type == 'imgText'" style="margin:  0 0 0 -0.8rem;display: block;max-width: 6.4rem;width: 6.4rem;" :src="item.content" alt="">
            <img v-else-if="item.type == 'img'" :src="item.content" alt="">
          </div>
        </div>
      </div>

    </div>
    <div class="back" style="display: none" @click="back"></div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
          return {
              content:{}
          }
      },
      methods:{
          back () {
              window.history.back()
          },
          _initData (i,s) {
            let _this = this
            _this.content = jsonData[s]['tabs'][i]
          }
      },
      created () {
        let _this = this
        this.$nextTick(function () {
          _this.$refs.common.addEventListener("touchmove",function () {
            _this.$emit("hideFixed")
          })
        })
        this._initData(this.$route.query.id,this.$route.query.target)
        this.$router.afterEach(function (a) {
          if(a.path == "/menu/common"){
            _this._initData(_this.$route.query.id,_this.$route.query.target)
          }
        })
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .common{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    overflow-x: hidden;
    overflow-y: auto;
    .content-wrapper{
      min-height: 100%;
      min-width: 100%;
      .content-main{
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        h1{
          width: 2.79rem;
          height: 0.72rem;
          margin-left: -0.3rem;
          background-image: url(common_title.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          position: relative;
          margin-bottom: 0.4rem;
          color: #00f7ff;
          font-weight: bold;
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
        .con{
          padding: 0 0.8rem;
          font-size: 0.28rem;

          p{
            text-indent: 2em;
            line-height: 1.6em;
            color: #20c3a9;
          }
          img{
            max-width: 100%;
            margin: 0.2rem 0;
          }
        }
      }
    }
    .back{
      width: 1.18rem;
      height: 1.18rem;
      background-image: url(back.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin:-1.6rem 0.8rem 0  auto;
    }
  }
</style>
