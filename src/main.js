import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from '../static/js/fastclick'
import classes from 'classes.js'

import menu from './components/menu/menu'
import common from './components/common/common'
import profile from './components/profile/profile'
import schools from './components/schools/schools'
import school from './components/school/school'
import sign from './components/sign/sign'

Vue.use(VueRouter)
Vue.use(VueResource)

classes.classes['lists'] = jsonData['classes']['tabs'][5]['content']
if(window.localStorage.getItem("zhxy_selected")&&window.localStorage.getItem("zhxy_schools")){
  jsonData['classes'].selectedClass = JSON.parse(window.localStorage.getItem("zhxy_selected"))
  jsonData['classes']['tabs'][5]['content'] = JSON.parse(window.localStorage.getItem("zhxy_schools"))
}


document.addEventListener('DOMContentLoaded', function() {
  FastClick.attach(document.body);
}, false);
document.getElementById("video").play()
document.addEventListener("WeixinJSBridgeReady", function () {
  WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
    document.getElementById("video").play()
  });
}, false);
document.getElementById("video").addEventListener("ended",function () {
  document.getElementById("videoCon").remove()
  document.getElementById("app").className = "active"
})
document.getElementById("skip").addEventListener("click",function () {
  document.getElementById("videoCon").remove()
  document.getElementById("app").className = "active"
})
const routes = [
  {
    path: '/menu',
    component: menu,
    children:[
      {
        path: '/menu/common',
        component: common,
      },
      {
        path: '/menu/profile',
        component: profile,
      },
      {
        path: '/menu/school',
        component: school,
      },
      {
        path: '/menu/schools',
        component: schools
      },
      {
        path: '/menu/sign',
        component: sign
      },
    ]
  }
]

let router = new VueRouter({routes});
router.replace("/")
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
