<template>
  <div class="editResult">
    <div class="chunk">
      <van-form @submit="onSubmit">
        <div
          class="flex-row"
          @click="gotoHistoryList()"
          style="justify-content: flex-end;margin-bottom:20px;"
        >查看已录入报告记录</div>
        <div class="flex-row">
          <div class="spot_label al-t">报告单：</div>
          <div class="flex-row flex-wrap">
            <div class="img" v-for="(item, index) in dialogImageUrl" :key="index">
              <img :src="item" />
              <div class="img-close" @click="imgClose(index)"></div>
            </div>
            <div style="margin-left:8px;margin-top:20px">
              <el-upload
                name="history"
                :action="UploadImgUrl"
                list-type="picture-card"
                :on-remove="handleRemove"
                :data="ImgObj"
                :on-success="upSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="flex-row mt-20">
          <div class="flex-col">
            <div class="flex-row">
              <div class="label">录入报告类型：</div>
              <div class="content">
                <div class="dropdown" @click="dialogVisible=true">
                  <div v-if="type_sign>-1">{{types[type_sign].value}}</div>
                  <div v-else-if="this.type!=''">{{typeKey_val[this.type]}}</div>
                  <div v-else>请选择</div>
                  <div class="dropdown_icon"></div>
                </div>
              </div>
            </div>
            <div class="flex-row mt-20">
              <div class="label">检测机构：</div>
              <div class="content">
                <van-field
                  v-model="organization"
                  @focus="inputFocus('judge')"
                  @blur="inputBlur('judge')"
                />
              </div>
            </div>
            <div class="flex-row mt-20">
              <div class="label">录入报告结果：</div>
              <div class="content">
                <van-field
                  v-model="result"
                  @focus="inputFocus('judge')"
                  @blur="inputBlur('judge')"
                />
              </div>
            </div>
          </div>
          <div class="flex-row al-t">
            <div class="label">检验日期：</div>
            <div class="content">
              <div class="calendar">
                <el-date-picker
                  :editable="false"
                  v-model="checkTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row mt-20">
          <div class="label al-t">录入报告内容：</div>
          <van-field
            v-model="content"
            type="textarea"
            autosize
            rows="3"
            @focus="inputFocus('')"
            @blur="inputBlur('')"
          />
        </div>
      </van-form>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" class="dialogModalTips" width="500px">
      <div class="options_case">
        <div
          v-for="(item, index) in types"
          :key="index"
          class="chunk"
          :class="index == type_sign ? 'sign' : ''"
          @click="choise(index)"
        >{{item.title}}</div>
      </div>
    </el-dialog>
    <div class="save-btn" @click="onSave"></div>
    <!-- <div class="cancle-btn" @click="goBack"></div> -->
  </div>
</template>

<script>
import api from "../../api/api";
import common from "../../utils/common";

export default {
  data() {
    return {
      images: [],
      checkTime: "",
      result: "",
      content: "",
      organization: "",
      type: "",
      types: [],
      type_sign: -1,
      typeKey_val: {},
      dialogVisible: false,

      ImgObj: {
        sid: localStorage.getItem("sid"),
      },
      UploadImgUrl: process.env.VUE_APP_ONLINEURL + "/patientHistory/upload",
      dialogImageUrl: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 限制图片上传的格式
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$notify({
          message: "上传报告图片只能是 JPG或PNG 格式!",
        });
      }
    },

    // 移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    upSuccess(e) {
      if (e.result == "1") {
        // 展示的图片列表
        this.dialogImageUrl.push(e.data.urlpath);
        // 上传的图片列表
        this.images.push(e.data.filepath);
        console.log(this.images);
      }
    },
    onSubmit() {},
    init() {
      // 获取报告类型数据字典
      api
        .postFormAPI("patientHistory/getDocumentType", {})
        .then((res) => {
          if (res.data.result == "1") {
            this.types = res.data.data;
            // 生成key-value映射对象
            for (let i = 0; i < this.types.length; i++) {
              this.typeKey_val[this.types[i].key] = this.types[i].value;
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
      // 获取要编辑报告
      if (this.$route.query.id) {
        api
          .postFormAPI("patientHistory/info", {
            sid: localStorage.getItem("sid"),
            id: this.$route.query.id,
          })
          .then((res) => {
            if (res.data.result != 1) {
              return;
            }
            const data = res.data.data;
            this.dialogImageUrl = data.images;
            this.images = data.images.map((item) =>
              item.slice(item.indexOf("upload") + 7)
            );
            this.type = data.type;
            this.organization = data.organization;
            this.checkTime = data.checkTime;
            this.result = data.result;
            this.content = data.content;
          })
          .catch((res) => console.log(res));
      }
    },
    choise(index) {
      if (this.type_sign == index) {
        this.dialogVisible = false;
      } else {
        this.type_sign = index;
        this.type = this.types[index].key;
      }
      this.dialogVisible = false;
    },
    onSave() {
      if (this.images.length == 0) {
        this.$notify({
          message: "需要上传报告单！",
          offset: 100,
        });
        return;
      }
      if (this.type=="") {
         this.$notify({
          message: "请选择报告类型",
          offset: 100,
        });
        return;
      }
      var userInfo = {
        images: this.images.join(","),
        checkTime: this.checkTime,
        result: this.result,
        content: this.content,
        organization: this.organization,
        type: this.type,
        id: this.$route.query.id || 0,
        //
      };

      var row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in userInfo) {
        if (Array.isArray(userInfo[key])) {
          userInfo[key].join(",") == ""
            ? ""
            : (row[key] = userInfo[key].join(","));
        } else {
          userInfo[key] == "" ? "" : (row[key] = userInfo[key]);
        }
      }
      api
        .postFormAPI("patientHistory/edit", row)
        .then((res) => {
          if (res.data.result == "1") {
            this.$notify({
              message: res.data.message,
            });
            setTimeout(() => {
              this.gotoHistoryList();
              this.nativeCall({ index: 5 }, "updateStep");
            }, 1000);
          }
        })
        .catch((res) => console.log(res));
    },
    // 移除图片
    imgClose(index) {
      this.dialogImageUrl.splice(index, 1);
      this.images.splice(index, 1);
    },
    gotoHistoryList() {
      this.$router.push({
        path: "historyResult",
      });
    },
    goBack() {
      common(this);
    },

    // 键盘遮挡问题
    nativeCall(param, nativeMethodName) {
      // param = this.queryParams(param);
      // document.location = "js://" + nativeMethodName + "?" + param;
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
    inputBlur(judge) {
      if (judge && this.images.length < 3) {
        return;
      }
      // console.log("inputBlur");
      this.nativeCall({ focus: false }, "inputFocus");
    },
    inputFocus(judge) {
      if (judge && this.images.length < 3) {
        return;
      }
      this.nativeCall({ focus: true }, "inputFocus");
    },
  },
};
</script>

<style lang="scss" scoped>
.editResult {
  margin: 30px 30px 0;
  color: #212121;

  .img {
    img {
      width: 100%;
      height: 100%;
    }
    margin: 20px 8px 0;
    position: relative;
    width: 148px;
    height: 148px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    .img-close {
      width: 28px;
      height: 28px;
      position: absolute;
      top: -14px;
      right: -14px;
      background: url("../../assets/image/icon_bottom_close@2x.png") no-repeat
        center/contain;
    }
  }
  .chunk {
    background: #f9f9f9;
    border-radius: 5px;
    padding: 20px 16px;
  }
  .flex-row {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .al-t {
    align-self: flex-start;
  }
  .spot_label {
    width: 122px;
    flex-shrink: 0;
    text-align: right;
    margin-top: 20px;
    &::before {
      content: "*";
      display: inline-block;
      margin-right: 6px;
      color: #fc3c3c;
    }
  }
  .label {
    width: 130px;
    text-align: right;
    flex-shrink: 0;
  }
  .content {
    flex-grow: 1;
    height: 38px;
    width: 20px;
  }

  .mt-6 {
    margin-top: 6px;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .dropdown {
    flex-grow: 1;
    height: 38px;
    display: flex;
    align-items: center;
    background: #fff;
    color: #646464;
    padding: 0 8px;
    border-radius: 2px;
    justify-content: space-between;
    .dropdown_icon {
      // right: 8px;
      width: 16px;
      height: 10px;
      background: url("../../assets/images/icon_more@2x.png") center/cover;
    }
  }
  .save-btn {
    width: 80px;
    height: 80px;
    position: fixed;
    right: 20px;
    bottom: 100px;
    border-radius: 50%;
    background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
  .cancle-btn {
    bottom: 100px;
    background: url("../../assets/image/icon_btn_cancle@2x.png") no-repeat
      center/contain;
  }
  .calendar {
    display: flex;
  }
}
</style>

<style lang="scss">
.editResult {
  font-size: 18px;
  .van-field__body{
    height: 100%;
  }
  .van-cell {
    height: 100%;
    padding: 4px 6px;
    border-radius: 2px;
    font-size: 18px;
  }
  .van-field__control {
    color: #646464;
  }
  .calendar {
    height: 100%;
    .van-cell {
      span {
        font-size: 18px;
        color: #646464;
      }
    }
    .van-cell::after {
      width: 18px;
      height: 100%;
      display: block;
      left: unset;
      right: 8px;
      content: "";
      border: unset;
      border-color: unset;
      -webkit-transform: unset;
      transform: unset;
      opacity: unset;
      background: url("../../assets/image/icon_date@2x.png") center/contain
        no-repeat;
    }
  }
  .calendar {
    .el-input__inner {
      font-size: 18px;
      border: unset;
      color: #646464;
      height: 38px;
    }
    .el-input {
      flex-grow: 1;
    }
    .el-input__icon {
      line-height: 38px;
    }
    .el-date-editor.el-input {
      // width: 120px;
      flex-grow: 1;
    }
    .el-input--suffix .el-input__inner {
      padding: 0;
      padding-right: 25px;
      padding-left: 6px;
    }
    .el-input__prefix {
      left: unset;
      right: 0;
    }
  }
  .dropdown_icon {
    // right: 8px;
    margin-right: 6px;
    width: 16px;
    height: 10px;
    background: url("../../assets/images/icon_more@2x.png") center/cover;
  }
  .dialogModalTips {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
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
      font-size: 16px;
      .chunk {
        width: 270px;
        text-align: center;
        color: #212121;
      }
      .sign {
        color: #fff;
        background: url("../../assets/images/icon_login_bg@2x.png") center/cover;
      }
    }
  }
  .el-upload-list {
    display: none;
  }
}
</style>
