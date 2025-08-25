#!/usr/bin/env node

/**
 * SeedVision API版本切换脚本
 * 用于在V1和V2预测API之间切换
 */

const fs = require('fs');
const path = require('path');

// 配置文件路径
const CONFIG_FILE = path.join(__dirname, '../src/config/api.js');

// 支持的版本
const SUPPORTED_VERSIONS = ['V1', 'V2', 'LEGACY'];

// 获取命令行参数
const args = process.argv.slice(2);
const targetVersion = args[0];

// 显示帮助信息
function showHelp() {
  console.log(`
SeedVision API版本切换工具

用法:
  node scripts/switch-version.js <version>

支持的版本:
  V1      - 使用predictV1接口（简单格式）
  V2      - 使用predictV2接口（详细格式）
  LEGACY  - 使用原始predict接口

示例:
  node scripts/switch-version.js V1
  node scripts/switch-version.js V2
  node scripts/switch-version.js LEGACY

当前版本查看:
  node scripts/switch-version.js --current
  `);
}

// 获取当前版本
function getCurrentVersion() {
  try {
    const content = fs.readFileSync(CONFIG_FILE, 'utf8');
    const match = content.match(/PREDICT_VERSION:\s*['"]([^'"]+)['"]/);
    return match ? match[1] : 'UNKNOWN';
  } catch (error) {
    console.error('❌ 读取配置文件失败:', error.message);
    return null;
  }
}

// 切换版本
function switchVersion(version) {
  try {
    // 读取配置文件
    let content = fs.readFileSync(CONFIG_FILE, 'utf8');
    
    // 替换版本配置
    const newContent = content.replace(
      /PREDICT_VERSION:\s*['"][^'"]+['"]/,
      `PREDICT_VERSION: '${version}'`
    );
    
    // 写入文件
    fs.writeFileSync(CONFIG_FILE, newContent, 'utf8');
    
    console.log(`✅ 成功切换到 ${version} 版本`);
    console.log(`📁 配置文件: ${CONFIG_FILE}`);
    
    // 显示版本特性
    showVersionFeatures(version);
    
  } catch (error) {
    console.error('❌ 切换版本失败:', error.message);
    process.exit(1);
  }
}

// 显示版本特性
function showVersionFeatures(version) {
  const features = {
    V1: [
      '✨ 简单的检测结果格式',
      '🚀 快速响应',
      '📊 基础的蛋白质和油脂含量数据',
      '⚡ 适合快速检测场景'
    ],
    V2: [
      '🔍 详细的检测结果信息',
      '📈 包含性能监控数据',
      '🎯 多阶段检测流程',
      '🛠️ 丰富的调试信息',
      '📊 检测对象边界框信息'
    ],
    LEGACY: [
      '🔄 原始接口兼容',
      '📝 保持原有数据格式',
      '🛡️ 稳定性保证'
    ]
  };
  
  console.log(`\n${version} 版本特性:`);
  features[version]?.forEach(feature => {
    console.log(`  ${feature}`);
  });
}

// 验证版本
function validateVersion(version) {
  if (!SUPPORTED_VERSIONS.includes(version)) {
    console.error(`❌ 不支持的版本: ${version}`);
    console.error(`支持的版本: ${SUPPORTED_VERSIONS.join(', ')}`);
    return false;
  }
  return true;
}

// 主函数
function main() {
  // 检查参数
  if (args.length === 0) {
    showHelp();
    process.exit(1);
  }
  
  // 显示当前版本
  if (args[0] === '--current' || args[0] === '-c') {
    const currentVersion = getCurrentVersion();
    if (currentVersion) {
      console.log(`📋 当前版本: ${currentVersion}`);
      showVersionFeatures(currentVersion);
    }
    return;
  }
  
  // 显示帮助
  if (args[0] === '--help' || args[0] === '-h') {
    showHelp();
    return;
  }
  
  // 验证版本
  if (!validateVersion(targetVersion)) {
    process.exit(1);
  }
  
  // 获取当前版本
  const currentVersion = getCurrentVersion();
  if (!currentVersion) {
    process.exit(1);
  }
  
  // 检查是否已经是目标版本
  if (currentVersion === targetVersion) {
    console.log(`ℹ️  已经是 ${targetVersion} 版本`);
    showVersionFeatures(targetVersion);
    return;
  }
  
  // 显示切换信息
  console.log(`🔄 从 ${currentVersion} 切换到 ${targetVersion}`);
  
  // 执行切换
  switchVersion(targetVersion);
}

// 运行主函数
main();
