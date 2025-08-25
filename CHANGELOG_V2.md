# SeedVision V2 更新日志

## 版本：V2.0.0
**发布日期：** 2024-12-XX

### 🚀 新功能

#### 新增预测API V2接口
- **接口地址：** `/api/seed/predictV2`
- **参数：** `image`（图片URL）、`mod`（模型名称）
- **返回格式：** 更详细的检测和分析结果

#### 详细的检测结果
- **检测阶段信息**
  - 检测成功/失败状态
  - 检测到的对象数量
  - 检测置信度阈值
  - 边界框坐标信息

#### 高级分析功能
- **评估结果详情**
  - 蛋白质和油脂含量分析
  - 分析耗时统计
  - 内存消耗监控
  - 图片哈希值记录

#### 智能检测流程
- **多阶段检测**
  - `detection_only` - 仅检测阶段
  - `complete` - 完整检测和分析
  - 根据检测结果决定是否进行分析

### 📊 V2接口返回数据格式

#### 未检测到种子对象时
```json
{
  "success": true,
  "stage": "detection_only",
  "message": "未检测到种子对象",
  "detected": false,
  "detection_result": {
    "success": true,
    "detected": false,
    "objects": [],
    "detection_count": 0,
    "time_delta": 0.2264,
    "conf_threshold": 0.25,
    "iou_threshold": 0.45
  },
  "evaluation_result": null,
  "total_time_delta": 0.2264,
  "image_hash": "abc123...",
  "model_name": "FasterNet"
}
```

#### 检测和分析完成时
```json
{
  "success": true,
  "stage": "complete",
  "message": "检测和分析完成",
  "detected": true,
  "detection_result": {
    "success": true,
    "detected": true,
    "objects": [
      {
        "confidence": 0.85,
        "class_id": 0,
        "class_name": "seed",
        "bbox": [100, 150, 300, 350]
      }
    ],
    "detection_count": 1,
    "time_delta": 0.15,
    "conf_threshold": 0.3,
    "iou_threshold": 0.5
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

### 🔧 技术改进

#### 增强的数据处理器
- **V2数据处理器**
  - 处理复杂的嵌套数据结构
  - 支持多阶段检测结果
  - 兼容V1和原始格式

#### 智能错误处理
- **多层次错误检测**
  - 检测阶段失败处理
  - 分析阶段失败处理
  - 数据完整性验证

#### 向后兼容性
- **无缝升级**
  - 保持与V1版本的兼容性
  - 自动数据格式转换
  - 统一的用户界面

### 📝 文件变更

#### 修改文件
- `src/config/api.js`
  - 添加V2数据处理逻辑
  - 增强错误处理机制
  - 默认切换到V2接口

### 🎯 用户体验改进

#### 更精确的检测反馈
- **详细的检测信息**
  - 显示检测到的对象数量
  - 提供检测置信度信息
  - 展示分析耗时统计

#### 智能错误提示
- **分阶段错误处理**
  - 检测失败的专门提示
  - 分析失败的专门提示
  - 更精确的操作建议

### 🔄 版本切换

#### 在V1和V2之间切换
修改 `src/config/api.js` 中的配置：
```javascript
PREDICT_VERSION: 'V1', // 使用V1接口
// 或
PREDICT_VERSION: 'V2', // 使用V2接口
```

### 🆚 V1 vs V2 对比

| 特性 | V1 | V2 |
|------|----|----|
| 检测结果 | 简单布尔值 | 详细检测信息 |
| 分析数据 | 基础数值 | 包含性能指标 |
| 错误处理 | 基础提示 | 分阶段错误处理 |
| 调试信息 | 有限 | 丰富的调试数据 |
| 性能监控 | 基础耗时 | 详细性能分析 |

### 🐛 已知问题
- 无

### 📋 未来计划
- [ ] 添加检测结果可视化
- [ ] 实现批量分析功能
- [ ] 添加模型性能对比
- [ ] 支持自定义检测参数

### 👥 贡献者
- 开发团队

---

**注意：** V2版本提供了更详细的检测和分析信息，建议在需要详细数据的场景中使用。
