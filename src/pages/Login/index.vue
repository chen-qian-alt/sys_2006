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
export default {
  data() {
    //jsDoc
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback  校验通过不传参  通过传参
     */

    var validateUsername = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
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
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //代表本地校验通过
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
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

