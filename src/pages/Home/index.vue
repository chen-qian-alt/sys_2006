<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px"
        >
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">管理首页</span>
            </template>
            <el-menu-item-group>
              <!-- <span slot="title">分组一</span> -->
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">我的中心</span>
          </el-menu-item>
          <!-- <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"
              ><div class="grid-content bg-purple">图标</div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                万锋管理系统
                </div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-avatar :size="40" class="aa"></el-avatar>
                <span>欢迎您：</span>
                <b class="nickname">{{userInfo.nickname}}</b>
                
                <span class="quit" @click="quit">退出</span>
                </div
            ></el-col>
          </el-row>
        </el-header>
        <!-- 主体区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {getLoginLog} from "@/api"
import {mapState} from "vuex"
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    getLoginLog()
    .then(res => {
      console.log(res)
    })
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      //退出登入
      //1、清除token和userInfo
      //2、跳转到登录页
      localStorage.removeItem("qf2006-token")
      localStorage.removeItem("qf2006-userInfo")
      
      console.log(1)
      this.$router.push("/login")
    }
  }, 
};
</script>


<style scoped>
.quit{
  cursor: pointer;
  color: rgb(9, 236, 217);
}
.aa{
  vertical-align: middle;
  margin-right: 12px;
}
/* 修改avatar的样式 */
.el-avatar.el-avatar--square{
  vertical-align:middle;
  margin-right:10px;
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-row{
  width: 100%;
}
.el-header,.row-bg{
  background: linear-gradient(90deg, #4d66ff, #5538e1);
}


.el-header,
.el-footer {
  background-color: #b3c0d1;
  font-size: 16px;
  color: #e9eef3;
  text-align: center;
  line-height: 36px;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-row {
  margin-bottom: 20px;
}


.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  line-height: 36px;
}
.bg-purple {
  line-height: 36px;
}

.bg-purple-light {
  line-height: 36px;
}

/* layout顶栏样式 */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>


