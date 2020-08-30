import request from '@/utils/request'

//获取列表

export function index(data) {
    if (process.env.NODE_ENV == 'development') {
      return request({
        url: '/baseSetting/index.json',
        method: 'get',
        data
      })
    } else {
      return request({
        url: '/index.php/admin/v1.0/patient/index',
        method: 'post',
        data
      })
    }
  }

//报名记录
export function signActivityList(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/signActivityList',
      method: 'post',
      data
    })
  }
}

//分享记录
export function shareList(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/shareList',
      method: 'post',
      data
    })
  }
}

//分享记录
export function saleList(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/saleList',
      method: 'post',
      data
    })
  }
}

//备忘录
export function memorandum(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/memorandum',
      method: 'post',
      data
    })
  }
}


//附件列表
export function historyDocument(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/historyDocument',
      method: 'post',
      data
    })
  }
}



//复诊与随访
export function followList(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/followList',
      method: 'post',
      data
    })
  }
}

//耳镜检查报告单
export function earCheck(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/earmirror/report',
      method: 'post',
      data
    })
  }
}

//纯音测听报告单-其他
export function reportOther(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkHearing/reportOther',
      method: 'post',
      data
    })
  }
}

//纯音测听报告单-数据
export function reportData(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkHearing/reportData',
      method: 'post',
      data
    })
  }
}

//言语测听-报告单-言语测试-其他
export function reportWordsOther(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkWords/reportOther',
      method: 'post',
      data
    })
  }
}

//言语测听-报告单-言语测试-音素识别
export function reportRecognition(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkWords/reportRecognition',
      method: 'post',
      data
    })
  }
}


//言语测听-报告单-言语测试-对应的数据
export function reportSoundData(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkWords/reportSoundData',
      method: 'post',
      data
    })
  }
}



//言语测听-报告单-pi曲线
export function reportPI(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkWords/reportPI',
      method: 'post',
      data
    })
  }
}


//言语测听-报告单-言语测试-获取素材内容
export function reportSoundMaterial(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkWords/reportSoundMaterial',
      method: 'post',
      data
    })
  }
}

//言语测听-获取整体反应下降率(报告单/报告解读)
export function responseDecreased(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkWords/responseDecreased',
      method: 'post',
      data
    })
  }
}

//言语测听-获取视觉代偿率(报告解读/报告单)
export function visualRatio(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/checkWords/visualRatio',
      method: 'post',
      data
    })
  }
}

//获取用户信息
export function getInfo(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/getInfo',
      method: 'post',
      data
    })
  }
}


//获取用户信息
export function info(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patient/info',
      method: 'post',
      data
    })
  }
}

//现病史
export function hpi(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patientHpi/getInfo',
      method: 'post',
      data
    })
  }
}


//既往史
export function ph(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patientPh/getInfo',
      method: 'post',
      data
    })
  }
}

export function getCommonKey(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/common/getDicByKey',
      method: 'post',
      data
    })
  }
}

//听觉康复史
export function getHistory(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patientHearrebuildHistory/getInfo',
      method: 'post',
      data
    })
  }
}

//观察所见
export function observation(data) {
  if (process.env.NODE_ENV == 'development') {
    return request({
      url: '/baseSetting/index.json',
      method: 'get',
      data
    })
  } else {
    return request({
      url: '/index.php/admin/v1.0/patientObservations/getInfo',
      method: 'post',
      data
    })
  }
}








