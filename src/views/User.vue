<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="handleAdd()">+新增</el-button>
      <div class="search">
        <el-input
          v-model="userInfo.name"
          @change="search"
          placeholder="输入名称进行搜索"/>
          <el-button type="success" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="info-table">
      <el-table
        :data="tableData"
        stripe
        style="width: 98%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="180">
          <template slot-scope="scope">
            <p>{{scope.row.sex == '1'?'男':'女'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
        </el-table-column>
        <el-table-column
          align="right"
          header-align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="800px"
      :show-close="false"
      :before-close="handleClose">
      <el-form 
      ref="form"
      :model="form" 
      label-width="120px" 
      size="large"
      inline
      :rules="rules">
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别" style="width:205px">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="form.birth"
          value-format="yyyy-MM-dd" 
          style="width:205px"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" style="width:566px"></el-input>
        </el-form-item>
      </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList, createUser, deleteUser, updateUser} from '../api/index'
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请选择生日", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }]
      },
      tableData:[],
      total: 0,
      pageData: {
        page: 1,
        limit: 10
      },
      userInfo: {
        name: ""
      },
      modalType: 0 //0表示新增，1表示编辑
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(this.modalType == 0) {
            // 新增用户
            createUser(this.form).then(() => {
              // 重新获取列表数据
              this.getList()
            })
          } else {
            // 修改用户
            updateUser(this.form).then(() => {
              this.getList()
            })
          }
          this.handleClose();
          this.dialogVisible = false;
        }
      });
    },
    cancel() {
      this.handleClose();
      this.dialogVisible = false;
    },
    handleClose() {
      this.form = {}
      this.$refs.form.resetFields();
    },
    handleAdd() {
      this.dialogVisible = true
      this.modalType = 0
    },
    handleUpdate(val) {
      this.dialogVisible = true
      this.modalType = 1
      // 需要对当前表格内容进行深拷贝，否则会报错
      this.form = JSON.parse(JSON.stringify(val))
    },
    handleDelete(val) {
      this.$confirm('此操作将删除用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({id: val.id}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    getList() {
      getUserList({params: {...this.pageData,...this.userInfo}}).then(({ data }) => {
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    search() {
      this.getList()
    },
    handlePage(val) {
      this.pageData.page = val
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
};
</script>
<style scoped lang="less">
.top {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .search {
    display: flex;
    .el-button {
      margin-left: 10px; 
    }
  }
}
.info-table {
  height: 80vh;
  .el-table {
    margin: 20px auto;
  }
  .pagination {
    margin: 20px 20px 0 0;
    display: flex;
    flex-direction: row-reverse;
  }
}
::v-deep .el-dialog__body {
  margin: 0 20px;
}
</style>