# VICTO AI

![Project Logo](./public/logo.png)

An ai application like Gemini and ChaGpt with different customization different styling and multi theme , You can customize it and make it  act like any expert you want it to be.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Reference](#api-reference)

## Features

- Chat with text
- Image generating


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/victocoder/vitcoto-ai.git
   ```
2. Navigate into the project directory:
   ```bash
   cd vitcoto-ai
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm run dev
   ```

## API Reference

### Endpoint 1

**GET** `/api/gemini`

- Description: Accepts user prompt and returns gemini response after asking gemini with the prompt
- Parameters: 
  - `prompt`: the text enterd by the user as a prompt for the ai model.
- Response: 
  ```json
  {
    message: "gimini responded ",
    response: "long string text responeded by gemini"
  }
  ```