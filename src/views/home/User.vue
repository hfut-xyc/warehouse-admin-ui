<template>
  <div>
    <div class="input-container"> 
      <el-input v-model="keyword" placeholder="通过用户名搜索" prefix-icon="el-icon-search"></el-input>
      <el-button @click="searchUser()" type="primary" icon="el-icon-search" >查询</el-button>
      <el-button @click="isDialogVisible = true" type="success" icon="el-icon-plus">添加新用户</el-button>
    </div>

    <div>
      <el-pagination layout="total, prev, pager, next, jumper" background 
        :total="total"
        :current-page="page" 
        :page-size="pageSize" 
        @current-change="onPageChange">
      </el-pagination>
    </div>

    <el-table :data="userList" v-loading="loading" stripe border height="100vh">
      <el-table-column prop="userId" label="用户ID" sortable width="200"></el-table-column>
      <el-table-column prop="username" label="用户名" width="200"></el-table-column>
      <el-table-column prop="role" label="用户角色" width="200">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.role === 1">超级管理员</el-tag>
          <el-tag type="info" v-else>普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable width="100"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateUser(scope.row)" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button @click="deleteUser(scope.row)" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加新用户" :visible.sync="isDialogVisible">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="addForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="addForm.confirmPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择用户角色">
            <el-option label="普通用户" value="0"></el-option>
            <el-option label="超级管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addUser()" type="primary">添加</el-button>
        <el-button @click="isDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRequest, postRequest, deleteRequest } from "@/utils/api";

export default {
  name: "User",
  data() {
    const validatorPassword = (rule, value, callback) => {
      if (value === "") callback(new Error("请确认密码"));
      else if (value !== this.addForm.password)
        callback(new Error("两次输入密码不一致"));
      else callback();
    };
    return {
      userList: [], // 获得的查询结果
      total: 0, // 查询到的用户总数
      page: 1, // 当前页码
      pageSize: 10,
      keyword: "", // 查询用户名的关键字
      loading: false, // 页面表格是否处于加载状态
      isDialogVisible: false, // 添加用户的对话框是否可见
      // 添加用户表单
      addForm: {
        userId: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "普通用户"
      },
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" },
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        role: [
          { required: true, message: "角色不能为空", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, validator: validatorPassword, trigger: "blur" },
        ],
      },
      
    };
  },

  mounted: function () {
    this.loadUserList();
  },

  methods: {
    async loadUserList() {
      this.loading = true;
      const res = await postRequest("/user/list", {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword.trim() === "" ? null : this.keyword.trim(),
      });
      console.log(res);
      
      if (res.data.code === 1) {
        this.total = res.data.data.total;
        this.userList = res.data.data.userList;
        this.$message.success(res.data.message);
      } else {
        this.$message.error(res.data.message);
      }
      this.loading = false;
    },

    searchUser() {
      if (this.keyword.trim() === "") {
        this.$message.warning("请输入关键字");
      } else {
        this.loadUserList();
      }
    },

    onPageChange(val) {
      this.page = val;
      this.loadUserList();
    },

    addUser() {
      this.$refs["addForm"].validate(async valid => {
        if (!valid) {
          return false
        }
        const res = await postRequest('/user', this.addForm)
        if (res.data.code === 1) {
            this.$message.success(res.data.message)
            this.isDialogVisible = false
            this.loadUserList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },

    updateUser(row) {

    },

    async deleteUser(row) {
      const msg = await this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      if (msg !== 'confirm') {
        return;
      }
      const res = await deleteRequest("/user/" + row.id);
      if (resdata.code === 1) {
        this.$message.success(res.data.message);
        this.loadUserList("/user/list");
      }
    },
  },
};
</script>

<style>
</style>
