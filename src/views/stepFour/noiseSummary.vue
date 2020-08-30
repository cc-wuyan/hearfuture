<template>
  <div class="noiseSummary">
    <div class="chunk_list">
      <p class="title">听力损失概率</p>
      <div>
        <div>
          <div class="name">本人</div>
          <div class="num">{{score}}</div>
        </div>
        <div>
          <div class="name">家属</div>
          <div class="num">{{reconfirmScore}}</div>
        </div>
      </div>
    </div>
    <div class="chunk_list">
      <p class="title">聆听声景选择</p>
      <div>
        <div>
          <div class="name">本人</div>
          <div class="img_case">
            <div v-for="(item, index) in soundscapeList" :key="index">
              <img :src="item.pic" alt />
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="name">家属</div>
          <div class="img_case">
            <div v-for="(item, index) in soundscapeReconfirmList" :key="index">
              <img :src="item.pic" alt />
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chunk_list">
      <p class="title">噪声级别选择</p>
      <div>
        <div>
          <div class="name">本人</div>
          <div class="img_case">
            <div v-for="(item,index) in level" :key="index">
              <img v-if="item==1" src="../../assets/image/noiseLeavel1.png" alt />
              <img v-if="item==2" src="../../assets/image/noiseLeavel2.png" alt />
              <img v-if="item==3" src="../../assets/image/noiseLeavel3.png" alt />
              <img v-if="item==4" src="../../assets/image/noiseLeavel4.png" alt />
              <p v-if="item==1">强噪声</p>
              <p v-if="item==2">噪杂</p>
              <p v-if="item==3">轻噪声</p>
              <p v-if="item==4">安静</p>
            </div>
          </div>
        </div>
        <div>
          <div class="name">家属</div>
          <div class="img_case">
            <div v-for="(item,index) in levelReconfirm" :key="index">
              <img v-if="item==1" src="../../assets/image/noiseLeavel1.png" alt />
              <img v-if="item==2" src="../../assets/image/noiseLeavel2.png" alt />
              <img v-if="item==3" src="../../assets/image/noiseLeavel3.png" alt />
              <img v-if="item==4" src="../../assets/image/noiseLeavel4.png" alt />
              <p v-if="item==1">强噪声</p>
              <p v-if="item==2">噪杂</p>
              <p v-if="item==3">轻噪声</p>
              <p v-if="item==4">安静</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chunk_list">
      <p class="title">聆听距离选择</p>
      <div>
        <div>
          <div class="name">本人</div>
          <div class="img_case">
            <div v-for="(item, index) in distance" :key="index">
              <img v-if="item==1" src="../../assets/image/noise_distance1.png" alt />
              <img v-if="item==2" src="../../assets/image/noise_distance2.png" alt />
              <img v-if="item==3" src="../../assets/image/noise_distance3.png" alt />
              <p v-if="item==1">近场</p>
              <p v-if="item==2">中场</p>
              <p v-if="item==3">远场</p>
            </div>
          </div>
        </div>
        <div>
          <div class="name">家属</div>
          <div class="img_case">
            <div v-for="(item, index) in distanceReconfirm" :key="index">
              <img v-if="item==1" src="../../assets/image/noise_distance1.png" alt />
              <img v-if="item==2" src="../../assets/image/noise_distance2.png" alt />
              <img v-if="item==3" src="../../assets/image/noise_distance3.png" alt />
              <p v-if="item==1">近场</p>
              <p v-if="item==2">中场</p>
              <p v-if="item==3">远场</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div @click="nextStep()" class="next_btn"></div> -->
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      userInfo: {
        phone: "",
      },
      score: 0,
      reconfirmScore: 0,
      soundscapeList: [],
      soundscapeReconfirmList: [],
      level: [],
      levelReconfirm: [],
      distance: [],
      distanceReconfirm: [],
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      //听力损失概率
      api
        .postFormAPI("patientTestpaper/getPaperListByStep", {
          recordId: localStorage.getItem("recordId"),
          processKey: "health_questionnaire_adult",
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            if (res.data.data.length > 0) {
              var list = res.data.data[0].analysis;
              if (list.length > 0) {
                var score = parseFloat(res.data.data[0].score);
                var reconfirmScore = parseFloat(
                  res.data.data[0].reconfirmScore
                );
                list.forEach((el) => {
                  if (el.minScore <= score && el.maxScore >= score) {
                    this.score = el.result;
                  }
                  if (
                    el.minScore <= reconfirmScore &&
                    el.maxScore >= reconfirmScore
                  ) {
                    this.reconfirmScore = el.result;
                  }
                });
              }
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
      //获取三大场景选择
      api
        .postFormAPI("patientChoice/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            var soundscape = res.data.data.soundscape.split(",");
            var soundscapeReconfirm = res.data.data.soundscapeReconfirm.split(
              ","
            );
            this.level = res.data.data.level.split(",");
            this.levelReconfirm = res.data.data.levelReconfirm.split(",");
            this.distance = res.data.data.distance.split(",");
            this.distanceReconfirm = res.data.data.distanceReconfirm.split(",");
            //获取聆听声景列表
            api
              .postFormAPI("soundscape/getAllSoundscape", {
                recordId: localStorage.getItem("recordId"),
                sid: localStorage.getItem("sid"),
              })
              .then((res) => {
                if (res.data.result == "1") {
                  if (res.data.data.length > 0) {
                    // 按顺序回填
                    soundscape.forEach((item, index) => {
                      res.data.data.forEach((el) => {
                        if (el.id == item) {
                          var obj = {};
                          obj.pic = el.pic;
                          obj.title = el.title;
                          this.soundscapeList.push(obj);
                        }
                      });
                    });
                    // 按顺序回填
                    soundscapeReconfirm.forEach((item, index) => {
                      res.data.data.forEach((el) => {
                        if (el.id == item) {
                          var obj = {};
                          obj.pic = el.pic;
                          obj.title = el.title;
                          this.soundscapeReconfirmList.push(obj);
                        }
                      });
                    });
                  }
                }
                //数据处理
              })
              .catch((err) => console.log(err));
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    nextStep() {
      this.nativeCall({ index: 1 }, "diagnosisReport");
      if (
        localStorage.getItem("xqpg") &&
        JSON.parse(localStorage.getItem("xqpg")).length == 4
      ) {
        this.nativeCall({ index: 12 }, "updateStep");
      }
    },
    nativeCall(param, nativeMethodName) {
      param = this.queryParams(param);
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
  components: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.noiseSummary {
  font-size: 16px;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  .chunk_list {
    margin-bottom: 34px;
    display: flex;
    flex-direction: column;
    p {
      width: 100%;
    }
    .title {
      color: #212121;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .name {
      width: 44px;
      height: 100%;
      color: #fff;
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
    }
    .num {
      font-size: 34px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #212121;
      flex-grow: 1;
    }
    .img_case {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      justify-content: space-around;
      align-items: center;
      img {
        width: 90px;
        height: 60px;
        margin-bottom: 10px;
      }
      p{
        text-align: center;
      }
    }
  }
  .chunk_list > div {
    height: 116px;
    display: flex;
    flex-direction: row;
  }
  .chunk_list > div > div {
    display: flex;
    background: #e4f4ff;
    flex: 1;
    border-radius: 14px;
    overflow: hidden;
    .name {
      background: #74bcee;
    }
  }
  .chunk_list > div > div:last-child {
    margin-left: 42px;
    background: #fff8e6;
    .name {
      background: #e6aa05;
    }
  }
  .next_btn {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    bottom: 90px;
    background: url("../../assets/image/icon_btn_next@2x.png") no-repeat
      center/cover;
  }
}
</style>
<style lang="scss">
</style>
