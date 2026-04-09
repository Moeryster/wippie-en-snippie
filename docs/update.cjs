const fs = require('fs');
let content = fs.readFileSync('personeel.html', 'utf8');

content = content.replace(/class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 text-center p-8"/g, 'class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group hover:border-accent"');

content = content.replace(/class="w-32 h-32 bg-secondary\/10 rounded-full mx-auto mb-6 flex items-center justify-center text-secondary"/g, 'class="w-32 h-32 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center text-secondary group-hover:animate-bounce transition-transform"');

content = content.replace(/class="w-32 h-32 bg-accent\/20 rounded-full mx-auto mb-6 flex items-center justify-center text-accent-dark"/g, 'class="w-32 h-32 bg-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center text-accent-dark group-hover:animate-bounce transition-transform"');

content = content.replace(/class="w-32 h-32 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center text-green-600"/g, 'class="w-32 h-32 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center text-green-600 group-hover:animate-bounce transition-transform"');

fs.writeFileSync('personeel.html', content);
console.log('Updated personeel.html');
