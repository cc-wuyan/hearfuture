<template>
  <div class="SevenStep1DetailInfoEdit">
    <van-form @submit="onSubmit">
      <div class="title">
        <div class="point"></div>
        <p>{{RenderingData.title}}</p>
      </div>
      <el-form ref="ruleForm" :model="RenderingData.chunk[4]" :rules="rules">
        <div class="flex_two_case" v-if="RenderingData">
          <div
            v-for="(item, key) in RenderingData.chunk"
            :key="key"
            class="chunk"
            :style="{'width': item.allWidth ? '100%' : 'calc(calc(100% - 46px) / 2)','margin-left': item.isRight ? '46px' : '0'}"
          >
            <p class="name">{{item.name}}</p>
            <div v-if="item.name == '关系'" class="relation_case" @click="showDiolog()">
              <div v-if="relationValue">{{relationValue}}</div>
              <div v-else>{{item[item.key]}}</div>
              <div class="dropdown_icon"></div>
            </div>
            <div v-else style="width:100%">
              <div v-if="item.name == '时间'" class="relation_case">
                <el-date-picker
                  :editable="false"
                  v-model="item[item.key]"
                  value-format="yyyy-MM"
                  type="monthrange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
              <div v-else-if="item.name == '电话'">
                <el-form-item prop="phone">
                  <el-input v-model="item[item.key]" placeholder></el-input>
                </el-form-item>
              </div>
              <el-input v-else v-model="item[item.key]" placeholder></el-input>
            </div>
          </div>
        </div>
      </el-form>
      <div class="pos_case">
        <div @click="onSave" class="chunk sign"></div>
        <div class="chunk" @click="returnBack()"></div>
        <div class="chunk del" @click="deleteContent()"></div>
      </div>
    </van-form>

    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in relations"
          :key="index"
          class="chunk"
          :class="index == relation_sign ? 'sign' : ''"
          @click="choiseRelation(index)"
        >{{item.title}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import common from "../../utils/common";
import api from "../../api/api";

export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    return {
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
      },
      RenderingData: "",
      initData: [
        {
          title: "编辑家庭背景",
          chunk: [
            {
              name: "姓名",
              tips: "请输入所在地区",
              key: "truename",
            },
            {
              name: "关系",
              tips: "请输入所在地区",
              isRight: true,
              key: "relationVal",
            },
            {
              name: "单位",
              tips: "请输入所在地区",
              key: "company",
            },
            {
              name: "职务",
              tips: "请输入所在地区",
              isRight: true,
              key: "job",
            },
            {
              name: "电话",
              tips: "请输入所在地区",
              key: "phone",
            },
            {
              name: "备注",
              tips: "请输入所在地区",
              isRight: true,
              key: "remark",
            },
          ],
        },
        {
          title: "编辑工作背景",
          chunk: [
            {
              name: "单位",
              tips: "请输入工作单位",
              key: "company",
            },
            {
              name: "职务",
              tips: "请输入职务",
              isRight: true,
              key: "job",
            },
            {
              name: "备注",
              tips: "请输入备注",
              key: "remark",
            },
          ],
        },
        {
          title: "编辑社会背景",
          chunk: [
            {
              name: "单位",
              tips: "请输入单位",
              key: "company",
            },
            {
              name: "职务",
              tips: "请输入职务",
              isRight: true,
              key: "job",
            },
            {
              name: "备注",
              tips: "请输入备注",
              key: "remark",
            },
          ],
        },
        {
          title: "编辑教育背景",
          chunk: [
            {
              name: "学校",
              tips: "请输入学校",
              allWidth: true,
              key: "school",
            },
            {
              name: "时间",
              tips: "请输入时间",
              key: "timeInterval",
            },
            {
              name: "专业",
              tips: "请输入专业",
              isRight: true,
              key: "major",
            },
            {
              name: "学历",
              tips: "请输入学历",
              key: "education",
            },
            {
              name: "备注",
              tips: "请输入备注",
              isRight: true,
              key: "remark",
            },
          ],
        },
        {
          title: "编辑其他信息",
          chunk: [
            {
              name: "习惯",
              tips: "请输入生活习惯",
              allWidth: true,
              key: "life",
            },
            {
              name: "爱好",
              tips: "请输入兴趣爱好",
              allWidth: true,
              key: "love",
            },
            {
              name: "性格",
              tips: "请输入性格",
              allWidth: true,
              key: "character",
            },
            {
              name: "其他",
              tips: "请输入其他",
              allWidth: true,
              key: "remark",
            },
          ],
        },
      ],
      relationship: "",
      dialogVisible: false,
      relations: "",
      relation: "",
      relationValue: "",
      relation_sign: -1,
      keyArr: {},
      apiArr: [
        "patientFamily",
        "patientWork",
        "patientSociety",
        "patientEducation",
        "patientOtherinfo",
      ],
      whichApi: "",
      whichRow: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    onSubmit(values) {
      // console.log("submit", values);
    },
    init() {
      this.patientId = localStorage.getItem("patientId");
      var id = this.$route.query.id;
      var postData;
      // console.log(this.$route.query.postData);
      if (this.$route.query.postData) {
        postData = JSON.parse(this.$route.query.postData);
        this.postData = postData;
      }
      if (this.$route.query.whichRow > -1) {
        this.whichRow = this.$route.query.whichRow;
      }
      var editData = this.postData[this.whichRow];
      this.id = id;
      this.whichApi = this.apiArr[id];
      var RenderingData = JSON.parse(JSON.stringify(this.initData[id]));
      // debugger;
      for (let key in editData) {
        RenderingData.chunk.forEach((item, index) => {
          if (item.key == key) {
            RenderingData.chunk[index][key] = editData[key];
          }
          if (item.key == "timeInterval") {
            RenderingData.chunk[index].timeInterval = [
              editData.finishTimeStart,
              editData.finishTimeEnd,
            ];
          }
        });
      }

      this.RenderingData = RenderingData;
      if (this.id == 0) {
        this.relation = this.postData[this.whichRow].relation;
        this.getDataDictionaryForRelation("relationship");
      }
    },

    choiseRelation(e) {
      this.RenderingData.chunk.forEach((a) => {
        if (a.key == "relation") {
          a.relation = this.relations[e].key;
        }
      });
      this.relation_sign = e;
      this.relation = this.relations[e].key;
      this.relationValue = this.relations[e].value;
      this.dialogVisible = false;
    },
    // 获取数据字典-关系
    getDataDictionaryForRelation(e) {
      api
        .postFormAPI("common/getDicByKey", {
          key: e,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.relations = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    showDiolog() {
      this.dialogVisible = true;
    },
    returnBack() {
      common(this);
    },
    onSave() {
      if (this.$route.query.id == 0) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.save();
          }
        });
        return;
      }
      this.save();
    },
    save() {
      let keyArr = this.RenderingData.chunk.map((a) => a.key);
      var rowObj = {};
      keyArr.forEach((a) => {
        this.RenderingData.chunk.forEach((b) => {
          for (let c in b) {
            if (a == b[c]) {
              rowObj[a] = b[b[c]] ? b[b[c]] : "";
            }
          }
        });
      });
      let flag = false;
      for (let key in rowObj) {
        if (rowObj[key] != "") {
          flag = true;
        }
      }
      // 如果所有字段都为空
      if (!flag) {
        this.$notify({
          message: "请填入信息！",
        });
        return;
      }

      // 如果是家庭背景，数据处理
      if (this.id == 0) {
        // 处理rowObj
        for (let i = 0; i < this.postData.length; i++) {
          delete this.postData[i].relationVal;
        }
        rowObj.relation = this.relation;
        delete rowObj.relationVal;
      }

      // 如果是教育背景，数据处理
      if (this.id == 3 && rowObj.timeInterval.length > 0) {
        rowObj.finishTimeStart = rowObj.timeInterval[0];
        rowObj.finishTimeEnd = rowObj.timeInterval[1];
        delete rowObj.timeInterval;
      }
      var row = this.postData ? JSON.parse(JSON.stringify(this.postData)) : [];
      row.splice(this.whichRow, 1, rowObj);
      if (this.whichApi == "patientOtherinfo") {
        api
          .postFormAPI(this.whichApi + "/submit", {
            patientId: this.patientId,
            life: rowObj["life"],
            love: rowObj["love"],
            character: rowObj["character"],
            remark: rowObj["remark"],
            sid: localStorage.getItem("sid"),
          })
          .then((res) => {
            if (res.data.code == "200") {
              this.$notify({
                message: res.data.message,
              });
              console.log(res.data.message);
            }
            //数据处理
          })
          .catch((err) => console.log(err));
      } else {
        api
          .postFormAPI(this.whichApi + "/submit", {
            patientId: this.patientId,
            list: JSON.stringify(row),
            sid: localStorage.getItem("sid"),
          })
          .then((res) => {
            if (res.data.code == "200") {
              this.$notify({
                message: res.data.message,
              });
              console.log(res.data.message);
            }
            //数据处理
          })
          .catch((err) => console.log(err));
      }

      common(this);
    },
    deleteContent() {
      let keyArr = this.RenderingData.chunk.map((a) => a.key);

      var rowObj = {};
      keyArr.forEach((a) => {
        this.RenderingData.chunk.forEach((b) => {
          for (let c in b) {
            if (a == b[c]) {
              rowObj[a] = b[b[c]] ? b[b[c]] : "";
            }
          }
        });
      });

      var row = this.postData ? JSON.parse(JSON.stringify(this.postData)) : [];
      row.splice(this.whichRow, 1);
      if (this.whichApi == "patientOtherinfo") {
        api
          .postFormAPI(this.whichApi + "/submit", {
            patientId: this.patientId,
            life: rowObj["life"],
            love: rowObj["love"],
            character: rowObj["character"],
            remark: rowObj["remark"],
            sid: localStorage.getItem("sid"),
          })
          .then((res) => {
            if (res.data.code == "200") {
              this.$notify({
                message: res.data.message,
              });
              console.log(res.data.message);
            }
            //数据处理
          })
          .catch((err) => console.log(err));
      } else {
        if (this.id == 0) {
          row.forEach((item) => {
            delete item.relationVal;
          });
        }
        api
          .postFormAPI(this.whichApi + "/submit", {
            patientId: this.patientId,
            list: JSON.stringify(row),
            sid: localStorage.getItem("sid"),
          })
          .then((res) => {
            if (res.data.code == "200") {
              this.$notify({
                message: res.data.message,
              });
              console.log(res.data.message);
            }
            //数据处理
          })
          .catch((err) => console.log(err));
      }
      common(this);
      // 删除按钮
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
      this.nativeCall({ focus: false }, "inputFocus");
    },
    inputFocus() {
      this.nativeCall({ focus: true }, "inputFocus");
    },
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.SevenStep1DetailInfoEdit {
  width: 100%;
  background: #fff;
  padding: 0 30px 30px;
  box-sizing: border-box;
  margin-top: 46px;
  min-height: 100vh;
  .title {
    margin-top: 30px;
    color: rgb(21, 21, 21);
    font-weight: bold;
    display: flex;
    align-items: center;
    .point {
      width: 6px;
      height: 6px;
      background: #24afef;
      margin-right: 10px;
    }
  }
  .flex_two_case {
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .chunk {
      margin-top: 19px;
      height: 100%;
      width: calc(calc(100% - 46px) / 2);
      background: #f9f9f9;
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 0 12px;
      box-sizing: border-box;
      .name {
        padding: 0 8px 0 0;
        box-sizing: border-box;
        flex-shrink: 0;
        text-align: right;
        width: 44px;
      }
      .sex {
        margin-left: 12px;
      }
      .age_sign {
        flex-shrink: 0;
        margin-left: 15px;
      }
      .dropdown {
        flex-grow: 1;
        height: 38px;
        display: flex;
        align-items: center;
      }
    }
    .chunk:nth-child(even) {
      margin-left: 46px;
    }
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 27px;
    display: flex;
    flex-direction: column;
    .chunk {
      width: 80px;
      height: 80px;
      background: #5d5d5d;
      border-radius: 50%;
      color: #fff;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 12px;
      justify-content: center;
      padding: 0 10px;
      box-sizing: border-box;
      background: url("../../assets/image/btn/icon_btn_back@2x.png") no-repeat
        center/contain;
    }
    .sign {
      padding: unset;
      align-items: center;
      background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
        center/contain;
    }
    .del {
      background: #f28b8b;
      background: url("../../assets/image/btn/icon_btn_delete@2x.png") no-repeat
        center/contain;
    }
  }
}

.relation_case {
  width: 100%;
  height: 40px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #646464;
  box-sizing: border-box;
  position: relative;
}
.dropdown_icon {
  width: 16px;
  height: 10px;
  background: url("../../assets/images/icon_more@2x.png") center/cover;
}
</style>


<style lang="scss">
.SevenStep1DetailInfoEdit .van-cell {
  padding: 0;
  height: 38px;
}
.SevenStep1DetailInfoEdit .van-field__label {
  display: none;
}
.SevenStep1DetailInfoEdit .van-radio-group--horizontal {
  -webkit-flex-wrap: unset;
  flex-wrap: unset;
}
.SevenStep1DetailInfoEdit .sex .van-radio__label {
  color: #646464;
}

.SevenStep1DetailInfoEdit .van-field__body {
  height: 100%;
}
.SevenStep1DetailInfoEdit .van-field__control {
  font-size: 18px;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  background: #fff;
}
.SevenStep1DetailInfoEdit .van-field__control::placeholder {
  color: #646464;
}
.SevenStep1DetailInfoEdit .van-picker__cancel {
  font-size: 18px;
}
.SevenStep1DetailInfoEdit .van-picker-column {
  font-size: 18px;
}

.SevenStep1DetailInfoEdit .van-dropdown-menu {
  width: 100%;
  height: 100%;
}
.SevenStep1DetailInfoEdit .van-dropdown-menu__bar {
  height: 100%;
  box-shadow: unset;
}
.SevenStep1DetailInfoEdit .van-dropdown-menu__title {
  font-size: 18px;
  width: 100%;
}
.SevenStep1DetailInfoEdit .van-dropdown-menu__title::after {
  right: 8px;
  width: 16px;
  height: 10px;
  content: "";
  border: unset;
  border-color: unset;
  -webkit-transform: unset;
  transform: unset;
  opacity: unset;
  background: url("../../assets/images/icon_more@2x.png") center/cover;
}

.SevenStep1DetailInfoEdit .van-overlay {
  background-color: rgba(0, 0, 0, 0);
}
.SevenStep1DetailInfoEdit .van-dropdown-item__content {
  box-shadow: 0 0 10px 0 #ddd;
}
.SevenStep1DetailInfoEdit .el-input {
  font-size: 18px;
}
.SevenStep1DetailInfoEdit .el-range-input,
.SevenStep1DetailInfoEdit .el-range-separator {
  font-size: 18px;
}
.SevenStep1DetailInfoEdit .el-form-item {
  margin-bottom: unset;
}
.relation_case {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    position: absolute;
    width: 100%;
    left: 0;
    .el-input--prefix .el-input__inner {
      border: unset;
      border-radius: unset;
      background: unset;
    }
  }
}

// dialog
.dialogModal {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-dialog {
    margin: unset !important;
    border-radius: 10px;
  }
  .el-dialog__header {
    padding: 0;
    text-align: center;
    margin-top: 34px;
  }
  .el-dialog__headerbtn {
    top: 10px;
    right: 10px;
    font-size: 24px;
  }
  .el-dialog__title {
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }
  .options_case {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    .chunk {
      width: 270px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #212121;
    }
    .sign {
      color: #fff;
      background: url("../../assets/images/icon_login_bg@2x.png") center/cover;
    }
  }
}
</style>

