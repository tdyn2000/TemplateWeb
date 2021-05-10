FrontEnd -------------------------------------- 
- install package: npm install

- to run: npm start
- to build: npm run build
- to serv production:  serve -s build -p xxxx (default 3000)

- Change API IP:PORT : /src/api.js/apiUrl
- add page:
   + containers
   	 . new page
   	 . _nav.js : add link
   + redux : 
     . reducer
     . saga

FrontEnd -------------------------------------- 


BackEnd -------------------------------------- 
- install package: npm install
- to run: npm start

- change db config: 
  	./app/config/env.js
  		dialect: mysql, mssql

- config port: 
	.env
	PORT=10001  (change backend port).

- add resource url: 
/app/config/Permission.js/Resource

- add controller: 
. /app/controller
. /app/router/  
BackEnd -------------------------------------- 




