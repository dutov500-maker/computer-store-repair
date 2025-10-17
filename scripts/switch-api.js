import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const mode = process.argv[2] || 'local';

if (!['local', 'production'].includes(mode)) {
  console.error('❌ Неверный режим. Используйте: local или production');
  process.exit(1);
}

try {
  const sourceFile = join(rootDir, 'backend', `func2url.${mode}.json`);
  const targetFile = join(rootDir, 'backend', 'func2url.json');
  
  const config = readFileSync(sourceFile, 'utf-8');
  writeFileSync(targetFile, config);
  
  console.log(`✅ Переключено на ${mode} API`);
  
  if (mode === 'local') {
    console.log('🔧 Локальный режим активирован');
    console.log('📍 API: http://localhost:3001');
    console.log('');
    console.log('Запустите локальный сервер:');
    console.log('  cd local-server');
    console.log('  npm install');
    console.log('  npm start');
  } else {
    console.log('🌐 Production режим активирован');
    console.log('📍 API: poehali.dev');
  }
} catch (error) {
  console.error('❌ Ошибка:', error.message);
  process.exit(1);
}
