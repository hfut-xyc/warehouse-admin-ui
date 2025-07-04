<template>
  <div>
    <div class="header-container">
      <div class="title">仓库信息管理系统</div>
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-menu mode="horizontal" router :default-active="this.$route.path">
        <el-menu-item index="/home/warehouse">
          <i class="el-icon-s-home"></i>仓库管理
        </el-menu-item>
        <el-menu-item index="/home/product">
          <i class="el-icon-coin"></i>产品管理
        </el-menu-item>
        <el-menu-item index="/home/user">
          <i class="el-icon-user"></i>用户管理
        </el-menu-item>
        <el-menu-item index="/home/order">
          <i class="el-icon-money"></i>订单列表
        </el-menu-item>
        <el-menu-item index="/home/chart">
          <i class="el-icon-data-line"></i>数据统计
        </el-menu-item>
      </el-menu>
      <el-dropdown @command="logout">
        <span class="el-dropdown-link">
          admin
          {{this.$store.state.currentUser}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-card class="main-container">
      <router-view></router-view>
    </el-card>

  </div>
</template>

<script>
import {removeToken} from '@/utils/token'

export default {
  name: "Home",
  data() {
    return {
      avatar: ""
    }
  },
  methods: {
    logout() {
      removeToken()
      this.$router.replace("/login");
      this.$message.success("注销成功");
      console.log("test");
    
    },
  },
};
</script>

<style>
.header-container {
  display: flex;
  align-items: center;
  position: sticky;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
}

.title {
  width: 200px;
  line-height: 60px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: #409EFF;
  background-color: white;
}

.el-dropdown {
  cursor: pointer;
}

.el-dropdown-link {
  color: #409EFF;
  font-weight: bold;
}

.el-scrollbar__wrap {
  overflow: auto;
}

.side-container {
  /* height: 100vh; */
  /* /* height: 100%; */
  /* width: 220px; */
  /* position: absolute; */
  /* overflow-x: hidden; */
}

.el-menu {
  /* height: 100vh; */
}

.main-container{
  /* height: 100%; */
  /* margin-top: 10px; */
  /* margin-left: 10px; */
  display: block;
  text-align: center;
  margin: 20px;
  height: 100%;
}

.input-container {
  display: flex;
  align-items: center;
}

.el-input {
  width: 250px;
  margin-right: 10px;
}

</style>