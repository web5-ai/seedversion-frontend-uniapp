// API配置文件
export const API_CONFIG = {
  // 基础URL
  BASE_URL: 'http://youcaihua-api.harmony-dev.com',
  
  // API版本配置
  PREDICT_VERSION: 'V1', // 当前使用的预测API版本：V1 或 V2
  
  // API端点
  ENDPOINTS: {
    // 文件上传
    UPLOAD: '/api/ajax/upload',
    
    // 预测接口
    PREDICT_V1: '/api/seed/predictV1',
    PREDICT_V2: '/api/seed/predictV2',
    PREDICT_LEGACY: '/api/seed/predict', // 原始接口，保留作为备用
    
    // 其他接口
    SEED_INDEX: '/api/seed/index',
    SEED_DETAIL: '/api/seed/detail',
    SEED_SAVE: '/api/seed/save',
    USER_INFO: '/api/user/info',
    USER_LOGIN: '/api/user/loginByPhone'
  },
  
  // 获取当前预测接口URL
  getCurrentPredictUrl() {
    switch (this.PREDICT_VERSION) {
      case 'V1':
        return this.BASE_URL + this.ENDPOINTS.PREDICT_V1;
      case 'V2':
        return this.BASE_URL + this.ENDPOINTS.PREDICT_V2;
      default:
        return this.BASE_URL + this.ENDPOINTS.PREDICT_LEGACY;
    }
  },
  
  // 获取完整URL
  getFullUrl(endpoint) {
    return this.BASE_URL + endpoint;
  }
};

// 预测API数据处理器
export const PredictDataProcessor = {
  // 处理V1版本的返回数据
  processV1Data(apiResponse) {
    const predictData = apiResponse.data.data;
    
    // 检查是否检测到种子对象
    if (!predictData.detected) {
      return {
        success: false,
        detected: false,
        message: predictData.message || '未检测到种子对象，请确保图片中包含清晰的油菜籽样本，并重新拍摄。',
        data: predictData
      };
    }
    
    // 构造兼容原有格式的结果数据
    return {
      success: true,
      detected: true,
      data: {
        id: Date.now().toString(), // 生成临时ID
        protein: predictData.protein,
        oil: predictData.oil,
        message: predictData.message,
        time_delta: predictData.time_delta,
        // 添加其他可能需要的字段
        res: {
          protein: predictData.protein,
          oil: predictData.oil
        }
      }
    };
  },
  
  // 处理V2版本的返回数据
  processV2Data(apiResponse) {
    const predictData = apiResponse.data.data;
    
    // 检查是否检测到种子对象
    if (!predictData.detected) {
      return {
        success: false,
        detected: false,
        message: predictData.message || '未检测到种子对象，请确保图片中包含清晰的油菜籽样本，并重新拍摄。',
        data: predictData
      };
    }
    
    // 检查是否有评估结果
    if (!predictData.evaluation_result) {
      return {
        success: false,
        detected: true,
        message: '检测到种子对象但分析失败，请重试。',
        data: predictData
      };
    }
    
    // 构造兼容原有格式的结果数据
    return {
      success: true,
      detected: true,
      data: {
        id: Date.now().toString(), // 生成临时ID
        protein: predictData.evaluation_result.protein,
        oil: predictData.evaluation_result.oil,
        message: predictData.message,
        time_delta: predictData.total_time_delta,
        model_name: predictData.model_name,
        image_hash: predictData.image_hash,
        // V2特有的详细信息
        detection_result: predictData.detection_result,
        evaluation_result: predictData.evaluation_result,
        // 兼容原有格式
        res: {
          protein: predictData.evaluation_result.protein,
          oil: predictData.evaluation_result.oil
        }
      }
    };
  },
  
  // 根据当前版本处理数据
  processData(apiResponse) {
    switch (API_CONFIG.PREDICT_VERSION) {
      case 'V1':
        return this.processV1Data(apiResponse);
      case 'V2':
        return this.processV2Data(apiResponse);
      default:
        // 原始格式处理
        return {
          success: true,
          detected: true,
          data: apiResponse.data.data
        };
    }
  }
};
