# PlanBuddy
PlanBuddy is a lightweight web-based project management tool that was done in a 2 week sprint as part of a Metropolia UAS course on Web Development.

# Setup Instructions

Create two separate .env files, one inside the client folder and the other inside the server folder
client .env
```env
REACT_APP_API_URL=URL_TO_API
```
server .env
```env
PORT=CHOSEN_PORT
MONGO_URI=URI_TO_MONGO_ATLAS
SECRET=YOUR_SECRET
```
Then:
- Server

```bash
cd server
npm install
npm start
```

- Client
```bash
cd client
npm install
npm start
```

Deployed version:
https://plan-buddy.vercel.app/


