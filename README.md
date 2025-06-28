# 📝 NoteTakingApp

A responsive, feature-rich Angular note-taking application that allows users to create, edit, delete, archive, and search notes. Built with Angular 17+, RxJS, SCSS, and supabse database.

![App Screenshot](https://note-taking-app-eight-eta.vercel.app/assets/screenshot.png)

## 🚀 Live Demo

🔗 [Visit Live App](https://note-taking-app-eight-eta.vercel.app/notes)

---

## 📦 Features

- ✅ Create, edit, and delete notes
- ✅ Archive and unarchive notes with toggle
- ✅ Fill in form inputs with validation
- ✅ Filter notes by tag
- ✅ View Archived Notes
- ✅ Search notes by title or content
- ✅ Fetching and storing of data in supabase database.
- ✅ Responsive design (mobile & desktop)
- ✅ Snackbar notifications for actions.From Angular material.
- ✅ Custom toggle switch and modal components
- ✅ Random background color for note cards
- ✅ Optimized list rendering with `@for` directive
- ✅ Built with Angular standalone components

---

## 🧰 Tech Stack

| Technology       | Description                           |
|------------------|----------------------------------------|
| Angular 17       | Core framework                        |
| TypeScript       | Language                              |
| RxJS             | Reactive programming                  |
| SCSS             | Styling (modular and responsive)      |
| Supabase         | Data in backend for note operations    |
| Vercel           | Deployment                            |

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/hadijah10/NoteTakingApp.git
cd NoteTakingApp

# Install dependencies
npm install

# Run the app locally
ng serve
Open your browser at: http://localhost:4200

src/
│
├── app/
│   ├── components/      # Reusable components (toggle, modal, etc.)
│   ├── services/        # API & error handling services
│   ├── models/          # Interfaces for Note and Tag
│   ├── pages/           # Notes listing, archive view, and edit form
│   └── app.config.ts    # Angular standalone app configuration
│
├── assets/              # Icons, images, and styles
└── styles.scss          # Global styles

💡 Future Improvements
Add user authentication

Add drag-and-drop for note reordering

Enable rich text editing

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.