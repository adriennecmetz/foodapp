# FoodApp: A Restaurant Delivery App

This project serves as a complete example of a full-stack application developed with a Next.js frontend, Strapi backend, and integrated Stripe payment. You can use it as a starting point for building your own similar applications or simply as a learning project to get familiar with these technologies.

## Project Structure

- `/backend`: This directory contains the Strapi/Apollo Server API and database files.
- `/frontend`: This directory holds the Next.js application, with further directories for pages, components, and lib.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this application, you need to have Node.js and npm installed on your machine. Additionally, you'll need MongoDB if you want to run the database locally.

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/foodapp.git
```

#### Backend

Navigate to the `backend` directory:

```bash
cd foodapp/backend
```

Install the dependencies:

```bash
npm install
```

Start the Strapi server:

```bash
npm run develop
```

You should now have the Strapi server running at `http://localhost:1337`.

#### Frontend

In a new terminal window, navigate to the `frontend` directory:

```bash
cd ../frontend
```

Install the dependencies:

```bash
npm install
```

Start the Next.js server:

```bash
npm run dev
```

You should now have the Next.js application running at `http://localhost:3000`.

## Usage

The application simulates a restaurant delivery service. It features fictional restaurants, dishes, and stock images which are all managed by the Strapi content management system and accessible through the Strapi API.

Users can browse the available restaurants, select dishes, add them to their shopping cart, and proceed to checkout. The Stripe API is used for handling payments.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Adrienne Metz, Student 



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to Strapi for providing an excellent backend.
- Thanks to Next.js for the solid frontend framework.
- Thanks to Stripe for secure and efficient payment processing.
