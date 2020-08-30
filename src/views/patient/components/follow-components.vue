<template>
  <div class="follow-components">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      v-if="!canEdit"
    >
      <div class="flex_row">
        <el-form-item label="服务时间：" prop="time">
          <el-date-picker
            :editable="false"
            v-model="ruleForm.time"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="服务类型：" prop="type">
          <el-select clearable v-model="ruleForm.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.title"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作人员：" prop="staff">
          <el-input type="text" v-model="ruleForm.staff"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" rows="1" v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </div>
      <div class="flex_row btn">
        <el-button type="primary" size="mini" @click="submit()" title="添加">添加</el-button>
        <el-button type="default" size="mini" @click="cancel('ruleForm')" title="取消">取消</el-button>
      </div>
    </el-form>
    <div>记录</div>
    <el-table
      :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
      ref="filterTable"
      border
      fit
      highlight-current-row
      :data="data"
      style="width: 100%;margin: 10px 0"
      :default-sort="{prop: 'date', order: 'ascending'}"
    >
      <el-table-column align="center" prop="time" label="服务时间" width="auto"></el-table-column>
      <el-table-column align="center" prop="staff" label="工作人员" width="auto"></el-table-column>
      <el-table-column align="center" prop="type" label="服务类型" width="auto"></el-table-column>
      <el-table-column align="center" prop="remark" label="问题描述" width="auto"></el-table-column>
      <el-table-column align="center" prop="result" label="处理结果" width="auto"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "../../../api/api";
export default {
  name: "other",
  props: ["canEdit"],
  data() {
    return {
      listQuery: {
        sid: "",
        patientId: "",
        recordId: "",
      },
      rules: {
        time: [{ required: true, message: "请填写服务时间", trigger: "blur" }],
        type: [{ required: true, message: "请填写服务类型", trigger: "blur" }],
        staff: [{ required: true, message: "请填写工作人员", trigger: "blur" }],
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }],
      },
      ruleForm: {
        id: 0,
        time: "",
        type: "",
        staff: "",
        remark: "",
      },
      options: {},
      data: [],
    };
  },
  created() {
    this.listQuery.sid = this.queryParams("sid");
    this.listQuery.patientId = this.queryParams("patientId");
    this.listQuery.recordId = this.queryParams("recordId");
    this.followList();
    api
      .postFormAPI("common/getChildByKey", {
        key: "serviceType",
      })
      .then((res) => {
        if (res.data.result == 1) {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          this.options = res.data.data;
        }
        //数据处理
      })
      .catch((err) => console.log(err));
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return;
        }
      });
      this.ruleForm.sid = this.listQuery.sid;
      this.ruleForm.id = this.listQuery.patientId;
      this.ruleForm.recordId = this.listQuery.recordId;
      api
        .postFormAPI("patient/addFollow", this.ruleForm)
        .then((res) => {
          if (res.data.result == 1) {
            this.$notify({
              message: res.data.message,
            });
            this.followList();
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
    },
    followList() {
      api
        .postFormAPI("patient/followList", {
          recordId: this.listQuery.recordId,
          id: this.listQuery.patientId,
          sid: this.listQuery.sid,
        })
        .then((res) => {
          if (res.data.result == 1) {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.data = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    queryParams(paramName) {
      let param = this.$route.query;
      if (param.hasOwnProperty(paramName)) {
        return param[paramName];
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.follow-components {
  margin: 20px 30px 0;
  color: #212121;
  .flex_row {
    display: flex;
    align-items: center;
  }
  .btn {
    margin: 14px 0;
    justify-content: center;
  }
}
</style>
