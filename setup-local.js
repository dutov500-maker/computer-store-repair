import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🔧 Настройка локального сервера...\n');

const localServerPath = join(process.cwd(), 'local-server');

// Проверка что папка существует
if (!existsSync(localServerPath)) {
  console.error('❌ Папка local-server не найдена!');
  process.exit(1);
}

// Установка зависимостей
console.log('📦 Установка зависимостей...');
try {
  execSync('npm install', { 
    cwd: localServerPath, 
    stdio: 'inherit' 
  });
  console.log('✅ Зависимости установлены\n');
} catch (error) {
  console.error('❌ Ошибка установки зависимостей');
  process.exit(1);
}

// Переключение на локальную базу
console.log('🔄 Переключение на локальную базу...');
try {
  execSync('node scripts/switch-api.js local', { 
    stdio: 'inherit' 
  });
  console.log('✅ Переключено на локальную базу\n');
} catch (error) {
  console.error('❌ Ошибка переключения');
  process.exit(1);
}

console.log('🎉 Настройка завершена!\n');
console.log('Запустите локальный сервер:');
console.log('');
console.log('  Терминал 1:');
console.log('    cd local-server && npm start');
console.log('');
console.log('  Терминал 2:');
console.log('    npm run dev');
console.log('');
console.log('Или используйте автоматический запуск:');
console.log('  Windows: start-local.bat');
console.log('  Mac/Linux: ./start-local.sh');
console.log('');
