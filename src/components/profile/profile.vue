<template>
  <div class="profile" ref="profile">
    <h1><span>{{content.name}}</span></h1>
    <div class="content-wrapper">
      <div class="content-main">
        <ul ref="main">
          <li v-for="(item,index) in content.content">
            <div class="title"  @click="forDesc(index)">{{item.name}}</div>
            <div v-for="desc in item.descs">
              <p v-if="desc.type == 'text'">{{desc.content}}</p>
              <img v-else-if="desc.type == 'img'" :src="desc.content" alt="">
              <div v-else-if="desc.type == 'head'" class="head">
                <i>
                  <img :src="desc.content" alt="">
                </i>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
       data () {
           return {
               content:{}
           }
       },
        methods : {
          _initData (i,t) {
            this.content = jsonData[t]['tabs'][i]
          },
          forDesc (i) {
            if(this.$refs.main.childNodes[i].style.height == 'auto'){
              this.$refs.main.childNodes[i].style.height = "0.76rem"
              this.$refs.main.childNodes[i].childNodes[0].style.color = "#00f7ff"
              this.$refs.main.childNodes[i].childNodes[0].style.left = "0"
              this.$refs.main.childNodes[i].childNodes[0].style.top = "0"
              this.$refs.main.childNodes[i].style.maxHeight = "0.76rem"
            }else{
              this.$refs.main.childNodes[i].childNodes[0].style.color = "#1da5a2"
              this.$refs.main.childNodes[i].childNodes[0].style.left = "0.1rem"
              this.$refs.main.childNodes[i].childNodes[0].style.top = "0.1rem"
              this.$refs.main.childNodes[i].style.height = "auto"
              this.$refs.main.childNodes[i].style.maxHeight = "10rem"
            }
          }
        },
        created () {
           let _this = this
          this._initData(this.$route.query.id,this.$route.query.target)
          this.$router.afterEach(function (a) {
            if(a.path == "/menu/profile"){
              _this._initData(_this.$route.query.id,_this.$route.query.target)
            }
          })

          this.$nextTick(function () {
            _this.$refs.profile.addEventListener("touchstart",function () {
              _this.$emit("hideFixed")
            })
          })
       }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .profile{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    padding-top: 0.8rem;
    padding-bottom: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    h1{
      width: 2.8rem;
      height: 0.72rem;
      margin-left: -0.3rem;
      margin-bottom: 0.2rem;
      background-image: url(profile_title.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      position: relative;
      color: #00f7ff;
      font-weight: bold;
      font-style: italic;
      span{
        height: 0.68rem;
        width: 2rem;
        position: absolute;
        right: 0;
        top:0;
        line-height: 0.68rem;
        text-align: center;
        font-size: 0.36rem;
      }
    }
    .content-wrapper{
      width: 6rem;
      margin: 0 auto;
      background-image: url(profile_bg.png);
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      height: 8.54rem;
      box-sizing: border-box;
      padding: 0.6rem 0.6rem 0.6rem 0.7rem;
      .content-main{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        li{
          height: 0.76rem;
          max-height: 0.76rem;
          margin-bottom: 0.4rem;
          transition: all 0.5s ease;
          overflow: hidden;
          .head{
            height: 3.24rem;
            background-image: url(head_bg.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
            i{
              position: absolute;
              width: 1.55rem;
              padding-top: 1.55rem;
              left: 50%;
              top:0.6rem;
              border-radius: 3px;
              transform: translateX(-46%);
              overflow: hidden;
              border: 1px solid #00f7ff;
              img{
                position: absolute;
                width: 1.55rem;
                left: 0;
                top:50%;
                border: none;
                transform: translateY(-50%);
                border-radius: 3px;
                margin: 0;
              }
            }
          }
          .title{
            height: 0.76rem;
            line-height: 0.76rem;
            background-image: url(profile_name.png);
            background-size: 100% 100%;
            box-sizing: border-box;
            padding: 0 0.2rem;
            font-size: 0.3rem;
            margin-bottom: 0.2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #00f7ff;
            position: relative;
          }
          p{
            line-height:1.5em;
            text-indent: 2em;
            padding: 0 0.05rem;
            color: #23dee4;
          }
          img{
            margin: 0.2rem auto;
            display: block;
            max-width: 100%;
            border: 1px solid #00f7ff;
            box-sizing: border-box;
            border-radius: 8px;
          }
        }

      }
    }
  }
</style>
