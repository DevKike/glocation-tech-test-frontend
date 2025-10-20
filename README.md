# 🌐 glocation-tech-test-frontend

Frontend application built with **Angular 18**, using **NgModules** and **PrimeNG 18** for the user interface.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/glocation-tech-test-frontend.git
cd glocation-tech-test-frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required dependencies listed in the `package.json` file.

---

## ⚙️ Environment Configuration

The backend API URL is defined inside the environment configuration files.

Example for development (`src/environments/environment.ts`):
```typescript
export const ENVIRONMENT = {
  PRODUCTION: false,
  API_URL: 'http://localhost:3000/api/v1',
};
```

For production (`src/environments/environment.prod.ts`):
```typescript
export const ENVIRONMENT = {
  PRODUCTION: true,
  API_URL: 'https://your-production-domain.com/api/v1',
};
```

You can update these URLs depending on your backend configuration.

---

## 🧩 Available Scripts

### 🧪 Development Server
```bash
npm start
```
or
```bash
ng serve
```
This will start the application at [http://localhost:4200](http://localhost:4200).  
The app will automatically reload if you change any source files.

---

## 🧠 Project Notes

- The project uses **Angular Modules** for scalable structure.  
- **PrimeNG 18** is integrated for UI components and theming.  
- The environment files control backend connectivity (`API_URL`).  
- Make sure your backend (`glocation-tech-test-backend`) is running before using the app in dev mode.

---

## 🧰 Tech Stack

| Technology | Version | Description |
|-------------|----------|-------------|
| **Angular** | 18.x | Frontend framework |
| **PrimeNG** | 18.x | UI component library |
| **TypeScript** | Latest | Language for Angular |
| **RxJS** | Latest | Reactive programming |
| **Node.js / npm** | LTS | Dependency management and scripts |

---

## 🧑‍💻 Author

Developed by **Álvaro Narváez**  
For the **Glocation Technical Test**
