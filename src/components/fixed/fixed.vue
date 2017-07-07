<template>
  <div class="fixed" :class="{active:active}">
    <div class="con" @click="toggleFixed"><i></i></div>
    <div class="content-wrapper">
      <ul>
        <li v-for="(item,index) in menuData">
          <router-link v-if="index==0" :to="{path:'/'}">
            {{item.name}}
          </router-link>
          <router-link v-else :to="{path:'/menu/'+item.href,query:{id:index,target:target}}">
            {{item.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props:{
          menuData:{
              type:Array
          },
          active:{
              type:Boolean
          },
          target:{
              type:String
          }
        },
        methods : {
          toggleFixed () {
            this.$emit('toggleFixed')
          }
        },
        created () {
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .fixed{
    position: fixed;
    width: 0;
    right: 0;
    top:0;
    max-height: 100%;
    z-index: 100;
    transition: all 0.4s ease;
    &.active{
      width: 2.5rem;
      z-index: 100;
      .con{
        i{
          background-size: 0.36rem auto;
          background-image: url(fixed_close.png);
        }
      }
      .content-wrapper{
        transform: translateX(0);
      }

    }
    .con{
      width: 1.9rem;
      height: 1.9rem;
      position: absolute;
      background-color: #fff;
      border-radius: 50%;
      right: -0.95rem;
      top:-0.95rem;
      z-index: 100;
      i{
        position: absolute;
        width: 0.36rem;
        height: 0.36rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.31rem auto;
        background-image: url(fixed_open.png);
        left: 0.4rem;
        bottom: 0.4rem;
      }
    }
    .content-wrapper{
      background-color: #030f30;
      width: 100%;
      z-index: 10;
      box-sizing: border-box;
      padding: 1.4rem 0 0.7rem;
      box-shadow:  0 0 10px #00f7ff;
      border-bottom-left-radius: 5px;
      transform: translateX(100%);
      transition: transform 0.4s ease;
      li{
        width: 2.04rem;
        height: 0.72rem;
        margin: 0 auto 0.5rem;
        text-align: center;
        background-image: url(fixed_li.png);
        background-size: 100% 100%;
        line-height: 0.72rem;
        font-size: 0.3rem;
        background-repeat: no-repeat;
        background-position: center;
        a{
          color: #00f7ff;
          font-weight: bold;
          font-style: italic;
          display: block;
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
    }

  }
</style>
