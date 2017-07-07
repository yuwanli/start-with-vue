<template>
  <div class="alert">
    <div class="content-wrapper">
      <div class="content-main">
        <h1>{{alertContent.title}}</h1>
        <p v-html="alertContent.desc"></p>
        <div class="btnGroup" ref="group">
          <div class="button" @click="button(item,item.content)" v-for="item in alertContent.button">
            {{item.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props:{
          alertContent:{
              type:Object
          }
        },
        methods: {
          button (o,callback) {
            if (o.type == "close") {
              this.$emit("hideAlert")
            } else if (o.type == "href") {
              window.location.href = o.content
            }else if (o.type == "sign") {
              this.$emit("hideAlert")
              callback()
            } else if(o.type == "goon"){
              this.$emit("hideAlert")
              callback()
            }
          }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .alert{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    z-index: 100;
    background-color: rgba(0,0,0,0.8);
    transition: all 0.5s ease;
    &.fade-enter-active,&.fade-leave-active{
      opacity: 1;
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
    }
    .content-wrapper{
      width: 4.4rem;
      position: absolute;
      padding-top: 0.3rem;
      background-color: #fff;
      left: 1rem;
      top:50%;
      transform: translateY(-50%);
      border-radius: 5px;
      overflow: hidden;
      .content-main{
        h1{
          color: #a00;
          font-size: 0.36rem;
          text-align: center;
          font-weight: bold;
          line-height: 1em;
          margin-bottom: 0.4rem;
        }
        p{
          font-size: 0.28rem;
          color: #000;
          text-align: center;
          padding: 0 0.2rem;
          line-height: 1.5em;
        }
        .btnGroup{
          height: 0.6rem;
          line-height: 0.6rem;
          margin-top: 0.3rem;
          background-color: #051254;
          display: flex;
          color: #fff;
          .button{
            flex: 1;
            text-align: center;
            border-right: 1px solid #fff;
            font-size: 0.3rem;
            text-shadow: 0 0 5px #000;
            &:last-child{
              border-right: none;
            }
          }
        }
      }
    }
  }
</style>
