// src/index.js

// Import necessary functions from the calculator module
import { initCalculator } from './js/calculator.js';

// Wait for the DOM to be fully loaded before initializing the calculator
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the calculator
    initCalculator();

    console.log('Calculator initialized and ready for use.');
});
