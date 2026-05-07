# Grocery Shopping App

A lightweight, client-side grocery shopping application built for GitHub Pages.

## Overview

This application is a simple, browser-based grocery shopping list manager that allows users to:
- Browse a catalog of grocery items
- Add items to their shopping cart
- Manage quantities in their cart
- View a cart summary with total pricing
- Persist their shopping list locally in the browser

## Features

- **Item Catalog**: Browse available grocery items with prices
- **Shopping Cart**: Add, remove, and adjust quantities
- **Local Storage**: Cart persists across browser sessions using LocalStorage
- **Responsive Design**: Works on desktop and mobile devices
- **No Backend Required**: Completely client-side application

## Technologies

- **HTML5**: Markup structure
- **CSS3**: Styling and responsive design
- **JavaScript (Vanilla)**: Core application logic
- **LocalStorage API**: Data persistence

## Project Structure

```
My-New-App/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Application styles
│   ├── js/
│   │   └── app.js          # Main application logic
│   └── images/             # Image assets (if needed)
├── data/
│   └── items.json          # Grocery items catalog
└── README.md               # This file
```

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JodiAB2999/My-New-App.git
   ```

2. Navigate to the project directory:
   ```bash
   cd My-New-App
   ```

3. Open `index.html` in your browser or serve with a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

4. Visit `http://localhost:8000` in your browser

## GitHub Pages Deployment

This app is configured for GitHub Pages hosting:

1. Push your changes to the `main` branch
2. Go to your repository settings
3. Under "Pages", select `main` as the source branch
4. Your app will be live at: `https://JodiAB2999.github.io/My-New-App/`

## How to Use

1. **Browse Items**: The home page displays all available grocery items
2. **Add to Cart**: Click "Add to Cart" on any item
3. **Adjust Quantities**: Use the +/- buttons in the cart to modify quantities
4. **View Cart**: Click the shopping cart icon to view your current cart
5. **Checkout**: Review your cart and proceed with checkout simulation
6. **Persistent Cart**: Your cart is automatically saved and will be restored when you return

## Data Format

Items are stored in `data/items.json`:

```json
[
  {
    "id": 1,
    "name": "Apples",
    "category": "Produce",
    "price": 3.99,
    "image": "apple.jpg"
  },
  ...
]
```

## Development Notes

- This is a **static, client-side only** application
- No backend server or database
- All data is stored locally in the browser using LocalStorage
- Cart data persists across sessions but is device-specific
- For production deployment, ensure GitHub Pages is enabled in repository settings

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ⚠️ Limited support

## License

MIT License - See LICENSE file for details

## Author

Jodi Brukardt

---

**Note**: This is a personal project. For questions or suggestions, please open an issue in the repository.
