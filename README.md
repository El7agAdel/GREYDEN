# Greyden Coffee - Specialty Coffee Website

A beautiful, modern website for Greyden specialty coffee featuring a main page, menu page, and order page with category-organized items.

## Features

- **Home Page**: Welcoming landing page with brand information and features
- **Menu Page**: Browse all drinks organized by categories with filtering
- **Order Page**: Category-based ordering system with shopping cart functionality
- **JSON Data**: Centralized menu data in `data/menu.json` for easy updates

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
MQR_GREYDEN/
├── data/
│   └── menu.json          # Menu categories and drinks data
├── src/
│   ├── components/
│   │   ├── Navbar.jsx     # Navigation component
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Home.jsx       # Home page
│   │   ├── Home.css
│   │   ├── Menu.jsx       # Menu browsing page
│   │   ├── Menu.css
│   │   ├── Order.jsx      # Order page with cart
│   │   └── Order.css
│   ├── App.jsx            # Main app component with routing
│   ├── App.css
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Menu Data Structure

The menu data is stored in `data/menu.json` with the following structure:

```json
{
  "categories": [
    {
      "id": "category-id",
      "name": "Category Name",
      "description": "Category description"
    }
  ],
  "drinks": [
    {
      "id": "drink-id",
      "name": "Drink Name",
      "category": "category-id",
      "description": "Drink description",
      "price": 4.50
    }
  ]
}
```

You can easily add, remove, or modify categories and drinks by editing the `menu.json` file.

## Technologies Used

- React 18
- React Router DOM 6
- Vite
- CSS3 (Modern styling with gradients and animations)

