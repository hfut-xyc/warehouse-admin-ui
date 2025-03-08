<template>
  <div>
    <div class="input-container">
      <el-date-picker v-model="keyword" 
        type="date" 
        align="center" 
        value-format="yyyyMMdd" 
        placeholder="请选择订单日期">
      </el-date-picker>
      <el-button @click="searchOrder()" type="primary" icon="el-icon-search">查询</el-button>
    </div>
    
    <div>
      <el-pagination layout="total, prev, pager, next, jumper" background 
        :total="total"
        :current-page="page" 
        :page-size="pageSize" 
        @current-change="onPageChange">
      </el-pagination>
    </div>

    <el-table :data="orderList" v-loading="loading" stripe border height="100vh">
      <el-table-column prop="orderId" label="订单ID" sortable fixed width="210"></el-table-column>
      <el-table-column prop="warehouseId" label="仓库ID" sortable></el-table-column>
      <el-table-column prop="warehouseName" label="仓库名" width="200"></el-table-column>
      <el-table-column prop="productId" label="产品ID" sortable></el-table-column>
      <el-table-column prop="productName" label="产品名"></el-table-column>
      <el-table-column prop="userId" label="用户ID" sortable width="120"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120"></el-table-column>
      <el-table-column prop="count" label="订单类型">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.count > 0">入库</el-tag>
          <el-tag type="danger" v-else>出库</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="订单数量"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRequest, postRequest, deleteRequest } from "@/utils/api"

export default {
  name: "OrderList",
  data() {
    return {
      orderList: [],
      total: 0,     // 查询到的订单总数
      page: 1,      // 当前页码
      pageSize: 10,
      keyword: "",
      loading: false,
      isDialogVisible: false, 
    }
  },

  mounted() {
    this.loadOrderList()
  },

  methods: {
    /**
     * 加载仓库列表
     */
    async loadOrderList() {
      this.loading = true
      const res = await postRequest("/order/list", {
        page: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword.trim() === "" ? null : this.keyword.trim(),
      })
      console.log(res)
      if (res.data.code === 1) {
        this.total = res.data.data.total
        this.orderList = res.data.data.orderList
        this.$message.success(res.data.message)
      } else {
        this.$message.error(res.data.message)
      }
      this.loading = false
    },

    searchOrder() {
      if (this.keyword.trim() === "") {
        this.$message.warning("请输入查询日期")
      } else {
        this.loadOrderList('/order/list')
      }
    },

    onPageChange(val) {
      this.page = val;
      this.loadOrderList();
    },

    // deleteOrder(row) {
    //   this.$confirm("是否删除该订单", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     const res = deleteRequest("/order/" + row.id)
    //     if (res.data.code === 1) {
    //         that.$message.success(res.data.message);
    //         that.loadOrderList('/order/list');
    //       } else {
    //         that.$message.warning(res.data.message);
    //     }
    //   })
    // },
  }
}
</script>

<style scoped>

</style>