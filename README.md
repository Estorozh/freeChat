# Messenger 

> 1. git clone git@github.com:Estorozh/freeChat.git
> 2. npm i
> 3. npm run serve (if you want to run it on your docker server, the process is described below)
> 4. in another terminal enter "npm run front"

Requires docker installed  
Go to the server folder `cd server`  
Build the image with the docker command `build -t server-free-chat/node-web-app .`  
After building, run the image interactively with the command line command `docker run -p 5000:5000 -it server-free-chat/node-web-app bash`  
Start server with command `npm run serve`  
After that, change the address of the address to your server and collect in production