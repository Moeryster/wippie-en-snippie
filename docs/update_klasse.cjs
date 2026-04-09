const fs = require('fs');
let content = fs.readFileSync('klasse.html', 'utf8');

content = content.replace(/class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center"/g, 'class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group hover:border-accent"');

content = content.replace(/class="w-16 h-16 bg-secondary\/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6"/g, 'class="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-transform"');

content = content.replace(/class="w-16 h-16 bg-accent\/20 text-accent-dark rounded-2xl flex items-center justify-center mx-auto mb-6"/g, 'class="w-16 h-16 bg-accent/20 text-accent-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-transform"');

content = content.replace(/class="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6"/g, 'class="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-transform"');

content = content.replace(/class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"/g, 'class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-transform"');

content = content.replace(/class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"/g, 'class="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-transform"');

content = content.replace(/class="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6"/g, 'class="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-transform"');

fs.writeFileSync('klasse.html', content);
console.log('Updated klasse.html');
