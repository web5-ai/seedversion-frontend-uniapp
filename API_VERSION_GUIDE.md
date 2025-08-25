# SeedVision API版本管理指南

## 概述

SeedVision支持多个预测API版本，每个版本都有不同的特性和数据格式。本指南将帮助您了解各个版本的差异以及如何在它们之间切换。

## 支持的API版本

### 🚀 V1版本 (predictV1)
**推荐用于：** 快速检测、简单应用场景

**特性：**
- ✨ 简洁的数据格式
- 🚀 快速响应时间
- 📊 基础的检测结果
- ⚡ 低资源消耗

**数据格式：**
```json
{
  "code": 1,
  "msg": "success",
  "time": 1756087797,
  "data": {
    "user_id": 6,
    "image": "https://...",
    "mod": "FasterNet",
    "batch_no": "B20250825-004",
    "create_time": 1756087799,
    "update_time": 1756087799,
    "res": {
      "detected": true,
      "protein": 26.786,
      "oil": 39.340,
      "message": "检测和分析完成",
      "time_delta": 1.481707
    },
    "feedback": null,
    "id": 430
  }
}
```

### 🔍 V2版本 (predictV2)
**推荐用于：** 详细分析、调试、性能监控

**特性：**
- 🔍 详细的检测信息
- 📈 性能监控数据
- 🎯 多阶段检测流程
- 🛠️ 丰富的调试信息
- 📊 对象边界框坐标

**数据格式：**
```json
{
  "success": true,
  "stage": "complete",
  "message": "检测和分析完成",
  "detected": true,
  "detection_result": {
    "success": true,
    "detected": true,
    "objects": [...],
    "detection_count": 1,
    "time_delta": 0.15
  },
  "evaluation_result": {
    "protein": 45.23,
    "oil": 52.67,
    "time_delta": 1.234,
    "memory_cost": 256.5
  },
  "total_time_delta": 1.384,
  "image_hash": "def456...",
  "model_name": "ResNet"
}
```

### 🛡️ Legacy版本 (predict)
**推荐用于：** 向后兼容、稳定性要求高的场景

**特性：**
- 🔄 完全向后兼容
- 🛡️ 经过充分测试
- 📝 保持原有数据格式

## 版本切换

### 方法1：使用切换脚本（推荐）

```bash
# 切换到V1版本
node scripts/switch-version.js V1

# 切换到V2版本
node scripts/switch-version.js V2

# 切换到Legacy版本
node scripts/switch-version.js LEGACY

# 查看当前版本
node scripts/switch-version.js --current

# 查看帮助
node scripts/switch-version.js --help
```

### 方法2：手动修改配置文件

编辑 `src/config/api.js` 文件：

```javascript
export const API_CONFIG = {
  // 修改这里的值来切换版本
  PREDICT_VERSION: 'V1', // 'V1', 'V2', 或 'LEGACY'
  // ...
};
```

## 版本对比

| 特性 | Legacy | V1 | V2 |
|------|--------|----|----|
| **数据格式** | 原始格式 | 简化格式 | 详细格式 |
| **检测信息** | 基础 | 基础 | 详细 |
| **性能数据** | 无 | 基础耗时 | 详细监控 |
| **调试信息** | 有限 | 有限 | 丰富 |
| **对象检测** | 是/否 | 是/否 | 详细信息 |
| **错误处理** | 基础 | 改进 | 高级 |
| **响应速度** | 中等 | 快 | 中等 |
| **数据大小** | 中等 | 小 | 大 |

## 使用建议

### 选择V1版本的场景
- 🚀 需要快速响应的应用
- 📱 移动端应用（减少数据传输）
- 🎯 只需要基础检测结果
- ⚡ 资源受限的环境

### 选择V2版本的场景
- 🔍 需要详细的检测信息
- 📊 需要性能监控和分析
- 🛠️ 开发和调试阶段
- 📈 需要检测质量评估
- 🎯 需要对象位置信息

### 选择Legacy版本的场景
- 🛡️ 稳定性是首要考虑
- 🔄 现有系统的兼容性
- 📝 不需要新功能
- 🚫 避免变更风险

## 开发指南

### 添加新版本支持

1. **更新API配置**
   ```javascript
   // src/config/api.js
   ENDPOINTS: {
     PREDICT_V3: '/api/seed/predictV3', // 新版本端点
     // ...
   }
   ```

2. **添加数据处理器**
   ```javascript
   // src/config/api.js
   processV3Data(apiResponse) {
     // 处理V3版本的数据格式
   }
   ```

3. **更新版本切换逻辑**
   ```javascript
   getCurrentPredictUrl() {
     switch (this.PREDICT_VERSION) {
       case 'V3':
         return this.BASE_URL + this.ENDPOINTS.PREDICT_V3;
       // ...
     }
   }
   ```

### 测试不同版本

```bash
# 测试V1版本
node scripts/switch-version.js V1
npm run dev

# 测试V2版本
node scripts/switch-version.js V2
npm run dev

# 测试Legacy版本
node scripts/switch-version.js LEGACY
npm run dev
```

## 故障排除

### 常见问题

1. **切换版本后应用无响应**
   - 检查API端点是否正确
   - 确认服务器支持目标版本
   - 查看控制台错误信息

2. **数据格式错误**
   - 确认数据处理器是否正确
   - 检查API返回格式是否符合预期
   - 验证版本配置是否正确

3. **性能问题**
   - V2版本数据量较大，可能影响性能
   - 考虑切换到V1版本以提高速度
   - 检查网络连接状况

### 调试技巧

1. **启用详细日志**
   ```javascript
   console.log('当前API版本:', API_CONFIG.PREDICT_VERSION);
   console.log('API端点:', API_CONFIG.getCurrentPredictUrl());
   ```

2. **检查数据处理**
   ```javascript
   const processedResult = PredictDataProcessor.processData(response);
   console.log('处理后的数据:', processedResult);
   ```

## 更新日志

- **V1.0.0** - 实现V1版本支持
- **V2.0.0** - 实现V2版本支持
- **V1.1.0** - 添加版本切换脚本
- **V2.1.0** - 完善错误处理机制

## 贡献

欢迎提交Issue和Pull Request来改进API版本管理系统。

---

**注意：** 在生产环境中切换API版本前，请务必进行充分的测试。
