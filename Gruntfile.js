var grunt = require('grunt');

//配置
grunt.config.init({
    pkg: grunt.file.readJSON('gruntPackage.json'),
    'create-windows-installer': {
        x64:{
            version:'1.0.0',
            authors:'Invhero',
            projectUrl:'',
            appDirectory:'./outApp/app-win32-x64',//要打包的输入目录
            outputDirectory:'./outPut',//grunt打包后的输出目录
            exe:'app.exe',
            description:'Invhero',
            setupIcon:"./favicon.ico",
            noMsi:true
        }
    }
});

//加载任务
grunt.loadNpmTasks('grunt-electron-installer');

//设置为默认
grunt.registerTask('default', ['create-windows-installer']);