<template>
  <div>
    <div style="display: flex;">
      <el-input v-model="keyword" placeholder="按产品名搜索" prefix-icon="el-icon-search"></el-input>
      <el-button @click="searchProduct()" type="primary" icon="el-icon-search">查询</el-button>
      <el-button @click="isDialogVisible = true" type="success" icon="el-icon-plus">添加新产品</el-button>
    </div>

    <div>
      <el-pagination layout="total, prev, pager, next, jumper" background 
          :total="total"
          :current-page="page" 
          :page-size="pageSize" 
          @current-change="onPageChange">
      </el-pagination>
    </div>

    <el-table :data="productList" v-loading="loading" stripe border height="100vh">
      <el-table-column prop="productId" label="产品ID" sortable></el-table-column>
      <el-table-column prop="productName" label="产品名"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable width="100"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" sortable width="100"></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateRow(scope.row)" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button @click="deleteRow(scope.row)" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加新产品" :visible.sync="isDialogVisible">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
        <el-form-item label="产品ID" prop="productId">
          <el-input v-model="addForm.productId"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
        <el-form-item label="产品名" prop="productName">
          <el-input v-model="addForm.productName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addProduct()" type="primary">添加</el-button>
        <el-button @click="isDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getRequest, postRequest, deleteRequest} from "@/utils/api"

export default {
  name: "Product",
  data() {
    return {
      productList: [],
      total: 0,     // 查询到的产品总数
      page: 1,      // 当前页码
      pageSize: 10, // 当前页面大小
      keyword: "",
      loading: true,
      isDialogVisible: false,
      addForm: {
        productId: "",
        productName: ""
      },
      rules: {
        productId: [{ required: true, message: "产品ID不能为空", trigger: "blur" }],
        productName: [{ required: true, message: "产品名称不能为空", trigger: "blur" }],
      }
    }
  },

  mounted() {
    this.loadProductList();
  },

  methods: {
    async loadProductList() {
      this.loading = true
      const res = await postRequest('/product/list', {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword.trim() === "" ? null : this.keyword.trim(),
      })
      console.log(res)
      if (res.data.code === 1) {
        this.total = res.data.data.total
        this.productList = res.data.data.productList
        this.$message.success(res.data.message)
      } else {
        this.$message.error(res.data.message)
      }
      this.loading = false;
    },

    searchProduct() {
      if (this.keyword.trim() === "") {
        this.$message.warning("请输入产品名");
      } else {
        this.loadProductList();
      }
    },

    onPageChange(val) {
      this.page = val;
      this.loadProductList();
    },

    addProduct() {
      this.$refs["addForm"].validate(async valid => {
        if (!valid) {
          return false
        }
        const res = await postRequest('/product', this.addForm)
        if (res.data.code === 1) {
          this.$message.success(res.data.message)
          this.isDialogVisible = false
          this.loadProductList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
  }
};
</script>

<style>

</style>
