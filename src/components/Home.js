import React from 'react';
import HomeNav from './HomeNav';
import '../css/Home.css';

const Home = () => {
  const bannerSrc = `${process.env.PUBLIC_URL}/images/banner.jpg`;

  return (
    <div>
      <div className="hero-banner">
        {/* Use the bannerSrc variable for the src attribute */}
        <img src={bannerSrc} alt="Hero Banner" className="banner-image" />
      </div>
      <div className="custom-row">
        <div className="card-container">
          <div className="card-panel green lighten-1">
            <span className="white-text">
              Welcome to Budget Buddy, your go-to financial companion! Our aim is to simplify your financial journey with our easy-to-use budget tracker and simulator, making budgeting straightforward and accessible. Ready to master your monthly expenses or save for something special? We've got you covered. Beyond tracking, dive into our financial literacy resources for invaluable insights and tips to enhance your financial savvy. At Budget Buddy, we're dedicated to helping you achieve financial freedom through smart budgeting. Let's get started on this exciting journey together!
            </span>
          </div>
        </div>
        <div className="card-container">
          <HomeNav />
        </div>
      </div>
      <div className="custom-row">
      </div>
    </div>
  );
}

export default Home;
