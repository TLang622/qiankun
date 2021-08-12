https://qiankun.umijs.org/

* 使用qiankun来实现微应用

* 主应用和微应用使用的都是vue

* 微应用分别采用了history和hash两种路由

* 采用的部署方式：3个应用独立部署，不相互影响

整个微前端开发运行方式：

* 进入main目录，npm install，npm run serve，http://localhost:8080/

* 进入app-hash目录，npm install，npm run serve，http://localhost:8081/

* 进入app-history目录，npm install，npm run serve，http://localhost:8082/

* 然后浏览器访问main主应用，http://localhost:8080/

部署方式，这里使用http-serve来简单部署，实际上可以使用nginx来部署

* 进入main目录，npm run build，cd dist，http-server --cors -p 8080

* 进入app-hash目录，npm run build，cd dist，http-server --cors -p 8081

* 进入app-history目录，npm run build，cd dist，http-server --cors -p 8082

* 然后浏览器访问main主应用，http://localhost:8080/

* 注意因为主应用是通过fetch来请求子应用的，所以子应用的静态资源要允许跨域访问http-server --cors

* 需要解决刷新 404 的问题，nginx需要额外配置，具体参考qiankun官网
