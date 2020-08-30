<!--  -->
<template>
  <div class="baseInfo-components">
    <!-- 搜索框 start -->
    <div class="edit_btn">
      <el-button v-if="!canEdit" type="primary" @click="editView()">编辑信息</el-button>
    </div>
    <div style="height:40px;"></div>
    <div>
      <div class="nba">
        <p class="title">基本信息</p>
      </div>
      <el-row :gutter="10">
        <el-col :span="12">
          <span class="label">病例号：</span>
          {{info.patientNum}}
        </el-col>
        <el-col :span="12">
          <span class="label">民族：</span>
          {{info.nation}}
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <span class="label">年龄：</span>
          {{info.age}}
        </el-col>
        <el-col :span="12">
          <span class="label">性别：</span>
          {{info.sex==1?'男':'女'}}
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <span class="label">出生年月：</span>
          {{info.birthday}}
        </el-col>
        <el-col :span="12">
          <span class="label">手机号码：</span>
          {{info.phone}}
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <span class="label">建档时间：</span>
          {{info.createtime}}
        </el-col>
        <el-col :span="12">
          <span class="label">身份证号：</span>
          {{info.cardNum}}
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <span class="label">所在地区：</span>
          {{info.area}}
        </el-col>
        <el-col :span="12">
          <span class="label">详细地址：</span>
          {{info.address}}
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <span class="label">电子邮箱：</span>
          {{info.email}}
        </el-col>
        <el-col :span="12">
          <span class="label">微信号：</span>
          {{info.wechat}}
        </el-col>
      </el-row>
      <div class="nba">
        <p class="title">标签信息</p>
      </div>
      <el-row :gutter="10">
        <el-col :span="12">
          <span class="label">支付方：</span>
          {{info.payRole}}
        </el-col>
        <el-col :span="12">
          <span class="label">意见领袖：</span>
          {{info.suggestLeader}}
        </el-col>
      </el-row>

      <div class="nba">
        <p class="title">家庭背景</p>
      </div>
      <el-table
        :data="info.family"
        border
        style="width:auto;margin: 10px 30px 20px"
        :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
      >
        <el-table-column prop="truename" label="姓名"></el-table-column>

        <el-table-column label="关系">
          <template slot-scope="scope">{{relationships[scope.row.relation]}}</template>
        </el-table-column>

        <el-table-column prop="company" label="单位"></el-table-column>
        <el-table-column prop="job" label="职务"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>

      <div class="nba">
        <p class="title">工作背景</p>
      </div>
      <el-table
        :data="info.work"
        border
        style="width:auto;margin: 10px 30px 20px"
        :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
      >
        <el-table-column prop="company" label="工作单位"></el-table-column>
        <el-table-column prop="job" label="职务"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>

      <div class="nba">
        <p class="title">社会背景</p>
      </div>
      <el-table
        :data="info.society"
        border
        style="width:auto;margin: 10px 30px 20px"
        :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
      >
        <el-table-column prop="company" label="工作单位"></el-table-column>
        <el-table-column prop="job" label="职务"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>

      <div class="nba">
        <p class="title">教育背景</p>
      </div>
      <el-table
        :data="info.education"
        border
        style="width:auto;margin: 10px 30px 20px"
        :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
      >
        <el-table-column prop="finishTimeStart" label="开始时间"></el-table-column>
        <el-table-column prop="finishTimeEnd" label="结束时间"></el-table-column>
        <el-table-column prop="school" label="学校"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="education" label="学历"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>

      <div class="nba">
        <p class="title">习惯信息</p>
      </div>
      <el-table
        :data="info.habbit"
        border
        style="width:auto;margin: 10px 30px 20px"
        :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
      >
        <el-table-column prop="life" label="生活"></el-table-column>
        <el-table-column prop="character" label="性格"></el-table-column>
        <el-table-column prop="remark" label="其他"></el-table-column>
        <el-table-column prop="love" label="爱好"></el-table-column>
      </el-table>

      <div class="nba">
        <p class="title">亲友信息</p>
      </div>
      <el-table
        :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
        border
        fit
        highlight-current-row
        :data="info.relative"
        style="width:auto;margin: 10px 30px 0"
        :default-sort="{prop: 'date', order: 'ascending'}"
      >
        <el-table-column align="center" prop="id" label="会员ID" width="auto"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="auto"></el-table-column>
        <el-table-column align="center" prop="relationshipName" label="关系" width="auto"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别" width="auto">
          <template slot-scope="scope">{{scope.row.sex==1?'男':'女'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="phone" label="手机号码" width="auto"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import api from "../../../api/api";

export default {
  name: "baseInfo",
  props: ["canEdit"],
  data() {
    return {
      info: {},
      relationships: {},
    };
  },
  created() {
    console.log(this.canEdit);
    // 获取信息
    api
      .postFormAPI("patient/info", {
        sid: localStorage.getItem("patient_sid"),
        id: localStorage.getItem("patient_patientId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          let data = res.data.data;
          if (data.area != "") {
            // 获取地区树形列表
            api
              .postFormAPI("common/getAreaTree", {
                sid: localStorage.getItem("patient_sid"),
              })
              .then((res) => {
                if (res.data.result != 1) {
                  return;
                }
                const areslist = res.data.data;
                const aresArr = data.area.split(",");
                data.area = "";
                data.area = this.getAreaCode(areslist, aresArr, 0, data.area);
              })
              .catch((err) => console.log(err));
          }
          data.habbit = [data.habbit];
          this.info = data;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    this.getDicList("relationship");
  },
  methods: {
    // 地址编码转换成中文
    getAreaCode(areslist, aresArr, index, str) {
      if (index == aresArr.length) {
        return str;
      }
      for (let i = 0; i < areslist.length; i++) {
        if (aresArr[index] == areslist[i].area_code) {
          if (index == 0) {
            str += areslist[i].area_name;
          } else {
            str = str + "-" + areslist[i].area_name;
          }
          str = this.getAreaCode(areslist[i].children, aresArr, index + 1, str);
          return str;
        }
      }
    },
    getDicList(e) {
      api
        .postFormAPI("common/getDicByKey", {
          sid: localStorage.getItem("patient_sid"),
          key: e,
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            data.forEach((item) => {
              this.$set(this[e + "s"], item.key, item.value);
            });
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    editView() {
      this.$emit("changeTab", "baseInfoEdit");
    },
  },
};
</script>
<style lang='scss' scoped>
.baseInfo-components {
  overflow: hidden;
  margin-bottom: 20px;
  .dialog-footer {
    text-align: center;
  }
  .label {
    color: #606266;
    margin-left: 40px;
  }
  .add {
    border-bottom: 1px solid #e5e5e5;
    p {
      color: #535351;
      font-size: 16px;
      font-weight: bold;
      margin-top: 0px;
    }
  }
  .a {
    p {
      font-weight: bold;
    }
  }
  .ccd {
    color: #f26154;
    font-weight: bold;
  }
  .getgold_top_head_img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }
  .nba p {
    /*margin-left: 20px;*/
    border-left: 2px solid #409eff;
    padding-left: 10px;
  }
  .name {
    margin-left: 10px;
    font-size: 17px;
  }
  .infospan {
    margin-left: 10px;
  }
  .el-row > p {
    font-size: 17px;
  }
  .comment {
    margin-left: 15px !important;
  }
  .edit_btn {
    float: right;
    margin-right: 12px;
    margin-bottom: 12px;
  }
}
</style>
<style lang="scss" >
.baseInfo-components {
  table tr td,
  table tr th {
    text-align: center;
  }
  .el-row {
    font-size: 14px;
  }
  .el-col {
    color: #606266;
    padding: 10px 0;
  }
  .el-radio-button {
    padding: 0px 10px;
  }
  .el-radio-button--medium .el-radio-button__inner {
    border-radius: 5px !important;
  }
  .el-checkbox-button__inner {
    border-left: 1px solid #dcdfe6;
    width: 90px;
  }
  .el-checkbox-button,
  .el-checkbox-button__inner {
    padding: 0px 10px;
    border-radius: 20px !important;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    border-bottom: 1px solid #e4e7ed;
    border-radius: 5px !important;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #e4e7ed;
    color: #fff;
    background-color: #409eff;
  }
}
</style>
