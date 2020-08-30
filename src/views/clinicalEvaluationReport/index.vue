<template>
  <div class="clinicalEvaluationReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">助听器/人工耳蜗临床效果评估报告</div>
      </div>
      <div class="user-info">
        <span>设备型号：</span>
        <span>{{header.earPad}}</span>
        <span>测试环境</span>
        <span>{{header.environmentDB}}</span>
        <span>换能器：</span>
        <span>{{header.transducer}}</span>
        <span>测试音：</span>
        <span>{{header.testTone}}</span>
      </div>
      <div class="report-wrapper">
        <div class="chunk">
          <div class="chunk-label">一、辅听装置信息</div>
          <table class="table">
            <tr>
              <td>助听器特性</td>
              <td>品牌</td>
              <td>类型</td>
              <td>型号</td>
              <td>功率</td>
              <td>受话器</td>
              <td>耳塞</td>
              <td>耳膜</td>
              <td>通气孔</td>
            </tr>
            <tr>
              <td>右耳</td>
              <td>{{rightReportAid.brand}}</td>
              <td>{{rightReportAid.type}}</td>
              <td>{{rightReportAid.model}}</td>
              <td>{{rightReportAid.power}}</td>
              <td>{{rightReportAid.receiver}}</td>
              <td>{{rightReportAid.earplugs}}</td>
              <td>{{rightReportAid.earMold}}</td>
              <td>{{rightReportAid.vent}}</td>
            </tr>
            <tr>
              <td>左耳</td>
              <td>{{leftReportAid.brand}}</td>
              <td>{{leftReportAid.type}}</td>
              <td>{{leftReportAid.model}}</td>
              <td>{{leftReportAid.power}}</td>
              <td>{{leftReportAid.receiver}}</td>
              <td>{{leftReportAid.earplugs}}</td>
              <td>{{leftReportAid.earMold}}</td>
              <td>{{leftReportAid.vent}}</td>
            </tr>
          </table>
        </div>
        <div class="chunk">
          <div class="chunk-label">二、音素识别测试：</div>
          <table class="voicetable">
            <tr>
              <td>韵母识别：</td>
              <template v-for="(item,index) in initial">
                <td :key="index" v-if="sixVoice.includes(item)">{{item}}</td>
                <td  :key="index" v-else>{{item}}</td>
              </template>
            </tr>
            <tr>
              <td>裸耳（√）：</td>
              <td v-for="(item, index) in initial">
                <template v-for="(itemR,indexR) in recognition">
                  <template v-if="itemR.content==item">
                    <div  :key="index" v-if="itemR.status==1">√</div>
                    <div  :key="index" v-else>x</div>
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <td>韵母识别：</td>
              <template v-for="(item,index) in initial">
                <td :key="index" v-if="sixVoice.includes(item)">{{item}}</td>
                <td  :key="index" v-else>{{item}}</td>
              </template>
            </tr>
            <tr>
              <td>助听（√）：</td>
              <td v-for="(item, index) in initial">
                <template v-for="(itemR,indexR) in recognitionAid">
                  <template v-if="itemR.content==item">
                    <div :key="index" v-if="itemR.status==1">√</div>
                    <div  :key="index" v-else>x</div>
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <td>声母识别：</td>
              <template v-for="(item,index) in finals">
                <td :key="index" v-if="sixVoice.includes(item)">{{item}}</td>
                <td :key="index" v-else>{{item}}</td>
              </template>
            </tr>
            <tr>
              <td>裸耳（√）：</td>
              <td v-for="(item, index) in finals">
                <template v-for="(itemR,indexR) in recognition">
                  <template v-if="itemR.content==item">
                    <div  :key="index" v-if="itemR.status==1">√</div>
                    <div  :key="index" v-else>x</div>
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <td>声母识别：</td>
              <template v-for="(item,index) in finals">
                <td  :key="index" v-if="sixVoice.includes(item)">{{item}}</td>
                <td :key="index" v-else>{{item}}</td>
              </template>
            </tr>
            <tr>
              <td>助听（√）：</td>
              <td v-for="(item, index) in finals">
                <template v-for="(itemR,indexR) in recognitionAid">
                  <template v-if="itemR.content==item">
                    <div  :key="index" v-if="itemR.status==1">√</div>
                    <div  :key="index" v-else>x</div>
                  </template>
                </template>
              </td>
            </tr>
          </table>
        </div>
        <div class="chunk">
          <div class="chunk-label">三、言语识别率测试</div>
          <table class="table">
            <tr>
              <td colspan="2">背景环境</td>
              <td colspan="2">安静（dBSPL）</td>
              <td colspan="4">噪声（dBSPL）</td>
            </tr>
            <tr>
              <td colspan="2">测试素材</td>
              <td colspan="2">
                <van-checkbox-group v-model="checkbox" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">词表1</van-checkbox>
                  <van-checkbox name="2" shape="square">词表2</van-checkbox>
                  <van-checkbox name="3" shape="square">词表3</van-checkbox>
                </van-checkbox-group>
              </td>
              <td colspan="4">
                <div style="display:flex;margin-bottom:6px">
                  <div>背景声：</div>
                  <van-checkbox-group v-model="checkbox" direction="horizontal" disabled>
                    <van-checkbox name="1" shape="square">言语声</van-checkbox>
                    <van-checkbox name="2" shape="square">菜市场</van-checkbox>
                    <van-checkbox name="3" shape="square">街道</van-checkbox>
                  </van-checkbox-group>
                </div>
                <div style="display:flex">
                  <div>信号声：</div>
                  <van-checkbox-group v-model="checkbox" direction="horizontal" disabled>
                    <van-checkbox name="1" shape="square">词表1</van-checkbox>
                    <van-checkbox name="2" shape="square">词表2</van-checkbox>
                    <van-checkbox name="3" shape="square">词表3</van-checkbox>
                  </van-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">强度计量</td>
              <td>测试音强度</td>
              <td>识别率%</td>
              <td>测试音强度</td>
              <td>掩蔽音强度</td>
              <td>信噪比</td>
              <td>识别率</td>
            </tr>
            <tr>
              <td rowspan="7">左耳</td>
              <td rowspan="3">裸耳</td>
              <td>50</td>
              <td>{{test.left.db_50}}</td>
              <td rowspan="3">65</td>
              <td>58</td>
              <td>&lt;7</td>
              <td>{{testNoise.left.noise_7}}</td>
            </tr>
            <tr>
              <td class="bg">65</td>
              <td class="bg">{{test.left.db_65}}</td>
              <td class="bg">52</td>
              <td class="bg">&lt;13</td>
              <td>{{testNoise.left.noise_13}}</td>
            </tr>
            <tr>
              <td>80</td>
              <td>{{test.left.db_80}}</td>
              <td>45</td>
              <td>&gt;13</td>
              <td>{{testNoise.left.noise_20}}</td>
            </tr>
            <tr>
              <td rowspan="3">助听</td>
              <td>50</td>
              <td>{{test.left.db_aid_50}}</td>
              <td rowspan="3">65</td>
              <td>58</td>
              <td>&lt;7</td>
              <td>{{testNoise.left.noise_aid_7}}</td>
            </tr>
            <tr>
              <td class="bg">65</td>
              <td class="bg">{{test.left.db_aid_65}}</td>
              <td class="bg">52</td>
              <td class="bg">&lt;13</td>
              <td>{{testNoise.left.noise_aid_13}}</td>
            </tr>
            <tr>
              <td>80</td>
              <td>{{test.left.db_aid_80}}</td>
              <td>45</td>
              <td>&gt;13</td>
              <td>{{testNoise.left.noise_aid_20}}</td>
            </tr>
            <tr>
              <td>收益度</td>
              <td colspan="2">{{test.left.db_aid_65 - test.left.db_65}}%</td>
              <td>收益度</td>
              <td colspan="3">{{testNoise.left.noise_aid_13 - testNoise.left.noise_13}}%</td>
            </tr>
            <tr>
              <td rowspan="7">右耳</td>
              <td rowspan="3">裸耳</td>
              <td>50</td>
              <td>{{test.right.db_50}}</td>
              <td rowspan="3">65</td>
              <td>58</td>
              <td>&lt;7</td>
              <td>{{testNoise.right.noise_7}}</td>
            </tr>
            <tr>
              <td class="bg">65</td>
              <td class="bg">{{test.right.db_65}}</td>
              <td class="bg">52</td>
              <td class="bg">&lt;13</td>
              <td>{{testNoise.right.noise_13}}</td>
            </tr>
            <tr>
              <td>80</td>
              <td>{{test.right.db_80}}</td>
              <td>45</td>
              <td>&gt;13</td>
              <td>{{testNoise.right.noise_20}}</td>
            </tr>
            <tr>
              <td rowspan="3">助听</td>
              <td>50</td>
              <td>{{test.right.db_aid_50}}</td>
              <td rowspan="3">65</td>
              <td>58</td>
              <td>&lt;7</td>
              <td>{{testNoise.right.noise_aid_7}}</td>
            </tr>
            <tr>
              <td class="bg">65</td>
              <td class="bg">{{test.right.db_aid_65}}</td>
              <td class="bg">52</td>
              <td class="bg">&lt;13</td>
              <td>{{testNoise.right.noise_aid_13}}</td>
            </tr>
            <tr>
              <td>80</td>
              <td>{{test.right.db_aid_80}}</td>
              <td>45</td>
              <td>&gt;13</td>
              <td>{{testNoise.right.noise_aid_20}}</td>
            </tr>
            <tr>
              <td>收益度</td>
              <td colspan="2">{{test.right.db_aid_65 - test.right.db_65}}%</td>
              <td>收益度</td>
              <td colspan="3">{{testNoise.right.noise_aid_13 - testNoise.right.noise_13}}%</td>
            </tr>
            <tr>
              <td rowspan="7">双耳</td>
              <td rowspan="3">裸耳</td>
              <td>50</td>
              <td>{{test.all.db_50}}</td>
              <td rowspan="3">65</td>
              <td>58</td>
              <td>&lt;7</td>
              <td>{{testNoise.all.noise_7}}</td>
            </tr>
            <tr>
              <td class="bg">65</td>
              <td class="bg">{{test.all.db_65}}</td>
              <td class="bg">52</td>
              <td class="bg">&lt;13</td>
              <td>{{testNoise.all.noise_13}}</td>
            </tr>
            <tr>
              <td>80</td>
              <td>{{test.all.db_80}}</td>
              <td>45</td>
              <td>&gt;13</td>
              <td>{{testNoise.all.noise_20}}</td>
            </tr>
            <tr>
              <td rowspan="3">助听</td>
              <td>50</td>
              <td>{{test.all.db_aid_50}}</td>
              <td rowspan="3">65</td>
              <td>58</td>
              <td>&lt;7</td>
              <td>{{testNoise.all.noise_aid_7}}</td>
            </tr>
            <tr>
              <td class="bg">65</td>
              <td class="bg">{{test.all.db_aid_65}}</td>
              <td class="bg">52</td>
              <td class="bg">&lt;13</td>
              <td>{{testNoise.all.noise_aid_13}}</td>
            </tr>
            <tr>
              <td>80</td>
              <td>{{test.all.db_aid_80}}</td>
              <td>45</td>
              <td>&gt;13</td>
              <td>{{testNoise.all.noise_aid_20}}</td>
            </tr>
            <tr>
              <td>收益度</td>
              <td colspan="2">{{test.all.db_aid_65 - test.all.db_65}}%</td>
              <td>收益度</td>
              <td colspan="3">{{testNoise.all.noise_aid_13 - testNoise.all.noise_13}}%</td>
            </tr>
            <tr>
              <td
                colspan="8"
                style="text-align:left"
              >收益度说明：安静环境对比65dBSPL声强助听识别率与裸耳识别率；噪声环境对比65dBSPL信号声强、52dBSPL背景噪声助听识别率与裸耳识别率；</td>
            </tr>
          </table>
        </div>
        <div class="chunk">
          <div class="chunk-label">四、交流环境收益度评估：</div>
          <table class="table">
            <tr>
              <td>场景</td>
              <td>测试音强度</td>
              <td>裸耳识别率</td>
              <td>助听识别率</td>
              <td>助听收益度</td>
            </tr>
            <tr v-for="(item, index) in environmentList" :key="index">
              <td>{{item.title}}</td>
              <td>{{item.strength}}</td>
              <td>{{item.bareRatio}}</td>
              <td>{{item.helpRatio}}</td>
              <td>{{item.benefit}}</td>
            </tr>
            <tr>
              <td
                colspan="6"
                style="text-align:left"
              >收益度说明：&gt;10%为差&nbsp;10-20%为改善&nbsp;20-30%为良&nbsp; &lt;30%为优</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="user-sign">
        <div>本人签字：</div>
        <div class="line"></div>
        <div>家属签字:</div>
        <div class="line"></div>
      </div>
      <div class="doctor-sign">
        <div>验配中心：{{orgName}}</div>
        <div>检查日期：{{nowdatetime}}</div>
        <div>医生签名：{{truename}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api";

export default {
  data() {
    return {
      slogan: "用爱经营 用良心服务 用匠心成就 ",
      orgName: "",
      truename: "",
      checkbox: [],
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        patientNum: null,
        updatetime: null,
      },
      header: {
        earPad: "ear pad",
        environmentDB: null,
        transducer: null,
        testTone: null,
      },
      leftReportAid: {
        brand: null,
        type: null,
        model: null,
        power: null,
        receiver: null,
        earplugs: null,
        earMold: null,
        vent: null,
      },
      rightReportAid: {
        brand: null,
        type: null,
        model: null,
        power: null,
        receiver: null,
        earplugs: null,
        earMold: null,
        vent: null,
      },
      initial: ["a", "o", "e", "i", "u", "ü"],
      finals: [
        "b",
        "p",
        "m",
        "f",
        "d",
        "t",
        "n",
        "l",
        "g",
        "k",
        "h",
        "j",
        "q",
        "x",
        "zh",
        "ch",
        "sh",
        "r",
        "z",
        "c",
        "s",
        "y",
        "w",
      ],
      sixVoice: ["a", "i", "u", "m", "sh", "s"],
      recognition: [],
      recognitionAid: [],
      test: {
        left: {
          db_50: null,
          db_65: null,
          db_80: null,
          db_aid_50: null,
          db_aid_65: null,
          db_aid_80: null,
        },
        right: {
          db_50: null,
          db_65: null,
          db_80: null,
          db_aid_50: null,
          db_aid_65: null,
          db_aid_80: null,
        },
        all: {
          db_50: null,
          db_65: null,
          db_80: null,
          db_aid_50: null,
          db_aid_65: null,
          db_aid_80: null,
        },
      },
      testNoise: {
        left: {
          noise_7: null,
          noise_13: null,
          noise_20: null,
          noise_aid_7: null,
          noise_aid_13: null,
          noise_aid_20: null,
        },
        right: {
          noise_7: null,
          noise_13: null,
          noise_20: null,
          noise_aid_7: null,
          noise_aid_13: null,
          noise_aid_20: null,
        },
        all: {
          noise_7: null,
          noise_13: null,
          noise_20: null,
          noise_aid_7: null,
          noise_aid_13: null,
          noise_aid_20: null,
        },
      },
      environmentList: [],
    };
  },
  created() {
    // 获取用户信息
    this.getFormData("patient/getInfo", "userInfo", {
      patientId: localStorage.getItem("patientId"),
      sid: localStorage.getItem("sid"),
    });

    // 验配师信息
    api
      .postFormAPI("patientMatchRecord/getMatcherByRecordId", {
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.orgName = res.data.data.orgName;
          this.truename = res.data.data.truename;
        }
        //数据处理
      })
      .catch((err) => console.log(err));
    //交流环境适应性评估
    api
      .postFormAPI("checkWords/environment", {
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result == "1") {
          this.environmentList = res.data.data;
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取头部数据
    this.getFormData("checkWords/reportOther", "header", {
      patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      sid: localStorage.getItem("sid"),
    });

    // 获取助听器
    this.getFormData("checkWords/reportAid", "leftReportAid", {
      // patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      type: 1,
      sid: localStorage.getItem("sid"),
    });

    this.getFormData("checkWords/reportAid", "rightReportAid", {
      // patientId: localStorage.getItem("patientId"),
      recordId: localStorage.getItem("recordId"),
      type: 2,
      sid: localStorage.getItem("sid"),
    });

    // 音色识别
    api
      .postFormAPI("checkWords/reportRecognition", {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
        type: "3",
        isHearingAid: "0",
      })
      .then((res) => {
        if (res.data.result == "1") {
          // var data111="{\"message\":\"\",\"code\":\"200\",\"data\":[{\"status\":\"1\",\"content\":\"a\"},{\"status\":\"\",\"content\":\"牛奶\"},{\"status\":\"1\",\"content\":\"b\"},{\"status\":\"\",\"content\":\"喜剧\"},{\"status\":\"1\",\"content\":\"特征\"},{\"status\":\"\",\"content\":\"客观\"},{\"status\":\"1\",\"content\":\"s\"},{\"status\":\"\",\"content\":\"得意\"},{\"status\":\"1\",\"content\":\"班长\"},{\"status\":\"\",\"content\":\"队员\"},{\"status\":\"1\",\"content\":\"同志\"},{\"status\":\"\",\"content\":\"躲藏\"},{\"status\":\"1\",\"content\":\"d\"},{\"status\":\"\",\"content\":\"h\"},{\"status\":\"1\",\"content\":\"神秘\"},{\"status\":\"\",\"content\":\"中等\"},{\"status\":\"1\",\"content\":\"汽车\"},{\"status\":\"\",\"content\":\"f\"},{\"status\":\"1\",\"content\":\"老师\"},{\"status\":\"\",\"content\":\"今天\"},{\"status\":\"\",\"content\":\"l\"},{\"status\":\"\",\"content\":\"要求\"},{\"status\":\"\",\"content\":\"波浪\"},{\"status\":\"\",\"content\":\"作者\"},{\"status\":\"\",\"content\":\"能够\"}],\"result\":\"1\"}";
          // this.recognition=JSON.parse(data111).data
          // console.log( this.recognition)
          this.recognition = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    api
      .postFormAPI("checkWords/reportRecognition", {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
        type: "3",
        isHearingAid: "1",
      })
      .then((res) => {
        if (res.data.result == "1") {
          // var data111="{\"message\":\"\",\"code\":\"200\",\"data\":[{\"status\":\"1\",\"content\":\"a\"},{\"status\":\"\",\"content\":\"牛奶\"},{\"status\":\"1\",\"content\":\"b\"},{\"status\":\"\",\"content\":\"喜剧\"},{\"status\":\"1\",\"content\":\"特征\"},{\"status\":\"\",\"content\":\"客观\"},{\"status\":\"1\",\"content\":\"s\"},{\"status\":\"\",\"content\":\"得意\"},{\"status\":\"1\",\"content\":\"班长\"},{\"status\":\"\",\"content\":\"队员\"},{\"status\":\"1\",\"content\":\"同志\"},{\"status\":\"\",\"content\":\"躲藏\"},{\"status\":\"1\",\"content\":\"d\"},{\"status\":\"\",\"content\":\"h\"},{\"status\":\"1\",\"content\":\"神秘\"},{\"status\":\"\",\"content\":\"中等\"},{\"status\":\"1\",\"content\":\"汽车\"},{\"status\":\"\",\"content\":\"f\"},{\"status\":\"1\",\"content\":\"老师\"},{\"status\":\"\",\"content\":\"今天\"},{\"status\":\"\",\"content\":\"l\"},{\"status\":\"\",\"content\":\"要求\"},{\"status\":\"\",\"content\":\"波浪\"},{\"status\":\"\",\"content\":\"作者\"},{\"status\":\"\",\"content\":\"能够\"}],\"result\":\"1\"}";
          // this.recognitionAid=JSON.parse(data111).data
          // console.log( this.recognition)
          this.recognitionAid = res.data.data;
        }
      })
      .catch((err) => console.log(err));

    // 获取安静dBSPL
    let list = [
      {
        db: 50,
        side: "left",
        isHearingAid: 0,
      },
      {
        db: 65,
        side: "left",
        isHearingAid: 0,
      },
      {
        db: 80,
        side: "left",
        isHearingAid: 0,
      },
      {
        db: 50,
        side: "left",
        isHearingAid: 1,
      },
      {
        db: 65,
        side: "left",
        isHearingAid: 1,
      },
      {
        db: 80,
        side: "left",
        isHearingAid: 1,
      },
      {
        db: 50,
        side: "right",
        isHearingAid: 0,
      },
      {
        db: 65,
        side: "right",
        isHearingAid: 0,
      },
      {
        db: 80,
        side: "right",
        isHearingAid: 0,
      },
      {
        db: 50,
        side: "right",
        isHearingAid: 1,
      },
      {
        db: 65,
        side: "right",
        isHearingAid: 1,
      },
      {
        db: 80,
        side: "right",
        isHearingAid: 1,
      },
      {
        db: 50,
        side: "all",
        isHearingAid: 0,
      },
      {
        db: 65,
        side: "all",
        isHearingAid: 0,
      },
      {
        db: 80,
        side: "all",
        isHearingAid: 0,
      },
      {
        db: 50,
        side: "all",
        isHearingAid: 1,
      },
      {
        db: 65,
        side: "all",
        isHearingAid: 1,
      },
      {
        db: 80,
        side: "all",
        isHearingAid: 1,
      },
    ];
    list.forEach((value) => {
      this.getDbspl(value);
    });
    let listNoise = [
      {
        noise: 7,
        side: "left",
        isHearingAid: 0,
      },
      {
        noise: 13,
        side: "left",
        isHearingAid: 0,
      },
      {
        noise: 20,
        side: "left",
        isHearingAid: 0,
      },
      {
        noise: 7,
        side: "left",
        isHearingAid: 1,
      },
      {
        noise: 13,
        side: "left",
        isHearingAid: 1,
      },
      {
        noise: 20,
        side: "left",
        isHearingAid: 1,
      },
      {
        noise: 7,
        side: "right",
        isHearingAid: 0,
      },
      {
        noise: 13,
        side: "right",
        isHearingAid: 0,
      },
      {
        noise: 20,
        side: "right",
        isHearingAid: 0,
      },
      {
        noise: 7,
        side: "right",
        isHearingAid: 1,
      },
      {
        noise: 13,
        side: "right",
        isHearingAid: 1,
      },
      {
        noise: 20,
        side: "right",
        isHearingAid: 1,
      },
      {
        noise: 7,
        side: "all",
        isHearingAid: 0,
      },
      {
        noise: 13,
        side: "all",
        isHearingAid: 0,
      },
      {
        noise: 20,
        side: "all",
        isHearingAid: 0,
      },
      {
        noise: 7,
        side: "all",
        isHearingAid: 1,
      },
      {
        noise: 13,
        side: "all",
        isHearingAid: 1,
      },
      {
        noise: 20,
        side: "all",
        isHearingAid: 1,
      },
    ];
    listNoise.forEach((value) => {
      this.getNoiseDbspl(value);
    });
  },
  methods: {
    getFormData(url, field, query) {
      api
        .postFormAPI(url, query)
        .then((res) => {
          if (res.data.result != 1) {
            return;
          }
          const data = res.data.data;
          for (const key in this[field]) {
            if (data.hasOwnProperty(key)) {
              this[field][key] = data[key];
            }
          }

          //数据处理
        })
        .catch((err) => console.log(err));
    },
    getDbspl(ele) {
      let type = 0;
      if (ele.side == "left") {
        type = 1;
      } else if (ele.side == "right") {
        type = 2;
      } else {
        type = 3;
      }
      api
        .postFormAPI("checkWords/reportSoundData", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
          type: type,
          isMaskingTone: 0,
          testVoiceType: 1,
          db: ele.db,
          wordsType: 2,
          isHearingAid: ele.isHearingAid,
          isNoise: 0,
        })
        .then((res) => {
          if (res.data.result == "1") {
            if (ele.isHearingAid == 1) {
              this.test[ele.side]["db_aid_" + ele.db] =
                res.data.data.accuracyrate;
            } else {
              this.test[ele.side]["db_" + ele.db] = res.data.data.accuracyrate;
            }
          }
        })
        .catch((err) => console.log(err));
    },
    getNoiseDbspl(ele) {
      let type = 0;
      if (ele.side == "left") {
        type = 1;
      } else if (ele.side == "right") {
        type = 2;
      } else {
        type = 3;
      }
      api
        .postFormAPI("checkWords/reportSoundData", {
          sid: localStorage.getItem("sid"),
          recordId: localStorage.getItem("recordId"),
          type: type,
          isMaskingTone: 0,
          testVoiceType: 1,
          db: 65,
          wordsType: 2,
          isHearingAid: ele.isHearingAid,
          isNoise: ele.noise,
        })
        .then((res) => {
          if (res.data.result == "1") {
            if (ele.isHearingAid == 1) {
              this.testNoise[ele.side]["noise_aid_" + ele.noise] =
                res.data.data.accuracyrate;
            } else {
              this.testNoise[ele.side]["noise_" + ele.noise] =
                res.data.data.accuracyrate;
            }
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.clinicalEvaluationReport {
  .contain {
    display: flex;
    flex-direction: column;
    color: #212121;
  }
  .header {
    display: flex;
    margin: 20px 30px 0;
    align-items: center;
    justify-content: space-between;
    .img {
      height: 40px;
    }
    .slogan {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
  .header-title {
    height: 46px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .title {
      height: 34px;
      font-size: 26px;
      font-weight: bold;
      line-height: 34px;
      color: #333;
    }
  }
  .report-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 30px;
    margin-top: 50px;
    .chunk {
      margin-bottom: 26px;
    }
    .chunk-content {
      width: 100%;
      box-sizing: border-box;
      padding: 14px 0 0 1em;
    }
    .table {
      margin-top: 14px;
      width: 100%;
      border-collapse: collapse;
      td {
        padding: 4px 8px;
        height: 20px;
        text-align: center;
        border: 1px solid #212121;
      }
      .bg {
        background-color: #f9f9f9;
      }
    }
    .chunk-label {
      font-weight: bold;
    }
    .voicetable {
      border-collapse: collapse;
      margin-top: 14px;
      th,
      td {
        border: 1px solid #212121;
        text-align: center;
        font-weight: 400;
        padding: 4px 6px;
      }
      tr td:not(:first-child) {
        width: 26px;
        padding: 4px 0;
      }
    }
  }
  .user-info {
    font-size: 18px;
    line-height: 16px;
    color: #212121;
    margin: 42px auto 0;
    span:nth-of-type(2n + 2):not(:last-of-type) {
      padding: 0 10px;
      margin-right: 40px;
    }
  }
  .user-sign {
    width: 90%;
    display: flex;
    margin: 0 auto;
    justify-content: flex-end;
    margin-top: 46px;
    .line {
      width: 100px;
      border-bottom: 1px solid #212121;
      margin-right: 20px;
    }
  }
  .doctor-sign {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 34px auto;
    div {
      flex-grow: 1;
    }
  }
}
</style>

<style lang="scss">
.clinicalEvaluationReport {
  .van-checkbox-group--horizontal {
    flex-grow: 1;
  }
  .van-checkbox {
    flex: 1;
  }
  .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
    color: #fff;
  }
  .van-checkbox__icon--checked {
    background-color: #1989fa;
  }
  .van-checkbox__icon--disabled .van-icon {
    background-color: unset;
    border-color: #c8c9cc;
  }
  .van-checkbox__label--disabled {
    color: #212121;
  }
}
</style>
