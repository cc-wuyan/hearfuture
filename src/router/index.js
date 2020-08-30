// import Vue from 'vue'
// import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
            path: '/',
            name: 'index',
            component: (resvole) => require(['../views/index'], resvole),
            meta: {
                title: '七步法第一步建档-成人问卷'
            }
        },
        {
            path: '/adultQuestion',
            name: 'adultQuestion',
            component: (resvole) => require(['../views/adultQuestion/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-成人问卷'
            }
        },
        {
            path: '/childQuestion',
            name: 'childQuestion',
            component: (resvole) => require(['../views/childQuestion/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-儿童问卷'
            }
        },
        {
            path: '/SevenStep1PutFile',
            name: 'SevenStep1PutFile',
            component: (resvole) => require(['../views/sevenStep/SevenStep1PutFile.vue'], resvole),
            meta: {
                title: '七步法第一步建档-基本信息'
            }
        },
        {
            path: '/SevenStep1DetailInfo',
            name: 'SevenStep1DetailInfo',
            component: (resvole) => require(['../views/sevenStep/SevenStep1DetailInfo.vue'], resvole),
            meta: {
                title: '七步法第一步建档-详细信息'
            }
        },
        {
            path: '/SevenStep1DetailInfoEdit',
            name: 'SevenStep1DetailInfoEdit',
            component: (resvole) => require(['../views/sevenStep/SevenStep1DetailInfoEdit.vue'], resvole),
            meta: {
                title: '七步法第一步建档-详细信息编辑'
            }
        },
        {
            path: '/SevenStep1DetailInfoAdd',
            name: 'SevenStep1DetailInfoAdd',
            component: (resvole) => require(['../views/sevenStep/SevenStep1DetailInfoAdd.vue'], resvole),
            meta: {
                title: '七步法第一步建档-详细信息新增'
            }
        },
        {
            path: '/adultReport',
            name: 'adultReport',
            component: (resvole) => require(['../views/adultReport/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-成人报告'
            }
        },
        {
            path: '/childReport',
            name: 'childReport',
            component: (resvole) => require(['../views/childReport/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-儿童报告'
            }
        },
        {
            path: '/adultFirstCase',
            name: 'adultFirstCase',
            component: (resvole) => require(['../views/adultFirstCase/index.vue'], resvole),
            redirect: '/adultCurrentCase',
            meta: {
                title: '七步法第二步问诊-成人首诊'
            }
        },
        {
            path: '/adultQuestion',
            name: 'adultQuestion',
            component: (resvole) => require(['../views/adultQuestion/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-成人问卷'
            }
        },
        {
            path: '/childQuestion',
            name: 'childQuestion',
            component: (resvole) => require(['../views/childQuestion/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-儿童问卷'
            }
        },
        {
            path: '/SevenStep1PutFile',
            name: 'SevenStep1PutFile',
            component: (resvole) => require(['../views/sevenStep/SevenStep1PutFile.vue'], resvole),
            meta: {
                title: '七步法第一步建档-基本信息'
            }
        },
        {
            path: '/SevenStep1DetailInfo',
            name: 'SevenStep1DetailInfo',
            component: (resvole) => require(['../views/sevenStep/SevenStep1DetailInfo.vue'], resvole),
            meta: {
                title: '七步法第一步建档-详细信息'
            }
        },
        {
            path: '/SevenStep1DetailInfoEdit',
            name: 'SevenStep1DetailInfoEdit',
            component: (resvole) => require(['../views/sevenStep/SevenStep1DetailInfoEdit.vue'], resvole),
            meta: {
                title: '七步法第一步建档-详细信息编辑'
            }
        },
        {
            path: '/adultReport',
            name: 'adultReport',
            component: (resvole) => require(['../views/adultReport/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-成人报告'
            }
        },
        {
            path: '/childReport',
            name: 'childReport',
            component: (resvole) => require(['../views/childReport/index.vue'], resvole),
            meta: {
                title: '七步法第一步建档-儿童报告'
            }
        },
        {
            path: '/adultFirstCase',
            name: 'adultFirstCase',
            component: (resvole) => require(['../views/adultFirstCase/index.vue'], resvole),
            redirect: '/adultCurrentCase',
            meta: {
                title: '七步法第二步问诊-成人首诊'
            },
            children: [{
                    path: '/adultCurrentCase',
                    name: 'adultCurrentCase',
                    component: (resvole) => require(['../views/adultFirstCase/views/adultCurrentCase/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-成人现病史'
                    }
                },
                {
                    path: '/adultOldCase',
                    name: 'adultOldCase',
                    component: (resvole) => require(['../views/adultFirstCase/views/adultOldCase/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-成人即往史'
                    }
                },
                {
                    path: '/adultRecoveryCase',
                    name: 'adultRecoveryCase',
                    component: (resvole) => require(['../views/adultFirstCase/views/adultRecoveryCase/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-成人听力康复史'
                    }
                },
                {
                    path: '/adultObservation',
                    name: 'adultObservation',
                    component: (resvole) => require(['../views/adultFirstCase/views/adultObservation/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-成人观察所见'
                    }
                }
            ]
        },
        {
            path: '/childFirstCase',
            name: 'childFirstCase',
            component: (resvole) => require(['../views/childFirstCase/index.vue'], resvole),
            redirect: '/childCurrentCase',
            meta: {
                title: '七步法第二步问诊-儿童首诊'
            },
            children: [{
                    path: '/childCurrentCase',
                    name: 'childCurrentCase',
                    component: (resvole) => require(['../views/childFirstCase/views/childCurrentCase/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-儿童现病史'
                    }
                },
                {
                    path: '/childOldCase',
                    name: 'childOldCase',
                    component: (resvole) => require(['../views/childFirstCase/views/childOldCase/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-儿童即往史'
                    }
                },
                {
                    path: '/childRecoveryCase',
                    name: 'childRecoveryCase',
                    component: (resvole) => require(['../views/childFirstCase/views/childRecoveryCase/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-儿童听力康复史'
                    }
                },
                {
                    path: '/childObservation',
                    name: 'childObservation',
                    component: (resvole) => require(['../views/childFirstCase/views/childObservation/index.vue'], resvole),
                    meta: {
                        title: '七步法第二步问诊-儿童观察所见'
                    }
                }
            ]
        },
        {
            path: '/reviewCase',
            name: 'reviewCase',
            component: (resvole) => require(['../views/reviewCase/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-复诊病历'
            }
        },
        {
            path: '/reviewCaseReport',
            name: 'reviewCaseReport',
            component: (resvole) => require(['../views/reviewCaseReport/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-复诊病历报告'
            }
        },
        {
            path: '/bill',
            name: 'bill',
            component: (resvole) => require(['../views/bill/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-收费票据'
            }
        },
        {
            path: '/payList',
            name: 'payList',
            component: (resvole) => require(['../views/payList/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-收费列表'
            }
        },
        {
            path: '/adultFirstReport',
            name: 'adultFirstReport',
            component: (resvole) => require(['../views/adultFirstReport/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-成人首诊病例报告'
            }
        },
        {
            path: '/childFirstReport',
            name: 'childFirstReport',
            component: (resvole) => require(['../views/childFirstReport/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-儿童首诊病例报告'
            }
        },
        {
            path: '/historyResult',
            name: 'historyResult',
            component: (resvole) => require(['../views/historyResult/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-儿童首诊病例报告'
            }
        },
        {
            path: '/servicesList',
            name: 'servicesList',
            component: (resvole) => require(['../views/servicesList/index.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-结果列表'
            }
        },
        {
            path: '/editResult',
            name: 'editResult',
            component: (resvole) => require(['../views/historyResult/editResult.vue'], resvole),
            meta: {
                title: '七步法第二步问诊-添加结果'
            }
        },
        {
            path: '/diagnosisReport',
            name: 'diagnosisReport',
            component: (resvole) => require(['../views/stepFour/diagnosisReport.vue'], resvole),
            meta: {
                title: '七步法第四步处方方案-诊断报告'
            }
        },
        {
            path: '/reportDetail',
            name: 'reportDetail',
            component: (resvole) => require(['../views/historyResult/reportDetail.vue'], resvole),
            meta: {
                title: '七步法第四步检验检测-诊断报告'
            }
        },
        {
            path: '/otoscopeReport',
            name: 'otoscopeReport',
            component: (resvole) => require(['../views/otoscopeReport/index.vue'], resvole),
            meta: {
                title: '七步法第三步检验检测-耳窥镜检查报告'
            }
        },
        {
            path: '/specailReport',
            name: 'specailReport',
            component: (resvole) => require(['../views/questionAdvice/specailReport.vue'], resvole),
            meta: {
                title: '七步法第三步检验检测-听觉改善分级问卷'
            }
        },
        {
            path: '/soundTextReport',
            name: 'soundTextReport',
            component: (resvole) => require(['../views/soundTextReport/index.vue'], resvole),
            meta: {
                title: '七步法第三步检验检测-纯音测听报告'
            }
        },
        {
            path: '/speechTextReport',
            name: 'speechTextReport',
            component: (resvole) => require(['../views/speechTextReport/index.vue'], resvole),
            meta: {
                title: '七步法第三步检验检测-言语测听报告'
            }
        },
        {
            path: '/questionnaireReport',
            name: 'questionnaireReport',
            component: (resvole) => require(['../views/questionnaireReport/index.vue'], resvole),
            meta: {
                title: '七步法第三步检验检测-问卷报告单'
            }
        },
        {
            path: '/reportList',
            name: 'reportList',
            component: (resvole) => require(['../views/questionnaireReport/report.vue'], resvole),
            meta: {
                title: '七步法第三步检验检测-问卷报告单'
            }
        },
        {
            path: '/questionAdviceWrapper',
            name: 'questionAdviceWrapper',
            component: (resvole) => require(['../views/questionAdvice/wrapper.vue'], resvole),
            redirect: '/questionAdviceIndex',
            meta: {
                title: '七步法第三步问卷咨询-问卷咨询'
            },
            children: [{
                    path: '/questionAdviceIndex',
                    name: 'questionAdviceIndex',
                    component: (resvole) => require(['../views/questionAdvice/index.vue'], resvole),
                    meta: {
                        title: '七步法第三步问卷咨询-问卷咨询'
                    }
                },
                {
                    path: '/questionAdviceHistory',
                    name: 'questionAdviceHistory',
                    component: (resvole) => require(['../views/questionAdvice/history.vue'], resvole),
                    meta: {
                        title: '七步法第三步问卷咨询-历史记录'
                    }
                }
            ]
        },
        {
            path: '/questionList',
            name: 'questionList',
            component: (resvole) => require(['../views/questionAdvice/question.vue'], resvole),
            meta: {
                title: '七步法第四步检验检测-诊断报告'
            }
        },
        {
            path: '/needsAssessment',
            name: 'needsAssessment',
            component: (resvole) => require(['../views/stepFour/wrapper.vue'], resvole),
            redirect: '/needsAssessment',
            meta: {
                title: '七步法第四步处方方案-需求评估'
            },
            children: [{
                    path: '/needsAssessment',
                    name: 'needsAssessment',
                    component: (resvole) => require(['../views/stepFour/needsAssessment.vue'], resvole),
                    meta: {
                        title: '七步法第四步处方方案-需求评估'
                    }
                },
                {
                    path: '/noiseLevelSelection',
                    name: 'noiseLevelSelection',
                    component: (resvole) => require(['../views/stepFour/noiseLevelSelection.vue'], resvole),
                    meta: {
                        title: '七步法第三步问卷咨询-历史记录'
                    }
                },
                {
                    path: '/noiseDistance',
                    name: 'noiseDistance',
                    component: (resvole) => require(['../views/stepFour/noiseDistance.vue'], resvole),
                    meta: {
                        title: '七步法第三步问卷咨询-历史记录'
                    }
                },
                {
                    path: '/noiseTarget',
                    name: 'noiseTarget',
                    component: (resvole) => require(['../views/stepFour/noiseTarget.vue'], resvole),
                    meta: {
                        title: '七步法第三步问卷咨询-历史记录'
                    }
                },
                {
                    path: '/noiseSummary',
                    name: 'noiseSummary',
                    component: (resvole) => require(['../views/stepFour/noiseSummary.vue'], resvole),
                    meta: {
                        title: '七步法第三步问卷咨询-历史记录'
                    }
                }
            ]
        },
        {
            path: '/healthyProgram',
            name: 'healthyProgram',
            component: (resvole) => require(['../views/stepFour/healthyProgram.vue'], resvole),
            meta: {
                title: '七步法第四步处方方案-康复方案'
            }
        },
        {
            path: '/diareportReport',
            name: 'diareportReport',
            component: (resvole) => require(['../views/diareportReport/index.vue'], resvole),
            meta: {
                title: '七步法第四步检验检测-听觉言语诊断报告'
            }
        },
        {
            path: '/needsAssessmentReport',
            name: 'needsAssessmentReport',
            component: (resvole) => require(['../views/needsAssessmentReport/index.vue'], resvole),
            meta: {
                title: '七步法第四步检验检测-听障困难与需求评估报告'
            }
        },
        {
            path: '/hearingAidTestReport',
            name: 'hearingAidTestReport',
            component: (resvole) => require(['../views/hearingAidTestReport/index.vue'], resvole),
            meta: {
                title: '七步法第五步检验检测-听障困难与需求评估报告'
            }
        },
        {
            path: '/clinicalEvaluationReport',
            name: 'clinicalEvaluationReport',
            component: (resvole) => require(['../views/clinicalEvaluationReport/index.vue'], resvole),
            meta: {
                title: '七步法第五步检验检测-助听器/人工耳蜗临床效果评估报告'
            }
        },
        {
            path: '/hearingAidProfitabilityReport',
            name: 'hearingAidProfitabilityReport',
            component: (resvole) => require(['../views/hearingAidProfitabilityReport/index.vue'], resvole),
            meta: {
                title: '七步法第五步检验检测-助听器受益度评估报告'
            }
        },
        {
            path: '/acousticTherapyReport',
            name: 'acousticTherapyReport',
            component: (resvole) => require(['../views/acousticTherapyReport/index.vue'], resvole),
            meta: {
                title: '七步法第五步检验检测-声治疗效果评估报告'
            }
        },
        {
            path: '/assistiveDevices',
            name: 'assistiveDevices',
            component: (resvole) => require(['../views/assistiveDevices/index.vue'], resvole),
            meta: {
                title: '七步法第六步检验检测-维修单'
            },
            redirect: "/customOrder",
            children: [{
                    path: '/customOrder',
                    name: 'customOrder',
                    component: (resvole) => require(['../views/assistiveDevices/customOrder/index.vue'], resvole),
                    meta: {
                        title: '七步法第六步检验检测-助听器定制单'
                    },
                },
                {
                    path: '/repairOrder',
                    name: 'repairOrder',
                    component: (resvole) => require(['../views/assistiveDevices/repairOrder/index.vue'], resvole),
                    meta: {
                        title: '七步法第六步检验检测-维修单'
                    },
                }
            ]
        },
        {
            path: '/customReport',
            name: 'customReport',
            component: (resvole) => require(['../views/customReport/index.vue'], resvole),
            meta: {
                title: '七步法第六步检验检测-定制报告单'
            }
        },
        {
            path: '/maintenanceReport',
            name: 'maintenanceReport',
            component: (resvole) => require(['../views/maintenanceReport/index.vue'], resvole),
            meta: {
                title: '七步法第六步检验检测-维修报告单'
            }
        },
        {
            path: '/healthConsultant',
            name: 'healthConsultant',
            component: (resvole) => require(['../views/returnVisit/healthConsultant/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-私人健康顾问'
            }
        },
        {
            path: '/medicalReport',
            name: 'medicalReport',
            component: (resvole) => require(['../views/medicalReport/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-就诊报告'
            }
        },
        {
            path: '/medicalAdvice',
            name: 'medicalAdvice',
            component: (resvole) => require(['../views/returnVisit/medicalAdvice/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-医嘱'
            }
        },
        {
            path: '/continuousService',
            name: 'continuousService',
            component: (resvole) => require(['../views/returnVisit/continuousService/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-持续服务'
            }
        },
        {
            path: '/protectionGuarantee',
            name: 'protectionGuarantee',
            component: (resvole) => require(['../views/returnVisit/protectionGuarantee/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-保障保护'
            }
        },
        {
            path: '/commissioningInspection',
            name: 'commissioningInspection',
            component: (resvole) => require(['../views/returnVisit/commissioningInspection/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-调试检验'
            }
        },

        {
            path: '/debuggingReport',
            name: 'debuggingReport',
            component: (resvole) => require(['../views/returnVisit/debuggingReport/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-调试校验报告'
            }
        },
        {
            path: '/medicalAdviceReport',
            name: 'medicalAdviceReport',
            component: (resvole) => require(['../views/returnVisit/medicalAdviceReport/index.vue'], resvole),
            meta: {
                title: '七步法第七步检验检测-医嘱报告'
            }
        },
        {
            path: '/auditReminder',
            name: 'auditReminder',
            component: (resvole) => require(['../views/reminderManagement/auditReminder/index.vue'], resvole),
            meta: {
                title: '病例管理-审核提醒'
            }
        }, {
            path: '/auditDetail',
            name: 'auditDetail',
            component: (resvole) => require(['../views/reminderManagement/auditReminder/auditDetail.vue'], resvole),
            meta: {
                title: '病例管理-审核提醒-详情'
            }
        }, {
            path: '/orderReminder',
            name: 'orderReminder',
            component: (resvole) => require(['../views/reminderManagement/orderReminder/index.vue'], resvole),
            meta: {
                title: '病例管理-订单提醒'
            }
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: (resvole) => require(['../views/reminderManagement/orderReminder/orderDetail.vue'], resvole),
            meta: {
                title: '病例管理-订单提醒-详情'
            }
        },
        {
            path: '/caseSubmission',
            name: 'caseSubmission',
            component: (resvole) => require(['../views/reminderManagement/caseSubmission/index.vue'], resvole),
            meta: {
                title: '病例管理-病例提交'
            }
        },
        {
            path: '/appointmentReminder',
            name: 'appointmentReminder',
            component: (resvole) => require(['../views/reminderManagement/appointmentReminder/index.vue'], resvole),
            meta: {
                title: '病例管理-预约提醒'
            }
        },
        {
            path: '/visitReminder',
            name: 'visitReminder',
            component: (resvole) => require(['../views/reminderManagement/visitReminder/index.vue'], resvole),
            meta: {
                title: '病例管理-预约提醒'
            }
        },
        {
            path: '/consultationReminder',
            name: 'consultationReminder',
            component: (resvole) => require(['../views/reminderManagement/consultationReminder/index.vue'], resvole),
            meta: {
                title: '病例管理-会诊提醒'
            }
        },
        {
            path: '/birthdayReminder',
            name: 'birthdayReminder',
            component: (resvole) => require(['../views/reminderManagement/birthdayReminder/index.vue'], resvole),
            meta: {
                title: '病例管理-生日提醒'
            }
        },
        {
            path: '/repairDueReminder',
            name: 'repairDueReminder',
            component: (resvole) => require(['../views/reminderManagement/repairDueReminder/index.vue'], resvole),
            meta: {
                title: '病例管理-保质到期提醒'
            }
        },
        {
            path: '/patient',
            name: 'patient',
            component: (resvole) => require(['../views/patient/info.vue'], resvole),
            meta: {
                title: '病例管理'
            }
        },
        {
            path: '/OrganizationProfile',
            name: 'OrganizationProfile',
            component: (resvole) => require(['../views/adviceCase/step1/OrganizationProfile.vue'], resvole),
            meta: {
                title: '机构简介'
            }
        },
        {
            path: '/RehabilitationVideo',
            name: 'RehabilitationVideo',
            component: (resvole) => require(['../views/adviceCase/step1/RehabilitationVideo.vue'], resvole),
            meta: {
                title: '康复视频资料'
            }
        },
        {
            path: '/SoundFailure',
            name: 'SoundFailure',
            component: (resvole) => require(['../views/adviceCase/step2/SoundFailure.vue'], resvole),
            meta: {
                title: '声音失效'
            }
        },
        {
            path: '/AuditoryPathology',
            name: 'AuditoryPathology',
            component: (resvole) => require(['../views/adviceCase/step2/AuditoryPathology.vue'], resvole),
            meta: {
                title: '听觉病理'
            }
        },
        {
            path: '/MentalProcessPatients',
            name: 'MentalProcessPatients',
            component: (resvole) => require(['../views/adviceCase/step2/MentalProcessPatients.vue'], resvole),
            meta: {
                title: '听障患者心路历程'
            }
        },
        {
            path: '/AmazingListening',
            name: 'AmazingListening',
            component: (resvole) => require(['../views/adviceCase/step3/AmazingListening.vue'], resvole),
            meta: {
                title: '神奇的听力'
            }
        },
        {
            path: '/HearingAidTechnology',
            name: 'HearingAidTechnology',
            component: (resvole) => require(['../views/adviceCase/step3/HearingAidTechnology.vue'], resvole),
            meta: {
                title: '助听科技'
            }
        },
        {
            path: '/HearingWorldWithEars',
            name: 'HearingWorldWithEars',
            component: (resvole) => require(['../views/adviceCase/step3/HearingWorldWithEars.vue'], resvole),
            meta: {
                title: '双耳听世界'
            }
        },
        {
            path: '/YourDayScene',
            name: 'YourDayScene',
            component: (resvole) => require(['../views/adviceCase/step4/YourDayScene.vue'], resvole),
            meta: {
                title: '你的一日生活场景'
            }
        },
        {
            path: '/NoiseSelection',
            name: 'NoiseSelection',
            component: (resvole) => require(['../views/adviceCase/step4/NoiseSelection.vue'], resvole),
            meta: {
                title: '噪声选择'
            }
        },
        {
            path: '/HearingHealthPathology',
            name: 'HearingHealthPathology',
            component: (resvole) => require(['../views/adviceCase/step4/HearingHealthPathology.vue'], resvole),
            meta: {
                title: '听觉健康病理'
            }
        },
        {
            path: '/ResearchOnNCOA',
            name: 'ResearchOnNCOA',
            component: (resvole) => require(['../views/adviceCase/step4/ResearchOnNCOA.vue'], resvole),
            meta: {
                title: 'ncoa研究'
            }
        },
        {
            path: '/ProductSelection',
            name: 'ProductSelection',
            component: (resvole) => require(['../views/adviceCase/step5/ProductSelection.vue'], resvole),
            meta: {
                title: '产品选择'
            }
        },
        {
            path: '/SuccessfulUse',
            name: 'SuccessfulUse',
            component: (resvole) => require(['../views/adviceCase/step5/SuccessfulUse.vue'], resvole),
            meta: {
                title: '成功使用'
            }
        },
        {
            path: '/ProtectionAndGuarantee',
            name: 'ProtectionAndGuarantee',
            component: (resvole) => require(['../views/adviceCase/step5/ProtectionAndGuarantee.vue'], resvole),
            meta: {
                title: '保护保障'
            }
        },
        {
            path: '/InvestingFuture',
            name: 'InvestingFuture',
            component: (resvole) => require(['../views/adviceCase/step6/InvestingFuture.vue'], resvole),
            meta: {
                title: '投资未来'
            }
        },
        {
            path: '/JourneyOfRehabilitation',
            name: 'JourneyOfRehabilitation',
            component: (resvole) => require(['../views/adviceCase/step6/JourneyOfRehabilitation.vue'], resvole),
            meta: {
                title: '康复之旅'
            }
        },
        {
            path: '/ListeningClub',
            name: 'ListeningClub',
            component: (resvole) => require(['../views/adviceCase/step6/ListeningClub.vue'], resvole),
            meta: {
                title: '听友俱乐部'
            }
        },
        {
            path: '/Data',
            name: 'Data',
            component: (resvole) => require(['../views/adviceCase/step7/Data.vue'], resvole),
            meta: {
                title: '资料'
            }
        },
        {
            path: '/Information',
            name: 'Information',
            component: (resvole) => require(['../views/adviceCase/step7/Information.vue'], resvole),
            meta: {
                title: '资讯'
            }
        },
        {
            path: '/Socializing',
            name: 'Socializing',
            component: (resvole) => require(['../views/adviceCase/step7/Socializing.vue'], resvole),
            meta: {
                title: '社交'
            }
        },
        {
            path: '/Media',
            name: 'Media',
            component: (resvole) => require(['../views/adviceCase/step7/Media.vue'], resvole),
            meta: {
                title: '媒体'
            }
        },
        {
            path: '/commonProblem',
            name: 'commonProblem',
            component: (resvole) => require(['../views/setting/commonProblem/index.vue'], resvole),
            meta: {
                title: '常见问题列表'
            }
        },
        {
            path: '/commonProblemInfo',
            name: 'commonProblemInfo',
            component: (resvole) => require(['../views/setting/commonProblem/info.vue'], resvole),
            meta: {
                title: '常见问题详情'
            }
        },
        {
            path: '/commonProblemadd',
            name: 'commonProblemadd',
            component: (resvole) => require(['../views/setting/commonProblem/add.vue'], resvole),
            meta: {
                title: '常见问题详情'
            }
        },
        {
            path: '/userPortrait',
            name: 'userPortrait',
            component: (resvole) => require(['../views/setting/userPortrait.vue'], resvole),
            meta: {
                title: '用户画像'
            }
        },
        {
            path: '/teamPortrait',
            name: 'teamPortrait',
            component: (resvole) => require(['../views/setting/teamPortrait.vue'], resvole),
            meta: {
                title: '团队画像'
            }
        },
    ]
    // strangeCallDetails
const router = new VueRouter({
    //mode: 'history',
    base: 'WangXiaoDian',
    //base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, saveTop) {
        if (saveTop) {
            return saveTop;
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

export default router