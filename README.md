# Kotlin-KotlinAndJSClock
---
Kotlin实现Kotlin和JS的交互

## 运行效果
![](clock.gif)

## 工程配置步骤：
### 1、按步骤新建工程，如下图：
	Intellij Idea——>new project——>Gradle[Kotlin(JavaScript)]
![](new.png)
### 2、在project的build.gradle的最外端添加依赖（如下图）:
	compileKotlin2Js.doLast {
	    configurations.compile.each { File file ->
	        copy {
	            includeEmptyDirs = false
	            from zipTree(file.absolutePath)
	            into "${projectDir}/web"
	            include { fileTreeElement ->
	                def path = fileTreeElement.path
	                path.endsWith(".js") && (path.startsWith("META-INF/resources/") || !path.startsWith("META-INF/"))
	            }
	        }
	    }
	}

	compileKotlin2Js {
		//web、clock.js皆可自定义
	    kotlinOptions.outputFile = "${projectDir}/web/clock.js"
	}

![](config.png)
### 3、创建Kotlin类并构建生成js；创建web目录、html页面、html依赖生成的js，如下图：
![](config2.png)