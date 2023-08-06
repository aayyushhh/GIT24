import React from "react";
import "./navigation.css"
import logo from "./ico1.png"

export const Navigation = (props) => {
  return (
    <div className="naviga">
    <nav class="navbar navbar-expand-lg  bar" >
  <div class="container-fluid">
  <img className="img-log" src={logo} alt=""></img>
    <a class="navbar-brand content" href="/">Finpro</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link content" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link content" href="#about">About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link content" href="#services">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link content" href="#team">Team</a>
        </li>
        <li class="nav-item">
          <a class="nav-link content" href="/login">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
  );
};
