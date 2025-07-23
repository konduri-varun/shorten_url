How to run the React frontend:

1. Install dependencies:
   npm install react react-dom serve

2. Build the frontend (optional for this simple setup):
   npx babel main.js --out-file main.compiled.js --presets=@babel/preset-react,@babel/preset-env
   (Or use a bundler like Vite/CRA for production)

3. Start the static server:
   npx serve -s .

4. Open http://localhost:5000 in your browser.

Make sure your backend (Node.js) is running at http://localhost:3000.
