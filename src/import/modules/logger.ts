// 副作用模块:导入时立即执行,不导出任何东西
// 13-modules.ts 用 `import './modules/logger'` 触发它

import greet, { PI } from './math-utils';

console.log('[logger 模块被加载]');
console.log('  greet("World"):', greet('World'));
console.log('  PI:', PI);
