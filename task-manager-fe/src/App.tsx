// App.tsx
import React from 'react';
import AppRoutes from '../src/routes/AppRoutes'
import './assets/styles.css'; // Import the CSS file



const App: React.FC = () => {
  return (
<div className="container">
  <AppRoutes/>
</div>
  );
};

export default App;
