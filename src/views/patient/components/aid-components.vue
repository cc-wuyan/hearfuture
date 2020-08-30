<template>
  <div class="adultRecoveryCase">
    <div class="contain">
      <div class="common-wrapper">
        <div class="title title-width">助听器/人工耳蜗佩戴史</div>
        <div class="content-wrapper">
          <div class="flex-row">
            <div class="flex-case">
              <div class="label">首次佩戴时间：{{userInfo.firstWearTime}}</div>
            </div>
            <div class="flex-case">
              <div class="label">历史拥有助听器数量：{{userInfo.audiphoneCount}}</div>
            </div>
          </div>
          <div class="chrunk">
            <div class="chrunk-title">现有助听器:</div>
            <div class="table_wrapper">
              <table class="table">
                <tr>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <div class="img-left"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="img-right"></div>
                  </td>
                </tr>
              </table>
              <div class="slide_wrapper">
                <table class="table">
                  <tr>
                    <th>验配时间</th>
                    <th>外观类型</th>
                    <th>品牌</th>
                    <th>型号</th>
                    <th>价格</th>
                    <th>佩戴时长</th>
                    <th>满意程度</th>
                    <th>有无过敏</th>
                  </tr>
                  <tr>
                    <td>{{userInfo.leftMatchingTime}}</td>
                    <td>
                      <div
                        v-if="appearances[userInfo.leftAppearanceType]!=undefined"
                      >{{appearances[userInfo.leftAppearanceType]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="brands[userInfo.leftBrand]!=undefined"
                      >{{brands[userInfo.leftBrand]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="models[userInfo.leftModel]!=undefined"
                      >{{models[userInfo.leftModel]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div v-if="userInfo.leftPrice!=''">{{userInfo.leftPrice}}元</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div v-if="userInfo.leftWearTime!=''">{{wearTimeList[userInfo.leftWearTime]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="userInfo.leftSatisfied!=''"
                      >{{satisfiedList[userInfo.leftSatisfied]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="userInfo.leftIsAllergy!=''"
                      >{{isAllergyList[userInfo.leftIsAllergy]}}</div>
                      <div v-else></div>
                    </td>
                  </tr>
                  <tr>
                    <td>{{userInfo.rightMatchingTime ? '' : userInfo.rightMatchingTime}}</td>
                    <td>
                      <div
                        v-if="appearances[userInfo.rightAppearanceType]!=undefined"
                      >{{appearances[userInfo.rightAppearanceType]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="brands[userInfo.rightBrand]!=undefined"
                      >{{brands[userInfo.rightBrand]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="models[userInfo.rightModel]!=undefined"
                      >{{models[userInfo.rightModel]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div v-if="userInfo.rightPrice!=''">{{userInfo.rightPrice}}元</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="userInfo.rightWearTime!=''"
                      >{{wearTimeList[userInfo.rightWearTime]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="userInfo.rightSatisfied!=''"
                      >{{satisfiedList[userInfo.rightSatisfied]}}</div>
                      <div v-else></div>
                    </td>
                    <td>
                      <div
                        v-if="userInfo.rightMatchingTime > 0"
                      >{{isAllergyList[userInfo.rightIsAllergy]}}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="flex-row">
            <div class="left-label al-t">现有助听器不足：</div>
            <ol>
              <li v-if="userInfo.audiphoneInsufficient.includes('1')">嘈杂环境听不清</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('2')">看电视听不清</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('3')">打电话听不清</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('4')">大声音不舒服</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('5')">操作不方便</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('6')">小声音听不清</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('7')">啸叫</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('8')">不易操作</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('9')">助听器老化</li>
              <li v-if="userInfo.audiphoneInsufficient.includes('10')">美观问题</li>
              <li
                v-if="userInfo.audiphoneInsufficient.includes('11')"
              >{{userInfo.audiphoneInsufficientTitle}}</li>
            </ol>
          </div>
        </div>
      </div>
      <div class="common-wrapper">
        <div class="title">言语矫治史</div>
        <div class="content-wrapper">
          <div class="flex-row bottom">
            <div class="flex-case al-t">
              <div v-if="userInfo.isSpeechCorrection==1">有</div>
              <div v-if="userInfo.isSpeechCorrection==0">无</div>
              <div
                v-if="userInfo.speechCorrectionDetail!=null"
              >{{"，"+userInfo.speechCorrectionDetail}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";
import { getHistory, getCommonKey } from "@/api/patient";
export default {
  name: "aid",
  data() {
    return {
      userInfo: {
        firstWearTime: "",
        audiphoneCount: "",
        leftMatchingTime: "",
        rightMatchingTime: "",
        leftAppearanceType: "",
        rightAppearanceType: "",
        leftBrand: "",
        rightBrand: "",
        leftModel: "",
        rightModel: "",
        leftPrice: "",
        rightPrice: "",
        leftWearTime: "",
        rightWearTime: "",
        leftSatisfied: "",
        rightSatisfied: "",
        leftIsAllergy: "",
        rightIsAllergy: "",
        audiphoneInsufficient: [],
        audiphoneInsufficientTitle: "",
        isSpeechCorrection: "",
        speechCorrectionDetail: "",
      },

      findTimeList: ["最近7天", "1个月", "3个月", "4-6个月", "5-1年"],
      processList: ["渐进性", "突发性", "波动性"],
      bigsoundList: ["无", "有"],
      appearances: {},
      brands: {},
      models: {},
      wearTimeList: ["", "0-3个月", "3个月-1年", "一年以上"],
      satisfiedList: ["", "不满意", "满意", "非常满意"],
      isAllergyList: ["无", "有"],
    };
  },
  created() {
    this.recordId = this.$route.params.recordId;
    this.init();
  },
  methods: {
    // 初始化数据
    init() {
      // 获取听觉康复史
      api
        .postFormAPI("patientHearrebuildHistory/getInfo", {
          sid: localStorage.getItem("patient_sid"),
          patientId: localStorage.getItem("patient_patientId"),
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data;
          for (let key in this.userInfo) {
            if (data.hasOwnProperty(key)) {
              switch (key) {
                case "audiphoneInsufficient":
                  {
                    data[key] = data[key].split(",");
                  }
                  break;
              }
              this.userInfo[key] = data[key];
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));

      // 获取数据字典
      this.getDataDictionaryForRelation("appearance");
      this.getDataDictionaryForRelation("brand");
      this.getDataDictionaryForRelation("model");
    },

    // 获取数据字典
    getDataDictionaryForRelation(e) {
      api
        .postFormAPI("common/getDicByKey", {
          sid: localStorage.getItem("patient_sid"),
          patientId: localStorage.getItem("patient_recordId"),
          key: e,
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data;
          data.forEach((item) => {
            this.$set(this[e + "s"], item.key, item.value);
          });
          //数据处理
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.adultRecoveryCase {
  .contain {
    margin: 30px 30px;
    margin-bottom: 80px;
    color: #212121;
  }

  .common-wrapper {
    background-color: #f9f9f9;
    border-radius: 6px;
    margin-bottom: 14px;
    overflow: hidden;
  }

  .title {
    width: 130px;
    height: 44px;
    background-color: #ebf2f5;
    border-radius: 6px 0px 14px 0px;
    text-align: center;
    line-height: 44px;
    font-weight: bold;
    color: #5091c7;
  }

  .content-wrapper {
    padding: 14px 14px;
    padding-bottom: 0;
    overflow: hidden;
    padding-bottom: 14px;
  }
  .title-width {
    width: 220px;
  }

  .flex-row {
    display: flex;
    margin-bottom: 30px;
    .flex-case {
      flex-grow: 1;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      align-content: center;

      &:first-child {
        margin-right: 50px;
      }
    }
    .label {
      align-self: center;
    }
    .al-t {
      align-self: flex-start;
    }
  }
  .chrunk-title {
    margin-bottom: 20px;
  }
  .table_wrapper {
    width: 100%;
    display: flex;
    margin: 14px 0;
  }
  .slide_wrapper {
    flex-grow: 1;
    overflow-x: auto;
    .table {
      width: 860px;
      th,
      td {
        border-left: unset;
        white-space: nowrap;
      }
    }
  }
  .table {
    border-collapse: collapse;
    th,
    td {
      background-color: #fff;
      height: 52px;
      padding: 0 8px;
      font-weight: unset;
      text-align: center;
      border: 1px solid #e4e4e4;
    }
    th {
      background-color: #f1f1f1;
    }
  }

  .no-grow {
    flex: 0;
  }
  .img-left,
  .img-right {
    width: 14px;
    height: 20px;
    background: url("../../../assets/image/icon_ears_left@2x.png") no-repeat;
    background-size: contain;
    margin: 6px;
  }

  .img-right {
    background: url("../../../assets/image/icon_ears_right@2x.png") no-repeat;
    background-size: contain;
  }
  .bottom {
    margin-bottom: 0;
  }
  ol {
    margin-left: 16px;
    list-style: decimal;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li:not(:last-of-type) {
      margin-right: 30px;
    }
  }
}
</style>

