# 📝 TODO List App

A simple and functional TODO List web application that interacts with the [Todoist REST API](https://developer.todoist.com/rest/v2/?javascript#overview) to manage tasks.  
Designed for quick setup, clean interface, and smooth communication with the external task management service.

## 🚀 Features

- ✅ View tasks from your Todoist account  
- ➕ Add new tasks with custom content 
- ❌ Delete or complete tasks  
- 🔁 Real-time sync with [Todoist REST API](https://developer.todoist.com/rest/v2/?javascript#overview)  
- 🌐 Clean, server-rendered UI using EJS templates

## 🛠️ Built With

- **HTML5**
- **CSS3**
- **JavaScript (Node.js)**

## 📚 Libraries & Frameworks

- [Express.js](https://expressjs.com/) — Web framework for Node.js  
- [EJS](https://ejs.co/) — Templating engine  
- [Axios](https://axios-http.com/) — Promise-based HTTP client  
- [body-parser](https://www.npmjs.com/package/body-parser) — Middleware for handling request bodies  
- [dotenv](https://www.npmjs.com/package/dotenv) — Loads environment variables from `.env`

## 💡 How to Use

1. **Clone the repository**:
   ```
   bash
   
   git clone https://github.com/andriy1144/TODO-List.git
   
   cd TODO-List 
   ```
2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   ```
   PORT=3000
   API_AUTHORIZATION_TOKEN=<YOUR_API_TOKEN_HERE>
   ```
4. **Start the server**:
   ```
   node index.js
   ```
5. **Visit the app in your browser**: 
   ```
   http://localhost:3000
   ```


## 📸 Screenshots 
![Homepage](https://github.com/andriy1144/TODO-List/raw/main/homepage.png)
![Task creation form](https://github.com/andriy1144/TODO-List/raw/main/taskForm.png)


## 🔐 API Reference

This app uses the official [Todoist REST API v3](https://developer.todoist.com/api/v1) to fetch and manipulate tasks.
You will need a personal API token from your [Todoist account](https://app.todoist.com/app/settings/account).

## ✅ Project Status

🔄 _In progress..._



## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

🔧 _Feel free to contribute or fork this project for your own use._  
✉️ _Questions or suggestions? Reach out via Issues or Pull Requests!_

👩🏻‍💻 _(The project was created as an educational one to consolidate or acquire new skills.)_
