<template>
  <div class="adultFirstReport">
    <div class="contain">
      <div class="header">
        <img class="img" src="../../assets/image/logo@2x.png" alt />
        <div class="slogan">{{slogan}}</div>
      </div>
      <div class="header-title">
        <div class="title">首诊病例</div>
      </div>
      <div class="user-info">
        <span>姓名：</span>
        <span>{{userInfo.truename}}</span>
        <span>性别：</span>
        <span>{{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女': ''}}</span>
        <span>年龄：</span>
        <span>{{age}}</span>
        <span>病例号：</span>
        <span>{{userInfo.patientNum}}</span>
      </div>
      <div class="report-wrapper">
        <div class="chunk">
          <div class="chunk-content">
            <div>主诉：</div>
            <div class="span flex-grow">{{hpi.mainDetails}}</div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">现病史</div>
          <div class="chunk-content">
            <div>1、听力损失的时间：左耳</div>
            <div class="span">{{findTime[hpi.leftFindTime]}}</div>
            <div>，右耳</div>
            <div class="span">{{findTime[hpi.rightFindTime]}}</div>
            <div>；发病进程：左耳</div>
            <div class="span">{{leftProcess[hpi.leftProcess]}}</div>
            <div>，右耳</div>
            <div class="span">{{leftProcess[hpi.rightProcess]}}</div>
            <div>，大声有不舒服：左耳</div>
            <van-checkbox-group v-model="hpi.leftBigsound" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">有</van-checkbox>
              <van-checkbox name="0" shape="square">无</van-checkbox>
            </van-checkbox-group>
            <div>，右耳</div>
            <van-checkbox-group v-model="hpi.rightBigsound" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">有</van-checkbox>
              <van-checkbox name="0" shape="square">无</van-checkbox>
            </van-checkbox-group>
            <div>，自己感觉哪只耳朵更好一些：</div>
            <van-checkbox-group v-model="hpi.goodEar" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">左</van-checkbox>
              <van-checkbox name="2" shape="square">右。</van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="chunk-content">
            <div>2、听损伴随症状：</div>
            <div class="chunk">
              <div class="chunk-content">
                <div>耳痛：</div>
                <div>左耳-描述</div>
                <div class="span flex-grow">{{hpi.leftEarache}}</div>
                <div>右耳-描述</div>
                <div class="span flex-grow">{{hpi.rightEarache}}</div>
              </div>
              <div class="chunk-content">
                <div>耳鸣：</div>
                <div>左耳-描述</div>
                <div class="span flex-grow">{{hpi.leftTinnitus}}</div>
                <div>右耳-描述</div>
                <div class="span flex-grow">{{hpi.rightTinnitus}}</div>
              </div>
              <div class="chunk-content">
                <div>流脓：</div>
                <div>左耳</div>
                <van-checkbox-group v-model="hpi.leftFester" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">新发</van-checkbox>
                  <van-checkbox name="2" shape="square">陈旧</van-checkbox>
                </van-checkbox-group>
                <van-checkbox-group v-model="hpi.leftFesterDense" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">脓液</van-checkbox>
                </van-checkbox-group>
                <van-checkbox-group
                  v-model="hpi.leftFesterContinue"
                  direction="horizontal"
                  disabled
                >
                  <van-checkbox name="1" shape="square">持续</van-checkbox>
                </van-checkbox-group>
                <van-checkbox-group v-model="hpi.leftFesterSmelly" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">臭味</van-checkbox>
                </van-checkbox-group>

                <div>右耳</div>
                <van-checkbox-group v-model="hpi.rightFester" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">新发</van-checkbox>
                  <van-checkbox name="2" shape="square">陈旧</van-checkbox>
                </van-checkbox-group>
                <van-checkbox-group v-model="hpi.rightFesterDense" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">脓液</van-checkbox>
                </van-checkbox-group>
                <van-checkbox-group
                  v-model="hpi.rightFesterContinue"
                  direction="horizontal"
                  disabled
                >
                  <van-checkbox name="1" shape="square">持续</van-checkbox>
                </van-checkbox-group>
                <van-checkbox-group v-model="hpi.rightFesterSmelly" direction="horizontal" disabled>
                  <van-checkbox name="1" shape="square">臭味</van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
          </div>
          <div class="chunk-content">
            <div>3、其他：</div>
            <van-checkbox-group v-model="hpi.isVertigo" direction="horizontal" disabled>
              <van-checkbox shape="square" name="1">眩晕</van-checkbox>
            </van-checkbox-group>
            <van-checkbox-group v-model="hpi.isAbnormalgait" direction="horizontal" disabled>
              <van-checkbox shape="square" name="1">步态异常</van-checkbox>
            </van-checkbox-group>
            <van-checkbox-group v-model="hpi.isUnsteadystanding" direction="horizontal" disabled>
              <van-checkbox shape="square" name="1">站立不稳</van-checkbox>
            </van-checkbox-group>
            <div>描述：</div>
            <div class="span flex-grow">{{hpi.details}}</div>
          </div>
          <div class="chunk-content">
            <div>4、言语障碍：言语发育问题</div>
            <div class="span flex-grow">{{hpi.speakGrowth}}</div>
            <div>，言语清楚度</div>
            <div class="span flex-grow">{{hpi.clarity}}</div>
            <div>，表达与沟通能力</div>
            <div class="span flex-grow">{{hpi.talk}}</div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">既往史</div>
          <div class="chunk-content">
            <div>1、耳病诊疗史：</div>
            <div class="checkbox-grow flex-grow">
              <van-checkbox-group v-model="ph.otopathy" direction="horizontal" disabled>
                <van-checkbox name="1" shape="square">外耳道炎症</van-checkbox>
                <van-checkbox name="2" shape="square">中耳炎史</van-checkbox>
                <van-checkbox name="3" shape="square">鼓膜穿孔</van-checkbox>
                <van-checkbox name="4" shape="square">梅尼尔</van-checkbox>
                <van-checkbox name="5" shape="square">
                  耳硬化症
                  <span class="span flex-grow">{{ph.otopathyTitle}}</span>
                </van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
          <div class="chunk-content">
            <div>手术史：</div>
            <div class="span flex-grow">{{ph.operation}}</div>
          </div>
          <div class="chunk-content">
            <div>2、耳毒性药物使用史：</div>
            <div class="span inline no-grow">{{ph.medicine}}</div>
            <div>用药原因：</div>
            <div class="span flex-grow">{{ph.medicineReason}}</div>
          </div>
          <div class="chunk-content">
            <div>3、噪声接触史：</div>
            <van-checkbox-group v-model="ph.noise" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">有</van-checkbox>
              <van-checkbox name="0" shape="square">无</van-checkbox>
            </van-checkbox-group>
            <div>持续时间</div>
            <div class="span">{{ph.noiseDetail}}</div>
            <div>，脱离：</div>
            <van-checkbox-group v-model="ph.isleave" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">是</van-checkbox>
              <van-checkbox name="0" shape="square">否</van-checkbox>
            </van-checkbox-group>
          </div>

          <div class="chunk-content">
            <div>4、家族史：</div>
            <div>家族成员中是否有听障：</div>
            <van-checkbox-group v-model="ph.hasFamilyOtopathy" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">有</van-checkbox>
              <van-checkbox name="0" shape="square">无</van-checkbox>
            </van-checkbox-group>
            <div>与患者关系：</div>
            <div
              class="span flex-grow"
              v-if="this.relationship[this.relation_sign] != undefined"
            >{{this.relationship[this.relation_sign].value}}</div>
            <div class="span flex-grow" v-else></div>
            <div>发病时间：</div>
            <div class="span flex-grow">{{ph.familyOtopathyFindTime}}</div>
            <div>描述：</div>
            <div class="span flex-grow">{{ph.familyOtopathyDetail}}</div>
          </div>
          <div class="chunk-content">
            <div>5、是否合并其他残疾：</div>
            <van-checkbox-group v-model="ph.otherDeformity" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">肢体</van-checkbox>
              <van-checkbox name="2" shape="square">视力</van-checkbox>
              <van-checkbox name="3" shape="square">智力</van-checkbox>
              <van-checkbox name="4" shape="square">精神</van-checkbox>
              <van-checkbox name="5" shape="square">头面部</van-checkbox>
              <van-checkbox name="6" shape="square">毛发</van-checkbox>
            </van-checkbox-group>
            <div class="flex-grow">
              <div>其他</div>
              <div class="span flex-grow">{{ph.otherDeformityTitle}}</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>6、既往病史：</div>
            <van-checkbox-group v-model="ph.previousDiseases" direction="horizontal" disabled>
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
              <van-checkbox name="14" shape="square">阿尔兹海默症</van-checkbox>
              <van-checkbox name="15" shape="square">麻疹</van-checkbox>
              <van-checkbox name="16" shape="square">视觉障碍</van-checkbox>
              <van-checkbox name="17" shape="square">面神经麻痹</van-checkbox>
              <van-checkbox name="18" shape="square">抑郁</van-checkbox>
              <van-checkbox name="19" shape="square">兴奋</van-checkbox>
              <van-checkbox name="20" shape="square">多发性硬化</van-checkbox>
            </van-checkbox-group>
            <div class="flex-grow">
              <div>其他：</div>
              <div class="span flex-grow">{{ph.previousDiseasesTitle}}</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>8、精神智力健康：</div>
            <div class="span">{{ph.intellectualHealth}}</div>
            <div>，心理健康状况：</div>
            <div class="span flex-grow">{{ph.mentalHealth}}</div>
          </div>
          <div class="chunk-content">
            <div>9、慢性病：</div>
            <van-checkbox-group v-model="ph.chronicDisease" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">高血压</van-checkbox>
              <van-checkbox name="2" shape="square">高血脂</van-checkbox>
              <van-checkbox name="3" shape="square">糖尿病</van-checkbox>
            </van-checkbox-group>
            <div class="flex-grow">
              <div>其他：</div>
              <div class="span flex-grow">{{ph.chronicDiseaseTitle}}</div>
            </div>
            <div>，用药史：</div>
            <div class="span flex-grow">{{ph.chronicDiseaseMedicine}}</div>
          </div>
          <div class="chunk-content">
            <div>10、过敏史：</div>
            <van-checkbox-group v-model="ph.allergies" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">药物</van-checkbox>
              <van-checkbox name="2" shape="square">食物</van-checkbox>
              <van-checkbox name="3" shape="square">金属</van-checkbox>
            </van-checkbox-group>
            <div class="flex-grow">
              <div>，其他：</div>
              <div class="span flex-grow">{{ph.allergiesTitle}}</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>11、其他疾病史：</div>
            <div>吸烟史：</div>
            <van-checkbox-group v-model="ph.smoke" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">有</van-checkbox>
              <van-checkbox name="0" shape="square">无</van-checkbox>
            </van-checkbox-group>
            <div>饮酒史：</div>
            <van-checkbox-group v-model="ph.drink" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">有</van-checkbox>
              <van-checkbox name="0" shape="square">无</van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="chunk-content">
            <div>12、植入体：</div>
            <van-checkbox-group v-model="ph.implants" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">心脏起搏器</van-checkbox>
              <van-checkbox name="2" shape="square">人工耳蜗</van-checkbox>
            </van-checkbox-group>
            <div class="flex-grow">
              <div>，其他：</div>
              <div class="span flex-grow">{{ph.implantsTitle}}</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>13、需要限制的运动：</div>
            <div class="span flex-grow">{{ph.nomotion}}</div>
            <div>14、需要限制的食物：</div>
            <div class="span flex-grow">{{ph.nofood}}</div>
          </div>
          <div class="chunk-content">
            <div>15、居住情况：</div>
            <van-checkbox-group v-model="ph.live" direction="horizontal" disabled>
              <van-checkbox name="1" shape="square">独居</van-checkbox>
              <van-checkbox name="2" shape="square">和亲戚朋友居住</van-checkbox>
              <van-checkbox name="3" shape="square">和家人居住</van-checkbox>
            </van-checkbox-group>
            <div class="flex-grow">
              <div>，其他：</div>
              <div class="span flex-grow">{{ph.liveTitle}}</div>
            </div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">听力康复史</div>
          <div class="chunk-content">
            <div>1、历史检查报告记录(纯音测听/声阻抗/OAE/ABR等，就诊时间/就诊单位/检查项目/检查结果)：</div>
            <div class="chunk-content">
              <div
                class="span flex-grow"
                v-for="(item, index) in historyList"
                :key="item.id"
              >{{index+1}}.测听类型：{{item.type}}，就诊时间：{{item.checkTime}}，就诊单位：{{item.organization}}，检查内容：{{item.content}}，检查结果：{{item.result}}</div>
            </div>
          </div>
          <div class="chunk-content">
            <div>2、助听器/人工耳蜗佩戴史：</div>
            <div>首次佩戴时间：</div>
            <div
              class="span"
            >{{hearrebuildHistory.firstWearTime=="0"?"":hearrebuildHistory.firstWearTime}}</div>
            <div>，历史拥有助听器：</div>
            <div class="span">{{hearrebuildHistory.audiphoneCount}}</div>
            <div>台。</div>
            <div class="chunk-content">
              <table class="table">
                <tr>
                  <th></th>
                  <th>验配时间</th>
                  <th>类型</th>
                  <th>品牌</th>
                  <th>型号</th>
                  <th>价格</th>
                  <th>使用时长</th>
                  <th>满意程度</th>
                  <th>有无过敏</th>
                </tr>
                <tr>
                  <td>左</td>
                  <td>{{hearrebuildHistory.leftMatchingTime=="0"?"":hearrebuildHistory.leftMatchingTime}}</td>
                  <td
                    v-if="appearances[leftAppearanceType_sign] != undefined"
                  >{{appearances[leftAppearanceType_sign].value}}</td>
                  <td v-else></td>
                  <td v-if="brands[leftBrand_sign] != undefined">{{brands[leftBrand_sign].value}}</td>
                  <td v-else></td>
                  <td v-if="models[leftModel_sign] != undefined">{{models[leftModel_sign].value}}</td>
                  <td v-else></td>
                  <td>{{hearrebuildHistory.leftPrice}}</td>
                  <td>{{leftWearTime[hearrebuildHistory.leftWearTime]}}</td>
                  <td>{{leftSatisfied[hearrebuildHistory.leftSatisfied]}}</td>
                  <td>{{leftIsAllergy[hearrebuildHistory.leftIsAllergy]}}</td>
                </tr>
                <tr>
                  <td>右</td>
                  <td>{{hearrebuildHistory.rightMatchingTime=="0"?"":hearrebuildHistory.leftMatchingTime}}</td>
                  <td
                    v-if="appearances[rightAppearanceType_sign] != undefined"
                  >{{appearances[rightAppearanceType_sign].value}}</td>
                  <td v-else></td>
                  <td v-if="brands[rightBrand_sign] != undefined">{{brands[rightBrand_sign].value}}</td>
                  <td v-else></td>
                  <td v-if="models[rightModel_sign] != undefined">{{models[rightModel_sign].value}}</td>
                  <td v-else></td>
                  <td>{{hearrebuildHistory.rightPrice}}</td>
                  <td>{{leftWearTime[hearrebuildHistory.rightWearTime]}}</td>
                  <td>{{leftSatisfied[hearrebuildHistory.rightSatisfied]}}</td>
                  <td>{{leftIsAllergy[hearrebuildHistory.rightIsAllergy]}}</td>
                </tr>
              </table>
            </div>
            <div class="chunk-content">
              <div>原有助听器不足：</div>
              <div class="checkbox-grow">
                <van-checkbox-group
                  v-model="hearrebuildHistory.audiphoneInsufficient"
                  direction="horizontal"
                  disabled
                >
                  <van-checkbox name="1" shape="square">嘈杂环境听不清</van-checkbox>
                  <van-checkbox name="2" shape="square">看电视听不清</van-checkbox>
                  <van-checkbox name="3" shape="square">打电话听不清</van-checkbox>
                  <van-checkbox name="4" shape="square">大声音不舒服</van-checkbox>
                  <van-checkbox name="5" shape="square">操作不方便</van-checkbox>
                  <van-checkbox name="6" shape="square">小声音听不清</van-checkbox>
                  <van-checkbox name="7" shape="square">啸叫</van-checkbox>
                  <van-checkbox name="8" shape="square">不易操作</van-checkbox>
                  <van-checkbox name="9" shape="square">助听器老化</van-checkbox>
                  <van-checkbox name="10" shape="square">美观问题</van-checkbox>
                  <div class="flex-grow">
                    <div>，其他：</div>
                    <div class="span flex-grow">{{ph.liveTitle}}</div>
                  </div>
                </van-checkbox-group>
              </div>
            </div>
          </div>
          <div class="chunk-content">
            <div>3、语言矫治史：</div>
            <van-checkbox-group
              v-model="hearrebuildHistory.isSpeechCorrection"
              direction="horizontal"
              disabled
            >
              <van-checkbox name="1" shape="square">有</van-checkbox>
              <van-checkbox name="0" shape="square">无</van-checkbox>
            </van-checkbox-group>
            <div class="span flex-grow">{{hearrebuildHistory.speechCorrectionDetail}}</div>
          </div>
        </div>
        <div class="chunk">
          <div class="chunk-label">观察所见</div>
          <div class="chunk-content">
            <div>1、一般检查：身高</div>
            <div class="span">{{observations.height}}</div>
            <div>CM，</div>
            <div>体重</div>
            <div class="span">{{observations.weight}}</div>
            <div>KG，</div>
            <div>视力：左</div>
            <div class="span">{{observations.leftVision}}</div>
            <div>右</div>
            <div class="span">{{observations.rightVision}}</div>
          </div>
          <div class="chunk-content">
            <div>2、耳科检查：</div>
            <div class="chunk-content">
              <div class="mr-12">左：乳突</div>
              <van-checkbox-group v-model="observations.leftMastoid" direction="horizontal">
                <van-checkbox name="1" shape="square">红肿</van-checkbox>
                <van-checkbox name="2" shape="square">压痛</van-checkbox>
                <van-checkbox name="3" shape="square">疤痕</van-checkbox>
              </van-checkbox-group>
              <div class="flex-grow">
                <div>其他：</div>
                <div class="span flex-grow">{{observations.leftMastoidDetail}}</div>
              </div>
            </div>
            <div class="chunk-content">
              <div class="mr-12">左：耳廓</div>
              <van-checkbox-group
                v-model="observations.leftAuricle"
                direction="horizontal"
                style="width:604px"
                disabled
              >
                <van-checkbox name="1" shape="square">畸形</van-checkbox>
                <van-checkbox name="2" shape="square">瘘管</van-checkbox>
                <van-checkbox name="3" shape="square">皮疹</van-checkbox>
                <van-checkbox name="4" shape="square">糜烂</van-checkbox>
                <van-checkbox name="5" shape="square">红肿</van-checkbox>
                <van-checkbox name="6" shape="square">血肿</van-checkbox>
                <van-checkbox name="7" shape="square">压痛</van-checkbox>
                <van-checkbox name="8" shape="square">牵拉痛</van-checkbox>
                <van-checkbox name="9" shape="square">耳周围淋巴结肿大</van-checkbox>
              </van-checkbox-group>
              <div class="flex-grow">
                <div>其他：</div>
                <div class="span flex-grow">{{observations.leftAuricleDetail}}</div>
              </div>
            </div>
            <div class="chunk-content">
              <div class="mr-12">右：乳突</div>
              <van-checkbox-group
                v-model="observations.rightMastoid"
                direction="horizontal"
                disabled
              >
                <van-checkbox name="1" shape="square">红肿</van-checkbox>
                <van-checkbox name="2" shape="square">压痛</van-checkbox>
                <van-checkbox name="3" shape="square">疤痕</van-checkbox>
              </van-checkbox-group>
              <div class="flex-grow">
                <div>其他：</div>
                <div class="span flex-grow">{{observations.rightMastoidDetail}}</div>
              </div>
            </div>
            <div class="chunk-content">
              <div class="mr-12">右：耳廓</div>
              <van-checkbox-group
                v-model="observations.rightAuricle"
                direction="horizontal"
                style="width:604px"
                disabled
              >
                <van-checkbox name="1" shape="square">畸形</van-checkbox>
                <van-checkbox name="2" shape="square">瘘管</van-checkbox>
                <van-checkbox name="3" shape="square">皮疹</van-checkbox>
                <van-checkbox name="4" shape="square">糜烂</van-checkbox>
                <van-checkbox name="5" shape="square">红肿</van-checkbox>
                <van-checkbox name="6" shape="square">血肿</van-checkbox>
                <van-checkbox name="7" shape="square">压痛</van-checkbox>
                <van-checkbox name="8" shape="square">牵拉痛</van-checkbox>
                <van-checkbox name="9" shape="square">耳周围淋巴结肿大</van-checkbox>
              </van-checkbox-group>
              <div class="flex-grow">
                <div>其他：</div>
                <div class="span flex-grow">{{observations.rightAuricleDetail}}</div>
              </div>
            </div>
          </div>
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
      userInfo: {
        truename: null,
        sex: null,
        birthday: "",
        patientNum: null,
        updatetime: null,
      },
      // 当前时间
      nowdatetime: new Date()
        .toLocaleString()
        .replace(/\//g, "-")
        .substring(
          0,
          new Date().toLocaleString().replace(/\//g, "-").indexOf(" ")
        ),

      // 现病史
      hpi: {
        mainDetails: null,
        leftFindTime: [],
        rightFindTime: [],
        leftProcess: [],
        rightProcess: [],
        leftBigsound: [],
        rightBigsound: [],
        goodEar: [],
        leftEarache: null,
        rightEarache: null,
        leftTinnitus: null,
        rightTinnitus: null,
        leftFester: [],
        rightFester: [],
        leftFesterDense: [],
        rightFesterDense: [],
        leftFesterContinue: [],
        rightFesterContinue: [],
        leftFesterSmelly: [],
        rightFesterSmelly: [],
        isVertigo: [],
        isAbnormalgait: [],
        isUnsteadystanding: [],
        details: null,
        speakGrowth: null,
        clarity: null,
        talk: null,
        childrenFindTime: [],
        childrenDisabilityLevel: [],
        childrenDisabilityLevelTitle: null,
        childrenLanguageAbility: [],
      },
      // 既往史
      ph: {
        otopathy: [],
        otopathyTitle: null,
        operation: null,
        medicine: null,
        medicineReason: null,
        noise: [],
        noiseDetail: null,
        isleave: [],
        otherDeformity: [],
        otherDeformityTitle: null,
        hasFamilyOtopathy: [],
        familyOtopathyDetail: null,
        familyOtopathyRelation: null,
        familyOtopathyFindTime: null,
        acquiredFactors: [],
        geneResults: [],
        HRCT: null,
        HRMRJ: null,
        previousDiseases: [],
        previousDiseasesTitle: null,
        intellectualHealth: null,
        mentalHealth: null,
        chronicDisease: [],
        chronicDiseaseTitle: null,
        chronicDiseaseMedicine: null,
        allergies: [],
        allergiesTitle: null,
        implants: [],
        implantsTitle: null,
        live: [],
        liveTitle: null,
        smoke: [],
        drink: [],
        nomotion: null,
        nofood: null,
        pregnantIsInfected: [],
        pregnantInfectedWeek: null,
        pregnantMedicine: [],
        pregnantMedicineTitle: null,
        pregnantInfectedVirus: [],
        pregnantInfectedVirusTitle: null,
        otherSymptom: [],
        otherSymptomTitle: null,
        pregnancyWeek: null,
        birthWeight: null,
        isOxygen: [],
        isHypoxia: [],
        isNICU: [],
        isNICUDay: null,
        isNICUreason: null,
        isJaundice: [],
        JaundiceDay: null,
        JaundiceIsIllumination: null,
        JaundiceIlluminationDay: null,
        JaundiceExchangeBlood: null,
        JaundiceExchangeBloodDetail: null,
      },
      // 听力康复史
      hearrebuildHistory: {
        firstWearTime: null,
        audiphoneCount: null,
        leftMatchingTime: null,
        rightMatchingTime: null,
        leftAppearanceType: null,
        rightAppearanceType: null,
        leftBrand: null,
        rightBrand: null,
        leftModel: null,
        rightModel: null,
        leftPrice: null,
        rightPrice: null,
        leftWearTime: null,
        rightWearTime: null,
        leftSatisfied: null,
        rightSatisfied: null,
        leftIsAllergy: null,
        rightIsAllergy: null,
        audiphoneInsufficient: [],
        audiphoneInsufficientTitle: null,
        isSpeechCorrection: [],
        speechCorrectionDetail: null,
        trainingAge: [],
        trainingTime: [],
        trainingCompany: [],
        rehabilitationAssessment: null,
        trainingResult: [],
      },
      // 观察所见
      observations: {
        height: null,
        weight: null,
        leftVision: null,
        rightVision: null,
        leftMastoid: [],
        leftMastoidDetail: null,
        rightMastoid: [],
        rightMastoidDetail: null,
        leftAuricle: [],
        leftAuricleDetail: null,
        rightAuricle: [],
        rightAuricleDetail: null,
      },
      // 历史结果录入
      historyList: [],
      // 选择列表
      relationship: [],
      relation_sign: -1,
      appearances: [],
      leftAppearanceType_sign: -1,
      rightAppearanceType_sign: -1,
      brands: [],
      leftBrand_sign: -1,
      rightBrand_sign: -1,
      models: [],
      leftModel_sign: -1,
      rightModel_sign: -1,
      findTime: ["", "最近7天", "1个月", "3个月", "6个月", "1年"],
      leftProcess: ["", "渐进性", "突发性", "波动性"],
      leftWearTime: ["", "0-3个月", "3个月-1年", "一年以上"],
      leftSatisfied: ["", "不满意", "满意", "非常满意"],
      leftIsAllergy: ["无", "有"],
    };
  },
  computed: {
    age() {
      if (this.userInfo.birthday == "") {
        return;
      }
      return (
        new Date().getFullYear() - Number(this.userInfo.birthday.slice(0, 4))
      );
    },
  },
  created() {
    // 获取用户信息
    api
      .postFormAPI("patient/getInfo", {
        patientId: localStorage.getItem("patientId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.userInfo) {
          if (data.hasOwnProperty(key)) {
            this.userInfo[key] = data[key];
          }
        }

        //数据处理
      })
      .catch((err) => console.log(err));

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

    // 获取现病史
    api
      .postFormAPI("patientHpi/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.hpi) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "leftFindTime":
              case "rightFindTime":
              case "leftProcess":
              case "rightProcess":
              case "leftBigsound":
              case "rightBigsound":
              case "goodEar":
              case "leftFester":
              case "rightFester":
              case "rightFester":
              case "leftFesterDense":
              case "rightFesterDense":
              case "leftFesterContinue":
              case "rightFesterContinue":
              case "leftFesterSmelly":
              case "rightFesterSmelly":
              case "isVertigo":
              case "isAbnormalgait":
              case "isUnsteadystanding":
              case "childrenFindTime":
              case "childrenDisabilityLevel":
              case "childrenLanguageAbility":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.hpi[key] = data[key];
          }
        }
      })
      .catch((err) => console.log(err));

    // 获取既往史
    api
      .postFormAPI("patientPh/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.ph) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "otopathy":
              case "noise":
              case "isleave":
              case "otherDeformity":
              case "hasFamilyOtopathy":
              case "acquiredFactors":
              case "geneResults":
              case "previousDiseases":
              case "chronicDisease":
              case "allergies":
              case "implants":
              case "live":
              case "smoke":
              case "drink":
              case "pregnantIsInfected":
              case "pregnantMedicine":
              case "pregnantInfectedVirus":
              case "otherSymptom":
              case "isOxygen":
              case "isHypoxia":
              case "isNICU":
              case "isJaundice":
                {
                  data[key] = data[key].split(",");
                }
                break;
              case "familyOtopathyRelation": {
                // 获取患者关系数据字典
                api
                  .postFormAPI("common/getDicByKey", {
                    key: "relationship",
                  })
                  .then((res) => {
                    if (res.data.result == "1") {
                      this.relationship = res.data.data;
                      for (let i = 0; i < this.relationship.length; i++) {
                        if (this.relationship[i].key == data[key]) {
                          this.relation_sign = i;
                          break;
                        }
                      }
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }
            this.ph[key] = data[key];
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取听力康复史
    api
      .postFormAPI("patientHearrebuildHistory/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.hearrebuildHistory) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "audiphoneInsufficient":
              case "isSpeechCorrection":
              case "trainingAge":
              case "trainingTime":
              case "trainingCompany":
              case "trainingResult":
                {
                  data[key] = data[key].split(",");
                }
                break;
              case "leftAppearanceType":
              case "rightAppearanceType":
                {
                  // 获取外观数据字典
                  api
                    .postFormAPI("common/getDicByKey", {
                      key: "appearance",
                    })
                    .then((res) => {
                      // console.log(res);
                      if (res.data.result == "1") {
                        this.appearances = res.data.data;
                        for (let i = 0; i < this.appearances.length; i++) {
                          if (this.appearances[i].key == data[key]) {
                            this[key + "_sign"] = i;
                            break;
                          }
                        }
                      }
                    })
                    .catch((err) => console.log(err));
                  // data[key] = this.appearances[data[key] - 1].value;
                }
                break;
              case "leftBrand":
              case "rightBrand":
                {
                  // 获取品牌数据字典
                  api
                    .postFormAPI("common/getDicByKey", {
                      key: "brand",
                    })
                    .then((res) => {
                      // console.log(res);
                      if (res.data.result == "1") {
                        this.brands = res.data.data;
                        for (let i = 0; i < this.brands.length; i++) {
                          if (this.brands[i].key == data[key]) {
                            this[key + "_sign"] = i;
                            break;
                          }
                        }
                      }
                    })
                    .catch((err) => console.log(err));
                }
                break;
              case "leftModel":
              case "rightModel": {
                api
                  .postFormAPI("common/getDicByKey", {
                    key: "model",
                  })
                  .then((res) => {
                    // console.log(res);
                    if (res.data.result == "1") {
                      this.models = res.data.data;
                      for (let i = 0; i < this.models.length; i++) {
                        if (this.models[i].key == data[key]) {
                          this[key + "_sign"] = i;
                          console.log(this[key + "_sign"]);
                          break;
                        }
                      }
                    }
                  })
                  .catch((err) => console.log(err));
              }
            }
            this.hearrebuildHistory[key] = data[key];
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 获取观察所见
    api
      .postFormAPI("patientObservations/getInfo", {
        recordId: localStorage.getItem("recordId"),
        sid: localStorage.getItem("sid"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        const data = res.data.data;
        for (const key in this.observations) {
          if (data.hasOwnProperty(key)) {
            switch (key) {
              case "leftMastoid":
              case "rightMastoid":
              case "leftAuricle":
              case "rightAuricle":
                {
                  data[key] = data[key].split(",");
                }
                break;
            }
            this.observations[key] = data[key];
          }
        }
        //数据处理
      })
      .catch((err) => console.log(err));

    // 历史结果录入列表
    api
      .postFormAPI("patientHistory/index", {
        sid: localStorage.getItem("sid"),
        recordId: localStorage.getItem("recordId"),
      })
      .then((res) => {
        if (res.data.result != 1) {
          return;
        }
        this.historyList = res.data.data;
        //数据处理
      })
      .catch((err) => console.log(err));
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.adultFirstReport {
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
      line-height: 26px;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      .flex-grow {
        display: flex;
        flex-grow: 1;
      }
    }
    .chunk-label {
      font-weight: bold;
    }
    .span {
      min-height: 24px;
      border-bottom: 1px solid #212121;
      padding: 0 1em;
      margin: 0 6px;
      min-width: 26px;
    }
    .table {
      width: 100%;
      padding-right: 1em;
      th {
        font-weight: 400;
      }
      th,
      td {
        text-align: center;
      }
    }
    .table-two {
      width: 100%;
      margin-top: 14px;
      border-collapse: collapse;
      th,
      td {
        border: 1px solid #212121;
        padding: 4px;
        text-align: center;
      }
    }
  }
  .min-text {
    font-size: 14px;
  }
  .mr-12 {
    margin-right: 12px;
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
.adultFirstReport {
  .van-checkbox {
    margin-top: 6px;
    .van-checkbox__label {
      color: #212121;
    }
  }
  .checkbox-grow .van-checkbox-group {
    flex-grow: 1;
    .van-checkbox:last-of-type {
      flex-grow: 1;
      .van-checkbox__label {
        flex-grow: 1;
        display: flex;
      }
    }
  }
  .van-checkbox-group--horizontal {
    margin-left: 8px;
  }
  .min-text .van-checkbox__icon {
    font-size: unset;
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
}
</style>