// ============================================================================
// INDEX.TSX - Application Entry Point
// ============================================================================
// This is the first JavaScript file that runs when the app loads.
// It's responsible for mounting the React app to the HTML page.

// Import React library - the foundation of our UI components
import React from 'react';

// Import ReactDOM - the bridge between React and the actual HTML DOM (Document Object Model)
// The 'client' version is for client-side rendering (runs in the browser)
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Import our main App component that contains all other components
import App from './App';

// STEP 1: Find the HTML element where we'll mount our React app
// ---------------------------------------------------------------
// In index.html, there's a <div id="root"></div> element
// We need to find this element to attach our React app to it
const rootElement = document.getElementById('root');

// Safety check: Make sure the root element exists
// If it doesn't exist (maybe someone deleted it from index.html), throw an error
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// STEP 2: Create a React root
// ----------------------------
// createRoot() is React 18's new way of initializing a React app
// It creates a "root" that knows how to render React components into the HTML element
const root = ReactDOM.createRoot(rootElement);

// STEP 3: Render the App
// -----------------------
// Tell React to render our App component inside the root element
root.render(
  // React.StrictMode is a development tool that helps find potential problems
  // It runs extra checks and warnings (only in development, not production)
  // It renders components twice to catch side effects
  <React.StrictMode>
    {/* This is our entire application wrapped in one component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);