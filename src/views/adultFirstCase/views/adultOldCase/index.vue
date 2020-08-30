<template>
  <div class="adultOldCase">
    <div class="contain">
      <van-form @submit="onSubmit">
        <div class="common-wrapper">
          <div class="title">耳病史</div>
          <div class="content-wrapper ebs">
            <div class="flex-row">
              <div class="left-label">耳病诊疗史：</div>
              <div class="right-wrapper bgc checkbox_one">
                <van-checkbox-group v-model="userInfo.otopathy" direction="horizontal">
                  <van-checkbox name="1" shape="square">外耳道炎症</van-checkbox>
                  <van-checkbox name="2" shape="square">中耳炎史</van-checkbox>
                  <van-checkbox name="3" shape="square">鼓膜穿孔</van-checkbox>
                  <van-checkbox name="4" shape="square">梅尼尔症</van-checkbox>
                  <van-checkbox name="5" shape="square">耳硬化症</van-checkbox>
                  <div class="checkwithinput_case">
                    <van-checkbox name="6" shape="square"></van-checkbox>
                    <el-input
                      v-model="userInfo.otopathyTitle"
                      @click.native="focusSelect('其他症状','otopathyTitle')"
                    ></el-input>
                  </div>
                </van-checkbox-group>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">手术史：</div>
              <div class="right-wrapper pl">
                <el-input v-model="userInfo.operation" @click.native="focusSelect('手术史','operation')"></el-input>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">耳毒性药物使用史：</div>
              <div class="right-wrapper pl">
                <div class="flex-row">
                  <div class="leftchunk">
                    <el-input
                      v-model="userInfo.medicine"
                      type="textarea"
                      rows="1"
                      @click.native="focusSelect('药物使用史','medicine')"
                    ></el-input>
                  </div>
                  <div class="rightchunk">
                    <div class="chunk-label">用药原因：</div>
                    <div class="chunk-content">
                      <el-input
                        v-model="userInfo.medicineReason"
                        type="textarea"
                        rows="1"
                        @click.native="focusSelect('用药原因','medicineReason')"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">噪声接触史：</div>
              <div class="right-wrapper pl">
                <div class="flex-row">
                  <div class="leftchunk">
                    <div>
                      <van-radio-group v-model="userInfo.noise" direction="horizontal">
                        <van-radio name="1">有</van-radio>
                        <van-radio name="0">无</van-radio>
                      </van-radio-group>
                    </div>
                    <div class="chunk-content">
                      <el-input
                        v-model="userInfo.noiseDetail"
                        type="textarea"
                        rows="1"
                        @click.native="focusSelect('噪声接触史','noiseDetail')"
                      ></el-input>
                    </div>
                  </div>
                  <div class="rightchunk">
                    <div class="chunk-label">目前是否脱离：</div>
                    <van-radio-group v-model="userInfo.isleave" direction="horizontal">
                      <van-radio name="1">是</van-radio>
                      <van-radio name="0">否</van-radio>
                    </van-radio-group>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">合并其他残疾：</div>
              <div class="right-wrapper bgc">
                <van-checkbox-group v-model="userInfo.otherDeformity" direction="horizontal">
                  <van-checkbox name="1" shape="square">肢体</van-checkbox>
                  <van-checkbox name="2" shape="square">视力</van-checkbox>
                  <van-checkbox name="3" shape="square">智力</van-checkbox>
                  <van-checkbox name="4" shape="square">精神</van-checkbox>
                  <van-checkbox name="5" shape="square">头面部</van-checkbox>
                  <van-checkbox name="6" shape="square">毛发</van-checkbox>
                  <div class="checkwithinput_case">
                    <van-checkbox name="7" shape="square"></van-checkbox>
                    <el-input
                      v-model="userInfo.otherDeformityTitle"
                      @click.native="focusSelect('其他残疾','otherDeformityTitle')"
                    ></el-input>
                  </div>
                </van-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">家族史</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="chunk-content">
                <div class="leftchunk">
                  <div class="chunk-label">家族成员中是否有听障：</div>
                  <div class="chunk-content">
                    <van-radio-group v-model="userInfo.hasFamilyOtopathy" direction="horizontal">
                      <van-radio name="1">有</van-radio>
                      <van-radio name="0">无</van-radio>
                    </van-radio-group>
                  </div>
                </div>
                <div class="leftchunk mt_20">
                  <div class="label">发病时间：</div>
                  <div class="chunk-content">
                    <div class="chunk-content dropdown" @click="showDiolog('time')">
                      <div
                        v-if="this.timeVal[this.userInfo.familyOtopathyFindTime] != undefined"
                      >{{this.timeVal[this.userInfo.familyOtopathyFindTime].title}}</div>
                      <div v-else></div>
                      <div class="dropdown_icon"></div>
                    </div>
                    <!-- <div class="calendar">
                      <el-date-picker
                        :editable="false"
                        v-model="userInfo.familyOtopathyFindTime"
                        type="month"
                        value-format="yyyy-MM"
                      ></el-date-picker>
                    </div>-->
                  </div>
                </div>
              </div>
              <div class="chunk-content">
                <div class="rightchunk">
                  <div class="chunk-label">与患者关系：</div>
                  <div class="chunk-content dropdown" @click="showDiolog('ship')">
                    <div
                      v-if="this.relationships[this.relation_sign] != undefined"
                    >{{this.relationships[this.relation_sign].value}}</div>
                    <div v-else></div>
                    <div class="dropdown_icon"></div>
                  </div>
                </div>
                <div class="rightchunk mt_12">
                  <div class="label">描述：</div>
                  <div class="chunk-content">
                    <el-input
                      v-model="userInfo.familyOtopathyDetail"
                      @blur="inputBlur"
                      @focus="inputFocus"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">既往病史：</div>
          <div class="content-wrapper" style="padding-top:0">
            <div class="flex-row">
              <div class="left-label"></div>
              <div class="right-wrapper bgc">
                <div class="checkbox">
                  <van-checkbox-group v-model="userInfo.previousDiseases" direction="horizontal">
                    <van-checkbox name="1" shape="square">脑膜炎</van-checkbox>
                    <van-checkbox name="2" shape="square">肝炎</van-checkbox>
                    <van-checkbox name="3" shape="square">猩红热</van-checkbox>
                    <van-checkbox name="4" shape="square">腮腺炎</van-checkbox>
                    <van-checkbox name="5" shape="square">高热</van-checkbox>
                    <van-checkbox name="6" shape="square">关节炎</van-checkbox>
                    <van-checkbox name="7" shape="square">过敏</van-checkbox>
                    <van-checkbox name="8" shape="square">颅骨骨折</van-checkbox>
                    <van-checkbox name="9" shape="square">帕金森</van-checkbox>
                    <van-checkbox name="10" shape="square">恶性肿瘤</van-checkbox>
                    <van-checkbox name="11" shape="square">癫痫</van-checkbox>
                    <van-checkbox name="12" shape="square">艾滋病</van-checkbox>
                    <van-checkbox name="13" shape="square">中风</van-checkbox>
                    <van-checkbox name="15" shape="square">麻疹</van-checkbox>
                    <van-checkbox name="14" shape="square">阿尔兹海默症</van-checkbox>
                    <van-checkbox name="16" shape="square">视觉障碍</van-checkbox>
                    <van-checkbox name="18" shape="square">抑郁</van-checkbox>
                    <van-checkbox name="17" shape="square">面部神经麻痹</van-checkbox>
                    <van-checkbox name="19" shape="square">兴奋</van-checkbox>
                    <van-checkbox name="20" shape="square">多发性硬化</van-checkbox>
                    <div class="checkwithinput_case">
                      <van-checkbox name="21" shape="square"></van-checkbox>
                      <el-input
                        v-model="userInfo.previousDiseasesTitle"
                        @click.native="focusSelect('其他往病史','previousDiseasesTitle')"
                      ></el-input>
                    </div>
                  </van-checkbox-group>
                </div>
              </div>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label">精神智力健康：</div>
              <div class="right-wrapper pl">
                <div class="flex-row">
                  <div class="leftchunk">
                    <el-input
                      v-model="userInfo.intellectualHealth"
                      type="textarea"
                      rows="1"
                      @click.native="focusSelect('精神智力健康','intellectualHealth')"
                    ></el-input>
                  </div>
                  <div class="rightchunk">
                    <div class="chunk-label">心理健康状况：</div>
                    <div class="chunk-content">
                      <el-input
                        type="textarea"
                        rows="1"
                        v-model="userInfo.mentalHealth"
                        @click.native="focusSelect('心理健康状况','mentalHealth')"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label">慢性病：</div>
              <div class="right-wrapper bgc">
                <div class="flex-col">
                  <van-checkbox-group v-model="userInfo.chronicDisease" direction="horizontal">
                    <van-checkbox name="1" shape="square">高血压</van-checkbox>
                    <van-checkbox name="2" shape="square">高血脂</van-checkbox>
                    <van-checkbox name="3" shape="square">糖尿病</van-checkbox>
                    <div class="checkwithinput_case">
                      <van-checkbox name="4" shape="square"></van-checkbox>
                      <div class="other">
                        <el-input
                          v-model="userInfo.chronicDiseaseTitle"
                          @click.native="focusSelect('慢性病','chronicDiseaseTitle')"
                        ></el-input>
                      </div>
                    </div>
                  </van-checkbox-group>
                  <div class="rightchunk">
                    <div class="chunk-label">用药史：</div>
                    <div class="chunk-content">
                      <el-input
                        v-model="userInfo.chronicDiseaseMedicine"
                        type="textarea"
                        rows="1"
                        @click.native="focusSelect('用药史','chronicDiseaseMedicine')"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label">过敏史：</div>
              <div class="right-wrapper bgc">
                <van-checkbox-group v-model="userInfo.allergies" direction="horizontal">
                  <van-checkbox name="1" shape="square">药物</van-checkbox>
                  <van-checkbox name="2" shape="square">食物</van-checkbox>
                  <van-checkbox name="3" shape="square">金属</van-checkbox>
                  <div class="checkwithinput_case">
                    <van-checkbox name="4" shape="square"></van-checkbox>
                    <div class="other">
                      <el-input
                        v-model="userInfo.allergiesTitle"
                        @click.native="focusSelect('过敏史','allergiesTitle')"
                      ></el-input>
                    </div>
                  </div>
                </van-checkbox-group>
              </div>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label">植入体：</div>
              <div class="right-wrapper bgc">
                <van-checkbox-group v-model="userInfo.implants" direction="horizontal">
                  <van-checkbox name="1" shape="square">心脏起搏器</van-checkbox>
                  <van-checkbox name="2" shape="square">人工耳蜗</van-checkbox>
                  <div class="checkwithinput_case">
                    <van-checkbox name="3" shape="square"></van-checkbox>
                    <div class="other">
                      <el-input
                        v-model="userInfo.implantsTitle"
                        @click.native="focusSelect('植入体','implantsTitle')"
                      ></el-input>
                    </div>
                  </div>
                </van-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">生活方式</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label">居住情況：</div>
              <div class="right-wrapper bgc">
                <van-radio-group v-model="userInfo.live" direction="horizontal">
                  <van-radio name="1">独居</van-radio>
                  <van-radio name="2">和亲戚朋友居住</van-radio>
                  <van-radio name="3">和家人居住</van-radio>
                  <div class="checkwithinput_case">
                    <van-radio name="4"></van-radio>
                    <div class="other" >
                      <el-input
                        v-model="userInfo.liveTitle"
                        @click.native="focusSelect('居住情况','liveTitle')"
                      ></el-input>
                    </div>
                  </div>
                </van-radio-group>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">吸烟史：</div>
              <div class="right-wrapper">
                <div class="flex-row">
                  <div class="leftchunk">
                    <van-radio-group v-model="userInfo.smoke" direction="horizontal">
                      <van-radio name="1">有</van-radio>
                      <van-radio name="0">无</van-radio>
                    </van-radio-group>
                  </div>
                  <div class="rightchunk">
                    <div class="chunk-label">饮酒史：</div>
                    <van-radio-group v-model="userInfo.drink" direction="horizontal">
                      <van-radio name="1">是</van-radio>
                      <van-radio name="0">否</van-radio>
                    </van-radio-group>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">需要限制的运动：</div>
              <div class="right-wrapper">
                <div class="flex-row">
                  <div class="leftchunk">
                    <el-input
                      v-model="userInfo.nomotion"
                      rows="1"
                      type="textarea"
                      @click.native="focusSelect('需要限制的运动','nomotion')"
                    ></el-input>
                  </div>
                  <div class="rightchunk">
                    <div class="chunk-label">需要限制的食物：</div>
                    <div class="chunk-content">
                      <el-input
                        v-model="userInfo.nofood"
                        rows="1"
                        type="textarea"
                        @click.native="focusSelect('需要限制的食物','nofood')"
                      ></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-form>
    </div>
    <!-- 标签化录入 -->
    <el-dialog
      :title="selectTitle"
      :visible.sync="labelSelect"
      class="labelDialog"
      width="600px"
      @opened="openDialog"
    >
      <div class="flex_row">
        <div
          v-for="(item, index) in labelList"
          :key="index"
          :style="{'background-color':item.ischecked?'#a9a9a9':'#f9f9f9'}"
          @click="clickLabel(index)"
        >{{item.value}}</div>
      </div>
      <div class="labelSave" @click="labelSave"></div>
      <div class="content_chunk">
        <div class="tips">描述：</div>
        <el-input type="textarea" ref="textarea" :rows="3" v-model="selectContent"></el-input>
      </div>
    </el-dialog>
    <!-- 选择框 -->
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
    <div class="save-btn" @click="onSave"></div>
  </div>
</template>

<script>
import api from "../../../../api/api";

export default {
  data() {
    return {
      labelSelect: false,
      selectTitle: "",
      labelList: [],
      selectContent: "",
      labelType: "",

      userInfo: {
        otopathy: [],
        otopathyTitle: "",
        operation: "",
        medicine: "",
        medicineReason: "",
        noise: "",
        noiseDetail: "",
        isleave: "",
        otherDeformity: [],
        otherDeformityTitle: "",
        hasFamilyOtopathy: "",
        familyOtopathyFindTime: "",
        familyOtopathyDetail: "",
        familyOtopathyRelation: "",
        previousDiseases: [],
        previousDiseasesTitle: "",
        intellectualHealth: "",
        mentalHealth: "",
        chronicDisease: [],
        chronicDiseaseTitle: "",
        chronicDiseaseMedicine: "",
        allergies: [],
        allergiesTitle: "",
        implants: [],
        implantsTitle: "",
        live: "",
        liveTitle: "",
        smoke: "",
        drink: "",
        nomotion: "",
        nofood: "",
      },
      dialogVisible: false,
      relation_sign: -1,
      relationships: "",
      shipVal: "",
      timeVal: [
        {
          id: "99",
          title: "一月以内",
          left: "227",
          right: "228",
          pid: "98",
          deep: "3",
          status: "1",
          isdel: "0",
          tmp: "0",
          pkey: "relationship",
          key: "1",
          value: "\u7236\u6bcd",
          note: "",
          author_id: "5",
          createtime: "0",
          updatetime: "1590043354",
        },
        {
          id: "130",
          title: "一至三月",
          left: "229",
          right: "230",
          pid: "98",
          deep: "3",
          status: "1",
          isdel: "0",
          tmp: "0",
          pkey: "relationship",
          key: "2",
          value: "\u5144\u5f1f",
          note: "",
          author_id: "5",
          createtime: "1590043290",
          updatetime: "1590043290",
        },
        {
          id: "131",
          title: "三至六月",
          left: "231",
          right: "232",
          pid: "98",
          deep: "3",
          status: "1",
          isdel: "0",
          tmp: "0",
          pkey: "relationship",
          key: "3",
          value: "\u59d0\u59b9",
          note: "",
          author_id: "5",
          createtime: "1590043310",
          updatetime: "1590043310",
        },
        {
          id: "132",
          title: "六月至一年",
          left: "233",
          right: "234",
          pid: "98",
          deep: "3",
          status: "1",
          isdel: "0",
          tmp: "0",
          pkey: "relationship",
          key: "4",
          value: "\u5b69\u5b50",
          note: "",
          author_id: "5",
          createtime: "1590043330",
          updatetime: "1590043330",
        },
        {
          id: "132",
          title: "一年至三年",
          left: "233",
          right: "234",
          pid: "98",
          deep: "3",
          status: "1",
          isdel: "0",
          tmp: "0",
          pkey: "relationship",
          key: "5",
          value: "\u5b69\u5b50",
          note: "",
          author_id: "5",
          createtime: "1590043330",
          updatetime: "1590043330",
        },
        {
          id: "132",
          title: "三年以上",
          left: "233",
          right: "234",
          pid: "98",
          deep: "3",
          status: "1",
          isdel: "0",
          tmp: "0",
          pkey: "relationship",
          key: "6",
          value: "\u5b69\u5b50",
          note: "",
          author_id: "5",
          createtime: "1590043330",
          updatetime: "1590043330",
        },
      ],
      timeRelation_sign: "",
    };
  },
  created() {
    this.init();
  },
  watch: {
    userInfo: {
      handler(val) {
        this.onSaveNoMsg();
      },
      deep: true,
    },
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    showDiolog(e) {
      if (e == "time") {
        this.relationships = this.timeVal;
      } else {
        this.relationships = this.shipVal;
      }
      this.changeVal = e;
      this.dialogVisible = true;
    },
    onSaveNoMsg() {
      let row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in this.userInfo) {
        if (Array.isArray(this.userInfo[key])) {
          this.userInfo[key].join(",") == ""
            ? ""
            : (row[key] = this.userInfo[key].join(","));
        } else {
          this.userInfo[key] == "" || this.userInfo[key] == null
            ? ""
            : (row[key] = this.userInfo[key]);
        }
      }

      api
        .postFormAPI("patientPh/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            // console.log(row);
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    onSave() {
      let row = {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      };
      for (let key in this.userInfo) {
        if (Array.isArray(this.userInfo[key])) {
          this.userInfo[key].join(",") == ""
            ? ""
            : (row[key] = this.userInfo[key].join(","));
        } else {
          this.userInfo[key] == "" || this.userInfo[key] == null
            ? ""
            : (row[key] = this.userInfo[key]);
        }
        switch (key) {
          case "noise":
            if (this.userInfo[key] == 1 && this.userInfo.noiseDetail == "") {
              this.$notify({
                message: "请填写噪声接触史备注",
              });
              return false;
            }
            break;
          case "live":
            if (this.userInfo[key] == 4 && this.userInfo.liveTitle == "") {
              this.$notify({
                message: "请填写居住情况备注",
              });
              return false;
            }
            break;
          default:
          // pinBackStr.aciton = "click";
        }
      }

      api
        .postFormAPI("patientPh/submit", row)
        .then((res) => {
          if (res.data.result == "1") {
            // console.log(row);
            this.$router.replace({
              name: "adultRecoveryCase",
            });
          }
          this.$notify({
            message: res.data.message,
          });
          //数据处理
        })
        .catch((err) => console.log(err));
    },
    init() {
      // 获取关系数据字典
      this.getDataDictionaryForRelation("relationship");

      // 内容回填
      api
        .postFormAPI("patientPh/getInfo", {
          recordId: localStorage.getItem("recordId"),
          sid: localStorage.getItem("sid"),
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }

          const data = res.data.data;
          // console.log(data);
          for (let key in this.userInfo) {
            if (data.hasOwnProperty(key)) {
              switch (key) {
                case "otopathy":
                case "otherDeformity":
                case "previousDiseases":
                case "chronicDisease":
                case "allergies":
                case "implants":
                  {
                    data[key] = data[key].split(",");
                  }
                  break;
                case "familyOtopathyRelation":
                  api
                    .postFormAPI("common/getDicByKey", {
                      key: "relationship",
                    })
                    .then((res) => {
                      // console.log(res);
                      if (res.data.result == "1") {
                        const relation = res.data.data;
                        for (let i = 0; i < relation.length; i++) {
                          if (relation[i].key == data[key]) {
                            this.relation_sign = i;
                            break;
                          }
                        }
                      }
                      //数据处理
                    })
                    .catch((err) => console.log(err));
                  break;
              }
              this.userInfo[key] = data[key];
            }
          }

          //数据处理
        });
    },
    getDataDictionaryForRelation(e) {
      api
        .postFormAPI("common/getDicByKey", {
          key: e,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.result == "1") {
            this[e + "s"] = res.data.data;
            this.shipVal = res.data.data;
          }
          //数据处理
        })
        .catch((err) => console.log(err));
    },

    // 弹出框选择选项后
    choiseRelation(index) {
      if (this.changeVal == "time") {
        this.userInfo.familyOtopathyFindTime = this.timeVal[index].key;
        this.timeRelation_sign = index;
      } else {
        this.relation_sign = index;
        this.userInfo.familyOtopathyRelation = this.relationships[index].key;
      }
      this.dialogVisible = false;
    },
    // 点击弹出选择框
    async focusSelect(title, key) {
      this.labelList = [];
      this.selectContent = "";
      this.labelType = key;
      const changeKey = {
        otopathyTitle: "diagnosisTip",
        operation: "surgeryTip",
        medicine: "ototoxicityTip",
        medicineReason: "medicationTip",
        otopathyTitle: "diagnosisTip",
        noiseDetail: "noiseTip",
        otherDeformityTitle: "disabilityTip",
        previousDiseasesTitle: "medicalHistoryTip",
        intellectualHealth: "mentalIntelligenceTip",
        mentalHealth: "mentalHealthTip",
        chronicDiseaseTitle: "chronicDiseaseTip",
        chronicDiseaseMedicine: "chronicDiseaseHistoryTip",
        allergiesTitle: "allergyTip",
        implantsTitle: "implantsTip",
        liveTitle: "livingConditionsTip",
        nomotion: "limitMotionTip",
        nofood: "limitFoodTip",
      };
      key = changeKey[key];
      await this.getChildByKey(key);
      this.labelSelect = true;
      this.selectTitle = title;
    },
    // 打开弹窗的回调
    openDialog() {
      this.$refs.textarea.focus();
    },
    //获取标签
    getChildByKey(key) {
      return api
        .postFormAPI("common/getChildByKey", {
          key,
        })
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          data.forEach((item) => {
            this.labelList.push({ value: item.value, ischecked: false });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 选择标签
    clickLabel(index) {
      // 选中时
      if (!this.labelList[index].ischecked) {
        this.selectContent = `${this.selectContent}${this.labelList[index].value}，`;
      } else {
        this.selectContent = this.selectContent.replace(
          this.labelList[index].value + "，",
          ""
        );
      }
      this.$set(
        this.labelList[index],
        "ischecked",
        !this.labelList[index].ischecked
      );
    },
    // 保存内容
    labelSave() {
      this.userInfo[this.labelType] = this.selectContent;
      this.labelSelect = false;
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
};
</script>

<style lang="scss" scoped>
.adultOldCase {
  .contain {
    margin: 30px 30px;
    margin-bottom: 80px;
    color: #212121;
  }

  .common-wrapper {
    background-color: #f9f9f9;
    border-radius: 6px;
    margin-bottom: 14px;
    padding-bottom: 14px;
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
    font-size: 18px;
  }

  .content-wrapper {
    padding: 14px 14px;
    padding-bottom: 0;
  }

  .img-left,
  .img-right {
    width: 14px;
    height: 20px;
    background: url("../../../../assets/image/icon_ears_left@2x.png") no-repeat;
    background-size: contain;
    margin: 0 6px 0 6px;
    flex-shrink: 0;
  }

  .img-right {
    background: url("../../../../assets/image/icon_ears_right@2x.png") no-repeat;
    background-size: contain;
  }
  .flex-row {
    display: flex;
    align-items: center;
    .checkwithinput_case {
      flex-grow: 1;
      display: flex;
      align-items: center;
      .van-checkbox {
        width: unset;
      }
      .other {
        margin: 10px 0;
        width: 20px;
        flex-grow: 1;
      }
    }
    .left-label {
      width: 146px;
      color: #212121;
      margin-right: 10px;
      flex-shrink: 0;
    }

    .right-wrapper {
      flex-grow: 1;
      align-self: center;
      overflow: hidden;
      padding: 6px 14px;
    }
    .pl {
      padding-left: 0px;
    }
    .bgc {
      background-color: #f3f3f3;
    }
  }
  .ebs .left-label {
    width: 164px;
  }
  .content-wrapper .flex-row:not(:last-child) {
    margin-bottom: 6px;
  }

  .leftchunk,
  .rightchunk {
    flex-grow: 1;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    .chunk-label {
      flex-shrink: 0;
    }
  }
  .chunk-content {
    flex-grow: 1;
  }
  .leftchunk {
    margin-right: 34px;
  }
  .flex-col {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    // height: 80px;
  }
  .mt_12 {
    margin-top: 12px;
  }
  .mt_20 {
    margin-top: 20px;
  }
  .dropdown {
    flex-grow: 1;
    height: 30px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 8px;
    justify-content: space-between;
    .dropdown_icon {
      // right: 8px;
      width: 16px;
      height: 10px;
      background: url("../../../../assets/images/icon_more@2x.png") center/cover;
    }
  }
  .save-btn {
    width: 80px;
    height: 80px;
    background: url("../../../../assets/image/btn/icon_btn_save@2x.png")
      no-repeat center/contain;
    position: fixed;
    border-radius: 50%;
    bottom: 100px;
    right: 20px;
  }

  .calendar {
    width: 100%;
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
}
</style>

<style lang="scss">
.adultOldCase {
  .labelDialog {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 130px;
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
    .el-dialog__body {
      font-size: 18px;
    }

    .labelSave {
      position: absolute;
      z-index: 10;
      right: 14px;
      margin: auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: url("../../../../assets/image/btn/icon_btn_save@2x.png")
        center/cover;
      margin-left: auto;
    }
    .flex_row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 40px;
      div {
        margin: 6px 0px;
        margin-right: 16px;
        padding: 0 30px;
        background-color: #f9f9f9;
        color: #212121;
        height: 42px;
        line-height: 42px;
        border-radius: 6px;
      }
    }
    .el-textarea {
      box-sizing: border-box;
      padding: 30px 16px 0px;
      font-size: 18px;
    }
    .content_chunk {
      background-color: #f9f9f9;
      padding-bottom: 14px;
      .tips {
        color: #5091c7;
        padding: 10px 0;
        width: 122px;
        text-align: center;
        font-weight: bold;
        border-radius: 6px 0px 14px 0px;
        background-color: #ebf2f5;
      }
    }
  }
  .el-input {
    font-size: 18px;
  }
  .calendar {
    .el-input__inner {
      font-size: 18px;
      border: unset;
      color: #646464;
      height: 32px;
    }
    .el-input__icon {
      line-height: 32px;
    }

    .el-date-editor .el-input {
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
    .el-input__suffix {
      display: none;
    }
  }
  .checkbox_one {
    .van-checkbox-group .checkwithinput_case:last-child {
      margin-left: 18px;
    }
  }
  .checkbox {
    .van-checkbox {
      width: 150px;
      // flex-grow: 1;
    }
    .van-checkbox:last-child {
      width: 180px;
      flex-grow: 0;
    }
    .van-checkbox--horizontal {
      margin: 10px 0;
      margin-right: 12px;
    }
  }
  .dialogModal {
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
        background: url("../../../../assets/images/icon_login_bg@2x.png")
          center/cover;
      }
    }
  }
  .van-checkbox--horizontal {
    margin: 6px 0;
    margin-right: 12px;
  }
  .checkwithinput_case .van-checkbox {
    margin-right: 0px;
    padding-right: 10px;
  }

  .van-cell {
    padding: 4px;
  }
  .el-textarea__inner,
  .el-input__inner {
    padding: 6px;
    font-size: 18px;
  }
  .el-textarea {
    display: flex;
  }
  .el-textarea__inner {
    width: 20px;
    flex-grow: 1;
  }
}
</style>