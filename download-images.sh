#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/images

echo "Downloading images..."

# Hero Background (Abstract Blue)
curl -L "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop" -o public/images/hero-bg.jpg

# Water Tank (Rooftop/Cleaning)
# Alternative 1 (Worker/Cleaning): https://images.unsplash.com/photo-1581092335397-9583eb92d232
# Alternative 2 (Indian Rooftop Vibe): https://images.unsplash.com/photo-1565514020176-db6a3949e73c
# Selected: Rooftop Construction/Tank vibe
curl -L "https://images.unsplash.com/photo-1603986224098-9377c1487d27?q=80&w=1000&auto=format&fit=crop" -o public/images/water-tank.jpg

# Home Shifting
curl -L "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" -o public/images/shifting.jpg

# Appliance Repair
curl -L "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop" -o public/images/repair.jpg

# Electrical/Plumbing
curl -L "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop" -o public/images/utility.jpg

# Buy & Sell
curl -L "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop" -o public/images/buysell.jpg

# Pattern
curl -L "https://www.transparenttextures.com/patterns/cubes.png" -o public/images/cubes-pattern.png

echo "Images downloaded successfully to public/images/"