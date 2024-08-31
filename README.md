# Basic Numeric Calculator

## Overview

The Basic Numeric Calculator is a web-based application designed to provide users with a simple and efficient tool for performing arithmetic calculations. Built with modern web technologies, this calculator offers a clean, intuitive interface and robust functionality.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division
- Responsive design that adapts to various screen sizes
- Keyboard support for improved accessibility
- Clear and All Clear functions
- Handling of decimal numbers
- Error handling for invalid operations (e.g., division by zero)
- Cross-browser compatibility

## Installation

To set up the Basic Numeric Calculator on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/willblaschko/cotufa-calculator
   ```

2. Navigate to the project directory:
   ```
   cd cotufa-calculator
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the calculator locally:

1. Start the development server:
   ```
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:3000` (or the port specified in your console output).

3. You should now see the calculator interface and can begin performing calculations.

## Testing

This project includes a comprehensive test suite to ensure functionality, accessibility, and cross-browser compatibility. To run the tests:

### Unit Tests
npm run test:unit
```

### End-to-End Tests
```
npm run test:e2e
```

### Cross-Browser Tests
```
npm run test:cross-browser
```

### Accessibility Tests
```
npm run test:accessibility
```

### Run All Tests
```
npm run test:all
```

## Project Structure

- `src/`: Source files for the application
  - `index.html`: Main HTML file
  - `js/`: JavaScript files
    - `calculator.js`: Core calculator logic
  - `css/`: CSS files
    - `styles.css`: Main stylesheet
- `tests/`: Test files
  - `e2e/`: End-to-end tests
  - `accessibility/`: Accessibility tests
  - `cross-browser-config.js`: Configuration for cross-browser testing
  - `cross-browser-runner.js`: Runner for cross-browser tests
- `docs/`: Documentation files
  - `architecture_design.md`: Detailed architecture design
- `package.json`: Project dependencies and scripts

## Contributing

We welcome contributions to the Basic Numeric Calculator project! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to the existing style conventions and passes all tests before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for providing the tools and libraries that made this project possible

For more detailed information about the project's architecture and design decisions, please refer to the [Architecture Design Document](docs/architecture_design.md).
