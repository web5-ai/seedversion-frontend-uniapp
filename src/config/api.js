// API配置文件
export const API_CONFIG = {
  // 基础URL
  BASE_URL: 'http://youcaihua-api.harmony-dev.com',
  
  // API版本配置
  PREDICT_VERSION: 'V2', // 当前使用的预测API版本：V1 或 V2
  
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
    const recordData = apiResponse.data.data;
    const detectResult = recordData.res;

    // 检查是否检测到种子对象
    if (!detectResult.detected) {
      return {
        success: false,
        detected: false,
        message: detectResult.message || '未检测到种子对象，请确保图片中包含清晰的油菜籽样本，并重新拍摄。',
        data: recordData
      };
    }

    // V1接口返回完整的记录数据，直接使用
    return {
      success: true,
      detected: true,
      data: {
        // 使用服务器返回的完整记录数据
        id: recordData.id,
        user_id: recordData.user_id,
        image: recordData.image,
        mod: recordData.mod,
        type: recordData.type,
        address: recordData.address,
        planting_way: recordData.planting_way,
        harvest_way: recordData.harvest_way,
        batch_no: recordData.batch_no,
        create_time: recordData.create_time,
        update_time: recordData.update_time,
        feedback: recordData.feedback,
        // 检测结果
        protein: detectResult.protein,
        oil: detectResult.oil,
        message: detectResult.message,
        time_delta: detectResult.time_delta,
        // 保持原有的res字段结构
        res: detectResult
      }
    };
  },
  
  // 处理V2版本的返回数据，构造成V1格式
  processV2Data(apiResponse, imageUrl = null) {
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

    // 构造V1格式的数据结构，让现有业务逻辑可以正常工作
    const v1FormatData = {
      id: Date.now().toString(), // 生成临时ID
      user_id: null,
      image: imageUrl, // 使用传入的图片URL
      mod: null, // 模型信息
      type: null,
      address: null,
      planting_way: null,
      harvest_way: null,
      batch_no: null,
      create_time: Math.floor(Date.now() / 1000), // 当前时间戳
      update_time: Math.floor(Date.now() / 1000),
      feedback: null,
      // V1格式的检测结果
      res: {
        detected: true,
        protein: predictData.evaluation_result.protein,
        oil: predictData.evaluation_result.oil,
        message: predictData.message,
        time_delta: predictData.total_time_delta,
        // 保存V2的原始数据供调试使用
        v2_detection_result: predictData.detection_result,
        v2_evaluation_result: predictData.evaluation_result,
        model_name: predictData.model_name,
        image_hash: predictData.image_hash
      }
    };

    return {
      success: true,
      detected: true,
      data: v1FormatData
    };
  },
  
  // 根据当前版本处理数据
  processData(apiResponse, imageUrl = null) {
    switch (API_CONFIG.PREDICT_VERSION) {
      case 'V1':
        return this.processV1Data(apiResponse);
      case 'V2':
        return this.processV2Data(apiResponse, imageUrl);
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
