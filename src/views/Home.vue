<template>
  <div class="home">
  <el-container>

    <el-header>
      <span class="title">仓库信息管理系统</span>
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

    <el-container>
      <el-aside width="210px">
        <el-menu router :default-active="this.$route.path" 
                  background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF">
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
      </el-aside>

      <el-main>
        <el-card>
          <div slot="header">
            <span class="route-name">{{this.$route.name}}</span>
          </div>
        <router-view></router-view>
        </el-card>
      </el-main>
      
    </el-container>

  </el-container>
  </div>
</template>

<script>
import {removeToken} from '@/utils/token'

export default {
  name: "Home",
  data() {
    return {
      // avatar: ""
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

<style lang="scss">
html, body, #app, .el-container, .home {
  height: 100%;
}

.el-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333744;
  /* border-bottom: 1px solid #ededed; */
  > span {
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    color: white;
  }
  > .el-dropdown {
    cursor: pointer;
    > span {
      color: white;
      font-size: 15px;
      font-weight: bold;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.route-name {
  color: #333744;
  font-weight: bold;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.el-input {
  width: 250px;
  margin-right: 10px;
}

.el-pagination {
  margin-top: 10px;
}
</style>