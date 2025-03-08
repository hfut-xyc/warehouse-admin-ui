<template>
  <div>
    <div class="input-container">
      <el-input v-model="keyword" placeholder="按仓库名搜索" prefix-icon="el-icon-search"></el-input>
      <el-button @click="searchWarehouse()" type="primary" icon="el-icon-search">查询</el-button>
      <el-button @click="isDialogVisible = true" type="success" icon="el-icon-plus">添加新仓库</el-button>
    </div>

    <div>
      <el-pagination layout="total, prev, pager, next, jumper" background
        :total="total"
        :current-page="page" 
        :page-size="pageSize" 
        @current-change="onPageChange">
      </el-pagination>
    </div>

    <el-table :data="warehouseList" v-loading="loading" stripe border height="100vh">
      <el-table-column prop="warehouseId" label="仓库ID" sortable width="200"></el-table-column>
      <el-table-column prop="warehouseName" label="仓库名" width="250"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable width="110"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="110"></el-table-column>
      <!-- 操作 --> 
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="updateRow(scope.row)" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button @click="deleteRow(scope.row)" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加新仓库" :visible.sync="isDialogVisible">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
        <el-form-item label="仓库ID" prop="warehouseId">
          <el-input v-model="addForm.warehouseId"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px">
        <el-form-item label="仓库名" prop="warehouseName">
          <el-input v-model="addForm.warehouseName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addWarehouse()" type="primary">添加</el-button>
        <el-button @click="isDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="仓库详情" :visible.sync="isDetailDialogVisible">
      <div>
        <el-pagination layout="total, prev, pager, next, jumper" background
          :total="totalDetail"
          :current-page="pageDetail" 
          :page-size="pageSize" 
          @current-change="onPageChange">
        </el-pagination>
      </div>
      <el-table :data="productList" v-loading="loading" stripe border height="100vh">
        <el-table-column prop="productId" label="产品ID" sortable width="200"></el-table-column>
        <el-table-column prop="productName" label="产品名" width="250"></el-table-column>
        <el-table-column prop="stock" label="库存" width="250"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable width="100"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="100"></el-table-column>
        <!-- 操作 --> 
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="add(scope.row)" size="mini" icon="el-icon-edit" type="success">入库+</el-button>
            <el-button @click="sub(scope.row)" size="mini" icon="el-icon-delete" type="danger">出库-</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getRequest, postRequest, deleteRequest } from "@/utils/api"

export default {
  name: "Warehouse",
  data() {
    return {
      total: 0, // 查询到的用户总数
      page: 1, // 当前页码
      pageSize: 10, // 当前页面大小
      keyword: "", // 查询仓库名的关键字
      warehouseList: [], // 获得的查询结果
      loading: true, // 页面表格是否处于加载状态
      isDialogVisible: false,
      addForm: {
        warehouseId: "",
        warehouseName: ""
      },
      rules: {
        warehouseId: [{ required: true, message: "仓库ID不能为空", trigger: "blur" }],
        warehouseName: [{ required: true, message: "仓库名称不能为空", trigger: "blur" }],
      },

      totalDetail: 0, 
      pageDetail: 1,
      productList: [],
      isDetailDialogVisible: false,
    };
  },
  
  mounted() {
    this.loadWarehouseList();
  },

  methods: {
    async loadWarehouseList() {
      this.loading = true
      try {
        const res = await postRequest('/warehouse/list', {
          page: this.page,
          pageSize: this.pageSize,
          keyword: this.keyword.trim() === "" ? null : this.keyword.trim(),
        })
        console.log(res)
        if (res.data.code === 1) {
          this.total = res.data.data.total
          this.warehouseList = res.data.data.warehouseList
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
      } catch (e) {
        this.$message.error('接口异常')
      } finally {
        this.loading = false
      }
    },

    searchWarehouse() {
      if (this.keyword.trim() === "") {
        this.$message.warning("请输入仓库名");
      } else {
        this.loadWarehouseList();
      }
    },

    onPageChange(val) {
      this.page = val;
      this.loadWarehouseList();
    },

    addWarehouse() {
      this.$refs["addForm"].validate(async valid => {
        if (!valid) {
          return false
        }
        const res = await postRequest('/warehouse', this.addForm)
        if (res.data.code === 1) {
          this.$message.success(res.data.message)
          this.isDialogVisible = false
          this.loadWarehouseList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },

    delete() {

    },
  }
};
</script>

<style>

</style>
