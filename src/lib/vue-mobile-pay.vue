<!-- 
 * author haoxiaojun
 * on 2018-08
 * des 多位数字密码
 * props 
 * @param {String}（可选） payTitle 标题，建议必填
 * @param {String}（可选） pay2Title 标题（如果is2times为true，才起作用）
 * @param {Function}（可选） getPassword 拿到一个密码参数，如果is2times为true，则返回一个数组，false返回一个字符串）建议必填
 * @param {Number}（可选） pwdDigits 需要支持几位数密码
 * @param {String}（可选） highlightColor 数字键盘带你后高亮色值
 * @param {Boolean}（必选） isPay 是否显示支付密码
 * @param {Boolean}（可选） is2times 是否两次输入密码
 * @param {Boolean}（可选） isMess 数字键盘是否乱序
 * 
-->
<template>
    <transition name="fade" >
      <div class="vue-pay-pwd" v-show="isPay" @touchstart="close($event)">
        <div class="inner">
          <div class="title-box">
            <p class="title" v-if="!is2Title">{{payTitle}}</p>
            <p class="title" v-if="is2Title">{{pay2Title}}</p>
          </div>
          <!-- 密码区域 -->
          <div class="pay-box">
            <ul class="pwd-wrap" >
                <li 
                  v-for="(item,index) in pwdAry.length=this.pwdDigits" 
                  :key="index" 
                  >
                  <i v-if="pwd.length > index"></i>
                </li>
            </ul>
          </div>
          <!--数字面板-->
          <div class="key-box" >
              <div class="item" v-for="(item, i) in keyList" :key="i">
                  <div class="key" v-for="(val, key) in item" :key="key" @touchstart="inputStart(val, $event)" @touchend="inputEnd($event)" >
                      {{val}}
                  </div>
              </div>
              <div class="item">
                  <div class="key" style="background: #e8e8e8"></div>
                  <div class="key" @touchstart="inputStart(keyLast, $event)" @touchend="inputEnd($event)">
                    {{keyLast}}
                  </div>
                  <div class="key" style="background: #e8e8e8" @touchstart="del($event)" @touchend="inputEnd($event,'del')">x
                  </div>
              </div>
          </div>
        </div>
        <div class="loading-wrap" v-if="isLoading">
          <div class="spinner">
            <div class="rect rect1"></div>
            <div class="rect rect2"></div>
            <div class="rect rect3"></div>
            <div class="rect rect4"></div>
            <div class="rect rect5"></div>
          </div>
        </div>
      </div>
    </transition>
</template>
<script>
export default {
    name: 'vue-mobile-pay',
    components: {},
    props:{
      payTitle: {
        type: String,
        default: '请输入支付密码'
      },
      pay2Title: {
        type: String,
        default: '请输再次入支付密码'
      },
      getPassword: {
        type: Function,
        default: function(){
          console.log("请传入获取密码的函数")
        }
      },
      pwdDigits: {
        type: Number,
        default: 6
      },
      highlightColor: {
        type: String,
        default: '#ccc'
      },
      isPay: {
        type: Boolean,
        default: false
      },
      is2times:{
        type: Boolean,
        default: false
      },
      isMess:{
        type: Boolean,
        default: false
      }
    },
    data() {
        return {
          pwd:[],
          pwdAry:[],
          keyList: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          keyLast:0,
          twoTimes:[],
          is2Title:false,
          isLoading:false,
        }
    },
    created() {
      this.randomKeybox()
    },
    computed: {},
    watch: {
    },
    methods: {
      // 用户输入
      inputStart(val, e) {
          if (this.pwd.length < this.pwdDigits) {
              this.pwd.push(val)
              if (this.pwd.length === this.pwdDigits) {
                  // 密码输入完毕
                  if(this.is2times){
                    this.twoTimes.push(this.pwd.join(''))
                    if(this.twoTimes.length == 1){
                      this.isLoading = true
                      setTimeout(()=>{
                        this.randomKeybox()
                        this.isLoading = false
                        this.pwd = [];
                        this.is2Title = true
                      },1000)
                    }else{
                      this.getPassword(this.twoTimes)
                      this.closeDeal()
                    }
                  }else{
                    this.getPassword(this.pwd.join(''))
                    this.closeDeal()
                  }
              }
          }
          // 设置高亮
          this.highlight(e.currentTarget)
      },
      // 删除输入
      del() {
        if (this.pwd.length > 0) {
            this.pwd.pop()
        }
      },
      close(e) {
        e.preventDefault()
        if(e.target.className === 'vue-pay-pwd'){
          this.closeDeal()
        }
      },
      closeDeal(){
        this.$emit('close')
        this.is2Title = false
        this.pwd = [];
        this.twoTimes = []
      },
      inputEnd(e, d) {
        this.unhighLight(e.currentTarget, d)
      },
      // 恢复默认
      unhighLight(ele, d) {
        if (d) {
            ele.style.backgroundColor = '#e8e8e8'
        } else {
            ele.style.backgroundColor = '#fff'
        }
      },
      // 高亮
      highlight(ele) {
          ele.style.backgroundColor = this.highlightColor
      },
      // 随机键盘
      randomKeybox(){
        if(this.isMess){
          let stack = [0,1,2,3,4,5,6,7,8,9]
          let nweStack = []
            while(stack.length) {
              nweStack.push(stack.splice(parseInt(Math.random() * stack.length), 1)[0])
            }
          this.keyList[0] = nweStack.slice(0,3)
          this.keyList[1] = nweStack.slice(3,6)
          this.keyList[2] = nweStack.slice(6,9)
          this.keyLast = nweStack.slice(9)[0]
        }
      }
    },
}
</script>
<style lang="scss" scoped>
div,input,ul,li,p{
  padding:0;
  margin: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.vue-pay-pwd {
  position: fixed;
  z-index: 111;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, .5);
  z-index: 999;
  user-select: none;
  >div.inner {
      position: absolute;
      width: 100%;
      height: 764px;
      left: 0;
      bottom: 0;
      color: #363636;
      background-color: #fff;
      z-index: 1000;
  }
  .loading-wrap{
    position: absolute;
    z-index: 1001;
    width: 100%;
    height: 764px;
    left: 0;
    bottom: 0;
    .loading{
      position: absolute;
      z-index: 1001;
      width: 100px;
      left: 50%;
      margin-left:-50px;
      bottom: 300px;
    }
  }
  .title-box{
    position: absolute;
    bottom: 640px;
    left:0;
    right: 0;
    .title{
      font-size:44px;
      font-weight:bold;
      padding:40px 0;
      text-align:center;
    }
  }
  // 密码盒子
  .pay-box{
    position: absolute;
    bottom: 540px;
    left:0;
    right: 0;
    display: inline-block;
    // 密码盒子
    .pwd-wrap {
        display: flex;
        width: 700px;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #ddd;
        cursor: pointer;
        li {
            list-style-type: none;
            text-align: center;
            line-height: 96px;
            height: 96px;
            flex: 1;
            border-right: 1px solid #ddd;
            &:last-child {
                border-right: 0;
            }
            i {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #000;
                display: inline-block;
            }
        }
    }
  }
  // 键盘盒子
  .key-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      font-size: 16px;
      color: #363636;
      .item {
          display: flex;
          text-align: center;
          line-height: 110px;
          height: 110px;
          font-size: 60px;
      }
      .key {
          cursor: pointer;
          width: 100%;
          height: 100%;
          flex: 1;
      }
  }
  // 动画
  .spinner {
    margin: 250px auto 0;
    width: 100px;
    height: 60px;
    text-align: center;
    font-size: 10px;
  }
  
  .spinner > div {
    background-color: #67CF22;
    height: 100%;
    width: 6px;
    display: inline-block;
    
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }
  
  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  
  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  
  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  
  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  
  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
    20% { -webkit-transform: scaleY(1.0) }
  }
  
  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
}
</style>