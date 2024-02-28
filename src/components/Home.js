import React from 'react';
import HomeNav from './HomeNav';
import FactCarousel from './FactCarousel';
import '../css/Home.css';
import banner from '../images/banner.webp';

const Home = () => {
  return (
    <div>
      <div className="hero-banner">
        <img src={banner} alt="Hero Banner" className="banner-image" />
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
        <div className="carousel-container">
          <FactCarousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
