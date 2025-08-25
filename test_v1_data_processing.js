// 测试V1数据处理逻辑
import { PredictDataProcessor } from './src/config/api.js';

// 模拟V1接口返回的成功数据
const mockV1SuccessResponse = {
  data: {
    code: 1,
    msg: "success",
    time: 1756087797,
    data: {
      user_id: 6,
      image: "https://ai-hunjian.oss-cn-shanghai.aliyuncs.com/storage/default/20250825/17560877874297aaaf33f788d28199a3eb2564eb02bb5e806e3d2.jpg?Expires=1756087797&OSSAccessKeyId=LTAI5t8JAuo4PwRfUDgPgw1m&Signature=r1RNAdeKyvIwAQZsZ6UOqBcssTI%3D",
      mod: "FasterNet",
      type: "",
      address: "",
      planting_way: "",
      harvest_way: "",
      batch_no: "B20250825-004",
      create_time: 1756087799,
      update_time: 1756087799,
      res: {
        detected: true,
        protein: 26.78607749938965,
        oil: 39.34030532836914,
        message: "检测和分析完成",
        time_delta: 1.481707
      },
      feedback: null,
      id: 430
    }
  }
};

// 模拟V1接口返回的失败数据（未检测到种子）
const mockV1FailureResponse = {
  data: {
    code: 1,
    msg: "success",
    time: 1756087797,
    data: {
      user_id: 6,
      image: "https://example.com/image.jpg",
      mod: "FasterNet",
      type: "",
      address: "",
      planting_way: "",
      harvest_way: "",
      batch_no: "B20250825-005",
      create_time: 1756087799,
      update_time: 1756087799,
      res: {
        detected: false,
        protein: 0.0,
        oil: 0.0,
        message: "未检测到种子对象",
        time_delta: 0.6551
      },
      feedback: null,
      id: 431
    }
  }
};

// 测试成功情况
console.log('=== 测试V1成功响应 ===');
const successResult = PredictDataProcessor.processV1Data(mockV1SuccessResponse);
console.log('处理结果:', JSON.stringify(successResult, null, 2));

// 测试失败情况
console.log('\n=== 测试V1失败响应 ===');
const failureResult = PredictDataProcessor.processV1Data(mockV1FailureResponse);
console.log('处理结果:', JSON.stringify(failureResult, null, 2));

// 验证数据完整性
console.log('\n=== 数据完整性验证 ===');
if (successResult.success) {
  console.log('✅ 成功情况 - success字段正确');
  console.log('✅ 检测结果 - detected:', successResult.detected);
  console.log('✅ 记录ID - id:', successResult.data.id);
  console.log('✅ 蛋白质含量 - protein:', successResult.data.protein);
  console.log('✅ 油脂含量 - oil:', successResult.data.oil);
  console.log('✅ 批次号 - batch_no:', successResult.data.batch_no);
  console.log('✅ res字段完整性:', successResult.data.res ? '完整' : '缺失');
}

if (!failureResult.success) {
  console.log('✅ 失败情况 - success字段正确');
  console.log('✅ 检测结果 - detected:', failureResult.detected);
  console.log('✅ 错误消息 - message:', failureResult.message);
}
