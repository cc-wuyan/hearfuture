<template>
  <div class="adultCurrentCase">
    <div class="contain">
      <div>
        <p>现病史</p>
        <div class="common-wrapper">
          <div class="title space">主诉</div>
          <div class="content-wrapper">{{userInfo.mainDetails}}</div>
        </div>
        <div class="common-wrapper">
          <div class="title">听力损失病史</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label w210">发现听力损失的时间：</div>
              <div class="option-item">
                <div class="img-left"></div>
                <div class="dropdown">
                  <div>{{leftFindTimeList.list[userInfo.leftFindTime]}}</div>
                </div>
              </div>
              <div class="option-item">
                <div class="img-right"></div>
                <div class="dropdown">
                  <div>{{rightFindTimeList.list[userInfo.rightFindTime]}}</div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label w210">发病进程：</div>
              <div class="option-item">
                <div class="img-left"></div>
                <div class="dropdown">
                  <div>{{leftProcessList.list[userInfo.leftProcess]}}</div>
                </div>
              </div>
              <div class="option-item">
                <div class="img-right"></div>
                <div class="dropdown">
                  <div>{{rightProcessList.list[userInfo.rightProcess]}}</div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label w210">大声有无不舒服：</div>
              <div class="option-item">
                <div class="img-left"></div>
                <div class="dropdown">
                  <div>{{leftBigsoundList.list[userInfo.leftBigsound]}}</div>
                </div>
              </div>
              <div class="option-item">
                <div class="img-right"></div>
                <div class="dropdown">
                  <div>{{rightBigsoundList.list[userInfo.rightBigsound]}}</div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label w210">自己感觉哪只耳朵更好一些：</div>
              <div v-if="userInfo.goodEar==1" class="img-left"></div>
              <div v-if="userInfo.goodEar==2" class="img-left"></div>
              <div class="dropdown" v-if="userInfo.goodEar==1">
                <div>左耳</div>
              </div>
              <div class="dropdown" v-if="userInfo.goodEar==2">
                <div>右耳</div>
              </div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">听损伴随病状</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label al-t">耳痛：</div>
              <div>
                <div class="flex-row">
                  <div class="img-left"></div>
                  <div>{{userInfo.leftEarache}}</div>
                </div>
                <div class="flex-row">
                  <div class="img-right"></div>
                  <div>{{userInfo.rightEarache}}</div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">耳鸣：</div>
              <div>
                <div class="flex-row">
                  <div class="img-left"></div>
                  <div>{{userInfo.leftTinnitus}}</div>
                </div>
                <div class="flex-row">
                  <div class="img-right"></div>
                  <div>{{userInfo.rightTinnitus}}</div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">流脓：</div>
              <div>
                <div class="flex-row">
                  <div class="img-left"></div>
                  <div>
                    <div v-if="userInfo.leftFester==1">新发，</div>
                    <div v-if="userInfo.leftFester==2">陈旧，</div>
                  </div>
                  <div>
                    <span v-if="userInfo.leftFesterDense==1">脓液、</span>
                    <span v-if="userInfo.leftFesterContinue==1">持续、</span>
                    <span v-if="userInfo.leftFesterSmelly==1">有臭味</span>
                  </div>
                </div>
                <div class="flex-row">
                  <div class="img-right"></div>
                  <div>
                    <div v-if="userInfo.rightFester==1">新发，</div>
                    <div v-if="userInfo.rightFester==2">陈旧，</div>
                  </div>
                  <div>
                    <span v-if="userInfo.rightFesterDense==1">脓液、</span>
                    <span v-if="userInfo.rightFesterContinue==1">持续、</span>
                    <span v-if="userInfo.rightFesterSmelly==1">有臭味</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">其他：</div>
              <div v-if="userInfo.isVertigo==1">眩晕、</div>
              <div v-if="userInfo.isAbnormalgait==1">步态异常、</div>
              <div v-if="userInfo.isUnsteadystanding==1">站立不稳</div>
              <div class="left-label">描述：</div>
              <div>{{userInfo.details}}</div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">语言障碍</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="label">语言发育问题：</div>
              <div>{{userInfo.speakGrowth}}</div>
            </div>
            <div class="flex-row">
              <div class="label">语言清楚度：</div>
              <div>{{userInfo.clarity}}</div>
            </div>
            <div class="flex-row">
              <div class="label">表达与沟通能力：</div>
              <div>{{userInfo.talk}}</div>
            </div>
          </div>
        </div>
        <p>既往史</p>
        <div class="common-wrapper">
          <div class="title">耳病史</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label al-t">耳病诊疗史：</div>
              <ol>
                <li v-if="userInfo.otopathy.indexOf('1')!=-1">外耳道炎症</li>
                <li v-if="userInfo.otopathy.indexOf('2')!=-1">中耳炎史</li>
                <li v-if="userInfo.otopathy.indexOf('3')!=-1">鼓膜穿孔</li>
                <li v-if="userInfo.otopathy.indexOf('4')!=-1">梅尼尔症</li>
                <li v-if="userInfo.otopathy.indexOf('5')!=-1">耳硬化症</li>
                <li v-if="userInfo.otopathy.indexOf('6')!=-1">{{userInfo.otopathyTitle}}</li>
              </ol>
            </div>
            <div class="flex-row">
              <div class="left-label">手术史：</div>
              <div>{{userInfo.operation}}</div>
            </div>
            <div class="flex-row">
              <div class="left-label">耳毒性药物使用史：</div>
              <div>{{userInfo.medicine}}</div>
              <div class="left-label">用药原因：</div>
              <div>{{userInfo.medicineReason}}</div>
            </div>
            <div class="flex-row">
              <div class="left-label">噪声接触史：</div>
              <div v-if="userInfo.noise==1">有，{{userInfo.noiseDetail}}</div>
              <div v-if="userInfo.noise==0">无，{{userInfo.noiseDetail}}</div>
              <div class="left-label">目前是否脱离：</div>
              <div v-if="userInfo.isleave==1">是</div>
              <div v-if="userInfo.isleave==0">否</div>
            </div>
            <div class="flex-row">
              <div class="left-label">合并其他残疾：</div>
              <div v-if="userInfo.otherDeformity.indexOf('1')!=1">肢体,</div>
              <div v-if="userInfo.otherDeformity.indexOf('2')!=1">视力,</div>
              <div v-if="userInfo.otherDeformity.indexOf('3')!=1">智力,</div>
              <div v-if="userInfo.otherDeformity.indexOf('4')!=1">精神,</div>
              <div v-if="userInfo.otherDeformity.indexOf('5')!=1">头面部,</div>
              <div v-if="userInfo.otherDeformity.indexOf('6')!=1">毛发,</div>
              <div>{{userInfo.otherDeformityTitle}}</div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">家族史</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label">家族成员中是否有听障：</div>
              <div v-if="userInfo.hasFamilyOtopathy==1">有</div>
              <div v-if="userInfo.hasFamilyOtopathy==0">无</div>
              <div class="left-label">发病时间：{{userInfo.familyOtopathyFindTime}}</div>
            </div>
            <div class="flex-row">
              <div class="left-label">与患者关系：</div>
              <div
                v-if="relationships[userInfo.familyOtopathyRelation] != undefined"
              >{{relationships[userInfo.familyOtopathyRelation]}}</div>
              <div v-else></div>
              <div class="left-label">描述：</div>
              <div>{{userInfo.familyOtopathyDetail}}</div>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">既往病史：</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label al-t">症状：</div>
              <ol>
                <li v-if="userInfo.previousDiseases.indexOf('1')!=-1">脑膜炎</li>
                <li v-if="userInfo.previousDiseases.indexOf('2')!=-1">肝炎</li>
                <li v-if="userInfo.previousDiseases.indexOf('3')!=-1">猩红热</li>
                <li v-if="userInfo.previousDiseases.indexOf('4')!=-1">腮腺炎</li>
                <li v-if="userInfo.previousDiseases.indexOf('5')!=-1">高热</li>
                <li v-if="userInfo.previousDiseases.indexOf('6')!=-1">关节炎</li>
                <li v-if="userInfo.previousDiseases.indexOf('7')!=-1">过敏</li>
                <li v-if="userInfo.previousDiseases.indexOf('8')!=-1">颅骨骨折</li>
                <li v-if="userInfo.previousDiseases.indexOf('9')!=-1">帕金森</li>
                <li v-if="userInfo.previousDiseases.indexOf('10')!=-1">恶性肿瘤</li>
                <li v-if="userInfo.previousDiseases.indexOf('11')!=-1">癫痫</li>
                <li v-if="userInfo.previousDiseases.indexOf('12')!=-1">艾滋病</li>
                <li v-if="userInfo.previousDiseases.indexOf('13')!=-1">中风</li>
                <li v-if="userInfo.previousDiseases.indexOf('14')!=-1">阿尔兹海默症</li>
                <li v-if="userInfo.previousDiseases.indexOf('15')!=-1">麻疹</li>
                <li v-if="userInfo.previousDiseases.indexOf('16')!=-1">视觉障碍</li>
                <li v-if="userInfo.previousDiseases.indexOf('17')!=-1">面部神经麻痹</li>
                <li v-if="userInfo.previousDiseases.indexOf('18')!=-1">抑郁</li>
                <li v-if="userInfo.previousDiseases.indexOf('19')!=-1">兴奋</li>
                <li v-if="userInfo.previousDiseases.indexOf('20')!=-1">多发性硬化</li>
                <li
                  v-if="userInfo.previousDiseases.indexOf('21')!=-1"
                >{{userInfo.previousDiseasesTitle}}</li>
              </ol>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">精神智力健康：</div>
              <div>{{userInfo.intellectualHealth}}</div>
              <div class="left-label al-t">心理健康状况：</div>
              <div>{{userInfo.mentalHealth}}</div>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">慢性病：</div>
              <ol>
                <li v-if="userInfo.chronicDisease.indexOf('1')!=-1">高血压</li>
                <li v-if="userInfo.chronicDisease.indexOf('2')!=-1">高血脂</li>
                <li v-if="userInfo.chronicDisease.indexOf('3')!=-1">糖尿病</li>
                <li v-if="userInfo.chronicDisease.indexOf('4')!=-1">{{userInfo.chronicDiseaseTitle}}</li>
              </ol>
              <div class="left-label al-t">用药史：</div>
              <div>{{userInfo.chronicDiseaseMedicine}}</div>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">过敏史：</div>
              <ol>
                <li v-if="userInfo.allergies.indexOf('1')!=-1">药物</li>
                <li v-if="userInfo.allergies.indexOf('2')!=-1">食物</li>
                <li v-if="userInfo.allergies.indexOf('3')!=-1">金属</li>
                <li v-if="userInfo.allergies.indexOf('4')!=-1">{{userInfo.allergiesTitle}}</li>
              </ol>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">植入体：</div>
              <ol>
                <li v-if="userInfo.implants.indexOf('1')!=-1">心脏起搏器</li>
                <li v-if="userInfo.implants.indexOf('2')!=-1">人工耳蜗</li>
                <li v-if="userInfo.implants.indexOf('3')!=-1">{{userInfo.implantsTitle}}</li>
              </ol>
            </div>
          </div>
        </div>
        <div class="common-wrapper">
          <div class="title">生活方式</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label al-t">居住情況：</div>
              <div v-if="userInfo.live==1">独居</div>
              <div v-if="userInfo.live==2">和亲戚朋友居住</div>
              <div v-if="userInfo.live==3">和家人居住</div>
              <div v-if="userInfo.live==4">{{userInfo.liveTitle}}</div>
            </div>
            <div class="flex-row al-t">
              <div class="left-label">吸烟史：</div>
              <div v-if="userInfo.smoke==1">有</div>
              <div v-if="userInfo.smoke==0">无</div>
              <div class="left-label al-t">饮酒史：</div>
              <div v-if="userInfo.drink==1">有</div>
              <div v-if="userInfo.drink==0">无</div>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">需要限制的运动：</div>
              <div>{{userInfo.nomotion}}</div>
              <div class="left-label al-t">需要限制的食物：</div>
              <div>{{userInfo.nofood}}</div>
            </div>
          </div>
        </div>
        <p>助听器佩戴史</p>
        <div class="common-wrapper">
          <div class="title title-width">助听器/人工耳蜗佩戴史</div>
          <div class="content-wrapper">
            <div class="flex-row">
              <div class="left-label">首次佩戴时间：</div>
              <div>{{userInfo.firstWearTime}}</div>
              <div class="left-label">历史拥有助听器数量：</div>
              <div>{{userInfo.audiphoneCount}}</div>
            </div>
            <div>
              <div>现有助听器:</div>
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
                        <div
                          v-if="userInfo.leftWearTime!=''"
                        >{{wearTimeList[userInfo.leftWearTime]}}</div>
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
                      <td>{{userInfo.rightMatchingTime}}</td>
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
                          v-if="userInfo.rightIsAllergy!=''"
                        >{{isAllergyList[userInfo.rightIsAllergy]}}</div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label">现有助听器不足：</div>
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
            <div class="flex-row">
              <div v-if="userInfo.isSpeechCorrection==1">有</div>
              <div v-if="userInfo.isSpeechCorrection==0">无</div>
              <div
                v-if="userInfo.speechCorrectionDetail!=null"
              >{{"，"+userInfo.speechCorrectionDetail}}</div>
            </div>
          </div>
        </div>
        <p>观察所见</p>
        <div class="common-wrapper">
          <div class="space title">检查</div>
          <div class="content-wrapper">
            <div class="mb-12">一般检查：</div>
            <div class="flex-row">
              <div class="left-label">身高</div>
              <div>{{userInfo.height}}</div>
              <div>CM</div>
              <div class="left-label">体重</div>
              <div>{{userInfo.weight}}</div>
              <div>KG</div>
            </div>
            <div class="mb-12">视 力：</div>
            <div class="flex-row">
              <div class="left-label">左</div>
              <div>{{userInfo.leftVision}}</div>
              <div class="left-label">右</div>
              <div>{{userInfo.rightVision}}</div>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">乳 突：</div>
              <div>
                <div class="flex-row">
                  <div class="img-left"></div>
                  <div style="padding-right:10px;" v-if="userInfo.leftMastoid.includes('1')">红肿</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftMastoid.includes('2')">压痛</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftMastoid.includes('3')">疤痕</div>
                </div>
                <div class="mb-12">描述：{{userInfo.leftMastoidDetail}}</div>
                <div class="flex-row">
                  <div class="img-right"></div>
                  <div style="padding-right:10px;" v-if="userInfo.rightMastoid.includes('1')">红肿</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightMastoid.includes('2')">压痛</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightMastoid.includes('3')">疤痕</div>
                </div>
                <div class="mb-12">描述：{{userInfo.rightMastoidDetail}}</div>
              </div>
            </div>
            <div class="flex-row">
              <div class="left-label al-t">耳 廓：</div>
              <div>
                <div class="flex-row">
                  <div class="img-left"></div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('1')">畸形</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('2')">瘘管</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('3')">皮疹</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('4')">糜烂</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('5')">红肿</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('6')">血肿</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('7')">压痛</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('8')">牵拉痛</div>
                  <div style="padding-right:10px;" v-if="userInfo.leftAuricle.includes('9')">耳周围淋巴结肿大</div>
                </div>
                <div class="mb-12">描述：{{userInfo.leftAuricleDetail}}</div>
                <div class="flex-row">
                  <div class="img-right"></div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('1')">畸形</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('2')">瘘管</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('3')">皮疹</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('4')">糜烂</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('5')">红肿</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('6')">血肿</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('7')">压痛</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('8')">牵拉痛</div>
                  <div style="padding-right:10px;" v-if="userInfo.rightAuricle.includes('9')">耳周围淋巴结肿大</div>
                </div>
                <div class="mb-12">描述：{{userInfo.rightAuricleDetail}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  name: "firstDiagnosis",
  data() {
    return {
      userInfo: {
        mainDetails: "",
        leftFindTime: "",
        rightFindTime: "",
        leftProcess: "",
        rightProcess: "",
        leftBigsound: "",
        rightBigsound: "",
        goodEar: "",
        leftEarache: "",
        rightEarache: "",
        leftTinnitus: "",
        rightTinnitus: "",
        leftFester: "0",
        rightFester: "0",
        leftFesterDense: "",
        rightFesterDense: "",
        leftFesterContinue: "",
        rightFesterContinue: "",
        leftFesterSmelly: "",
        rightFesterSmelly: "",
        isVertigo: "",
        isAbnormalgait: "",
        isUnsteadystanding: "",
        details: "",
        talk: "",
        clarity: "",
        speakGrowth: "",

        //既往史
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

        //助听器佩戴史
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

        //观察所见
        height: "",
        weight: "",
        leftVision: "",
        rightVision: "",
        leftMastoid: [],
        leftMastoidDetail: "",
        rightMastoid: [],
        rightMastoidDetail: "",
        leftAuricle: [],
        leftAuricleDetail: "",
        rightAuricle: [],
        rightAuricleDetail: "",
      },

      relationships: {},
      findTimeList: ["最近7天", "1个月", "3个月", "4-6个月", "5-1年"],
      processList: ["渐进性", "突发性", "波动性"],
      bigsoundList: ["无", "有"],
      appearances: {},
      brands: {},
      models: {},
      wearTimeList: ["", "0-3个月", "3个月-1年", "一年以上"],
      satisfiedList: ["", "不满意", "满意", "非常满意"],
      isAllergyList: ["无", "有"],
      leftFindTimeList: {
        list: ["最近7天", "1个月", "3个月", "4-6个月", "5-1年"],
        index: -1,
        name: "leftFindTime",
      },
      rightFindTimeList: {
        list: ["最近7天", "1个月", "3个月", "4-6个月", "5-1年"],
        index: -1,
        name: "rightFindTime",
      },
      leftProcessList: {
        list: ["渐进性", "突发性", "波动性"],
        index: -1,
        name: "leftProcess",
      },
      rightProcessList: {
        list: ["渐进性", "突发性", "波动性"],
        index: -1,
        name: "rightProcess",
      },
      leftBigsoundList: {
        list: ["无", "有"],
        index: -1,
        name: "leftBigsound",
      },
      rightBigsoundList: {
        list: ["无", "有"],
        index: -1,
        name: "rightBigsound",
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化数据
    init() {
      //现病史
      api
        .postFormAPI("patientHpi/getInfo", {
          sid: localStorage.getItem("sid"),
          patientId: localStorage.getItem("patientId"),
        })
        .then((res) => {
          if (res.data.result == "1") {
            const data = res.data.data;
            for (let key in this.userInfo) {
              if (data.hasOwnProperty(key)) {
                switch (key) {
                  case "leftFesterDense":
                  case "leftFesterContinue":
                  case "leftFesterSmelly":
                  case "rightFesterDense":
                  case "rightFesterContinue":
                  case "rightFesterSmelly":
                  case "isVertigo":
                  case "isAbnormalgait":
                  case "isUnsteadystanding":
                    {
                      data[key] == "0"
                        ? (data[key] = false)
                        : (data[key] = true);
                    }
                    break;
                }
                this.userInfo[key] = data[key];
              }
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));

      //既往史
      api
        .postFormAPI("patientPh/getInfo", {
          sid: localStorage.getItem("sid"),
          patientId: localStorage.getItem("patientId"),
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }

          const data = res.data.data;
          for (let key in this.userInfo) {
            if (data.hasOwnProperty(key)) {
              switch (key) {
                case "leftFesterDense":
                case "leftFesterContinue":
                case "leftFesterSmelly":
                case "rightFesterDense":
                case "rightFesterContinue":
                case "rightFesterSmelly":
                case "isVertigo":
                case "isAbnormalgait":
                case "isUnsteadystanding":
                  {
                    data[key] == "0" ? (data[key] = false) : (data[key] = true);
                  }
                  break;
              }
              this.userInfo[key] = data[key];
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));

      //观察所见
      api
        .postFormAPI("patientObservations/getInfo", {
          sid: localStorage.getItem("sid"),
          patientId: localStorage.getItem("patientId"),
        })
        .then((res) => {
          if (res.data.result != "1") {
            return;
          }
          const data = res.data.data;
          for (let key in this.userInfo) {
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
              this.userInfo[key] = data[key];
            }
          }
          //数据处理
        })
        .catch((err) => console.log(err));
      // 获取听觉康复史
      api
        .postFormAPI("patientHearrebuildHistory/getInfo", {
          sid: localStorage.getItem("sid"),
          patientId: localStorage.getItem("patientId"),
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
      this.getDataDictionaryForRelation("relationship");
      this.getDataDictionaryForRelation("appearance");
      this.getDataDictionaryForRelation("brand");
      this.getDataDictionaryForRelation("model");
    },
    // 获取数据字典
    getDataDictionaryForRelation(e) {
      api
        .postFormAPI("common/getDicByKey", {
          sid: localStorage.getItem("sid"),
          patientId: localStorage.getItem("patientId"),
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
.adultCurrentCase {
  font-size: 16px;
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
    padding-bottom: 14px;
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
  .title-width {
    width: 210px;
  }
  .space {
    letter-spacing: 1em;
  }

  .content-wrapper {
    padding: 14px 14px;
    padding-bottom: 0;
    overflow: hidden;
  }

  .img-left,
  .img-right {
    width: 14px;
    height: 20px;
    background: url("../../../assets/image/icon_ears_left@2x.png") no-repeat;
    background-size: contain;
    margin: 0 6px 0 6px;
    flex-shrink: 0;
  }

  .img-right {
    background: url("../../../assets/image/icon_ears_right@2x.png") no-repeat;
    background-size: contain;
  }
  .flex-row {
    display: flex;
    align-items: center;
    .left-label {
      flex-shrink: 0;
      margin-right: 10px;
      &:not(:first-child) {
        margin-left: 60px;
      }
    }
    .w210 {
      width: 210px;
      text-align: right;
    }
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    .al-t {
      align-self: flex-start;
    }
  }
  .mb-12 {
    margin-bottom: 12px;
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
      width: 110%;
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
  .option-item {
    display: flex;
    flex-grow: 1;
    height: 44px;
    align-items: center;
    background-color: #f3f3f3;

    .dropdown {
      flex-grow: 1;
      height: 34px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      background: #fff;
      color: #646464;
      padding: 0 8px;
      justify-content: space-between;
    }
    .dropdown_icon {
      width: 16px;
      height: 10px;
      background: url("../../../assets/images/icon_more@2x.png") center/cover;
    }
  }
  ol {
    margin-left: 14px;
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
