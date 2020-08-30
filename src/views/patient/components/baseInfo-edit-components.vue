<!--  -->
<template>
  <div class="baseInfo-edit-components">
    <!-- 搜索框 start -->
    <div class="filter-container">
      <div class="save_btn">
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
      <div style="height:40px;"></div>
      <div>
        <div class="nba">
          <p class="title">基本信息</p>
        </div>
        <el-row :gutter="10" class="flex_row">
          <el-col :span="12">
            <span class="label">病例号：</span>
            {{info.patientNum}}
          </el-col>
          <el-col :span="12">
            <div class="flex_row">
              <span class="label">民族：</span>
              <el-input v-model="info.nation" />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" class="flex_row">
            <span class="label">性别：</span>
            <van-radio-group v-model="info.sex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="flex_row">
          <el-col :span="12" class="flex_row">
            <span class="label">出生年月：</span>
            <el-date-picker
              :editable="false"
              v-model="info.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="12" class="flex_row">
            <span class="label">手机号码：</span>
            <el-input v-model="info.phone" />
          </el-col>
        </el-row>
        <el-row :gutter="10" class="flex_row">
          <el-col :span="12">
            <span class="label">建档时间：{{info.createtime}}</span>
          </el-col>
          <el-col :span="12" class="flex_row">
            <span class="label">身份证号：</span>
            <el-input v-model="info.cardNum" />
          </el-col>
        </el-row>
        <el-row :gutter="10" class="flex_row">
          <el-col :span="12">
            <span class="label">所在地区：</span>
            <el-cascader
              v-model="info.area"
              :props="{label: 'area_name',value:'area_code'}"
              :options="areaTreeData"
              ref="areaDom"
            ></el-cascader>
          </el-col>
          <el-col :span="12" class="flex_row">
            <span class="label">详细地址：</span>
            <el-input v-model="info.address" />
          </el-col>
        </el-row>
        <el-row :gutter="10" class="flex_row">
          <el-col :span="12" class="flex_row">
            <span class="label">电子邮箱：</span>
            <el-input v-model="info.email" />
          </el-col>
          <el-col :span="12" class="flex_row">
            <span class="label">微信：</span>
            <el-input v-model="info.wechat" />
          </el-col>
        </el-row>
        <div class="nba">
          <p class="title">标签信息</p>
        </div>
        <el-row :gutter="10" class="flex_row">
          <el-col :span="12" class="flex_row">
            <span class="label">支付方：</span>
            <el-input v-model="info.payRole" />
          </el-col>
          <el-col :span="12" class="flex_row">
            <span class="label">意见领袖：</span>
            <el-input v-model="info.suggestLeader" />
          </el-col>
        </el-row>

        <div class="nba">
          <p class="title">家庭背景</p>
          <div class="add_btn" @click="addRow('family')">增加</div>
        </div>
        <el-table
          :data="info.family"
          border
          style="width:auto;margin: 10px 30px 20px"
          :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
        >
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <el-input v-model="scope.row.truename" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="关系">
            <template slot-scope="scope">
              <el-select v-model="scope.row.relation">
                <el-option v-for="(e) in relation" :key="e.key" :value="e.key" :label="e.title"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.company" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="职务">
            <template slot-scope="scope">
              <el-input v-model="scope.row.job" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="电话号码">
            <template slot-scope="scope">
              <el-input v-model="scope.row.phone" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="delRow('family', scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="nba">
          <p class="title">工作背景</p>
          <div class="add_btn" @click="addRow('work')">增加</div>
        </div>
        <el-table
          :data="info.work"
          border
          style="width:auto;margin: 10px 30px 20px"
          :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
        >
          <el-table-column label="工作单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.company" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="职务">
            <template slot-scope="scope">
              <el-input v-model="scope.row.job" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="delRow('work', scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="nba">
          <p class="title">社会背景</p>
          <div class="add_btn" @click="addRow('society')">增加</div>
        </div>
        <el-table
          :data="info.society"
          border
          style="width:auto;margin: 10px 30px 20px"
          :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
        >
          <el-table-column label="工作单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.company" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="职务">
            <template slot-scope="scope">
              <el-input v-model="scope.row.job" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="delRow('society', scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="nba">
          <p class="title">教育背景</p>
          <div class="add_btn" @click="addRow('education')">增加</div>
        </div>
        <el-table
          :data="info.education"
          border
          style="width:auto;margin: 10px 30px 20px;text-align:center;"
          :header-cell-style="{background:'#f3f3f3',borderColor: '#fff'}"
        >
          <el-table-column label="开始时间" width="140">
            <template slot-scope="scope">
              <el-date-picker
                :editable="false"
                v-model="scope.row.finishTimeStart"
                value-format="yyyy-MM"
                type="month"
                placeholder="选择日期"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="结束时间" width="140">
            <template slot-scope="scope">
              <el-date-picker
                :editable="false"
                v-model="scope.row.finishTimeEnd"
                value-format="yyyy-MM"
                type="month"
                placeholder="选择日期"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="学校">
            <template slot-scope="scope">
              <el-input v-model="scope.row.school" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="专业">
            <template slot-scope="scope">
              <el-input v-model="scope.row.major" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="学历">
            <template slot-scope="scope">
              <el-input v-model="scope.row.education" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" @blur="inputBlur" @focus="inputFocus" />
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button @click="delRow('education', scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="nba">
          <p class="title">习惯信息</p>
        </div>
        <div class="habbit_table">
          <table v-if="info.habbit!=undefined">
            <tr>
              <th>生活</th>
              <th>性格</th>
              <th>其他</th>
              <th>爱好</th>
            </tr>
            <tr>
              <td>
                <el-input v-model="info.habbit.life" @blur="inputBlur" @focus="inputFocus" />
              </td>
              <td>
                <el-input v-model="info.habbit.character" @blur="inputBlur" @focus="inputFocus" />
              </td>
              <td>
                <el-input v-model="info.habbit.remark" @blur="inputBlur" @focus="inputFocus" />
              </td>
              <td>
                <el-input v-model="info.habbit.love" @blur="inputBlur" @focus="inputFocus" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../../api/api";

export default {
  name: "baseInfo",
  data() {
    return {
      info: {},
      relation: [],
      areaTreeData: [],
    };
  },
  created() {
    api
      .postFormAPI("patient/info", {
        sid: localStorage.getItem("patient_sid"),
        id: localStorage.getItem("patient_patientId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.info = res.data.data;
          if (this.info.hasOwnProperty("area")) {
            this.info.area = this.info.area.split(",");
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    this.getDicList("relation", "relationship");

    // 获取地区
    api
      .postFormAPI("common/getAreaTree", {
        sid: localStorage.getItem("patient_sid"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.areaTreeData = res.data.data;
        }
        //数据处理
      })
      .catch((err) => console.log(err));
  },
  methods: {
    save() {
      let data = {
        sid: localStorage.getItem("patient_sid"),
        patientId: localStorage.getItem("patient_patientId"),
      };

      data = Object.assign(data, this.info);
      data.area = data.area.join(",");
      // 保存基本信息
      api
        .postFormAPI("patient/submitInfo", data)
        .then((res) => {
          if (res.data.result != 1) {
            this.$notify({
              message: "保存失败",
            });
            return;
          }
          // 保存家庭背景
          api
            .postFormAPI("patientFamily/submit", {
              // sid: localStorage.getItem("sid"),
              // patientId: localStorage.getItem("patientId"),
              sid: localStorage.getItem("patient_sid"),
              patientId: localStorage.getItem("patient_patientId"),
              list: JSON.stringify(this.info.family),
            })
            .then((res) => {
              // 保存工作经历
              api
                .postFormAPI("patientWork/submit", {
                  sid: localStorage.getItem("patient_sid"),
                  patientId: localStorage.getItem("patient_patientId"),
                  list: JSON.stringify(this.info.work),
                })
                .then((res) => {
                  // 保存社会背景
                  api
                    .postFormAPI("patientSociety/submit", {
                      // sid: localStorage.getItem("sid"),
                      // patientId: localStorage.getItem("patientId"),
                      sid: localStorage.getItem("patient_sid"),
                      patientId: localStorage.getItem("patient_patientId"),
                      list: JSON.stringify(this.info.society),
                    })
                    .then((res) => {
                      // 保存教育背景
                      api
                        .postFormAPI("patientEducation/submit", {
                          // sid: localStorage.getItem("sid"),
                          // patientId: localStorage.getItem("patientId"),
                          sid: localStorage.getItem("patient_sid"),
                          patientId: localStorage.getItem("patient_patientId"),
                          list: JSON.stringify(this.info.education),
                        })
                        .then((res) => {
                          // 保存其他信息
                          let d = {
                            // sid: localStorage.getItem("sid"),
                            // patientId: localStorage.getItem("patientId"),
                            sid: localStorage.getItem("patient_sid"),
                            patientId: localStorage.getItem(
                              "patient_patientId"
                            ),
                          };
                          d = Object.assign(d, this.info.habbit);
                          api
                            .postFormAPI("patientOtherinfo/submit", d)
                            .then((res) => {
                              this.$emit("changeTab", "baseInfo");
                            })
                            .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    getDicList(list, e) {
      api
        .postFormAPI("common/getDicByKey", {
          // sid: localStorage.getItem("sid"),
          sid: localStorage.getItem("patient_sid"),
          key: e,
        })
        .then((res) => {
          if (res.data.result == "1") {
            this[list] = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    delRow(field, index) {
      this.info[field].splice(index, 1);
    },
    addRow(field) {
      let e = {};
      if (field == "family") {
        e = {
          truename: null,
          relation: null,
          company: null,
          job: null,
          phone: null,
          remark: null,
        };
      } else if (field == "work") {
        e = {
          company: null,
          job: null,
          remark: null,
        };
      } else if (field == "society") {
        e = {
          company: null,
          job: null,
          remark: null,
        };
      } else if (field == "education") {
        e = {
          finishTimeStart: null,
          finishTimeEnd: null,
          school: null,
          major: null,
          education: null,
          remark: null,
        };
      }
      this.info[field].push(e);
    },
    queryParams(data, isPrefix = false) {
      let prefix = isPrefix ? "?" : "";
      let _result = [];
      for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (["", undefined, null].includes(value)) {
          continue;
        }
        if (value.constructor === Array) {
          value.forEach((_value) => {
            _result.push(
              encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
            );
          });
        } else {
          _result.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(value)
          );
        }
      }
      // console.log(_result.length ? prefix + _result.join("&") : "");
      return _result.length ? prefix + _result.join("&") : "";
    },
    nativeCall(param, nativeMethodName) {
      // console.log(param);
      // console.log(nativeMethodName);
      param = this.queryParams(param);
      // console.log(param);

      document.location = "js://" + nativeMethodName + "?" + param;
    },
    inputBlur() {
      this.nativeCall({ focus: false, path: "caseFile" }, "inputFocus");
    },
    inputFocus() {
      this.nativeCall({ focus: true, path: "caseFile" }, "inputFocus");
    },
  },
};
</script>
<style lang='scss' scoped>
.baseInfo-edit-components {
  overflow: hidden;
  margin-bottom: 20px;
  .dialog-footer {
    text-align: center;
  }
  .label {
    color: #606266;
    flex-shrink: 0;
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
  .save_btn {
    float: right;
    margin: 0 12px 0 0;
  }
  .flex_row {
    display: flex;
    align-items: center;
  }
  .btn_chunk {
    margin-right: 20px;
    margin-left: auto;
  }
  .add_btn {
    width: 28px;
    margin-right: 30px;
    margin-left: auto;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #dcdfe6;
  }
  .habbit_table {
    margin: 10px 30px 20px;
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    th,
    td {
      border: 1px solid #ebeef5;
      line-height: 23px;
      text-align: center;
      padding: 12px 10px;
    }
    th {
      background-color: rgb(243, 243, 243);
      color: #909399;
      font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
.baseInfo-edit-components {
  table tr td,
  table tr th {
    text-align: center;
  }
  .el-row {
    font-size: 14px;
    margin: 0 30px !important;
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
  .el-date-editor.el-input {
    width: 100%;
  }

  .el-table td,
  .el-table th {
    text-align: center;
  }
}
</style>
