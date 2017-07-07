<template>
  <div class="sign" ref="sign">
    <div class="content-wrapper">
      <div class="content-main">
        <div class="con">
          <div class="box">
            <form action="">
              <div class="controls">
                <div class="label">姓名</div>
                <input type="text" placeholder="请填写您的姓名" name="data[name]" v-model="formData['data[name]']">
              </div>
              <div class="controls">
                <div class="label">性别</div>
                <div class="radioGroup">
                  <input class="boy" type="radio" name="data[sex]" value="男" v-model="formData['data[sex]']">
                  <input class="girl" type="radio" name="data[sex]" value="女" v-model="formData['data[sex]']">
                </div>

              </div>
              <div class="controls">
                <div class="label">手机号</div>
                <input type="number" placeholder="请填写您的手机号" name="data[mobile]" v-model="formData['data[mobile]']">
              </div>
              <div class="controls">
                <div class="label">工作单位</div>
                <input type="text" placeholder="请填写您的工作单位" name="data[position]" v-model="formData['data[position]']">
              </div>
              <!--<div class="controls">-->
                <!--<div class="label">住宿要求</div>-->
                <!--<input type="text" placeholder="请填写您的住宿要求" name="data[field_1]" v-model="formData['data[field_1]']">-->
              <!--</div>-->
              <div class="controls">
                <div class="label">发票抬头</div>
                <input type="text" placeholder="请填写您的发票抬头" name="data[field_2]" v-model="formData['data[field_2]']">
              </div>
              <div class="controls">
                <div class="label">邮寄地址</div>
                <input type="text" placeholder="请填写您的邮寄地址" name="data[field_3]" v-model="formData['data[field_3]']">
              </div>
              <input style="display: none" type="text" disabled name="data[field_4]" v-model="formData['data[field_4]']">
              <div class="controls">
                <span style="font-size: 0.2rem">是否报名参加国际教育高峰论坛</span>
                <input type="checkbox" class="ifsign" name="data[field_5]" v-model="formData['data[field_5]']">
              </div>
            </form>
            <div class="selectedClass">
              <div class="title">已选课程</div>
              <ul v-if="content.length>0">
                <li v-for="item in content">
                  <h1>{{item.schoolName}} <span>{{item.detail}}</span></h1>
                </li>
              </ul>
              <p v-else>未选任何课程</p>
            </div>
          </div>
        </div>
        <div class="btnGroup">
          <div class="button" @click="back">返回</div>
          <div class="button" @click="submitData">
            支付
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        actId:0,
        content: [],
        target:'',
        formData: {
          "id":"",
          'data[name]': "",
          'data[sex]': "",
          'data[mobile]': '',
          'data[position]': '',
          'data[field_2]': '',
          'data[field_3]': '',
          'data[field_4]': '',
          'data[field_5]': false,
        }
      }
    },
    watch : {
      formData : {
          handler : function () {
            let _this = this
            try {
              window.localStorage.setItem('zhxy_user',JSON.stringify(_this.formData))
            }catch (e){
                console.log(e)
            }

          },
          deep:true
      }
    },
    methods: {
      back () {
        window.history.back()
      },
      _initData () {
        this.content = []
        this.target = this.$route.query.target
        this.actId = jsonData[this.target]["activityId"]
        this.formData.id = jsonData[this.target]["activityId"]
        if(this.target=="forum"){
            this.formData['data[field_5]'] = true
        }
        let str = '';
        for (let i = 0; i < jsonData['classes']['tabs'][5]['content'].length; i++) {
          let school_name = jsonData['classes']['tabs'][5]['content'][i].name
          for (let j = 0; j < jsonData['classes']['tabs'][5]['content'][i]['desc'].length; j++) {
            if (jsonData['classes']['tabs'][5]['content'][i]['desc'][j].selected) {
              let o = {
                "schoolName": school_name,
                "detail": jsonData['classes']['tabs'][5]['content'][i]['desc'][j].date + " " + jsonData['classes']['tabs'][5]['content'][i]['desc'][j].name + " " + jsonData['classes']['tabs'][5]['content'][i]['desc'][j]['time'][0] + '-' + jsonData['classes']['tabs'][5]['content'][i]['desc'][j]['time'][1]
              }
              str += `${school_name} ${jsonData['classes']['tabs'][5]['content'][i]['desc'][j].date} ${jsonData['classes']['tabs'][5]['content'][i]['desc'][j].name} ${jsonData['classes']['tabs'][5]['content'][i]['desc'][j]['time'][0]}-${jsonData['classes']['tabs'][5]['content'][i]['desc'][j]['time'][1]}////`
              this.formData['data[field_4]'] = str
              this.content.push(o)
            }
          }
        }
      },
      verifyTel (tel) {
        let regex = /^(?:13\d|15\d|17\d|18[0123456789])-?\d{5}(\d{3}|\*{3})$/;
        if(regex.test(tel)){
          return true;
        }else{
          return false;
        }
      },
      validateData () {
        let _this = this
        for (let i in this.formData) {
          if (!this.formData[i]) {
            switch (i) {
              case 'data[name]':
                _this.$emit('alertInfo',"请选择您的姓名")
                return false
                break;
              case 'data[sex]':
                _this.$emit('alertInfo',"请选择您的性别")
                return false
                break;
              case 'data[mobile]':
                _this.$emit('alertInfo',"请输入您的手机号")
                return false
                break;
              case 'data[position]':
                _this.$emit('alertInfo',"请输入您的工作单位")
                return false
                break;
              case 'data[field_2]':
                _this.$emit('alertInfo',"请输入您的发票抬头")
                return false
                break;
              case 'data[field_3]':
                _this.$emit('alertInfo',"请输入您的邮寄地址")
                return false
                break;
            }
          }
        }
        if(this.verifyTel(this.formData['data[mobile]'])){
          return true
        }else{
            _this.$emit('alertInfo',"请输入正确的手机号")
            return false
        }
        return true
      },
      ajaxData () {
        if(!this.validateData()){
            return
        }
        let formData = new FormData()
        let _this = this
        for (let i in this.formData) {
          formData.append(i, this.formData[i])
        }
        this.$http.post('http://vip.zjqq.mobi/index.php/sign/submit/'+_this.actId, formData).then(response => {
          console.log(response)
          let result = response.data

          if(result.result=="success") {
            if(result.pay.status==200){
              _this.$emit('alertInfo',result.pay.oid+'支付金额：'+result.pay.money+'元。',{
                "text":"去支付",
                "type":"href",
                "content":result.pay.url
              })
            }else if(result.pay.status==201){
              _this.$emit('alertInfo',"名额满啦！")
            }else{
              _this.$emit('alertInfo',result.result)
            }
          }else{
            _this.$emit('alertInfo',result.result)
          }
        });
      },
      submitData () {
        let _this = this
        if(!this.formData['data[field_5]']&&this.content.length==0){
          this.$emit('alertInfo',"至少选择一项进行报名")
          return
        }
        if(this.content.length==0){
          this.$emit('alertInfo',
            {
              "desc":"您只选择参加论坛，是否继续？若同时参加好课堂，点击返回进行选课",
              "btn":{
                "text":"返回",
                "type":"sign",
                "content":function () {
                  _this.$router.replace("/menu/schools?id=5&target=classes")
                }
              }
            },{
            "text":"继续",
            "type":"goon",
            "content":function () {
              _this.ajaxData()
            }
          })
        }else if(!this.formData['data[field_5]']){
          this.$emit('alertInfo','您未报名参加论坛，是否继续？若参加论坛，点击返回进行勾选',{
            "text":"继续",
            "type":"goon",
            "content":function () {
              _this.ajaxData()
            }
          })
        }else{
          _this.ajaxData()
        }
      }
    },
    created () {
      let _this = this
      this.$nextTick(function () {
        _this.$refs.sign.addEventListener("touchstart", function () {
          _this.$emit("hideFixed")
        })
      })
      if(window.localStorage.getItem('zhxy_user')){
        _this.formData = JSON.parse(window.localStorage.getItem('zhxy_user'))
      }
      this._initData()
      this.$router.afterEach(function (a) {
        if (a.path == "/menu/sign") {
          _this._initData()
        }
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .sign {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 0.6rem;
    box-sizing: border-box;
    .content-wrapper {
      min-height: 100%;
      .content-main {
        padding-bottom: 0.6rem;
        .con {
          width: 5.98rem;
          height: 8.86rem;
          background-image: url(sign_bg.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          margin: 0 auto;
          box-sizing: border-box;
          padding: 0.6rem 0.7rem 0.6rem 0.6rem;
          .box {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            .controls {
              height: 0.65rem;
              width: 100%;
              line-height: 0.65rem;
              display: flex;
              margin-bottom: 0.25rem;
              font-size: 0.28rem;
              &:last-child {
                margin-bottom: 0;
              }
              .label {
                flex: 0 0 1.35rem;
                background-color: #23dee4;
                text-align: center;
                text-shadow: 0 0 3px #000;
              }
              input {
                flex: 1;
                text-indent: 0.2rem;
                color: #000;
                border-radius: 0;
                &.ifsign{
                  appearance: none;
                  width: 0.65rem;
                  flex: 0 0 0.65rem;
                  height: 0.65rem;
                  background-color: #fff;
                  margin: 0 0.2rem;
                  position: relative;
                  color: #000;
                  &:checked {
                    background-image: url(choose.png);
                    background-size: 0.4rem auto;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }
              }
              .radioGroup {
                flex: 1;
                text-align: center;
                font-size: 0;
                input {
                  appearance: none;
                  width: 1rem;
                  height: 0.65rem;
                  background-color: #fff;
                  margin: 0 0.2rem;
                  position: relative;
                  color: #000;
                  &:checked {
                    background-color: #23dee4;
                    color: #fff;
                  }
                  &:after {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    text-align: center;
                    text-indent: 0;
                    font-size: 0.3rem;
                    line-height: 0.65rem;
                  }
                  &.boy {
                    &:after {
                      content: '男';
                    }
                  }
                  &.girl {
                    &:after {
                      content: '女';
                    }
                  }
                }
              }
            }
            .selectedClass {
              margin-top: 0.2rem;
              .title {
                font-size: 0.36rem;
                font-weight: bold;
                margin-bottom: 0.2rem;
                color: #00f7ff;
              }
              li {
                font-size: 0.28rem;
                line-height: 1.2em;
                margin-bottom: 0.2rem;
                color: #23dee4;
                span {
                  font-size: 10px;
                }
              }
            }
          }

        }
      }
      .btnGroup {
        width: 100%;
        left: 0;
        text-align: center;
        margin-top: 0.2rem;
        .button {
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
          a {
            color: #fff;
          }
        }
      }
    }
  }
</style>
