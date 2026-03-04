import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import path from "path";
import express from "express";

// Augment the express-session with our custom properties
declare module "express-session" {
  interface SessionData {
    userId?: number;
    username?: string;
    isAdmin?: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files
  app.use(express.static('public'));
  
  // Get IP address
  app.get("/api/ip", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || 
               req.socket.remoteAddress || 
               '0.0.0.0';
    
    res.json({ ip: ip.toString() });
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = loginSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUserByUsername(validatedData.username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // In a real application, you would use bcrypt to compare passwords
      if (user.password !== validatedData.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Update login time and IP
      const ip = req.headers['x-forwarded-for'] || 
                req.socket.remoteAddress || 
                '0.0.0.0';
                
      // In a real application, you would store this in the database
      // For now, we'll just send it back
      
      // Return user information (excluding password)
      const { password, ...userWithoutPassword } = user;
      
      // Set up session
      if (req.session) {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.isAdmin = user.isAdmin;
      }
      
      return res.status(200).json({ 
        user: userWithoutPassword,
        loginTime: new Date(),
        ip: ip.toString()
      });
      
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      return res.status(500).json({ message: "An error occurred during login" });
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to log out" });
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logged out successfully" });
      });
    } else {
      return res.status(200).json({ message: "Already logged out" });
    }
  });

  // Get user accounts
  app.get("/api/accounts", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const accounts = await storage.getAccountsByUserId(req.session.userId);
      return res.status(200).json({ accounts });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch accounts" });
    }
  });

  // Get user profile
  app.get("/api/profile", async (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password to the client
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // ADMIN ROUTES
  // Middleware to check for admin status
  const requireAdmin = (req: Request, res: express.Response, next: express.NextFunction) => {
    if (!req.session || !req.session.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
    next();
  };

  // Get all users (Admin only)
  app.get("/api/admin/users", requireAdmin, async (_req, res) => {
    try {
      const usersList = await storage.getAllUsers();
      // Remove passwords before sending
      const usersWithoutPasswords = usersList.map(({ password, ...rest }) => rest);
      res.json({ users: usersWithoutPasswords });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Get all accounts for a specific user (Admin only)
  app.get("/api/admin/users/:userId/accounts", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const accounts = await storage.getAccountsByUserId(userId);
      res.json({ accounts });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user accounts" });
    }
  });

  // Update account balance (Admin only)
  app.patch("/api/admin/accounts/:accountId/balance", requireAdmin, async (req, res) => {
    try {
      const accountId = parseInt(req.params.accountId);
      const { balance } = req.body;
      
      if (typeof balance !== 'string') {
        return res.status(400).json({ message: "Balance must be a string" });
      }

      const updatedAccount = await storage.updateAccountBalance(accountId, balance);
      if (!updatedAccount) {
        return res.status(404).json({ message: "Account not found" });
      }
      
      res.json({ account: updatedAccount });
    } catch (error) {
      res.status(500).json({ message: "Failed to update balance" });
    }
  });

  
  // Route all other requests to index.html for client-side routing
  app.get('/admin-login', (req, res) => {
    res.sendFile('admin-login.html', { root: 'public' });
  });

  app.get('/admin-dashboard', (req, res) => {
    if (!req.session || !req.session.isAdmin) {
      return res.redirect('/admin-login.html');
    }
    res.sendFile('admin-dashboard.html', { root: 'public' });
  });

  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
