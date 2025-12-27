import { config } from 'dotenv';

// Load environment variables from .env file
config();

export default {
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
