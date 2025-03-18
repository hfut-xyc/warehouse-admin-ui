<template>
  <div>
    <el-scrollbar class="side-container">
      <div class="title">仓库信息管理系统</div>
      <el-menu router :default-active="this.$route.path" 
        text-color="#fff" 
        active-text-color="#ffd04b"
        background-color="rgb(48,65,86)">
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
    </el-scrollbar>

    <div class="main-container">
      <div class="header-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
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
      <!-- show different views here-->
      <el-scrollbar class="view-container">
        <router-view></router-view>
      </el-scrollbar>
    </div>
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

.side-container {
  height: 100%;
  width: 220px;
  position: fixed;
  overflow-y: hidden;
}

.main-container {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: 100vh;
  margin-left: 230px;
  margin-right: 10px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid #ededed;
}

.view-container, .el-pagination, .el-table {
  margin-top: 10px;
}

.title {
  width: 220px;
  line-height: 60px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: rgb(48,65,86);
}

.el-menu {
  height: 100vh;
}

.el-dropdown {
  cursor: pointer;
}

.el-dropdown-link {
  color: #409EFF;
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