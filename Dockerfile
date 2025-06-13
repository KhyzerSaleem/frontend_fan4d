# ================================
# 1. Builder stage
# ================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install required packages (like sharp for image optimization)
RUN apk add --no-cache libc6-compat

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# ================================
# 2. Production stage
# ================================
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install required packages
RUN apk add --no-cache libc6-compat

# Set NODE_ENV for production
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/next-env.d.ts ./next-env.d.ts

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
