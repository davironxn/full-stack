#!/bin/bash

# This script sets up the necessary environment for the portfolio Next.js project.

# Update package list and install necessary dependencies
echo "Updating package list..."
sudo apt update

echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

# Install Next.js and other dependencies
echo "Installing Next.js and dependencies..."
npm install next react react-dom

# Install Tailwind CSS and Shadcn UI
echo "Installing Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "Installing Shadcn UI..."
npm install @shadcn/ui

# Create necessary directories if they don't exist
echo "Creating directories..."
mkdir -p app/about app/projects/[slug] app/blog app/contact app/dashboard components/ui styles scripts public

# Inform the user that the setup is complete
echo "Setup complete! You can now start developing your portfolio website."