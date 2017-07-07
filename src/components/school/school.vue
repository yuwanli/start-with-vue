<template>
  <div class="school" ref="school">
    <div class="content-wrapper">
      <div class="content-main">
        <div class="title">{{content.name}}</div>
        <div class="detailCon">
          <ul ref="detail">
            <li v-for="(item,index) in content.desc" :class="{selected:item.selected,notAble:getAble(item)}" @click.prevent="forDetail(index)">
              <div class="base">
                <div class="con">
                  <h1>{{item.name}}</h1>
                  <p>时间:{{item.date}} {{item.time[0]}}-{{item.time[1]}}</p>
                </div>
                <div class="select" @click.stop="toggleSelected(index)"></div>
              </div>
              <div class="detail">
                <div v-for="desc in item.content">
                  <p v-if="desc.type == 'text'">{{desc.content}}</p>
                  <img v-else-if="desc.type == 'img'" :src="desc.content" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="btnGroup">
          <div class="button" @click="back">返回</div>
          <div class="button">
            <router-link to="/menu/sign?target=classes">
              报名
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    export default {
      data () {
        return {
            id:0,
            content : {}
        }
      },
      methods : {
        back () {
          window.history.back()
        },
        _initData (i) {
          let _this = this
          _this.id = i
          _this.content = jsonData['classes']['tabs'][5]['content'][i]
        },
        combineStr (d,t){
          return d+" "+t
        },
        getTimeByStr (s) {
            return new Date(s).getTime()
        },
        getAble (item) {
          let s = this.getTimeByStr(this.combineStr(item.date,item.time[0]))
          let e = this.getTimeByStr(this.combineStr(item.date,item.time[1]))
          for(let i = 0;i<jsonData['classes'].selectedClass.length;i++){
              if(
                (s>=jsonData['classes'].selectedClass[i][0]&&s<jsonData['classes'].selectedClass[i][1])||
                (e>jsonData['classes'].selectedClass[i][0]&&e<=jsonData['classes'].selectedClass[i][1])
              ){
                  return true
              }
          }
          return false
        },
        removeArr (s,e) {
          for(let i = 0;i<jsonData['classes'].selectedClass.length;i++){
              if(jsonData['classes'].selectedClass[i][0]==s&&jsonData['classes'].selectedClass[i][1]==e){
                jsonData['classes'].selectedClass.splice(i,1)
                return;
              }
          }
        },
        toggleSelected (i) {

          if(!this.content.desc[i]['selected']){
            if(this.getAble(this.content.desc[i])){
              return
            }
            Vue.set(this.content.desc[i],"selected",true)
            jsonData['classes'].selectedClass.push(
                [
                    this.getTimeByStr(this.combineStr(this.content.desc[i]['date'],this.content.desc[i]["time"][0])),
                  this.getTimeByStr(this.combineStr(this.content.desc[i]['date'],this.content.desc[i]["time"][1]))
                ]
            )
          }else{
            this.content.desc[i]['selected'] = !this.content.desc[i]['selected']
            if(this.content.desc[i]['selected']){
              if(this.getAble(this.content.desc[i])){
                return
              }
              jsonData['classes'].selectedClass.push(
                [
                  this.getTimeByStr(this.combineStr(this.content.desc[i]['date'],this.content.desc[i]["time"][0])),
                  this.getTimeByStr(this.combineStr(this.content.desc[i]['date'],this.content.desc[i]["time"][1]))
                ]
              )
            }else{
                this.removeArr(
                  this.getTimeByStr(this.combineStr(this.content.desc[i]['date'],this.content.desc[i]["time"][0])),
                  this.getTimeByStr(this.combineStr(this.content.desc[i]['date'],this.content.desc[i]["time"][1]))
                )
            }
          }
        },
        forDetail (i) {
          let s = this.$refs.detail.childNodes[i].style
          if(s.height == "auto"){
            s.height = '1.1rem'
            s.maxHeight = '1.1rem'
          }else{
            s.height = 'auto'
            s.maxHeight = '10rem'
          }
        }
      },
      created () {
        let _this = this
        this.$nextTick(function () {
          _this.$refs.school.addEventListener("touchstart",function () {
            _this.$emit("hideFixed")
          })
        })
        this._initData(this.$route.query.id)
        this.$router.afterEach(function (a) {
          if(a.path == "/menu/school"){
            _this._initData(_this.$route.query.id)
          }
        })
        this.$router.beforeEach(function (to,from,next) {
          if(from.path=='/menu/school'){
              window.localStorage.setItem("zhxy_selected",JSON.stringify(jsonData['classes'].selectedClass))
              window.localStorage.setItem("zhxy_schools",JSON.stringify(jsonData['classes']['tabs'][5]['content']))
          }
          next()
        })
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .school{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 0.6rem;
    box-sizing: border-box;
    .content-wrapper{
      min-height: 100%;
      .content-main{
        padding-bottom: 0.6rem;
        .title{
          width: 4.9rem;
          height: 1rem;
          background-image: url(school_name.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin-left: 0.4rem;
          box-sizing: border-box;
          padding: 0 0.1rem 0 0.25rem;
          line-height: 0.64rem;
          font-size: 0.24rem;
          font-weight: bold;
          overflow: hidden;
          margin-bottom: -0.1rem;
          color: #00f7ff;
        }
        .detailCon{
          width: 5.98rem;
          height: 7.76rem;
          margin: 0 auto;
          background-image: url(school_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          box-sizing: border-box;
          padding: 0.6rem 0.7rem 0.6rem 0.6rem;
          ul{
            display: block;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            li{
              height: 1.1rem;
              overflow: hidden;
              max-height: 1.1rem;
              transition: all 0.4s ease;
              &.selected{
                .base{
                  color: #6f6f6f;
                  .select{
                    border: 1px solid #23dee4;
                    &:after{
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      left: 0;
                      top:0;
                      content: " ";
                      background-image: url(selected.png);
                      background-position: center;
                      background-repeat: no-repeat;
                      background-size: 0.49rem auto;
                    }
                  }
                }
              }
              &.notAble{
                color: #6f6f6f;
                .base{
                  .con{
                    h1{
                      color: #6f6f6f;
                    }
                    p{
                      color: #6f6f6f;
                    }
                  }
                  .select{
                    border: 1px solid #6f6f6f;
                  }
                }
              }
              .base{
                height: 1.1rem;
                box-sizing: border-box;
                padding: 0.2rem 0;
                position: relative;
                border-bottom: 1px dotted rgba(0,247,255,0.5);
                .con{
                  margin-right: 0.65rem;
                  h1{
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 0.28rem;
                    line-height: 1em;
                    margin-bottom: 0.2rem;
                    color: #00f7ff;
                  }
                  p{
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-size: 0.22rem;
                    line-height: 1em;
                    color: #20c3a9;
                  }
                }
                .select{
                  position: absolute;
                  width: 0.5rem;
                  height: 0.5rem;
                  border: 1px solid #23dee4;
                  right: 0;
                  top:0.25rem;

                }
              }
              .detail{
                /*border-bottom: 1px dotted #fff;*/
                /*padding-bottom: 0.5rem;*/
                p{
                  font-size: 0.22rem;
                  line-height: 1.5em;
                  text-indent: 2em;
                  color: #279396;
                }
                img{
                  max-width: 100%;
                  margin: 0.2rem 0;
                  border: 1px solid #00f7ff;
                  box-sizing: border-box;
                  border-radius: 8px;
                }
              }
            }
          }
        }
      }
      .btnGroup{
        width: 100%;
        left: 0;
        text-align: center;
        margin-top: 0.2rem;
        .button{
          width: 1.6rem;
          height: 0.6rem;
          text-align: center;
          line-height: 0.6rem;
          margin: 0 0.5rem;
          background-color: #030f33;
          display: inline-block;
          font-size: 0.36rem;
          box-shadow: 0 0 10px #287be6;
          color: #23dee4;
          a{
            color: #23dee4;
          }
        }
      }
    }
  }
</style>
