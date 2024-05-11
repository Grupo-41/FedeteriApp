cd ./FedeteriAPI
start %~dp0/FedeteriAPI/bin/Release/net8.0/FedeteriAPI.exe
cd ../nextjs-fedeteriapp
start http://localhost:3000
npm run start