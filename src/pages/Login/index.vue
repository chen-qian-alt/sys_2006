<template>
  <div class="about">
    <div class="right">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <h1 class="biaoti">千锋管理系统</h1>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="s_btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <video
      autoplay
      muted
      loop
      preload="auto"
      src="./../../img/bg_video.d2d602a9.mp4"
    ></video>
  </div>
</template>


<script>

//登录逻辑的实现
//1、收集用户输入的username & password传递给后端

//2、登入通过后，将后端返回的token存到本地

//3、每次请求的时候，携带token到请求头authorization

//4、展示token校验正确的数据

//5、校验不通过，跳转到登入页


import { login } from "@/api"
import {mapMutations} from "vuex"
export default {
  data() {
    //jsDoc
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback  校验通过不传参  通过传参
     */

    var validateUsername = (rule, value, callback) => {
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("4到6位(字母，数字，下划线，减号)");
      } else {
        callback();
      }

      // if (value === '') {
      //   callback(new Error('请输入用户名'));
      // } else {
      //   if (this.loginForm.password !== '') {
      //     this.$refs.loginForm.validateField('password');
      //   }
      //   callback();
      // }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }

      // if (value === '') {
      //   callback(new Error('请输入密码'));
      // } else if (value !== this.loginForm.username) {
      //   callback(new Error('两次输入密码不一致!'));
      // } else {
      //   callback();
      // }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
      },
    };
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    submitForm(formName) {   
      // console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {//代表本地校验通过
          // alert("submit!");

          //打开登入加载动画
          const loading =  this.$loading({
          lock: true,
          text: '正在登入...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          let {username,password} = this.loginForm;
          //发送登入请求
          
          login(username,password)
          .then(res=>{
              //服务器响应，关闭loading动画
                loading.close()

 
              if(res.data.state) {
                this.$message.success('登录成功')
                //用户名密码正确
                localStorage.setItem('qf2006-token',res.data.token)
  
                localStorage.setItem('qf2006-userInfo',JSON.stringify(res.data.userInfo))
                //更改vuex中state['userInfo']的值
                this.SET_USERINFO(res.data.userInfo)

                //跳转到主页
                this.$router.push("/")
              }else{
                //用户名或者密码错误
                this.$message.error('用户名密码错误')
              }
            })
            .catch(err=>{
              console.log(err);
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     resetForm(formName) {
        this.$refs[formName].resetFields();
     }
  }
}
</script>


<style scoped>
/*表单样式*/
.el-form {
  width: 400px;
}

.s_btn {
  width: 255px;
  background: linear-gradient(90deg, #1596fb, #002dff);
}

.biaoti {
  color: white;
  font-size: 35px;
  text-align: center;
  margin-top: -20px;
  margin-right: -50px;
  padding-bottom: 40px;
}
.about {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: url("E:\nj-2006-STEP2\陈倩\stu-app\src\img\"); */
}

.demo-loginForm {
  position: absolute;
  z-index: 10;
  float: right;
  width: 355px;
  height: 390px;
  margin-top: 30px;
  margin-left: 60%;
  padding-top: 100px;
  padding-right: 45px;
  background-color: rgba(59, 52, 52, 0.3);
  border-radius: 14px;
}

body {
  margin: 0;
  height: 100%;
  position: relative;
  overflow: hidden;
}
video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
</style>

