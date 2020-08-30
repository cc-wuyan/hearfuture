<template>
  <div class="SevenStep1DetailInfo">
    <van-form @submit="onSubmit">
      <div class="title">
        <div class="left">
          <div class="point"></div>
          <p>家庭背景</p>
        </div>
        <div class="right" @click="gotoAdd(0)">增加</div>
      </div>
      <div class="table_wrapper">
        <div class="colum">
          <div class="row flex1">家庭成员</div>
          <div class="row flex1">关系</div>
          <div class="row flex1">单位</div>
          <div class="row flex1">职务</div>
          <div class="row flex1_5">电话</div>
          <div class="row flex1">备注</div>
        </div>
        <div
          class="colum"
          v-for="(item, index) in patientFamily"
          :key="index"
          @click="gotoEditPage(0,index)"
        >
          <div class="row flex1">{{item.truename}}</div>
          <div class="row flex1">{{item.relationVal}}</div>
          <div class="row flex1">{{item.company}}</div>
          <div class="row flex1">{{item.job}}</div>
          <div class="row flex1_5">{{item.phone}}</div>
          <div class="row flex1">{{item.remark}}</div>
        </div>
      </div>

      <div class="title">
        <div class="left">
          <div class="point"></div>
          <p>工作背景</p>
        </div>
        <div class="right" @click="gotoAdd(1)">增加</div>
      </div>

      <div class="table_wrapper">
        <div class="colum">
          <div class="row flex2">工作单位</div>
          <div class="row flex1">职务</div>
          <div class="row flex1">备注</div>
        </div>
        <div
          class="colum"
          v-for="(item, index) in patientWork"
          :key="index"
          @click="gotoEditPage(1,index)"
        >
          <div class="row flex2">{{item.company}}</div>
          <div class="row flex1">{{item.job}}</div>
          <div class="row flex1">{{item.remark}}</div>
        </div>
      </div>

      <div class="title">
        <div class="left">
          <div class="point"></div>
          <p>社会背景</p>
        </div>
        <div class="right" @click="gotoAdd(2)">增加</div>
      </div>

      <div class="table_wrapper">
        <div class="colum">
          <div class="row flex2">单位</div>
          <div class="row flex1">职务</div>
          <div class="row flex1">备注</div>
        </div>
        <div
          class="colum"
          v-for="(item, index) in patientSociety"
          :key="index"
          @click="gotoEditPage(2,index)"
        >
          <div class="row flex2">{{item.company}}</div>
          <div class="row flex1">{{item.job}}</div>
          <div class="row flex1">{{item.remark}}</div>
        </div>
      </div>

      <div class="title">
        <div class="left">
          <div class="point"></div>
          <p>教育背景</p>
        </div>
        <div class="right" @click="gotoAdd(3)">增加</div>
      </div>

      <div class="table_wrapper">
        <div class="colum">
          <div class="row flex1">时间</div>
          <div class="row flex2">学校</div>
          <div class="row flex1">专业</div>
          <div class="row flex1">学历</div>
          <div class="row flex1_5">备注</div>
        </div>
        <div
          class="colum"
          v-for="(item, index) in patientEducation"
          :key="index"
          @click="gotoEditPage(3,index)"
        >
          <div class="row flex1">{{item.finishTimeStart}}至{{item.finishTimeEnd}}</div>
          <div class="row flex2">{{item.school}}</div>
          <div class="row flex1">{{item.major}}</div>
          <div class="row flex1">{{item.education}}</div>
          <div class="row flex1_5">{{item.remark}}</div>
        </div>
      </div>

      <div class="title">
        <div class="left">
          <div class="point"></div>
          <p>其他信息</p>
        </div>
        <div class="right" @click="gotoAdd(4)">编辑</div>
      </div>

      <div class="table_wrapper specialCase">
        <div>
          <div class="colum border-b">
            <div class="row flex2_4">生活习惯</div>
            <div class="row flex7_6" style="background: #fff;">{{patientOtherinfo.life}}</div>
          </div>
          <div class="colum">
            <div class="row flex2_4">兴趣爱好</div>
            <div class="row flex7_6">{{patientOtherinfo.love}}</div>
          </div>
          <div class="colum">
            <div class="row flex2_4">性格</div>
            <div class="row flex7_6">{{patientOtherinfo.character}}</div>
          </div>
          <div class="colum">
            <div class="row flex2_4">其他</div>
            <div class="row flex7_6">{{patientOtherinfo.remark}}</div>
          </div>
        </div>
      </div>
    </van-form>
    <div class="next_btn" @click="nextStep()"></div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      patientId: "",
      patientFamily: "",
      patientWork: "",
      patientSociety: "",
      patientEducation: "",
      patientOtherinfo: "",
      postData: [],
    };
  },

  created() {
    this.patientId = localStorage.getItem("patientId");

    this.init();
  },
  methods: {
    init() {
      this.getpatientFamily();
      this.getpatientWork();
      this.getpatientSociety();
      this.getpatientEducation();
      this.getpatientOtherinfo();
    },

    // 获取家庭背景信息
    getpatientFamily() {
      let checkData = [
        "truename",
        "relation",
        "company",
        "job",
        "phone",
        "remark",
      ];
      api
        .postFormAPI("patientFamily/getInfo", {
          patientId: this.patientId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.patientFamily = res.data.data;
            var initData = res.data.data;
            initData.forEach((item, index) => {
              for (let key in item) {
                if (checkData.indexOf(key) < 0) {
                  delete initData[index][key];
                }
              }
              this.postData[0] = initData;
            });
          }
          api
            .postFormAPI("common/getDicByKey", {
              key: "relationship",
            })
            .then((res) => {
              if (res.data.result != 1) {
                return;
              }
              const data = res.data.data;
              // 生成key和value对应的对象
              let keyValue = {};
              for (let i = 0; i < data.length; i++) {
                // console.log(data[i].key);
                keyValue[data[i].key] = data[i].value;
              }
              for (let i = 0; i < this.patientFamily.length; i++) {
                this.$set(
                  this.patientFamily[i],
                  "relationVal",
                  keyValue[this.patientFamily[i].relation]
                );
              }
            })
            .catch((err) => console.log(err));
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    // 获取工作背景
    getpatientWork() {
      let checkData = ["company", "job", "remark"];
      api
        .postFormAPI("patientWork/getInfo", {
          patientId: this.patientId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.patientWork = res.data.data;

            var initData = res.data.data;
            initData.forEach((item, index) => {
              for (let key in item) {
                if (checkData.indexOf(key) < 0) {
                  delete initData[index][key];
                }
              }
            });
            this.postData[1] = initData;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 获取社会背景
    getpatientSociety() {
      let checkData = ["company", "job", "remark"];
      api
        .postFormAPI("patientSociety/getInfo", {
          patientId: this.patientId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.patientSociety = res.data.data;

            var initData = res.data.data;
            initData.forEach((item, index) => {
              for (let key in item) {
                if (checkData.indexOf(key) < 0) {
                  delete initData[index][key];
                }
              }
            });
            this.postData[2] = initData;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 获取教育背景
    getpatientEducation() {
      let checkData = [
        "finishTimeStart",
        "finishTimeEnd",
        "school",
        "major",
        "education",
        "remark",
      ];
      api
        .postFormAPI("patientEducation/getInfo", {
          patientId: this.patientId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.patientEducation = res.data.data;
            var initData = res.data.data;
            initData.forEach((item, index) => {
              for (let key in item) {
                if (checkData.indexOf(key) < 0) {
                  delete initData[index][key];
                }
              }
            });

            this.postData[3] = initData;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 获取其他信息
    getpatientOtherinfo() {
      let checkData = ["life", "love", "character", "remark"];
      api
        .postFormAPI("patientOtherinfo/getInfo", {
          patientId: this.patientId,
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.patientOtherinfo = res.data.data;

            var initData = res.data.data;
            for (let key in initData) {
              if (checkData.indexOf(key) < 0) {
                delete initData[key];
              }
            }
            this.postData[4] = initData;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    gotoAdd(e) {
      if (this.postData[e]) {
        this.$router.push({
          name: "SevenStep1DetailInfoAdd",
          query: {
            id: e,
            postData: JSON.stringify(this.postData[e]),
          },
        });
      } else {
        this.$router.push({
          name: "SevenStep1DetailInfoAdd",
          query: {
            id: e,
          },
        });
      }
    },
    gotoEditPage(e, index) {
      this.$router.push({
        name: "SevenStep1DetailInfoEdit",
        query: {
          id: e,
          postData: JSON.stringify(this.postData[e]),
          whichRow: index,
        },
      });
    },
    nextStep() {
      this.nativeCall({ index: 1 }, "bookBuildDownStep");
      this.nativeCall({ index: 2 }, "updateStep");
    },
    nativeCall(param, nativeMethodName) {
      // console.log(param);
      // console.log(nativeMethodName);
      param = this.queryParams(param);
      // console.log(param);

      document.location = "js://" + nativeMethodName + "?" + param;
    },
    queryParams(data, isPrefix = false) {
      console.log(data);
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
  },
  watch: {
    patientFamily: {
      handler(newVal) {},
      deep: true,
    },
  },
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.SevenStep1DetailInfo {
  margin-top: 46px;
  width: 100%;
  background: #fff;
  padding: 0 30px 30px;
  box-sizing: border-box;

  .title {
    margin-top: 30px;
    color: rgb(21, 21, 21);
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      width: 74px;
      height: 32px;
      border: 1px solid #48a0dc;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #48a0dc;
    }
    .point {
      width: 6px;
      height: 6px;
      background: #24afef;
      margin-right: 10px;
    }
  }
  .table_wrapper {
    border: 1px solid #b3b3b3;
    margin-top: 12px;
    .colum {
      display: table;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      .row {
        min-height: 48px;
        line-height: 32px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        box-sizing: border-box;
      }
      .row:last-child {
        border-right: unset;
        // border-bottom: unset;
      }
      .flex1 {
        flex: 1;
      }
      .flex2 {
        flex: 2;
      }
      .flex1_5 {
        flex: 1.5;
      }
      .flex2_4 {
        flex: 2.4;
      }
      .flex7_6 {
        flex: 7.6;
      }
    }
    .colum:first-child {
      background: #f9f9f9;
      .row {
        border-right: 1px solid #e4e4e4;
        border-bottom: unset;
      }
      .row:last-child {
        border-right: unset;
        border-bottom: unset;
      }
    }
    .colum:last-child {
      .row {
        border-bottom: unset;
      }
    }
    .border-b {
      border-bottom: 1px solid #e4e4e4;
    }
  }
  .specialCase {
    .colum {
      .row:first-child {
        background: #f9f9f9;
      }
    }
  }
  .pos_case {
    position: fixed;
    right: 18px;
    bottom: 27px;
    display: flex;
    flex-direction: column;
    .chunk {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      color: #fff;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 12px;
      justify-content: center;
      padding: 0 10px;
      box-sizing: border-box;
    }
    i {
      width: 20px;
      height: 20px;
      background: url("../../assets/images/save.png") center/cover;
    }
    .sign {
      padding: unset;
      align-items: center;
      img {
        margin-bottom: 2px;
      }
    }
  }
  .next_btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 30px;
    background: url("../../assets/image/btn/icon_btn_save@2x.png") no-repeat
      center/contain;
  }
}
</style>
