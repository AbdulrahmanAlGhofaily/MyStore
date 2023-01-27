# MyStore Project

This project is part of Udacity JavaScript Fullstack course. <br>
The goal is to build a store front using Angular.<br>

# Overview

Starting with the first (main) page with the url `http://localhost:4200/`, this page includes our first two components the product-list and the navigation, the navigation will be a static component, means it would be always on the page on different view.<br>
The product-list component has a children components which are the product-item, it is the card that shows different products.<br>
Our second page is the cart page with the url `http://localhost:4200/cart`, this page includes the cart component where the items you add to the cart will be. <br>
Finally the checkout page with the url `http://localhost:4200/checkout`. This page show a message of a successful order. <br>
Here is a demo GIF <br>
![Demo GIF](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

## Getting started

Setting up this project is easy.<br>
In the project root run `npm install` then `ng serve` which will serve the website into your local machine browser. make sure to run it on the port 4200. If you want to change the port number, make sure to update the `product.service.ts` file by changing the url in the `getProducts()` function [`http://localhost:[specified port]/assets/data.json`].
