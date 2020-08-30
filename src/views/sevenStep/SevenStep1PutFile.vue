<template>
  <div class="SevenStep1PutFile">
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm">
      <div class="title">
        <div class="point"></div>
        <p>患者信息</p>
      </div>
      <div class="flex_two_case">
        <div class="chunk" style="position: relative">
          <span style="position: absolute;color: red;left: -14px;top: 22px;">*</span>
          <p class="name" style="padding: 0 10px;">姓名</p>
          <el-form-item prop="name">
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.name"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <!-- <van-field v-model="name" @input="search" label="文本" placeholder /> -->
          <div class="sex">
            <van-radio-group v-model="sex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="chunk" style="position: relative">
          <span style="position: absolute;color: red;left: -14px;top: 22px;">*</span>
          <p class="name">出生日期</p>
          <el-date-picker
            :editable="false"
            v-model="birthday"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <van-field v-model="name" lahandleChangebel="文本" placeholder /> -->
          <p v-if="age!=''" class="age_sign">{{age}}岁</p>
          <p v-else class="age_sign">岁</p>
        </div>
      </div>

      <div class="flex_two_case">
        <div class="chunk" style="position: relative">
          <span style="position: absolute;color: red;left: -14px;top: 22px;">*</span>
          <p class="name">手机号码</p>
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder></el-input>
          </el-form-item>
        </div>
        <div class="chunk">
          <p class="name">工作单位</p>
          <el-input v-model="workPlace" placeholder></el-input>
        </div>
      </div>
      <div class="flex_two_case">
        <div class="chunk">
          <p class="name">所在地区</p>
          <div class="block">
            <el-cascader
              v-model="areaVal"
              :props="{label: 'area_name',value:'area_code'}"
              :options="areaTreeData"
              @change="handleChangeArea"
              ref="areaDom"
            ></el-cascader>
          </div>
          <!-- <el-input v-model="area" placeholder></el-input> -->
        </div>
        <div class="chunk">
          <p class="name">详细地址</p>
          <el-input v-model="address" placeholder></el-input>
        </div>
      </div>

      <div class="title">
        <div class="point"></div>
        <p>陪同人信息</p>
      </div>
      <div class="flex_two_case">
        <div class="chunk">
          <p class="name">姓名</p>
          <el-input v-model="attendant" placeholder></el-input>
        </div>
        <div class="chunk">
          <p class="name">关系</p>

          <div class="dropdown" @click="showDiolog()">
            <div v-if="relationship">{{relationship}}</div>
            <div v-else>选择关系</div>
            <div class="dropdown_icon"></div>
          </div>
        </div>
      </div>
      <div class="flex_two_case">
        <div class="chunk">
          <p class="name">手机号码</p>
          <el-form-item prop="attendantPhone">
            <el-input v-model="ruleForm.attendantPhone" placeholder></el-input>
          </el-form-item>
        </div>
        <div class="chunk" style="background:unset"></div>
      </div>

      <div class="title">
        <div class="point"></div>
        <p>渠道来源</p>
      </div>

      <div class="flex_special">
        <div class="chunk">
          <p class="name">渠道来源</p>
          <div class="grow_one">
            <div class="block">
              <el-cascader
                v-model="source"
                :props="{label: 'title',value:'key'}"
                :options="wayTypes"
              ></el-cascader>
            </div>
          </div>
        </div>
        <div class="chunk">
          <p class="name">搜索关键词</p>
          <el-input v-model="remark" placeholder @blur="inputBlur" @focus="inputFocus"></el-input>
        </div>
        <div class="chunk">
          <p class="name">介绍人手机号码</p>
          <el-form-item>
            <el-input
              v-model="ruleForm.sharePhone"
              placeholder
              @blur="inputBlur"
              @focus="inputFocus"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="pos_case" @click="saveforMatch()">
        <!-- <van-button round block type="info" native-type="submit">保存</van-button> -->
        <!-- <div native-type="submit" @click="save()" class="chunk sign">
          <i></i>
          <p>保存</p>
        </div>-->
      </div>
    </el-form>

    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModal" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in relationships"
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
import api from "../../api/api";

export default {
  data() {
    // 表单验证
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else {
        // if (!/^([\u4e00-\u9fa5]){2,7}$/.test(value)) {
        //   callback(new Error("请输入合法姓名"));
        // }
        callback();
      }
    };
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
    var attendantPhone = (rule, value, callback) => {
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
    // var sharePhone = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("请输入手机号"));
    //   } else {
    //     if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
    //       callback(new Error("请输入正确的手机号"));
    //     } else {
    //       callback();
    //     }
    //   }
    // };
    return {
      ruleForm: {
        name: "",
        phone: "",
        attendantPhone: "",
        sharePhone: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        // attendantPhone: [{ validator: attendantPhone, trigger: "blur" }],
        // : [{ validator: sharePhone, trigger: "blur" }],
      },

      sex: "",
      source: [],
      relation: "",

      patientId: "",
      restaurants: [],
      state1: "",
      name: "",
      dialogVisible: false,
      birthday: "",
      workPlace: "",
      address: "",
      attendant: "",
      relationships: "",
      relationship: "",
      wayTypes: [],
      remark: "",
      relation_sign: -1,
      userInfo: "",
      areaTreeData: [],
      // 所在地区
      area: "110000,110100,110101",
      // 地区编码
      // areaCode: "110000,110100,110101",
      // 地区编码数组
      areaVal: [],
      nation: "",
    };
  },
  computed: {
    age() {
      if (this.birthday == "" || typeof this.birthday == "undefined") {
        return "";
      } else {
        var age =
          new Date().getFullYear() - Number(this.birthday.slice(0, 4)) + "";
        localStorage.setItem("age", age);
        return age;
      }
    },
  },
  created() {
    this.init();
    this.getAreaTree();
  },
  methods: {
    init() {
      this.getDataDictionaryForRelation("relationship");
      this.getDataDictionaryForRelation("wayType");
      if (localStorage.getItem("patientId")) {
        this.patientId = localStorage.getItem("patientId");
        this.getUserInfo();
      } else {
        this.patientId = 0;
      }
    },
    // 获取数据字典-关系
    getDataDictionaryForRelation(e) {
      api
        .postFormAPI("common/getDicByKey", {
          key: e,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            if (e == "wayType") {
              var initData = res.data.data;
              let row = [];
              // pkey
              initData.forEach((item, index) => {
                if (item.pkey == "wayType") {
                  row.push(item);
                }
              });
              initData.forEach((item, index) => {
                if (item.pkey != "wayType") {
                  row.forEach((item1, index1) => {
                    if (item.pkey == item1.key) {
                      if (item1.children) {
                        item1.children.push(item);
                      } else {
                        item1.children = [];
                        item1.children.push(item);
                      }
                    }
                  });
                }
              });
              initData.forEach((item, index) => {
                if (item.pkey != "wayType") {
                  row.forEach((item1, index1) => {
                    if (item1.children) {
                      item1.children.forEach((item2, index2) => {
                        if (item.pkey == item2.key) {
                          if (item2.children) {
                            item2.children.push(item);
                          } else {
                            item2.children = [];
                            item2.children.push(item);
                          }
                        }
                      });
                    }
                  });
                }
              });
              this.wayTypes = row;
            } else {
              this[e + "s"] = res.data.data;
            }
          }

          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 选择地区,参数为地区编码数组
    handleChangeArea(e) {
      this.area = e.join(",");
    },

    getAreaTree() {
      let area = localStorage.getItem("area");
      if (area != null) {
        this.areaTreeData = JSON.parse(area);
      } else {
        api
          .postFormAPI("common/getAreaTree", {
            sid: localStorage.getItem("sid"),
          })
          .then((res) => {
            if (res.data.result == "1") {
              this.areaTreeData = res.data.data;
              localStorage.setItem("area", JSON.stringify(this.areaTreeData));
            }
            //数据处理
          })
          .catch((err) => console.log(err));
      }
    },

    getUserInfo() {
      api
        .postFormAPI("patient/getInfo", {
          patientId: this.patientId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            let userInfo = res.data.data;
            this.ruleForm.name = userInfo.truename;
            this.sex = userInfo.sex;
            this.birthday = userInfo.birthday;
            this.ruleForm.phone = userInfo.phone;
            this.workPlace = userInfo.workPlace;
            this.area =
              userInfo.area == "" ? "110000,110100,110101" : userInfo.area;
            this.areaVal = this.area != "" ? this.area.split(",") : [];
            this.address = userInfo.address;
            this.attendant = userInfo.attendant;
            this.relation = userInfo.relation;
            // attendantPhone attendantMobile
            this.ruleForm.attendantPhone = userInfo.attendantPhone;
            this.source =
              userInfo.source == "" ? "" : userInfo.source.split(",");
            this.remark = userInfo.remark;
            this.nation = userInfo.nation;
            this.ruleForm.sharePhone = userInfo.sharePhone;
            setTimeout(() => {
              this.relationships.forEach((item, index) => {
                if (item.key == this.relation) {
                  this.relationship = item.title;
                  this.relation_sign = index;
                }
              });
            }, 300);
            this.save();
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 输入后查询
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      api
        .postFormAPI("common/getPatientList", {
          search: queryString,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            var restaurants = res.data.data;
            this.restaurants = res.data.data;
            var results = queryString
              ? restaurants.filter(this.createFilter(queryString))
              : restaurants;
            // 调用 callback 返回建议列表的数据
            results.map((item, index) => {
              results[index].value = item.truename;
            }); //只有value值才能放到预览下拉框
            cb(results);
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 对比输入值查询
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.truename
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    // 搜索之后选择已有的资料
    handleSelect(item) {
      localStorage.setItem("patientId", item.id);
      this.patientId = item.id;
      this.getUserInfo();
    },
    
    showDiolog() {
      this.dialogVisible = true;
    },
    // 选中关系
    choiseRelation(e) {
      this.relation_sign = e;
      this.relation = this.relationships[e].key;
      this.relationship = this.relationships[e].value;
      this.dialogVisible = false;
    },
    save() {
      // 表单验证
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        var initRow = {
          truename: this.ruleForm.name,
          sex: this.sex,
          birthday: this.birthday,
          phone: this.ruleForm.phone,
          workPlace: this.workPlace,
          age: this.age,
          area: this.area,
          address: this.address,
          attendant: this.attendant,
          relation: this.relation,
          attendantPhone: this.ruleForm.attendantPhone,
          source: this.source,
          remark: this.remark,
          nation: this.nation,
          sharePhone: this.ruleForm.sharePhone,
        };

        var row = {
          sid: localStorage.getItem("sid"),
          patientId: this.patientId,
        };
        for (var key in initRow) {
          if (initRow[key]) {
            row[key] = initRow[key];
          }
          if (Array.isArray(row[key])) {
            row[key] = row[key].join(",");
          }
        }
        api
          .postFormAPI("patient/submit", row)
          .then((res) => {
            if (res.data.result == "0") {
              this.$notify({
                message: res.data.message,
              });
              return;
            }
            if (res.data.result == "1") {
              localStorage.setItem("recordId", res.data.data.recordId);
              localStorage.setItem("patientId", res.data.data.patientId);
              this.patientId = res.data.data.patientId;
            }
            // this.$notify({
            //   message: res.data.message,
            // });
            this.nativeCall(
              {
                patientId: this.patientId,
                recordId: localStorage.getItem("recordId"),
                res: JSON.stringify(res),
              },
              "postId"
            );
            // this.$router.push("SevenStep1DetailInfo");
            // window.GETSIDCallback();
            //数据处理
          })
          .catch((err) => console.log(err));
      });
    },
    saveforMatch() {
      // 表单验证
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.birthday == "") {
          this.$notify({
            message: "请填写出生日期",
          });
          return false;
        }
        var initRow = {
          truename: this.ruleForm.name,
          sex: this.sex,
          birthday: this.birthday,
          phone: this.ruleForm.phone,
          workPlace: this.workPlace,
          age: this.age,
          area: this.area,
          address: this.address,
          attendant: this.attendant,
          relation: this.relation,
          attendantPhone: this.ruleForm.attendantPhone,
          source: this.source,
          remark: this.remark,
          nation: this.nation,
          sharePhone: this.ruleForm.sharePhone,
        };

        var row = {
          sid: localStorage.getItem("sid"),
          patientId: this.patientId,
        };
        for (var key in initRow) {
          if (initRow[key]) {
            row[key] = initRow[key];
          }
          if (Array.isArray(row[key])) {
            row[key] = row[key].join(",");
          }
        }
        api
          .postFormAPI("patient/submit", row)
          .then((res) => {
            if (res.data.result == "0") {
              this.$notify({
                message: res.data.message,
              });
              return;
            }
            if (res.data.result == "1") {
              localStorage.setItem("recordId", res.data.data.recordId);
              localStorage.setItem("patientId", res.data.data.patientId);
              this.patientId = res.data.data.patientId;
              this.startFitting(JSON.stringify(res));
              this.$notify({
                message: res.data.message,
              });
            }

            this.nativeCall(
              {
                patientId: this.patientId,
                recordId: localStorage.getItem("recordId"),
                res: JSON.stringify(res),
              },
              "postId"
            );
            this.nativeCall({ index: 1 }, "updateStep");

            // this.$router.push("SevenStep1DetailInfo");
          })
          .catch((err) => console.log(err));
      });
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
      return _result.length ? prefix + _result.join("&") : "";
    },
    nativeCall(param, nativeMethodName) {
      // param = this.queryParams(param);
      // document.location = "js://" + nativeMethodName + "?" + param;
    },
    startFitting(res1) {
      if (localStorage.getItem("recordId")) {
        api
          .postFormAPI("patientMatchRecord/startMatch", {
            recordId: localStorage.getItem("recordId"),
          })
          .then((res) => {
            this.nativeCall(
              {
                patientId: localStorage.getItem("patientId"),
                recordId: localStorage.getItem("recordId"),
                res: res1,
              },
              "startFitting"
            );
          })
          .catch((res) => console.log(res));
      } else {
        this.$notify({
          message: "请先保存个人信息！",
        });
      }
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
.SevenStep1PutFile {
  width: 100%;
  background: #fff;
  padding: 0 30px 30px;
  margin-top: 46px;
  box-sizing: border-box;
  .title {
    margin-top: 30px;
    color: #212121;
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
    margin-top: 19px;
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    .chunk {
      height: 100%;
      flex: 1;
      background: #f9f9f9;
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 0 12px;
      box-sizing: border-box;
      flex-shrink: 0;
      .block {
        width: 100%;
      }
      .name {
        padding: 0 8px 0 0;
        box-sizing: border-box;
        flex-shrink: 0;
        width: 80px;
        text-align-last: justify;
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
        background: #fff;
        padding: 0 8px;
        justify-content: space-between;
      }
    }
    .chunk:last-child {
      margin-left: 46px;
    }
  }
  .flex_special {
    margin-top: 19px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .chunk {
      width: 100%;
      background: #f9f9f9;
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 6px 12px;
      box-sizing: border-box;
      .name {
        padding: 0 8px 0 0;
        box-sizing: border-box;
        flex-shrink: 0;
        width: 136px;
        text-align-last: justify;
      }
      .grow_one {
        flex-grow: 1;
        display: flex;
        align-items: center;
        .block {
          width: 100%;
        }
        .dropdown {
          flex-grow: 1;
          height: 38px;
          display: flex;
          align-items: center;
          background: #fff;
          padding: 0 8px;
          justify-content: space-between;
        }
        .dropdown:nth-child(2) {
          margin: 0 26px;
        }
      }
    }
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 27px;
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 80px;
    background: url("../../assets/image/btn/icon_btn_start@2x.png") no-repeat
      center/contain;
  }
}
</style>
<style lang="scss">
.SevenStep1PutFile .el-autocomplete {
  flex-shrink: 0;
  width: 100%;
}
.SevenStep1PutFile .el-input {
  font-size: 16px;
}
.SevenStep1PutFile .van-cell {
  padding: 0;
  height: 38px;
}
.SevenStep1PutFile .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.SevenStep1PutFile .el-cascader {
  width: 100%;
}
.SevenStep1PutFile .van-field__label {
  display: none;
}
.SevenStep1PutFile .van-radio-group--horizontal {
  -webkit-flex-wrap: unset;
  flex-wrap: unset;
}
.SevenStep1PutFile .sex .van-radio__label {
  color: #646464;
}

.SevenStep1PutFile .van-field__body {
  height: 100%;
}
.SevenStep1PutFile .van-field__control {
  font-size: 18px;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  background: #fff;
}
.SevenStep1PutFile .van-field__control::placeholder {
  color: #646464;
}
.SevenStep1PutFile .van-picker__cancel {
  font-size: 18px;
}
.SevenStep1PutFile .van-picker-column {
  font-size: 18px;
}

.SevenStep1PutFile .van-dropdown-menu {
  width: 100%;
  height: 100%;
}
.SevenStep1PutFile .van-dropdown-menu__bar {
  height: 100%;
  box-shadow: unset;
}
.SevenStep1PutFile .van-dropdown-menu__title {
  font-size: 18px;
  width: 100%;
}
.SevenStep1PutFile .dropdown_icon {
  // right: 8px;
  width: 16px;
  height: 10px;
  background: url("../../assets/images/icon_more@2x.png") center/cover;
}

.SevenStep1PutFile .van-overlay {
  background-color: rgba(0, 0, 0, 0);
}
.SevenStep1PutFile .van-dropdown-item__content {
  box-shadow: 0 0 10px 0 #ddd;
}
.SevenStep1PutFile .el-form-item {
  margin-bottom: unset;
  width: 100%;
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
    font-size: 3px;
  }
  .el-dialog__title {
    font-size: 30px;
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
