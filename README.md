# Hawk-AI

**Hawk-AI** is a Windows-based application designed to monitor user login activities for suspicious behavior. Upon detecting anomalies, it generates detailed reports and sends them via email within 36 hours.

## Features

- **Real-Time Monitoring:** Continuously tracks user login events to identify unusual activities.
- **Automated Reporting:** Generates comprehensive reports on detected anomalies and dispatches them via email promptly.
- **User-Friendly Interface:** Offers both native and web-based applications for seamless interaction.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/nickthelegend/hawk-ai.git
   cd hawk-ai
   ```

2. **Install Dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the necessary packages:

   ```bash
   npm install
   ```

3. **Configure the Application:**

   - Rename `.env.example` to `.env`.
   - Update the `.env` file with your email service credentials and other configurations.
        ```bash
        NEXTAUTH_SECRET=
        NEXT_PUBLIC_SUPABASE_URL=
        NEXT_PUBLIC_SUPABASE_ANON_KEY=
        SUPABASE_SERVICE_ROLE_KEY=
        GOOGLE_CLIENT_ID=
        GOOGLE_CLIENT_SECRET=
        NEXT_PUBLIC_GEMINI_API_KEY=
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
        STRIPE_SECRET_KEY=
        NEXT_PUBLIC_URL=
        TOGETHER_AI_API_KEY=

4. **Start the Application:**

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm run build
   npm start
   ```

## Usage

- **Accessing the Interface:**

  - **Web Application:** Open your browser and navigate to `http://localhost:3000`.
  - **Native Application:** Run the executable file located in the `build` directory.

- **Monitoring Logins:**

  The dashboard displays real-time login activities. Suspicious events are highlighted for immediate attention.

- **Receiving Reports:**

  Reports are automatically emailed to the address specified in the `.env` configuration. Ensure your email settings are correctly configured to receive these reports.

## Contributing

We welcome contributions to enhance Hawk-AI:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

Please ensure your code adheres to our coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the contributors and the open-source community for their invaluable support and resources.

---
