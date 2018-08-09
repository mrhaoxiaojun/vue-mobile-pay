<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <p>你的start是小编的学习的动力</p>
    <span class="pay-btn" @click="topay">去付款</span>
    <vue-mobile-pay 
    :isPay="isPay"
    @close = "payClose"
    :is2times = "false"
    :isMess = "true"
    :getPassword = "payPw">
    </vue-mobile-pay>
    <p>
      密码：{{pwd}}
    </p>
    <h2>借助vue-cli和vue的插件功能，实现六位or多位数字密码插件，主要服务于h5站点</h2>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to my vue-mobile-pay',
      isPay:false,
      pwd:""
    }
  },
  methods:{
    topay(){
      this.isPay = true
    },
    payClose(){
      this.isPay = false
    },
    payPw(pwd){
      this.pwd = pwd.toString()
      console.log(pwd)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-size: 40px;
  font-weight: normal;
}
.pay-btn{
  display: inline-block;
  font-size: 24px;
  padding:10px 80px;
  background: #42b983;
  color: #fff;
  border-radius: 4px;
  border:0;
}
p{
  font-size: 24px;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
