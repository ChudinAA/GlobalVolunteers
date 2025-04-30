import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertVolunteerApplicationSchema, 
  insertPartnerApplicationSchema,
  insertContactSubmissionSchema,
  ProjectCategory,
  ProjectStatus
} from "@shared/schema";
import { z } from 'zod';

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix
  const apiPrefix = '/api';

  // Projects endpoints
  app.get(`${apiPrefix}/projects`, async (req: Request, res: Response) => {
    try {
      const { category, status } = req.query;

      let projects;
      if (category && typeof category === 'string') {
        projects = await storage.getProjectsByCategory(category);
      } else if (status && typeof status === 'string') {
        projects = await storage.getProjectsByStatus(status);
      } else {
        projects = await storage.getAllProjects();
      }

      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch projects' });
    }
  });

  app.get(`${apiPrefix}/projects/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch project' });
    }
  });

  // News endpoints
  app.get(`${apiPrefix}/news`, async (req: Request, res: Response) => {
    try {
      const { category } = req.query;

      let newsItems;
      if (category && typeof category === 'string') {
        newsItems = await storage.getNewsByCategory(category);
      } else {
        newsItems = await storage.getAllNews();
      }

      res.json(newsItems);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch news' });
    }
  });

  app.get(`${apiPrefix}/news/:id`, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid news ID' });
      }

      const newsItem = await storage.getNewsById(id);
      if (!newsItem) {
        return res.status(404).json({ message: 'News item not found' });
      }

      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch news item' });
    }
  });

  // Team members endpoints
  app.get(`${apiPrefix}/team`, async (_req: Request, res: Response) => {
    try {
      const teamMembers = await storage.getAllTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch team members' });
    }
  });

  // Partners endpoints
  app.get(`${apiPrefix}/partners`, async (_req: Request, res: Response) => {
    try {
      const partners = await storage.getAllPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch partners' });
    }
  });

  // Testimonials endpoints
  app.get(`${apiPrefix}/testimonials`, async (req: Request, res: Response) => {
    try {
      const { type } = req.query;

      let testimonials;
      if (type && typeof type === 'string') {
        testimonials = await storage.getTestimonialsByType(type);
      } else {
        testimonials = await storage.getAllTestimonials();
      }

      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
  });

  // Volunteer application endpoint
  app.post(`${apiPrefix}/volunteer-applications`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertVolunteerApplicationSchema.parse(req.body);
      const application = await storage.createVolunteerApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid application data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to submit volunteer application' });
    }
  });

  // Partner application endpoint
  app.post(`${apiPrefix}/partner-applications`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertPartnerApplicationSchema.parse(req.body);
      const application = await storage.createPartnerApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid application data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to submit partner application' });
    }
  });

  // Contact form submission endpoint
  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid submission data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to submit contact form' });
    }
  });

  // Project categories endpoint
  app.get(`${apiPrefix}/project-categories`, (_req: Request, res: Response) => {
    try {
      res.json(Object.values(ProjectCategory));
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch project categories' });
    }
  });

  // Project statuses endpoint
  app.get(`${apiPrefix}/project-statuses`, (_req: Request, res: Response) => {
    try {
      res.json(Object.values(ProjectStatus));
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch project statuses' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}