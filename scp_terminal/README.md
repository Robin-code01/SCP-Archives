# SCP Terminal Archives

[## Video Walkthrough](https://youtu.be/P0_IGH1cexk?si=oYdW42ipMgeWX6Q6)

---

## Project Overview

SCP Terminal Archives is a web-based application inspired by the SCP Foundation universe, designed to provide an immersive, terminal-like interface for browsing, searching, and accessing SCP articles. The project leverages Flask for the backend, SQLite for data storage, and a modern, responsive frontend styled with Bootstrap and custom CSS. The application supports user authentication, session management, and dynamic command-based interactions, simulating a secure terminal environment for exploring SCP entries.

---

## Features

- **User Authentication:** Secure registration and login system with password hashing.
- **Session Management:** User sessions are managed using Flask-Session and stored on the filesystem.
- **Terminal Interface:** The main interface (`terminal.html`) mimics a command-line terminal, allowing users to input commands to access or search SCP articles.
- **SCP Article Access:** Users can retrieve SCP entries by ID, view their full content, and filter by classification.
- **Search and List:** Command-based search and listing of SCP entries, including by classification or keyword.
- **RESTful API:** `/api/command` endpoint processes terminal commands and returns JSON responses for frontend consumption.
- **Error Handling:** Custom apology pages for user-friendly error messages.
- **Responsive Design:** Modern UI with Bootstrap and custom styles for a seamless experience across devices.

---

## File Descriptions

- **app.py**: The main Flask application. Handles all routing, session management, user authentication, command API, and SCP article retrieval. Key routes include `/`, `/login`, `/logout`, `/register`, `/scp/<scp_id>`, and `/api/command`. The command handler processes terminal-like commands and interacts with the SCP database.

- **helper.py**: Contains utility functions and decorators, including `login_required` (to protect routes) and `apology` (to render error messages with custom templates).

- **scp.db**: SQLite database containing SCP article entries. Each entry includes fields such as `id`, `style`, `full_article_html`, and `classification`.

- **users.db**: SQLite database for user authentication, storing usernames and password hashes.

- **static/**: Contains all static assets:
  - `main.js`, `script.js`: JavaScript files for frontend interactivity and command handling.
  - `style.css`: Custom CSS for terminal and site styling.
  - `assets/`: SVG icons and font files for branding and UI elements.

- **templates/**: Jinja2 HTML templates for rendering pages:
  - `layout.html`: The base template, includes navigation and defines the main content block.
  - `terminal.html`: The main terminal interface for user interaction.
  - `apology.html`: Error page template for displaying user-friendly error messages.
  - `login.html`, `register.html`: Forms for user authentication.
  - `scp.html`: Displays individual SCP articles with custom styles and content.

- **flask_session/**: Directory used by Flask-Session to store session data on the filesystem.

- **__pycache__/**: Python bytecode cache directory (auto-generated).

---

## Design Choices and Rationale

- **Terminal-Style UI:** The decision to use a terminal-like interface was made to enhance immersion and provide a unique, interactive experience reminiscent of secure SCP Foundation systems.
- **Command API:** Implementing a RESTful `/api/command` endpoint allows for flexible, extensible command processing and easy frontend-backend communication.
- **Separation of Databases:** User data and SCP article data are stored in separate SQLite databases for modularity and security.
- **Session Storage:** Using Flask-Session with filesystem storage ensures session persistence and scalability beyond simple cookie-based sessions.
- **Custom Error Handling:** The `apology` function and template provide clear, themed error messages, improving user experience.
- **Security:** Passwords are hashed using Werkzeug, and all sensitive routes are protected with a `login_required` decorator.
- **Extensibility:** The codebase is structured to allow easy addition of new commands, SCP entries, and features.

---

## Challenges and Solutions

- **Block Naming Consistency:** Early in development, inconsistent Jinja block names caused templates to render blank. Standardizing on `{% block main %}` resolved this.
- **Database Query Results:** Ensuring that SCP article queries returned a single dictionary (not a list) was crucial for template rendering.
- **Error Feedback:** Implementing detailed error messages and debug mode helped quickly identify and resolve issues during development.

---

## How to Run

1. Install dependencies: `pip install flask flask-session cs50 werkzeug`
2. Ensure `scp.db` and `users.db` are present in the project directory.
3. Run the app: `flask run` or `python app.py`
4. Access the site at `http://localhost:5000/`

---

## Credits

- SCP Foundation (https://scpwiki.com/) for the universe and article content inspiration.
- Bootstrap for frontend framework.
- CS50 and Flask documentation for guidance.

---

## License
This project is for educational purposes and is not affiliated with the SCP Foundation :D
