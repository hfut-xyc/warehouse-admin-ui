<template>
  <div class="container">
    <!-- <el-aside width="220px">
    </el-aside> -->
    <div class="side-container">
      <div class="logo">仓库信息管理系统</div>
      <el-menu router :default-active="this.$route.path" text-color="#fff" active-text-color="#ffd04b"
      background-color="rgb(48,65,86)" >
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
    </div>

    <div class="main-container">
      <el-header>
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
      </el-header>
      <!-- show pages here-->
      <div>
        <router-view></router-view>
      </div>
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

.el-menu {
  height: 100%;
}

.container {
  height: 100%;
  /* position: relative; */
}

.side-container {
  height: 100%;
  width: 220px;
  position: fixed;
}

.logo {
  color: white;
  background-color: rgb(48,65,86);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 220px;
  padding-top: 30px;
  padding-bottom: 30px;
}

.el-menu{
  overflow: hidden;
}

.main-container {
  height: 100%;
  /* position: absolute; */
  margin-left: 230px;
  overflow: hidden;

}

.el-header {
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #ededed;
}


.el-dropdown-link {
  color: #409EFF;
}

.el-dropdown {
  cursor: pointer;
  margin-left: auto;
}

.input-panel {
  display: flex;
  align-items: center;
}

.el-input {
  width: 250px;
  margin-right: 15px;
}

.el-pagination {
  margin-top: 10px;
}

.el-table {
  margin-top: 10px;
}

</style>