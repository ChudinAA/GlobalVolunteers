import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Project Categories
export const ProjectCategory = {
  MEDICAL: 'medical',
  EDUCATION: 'education',
  SPORTS: 'sports',
  ENVIRONMENT: 'environment'
} as const;

export type ProjectCategoryType = typeof ProjectCategory[keyof typeof ProjectCategory];

// Project Statuses
export const ProjectStatus = {
  ACTIVE: 'active',
  UPCOMING: 'upcoming',
  COMPLETED: 'completed'
} as const;

export type ProjectStatusType = typeof ProjectStatus[keyof typeof ProjectStatus];

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  shortDescription: text("short_description").notNull(),
  shortDescriptionEn: text("short_description_en").notNull(),
  fullDescription: text("full_description").notNull(),
  fullDescriptionEn: text("full_description_en").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  recruitmentDeadline: timestamp("recruitment_deadline").notNull(),
  category: text("category").notNull().$type<ProjectCategoryType>(),
  status: text("status").notNull().$type<ProjectStatusType>(),
  location: text("location").notNull(),
  locationEn: text("location_en").notNull(),
  country: text("country").notNull(),
  countryEn: text("country_en").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  organizationName: text("organization_name").notNull(),
  organizationNameEn: text("organization_name_en").notNull(),
  conditions: text("conditions").notNull(),
  conditionsEn: text("conditions_en").notNull(),
  volunteerFunction: text("volunteer_function").notNull(),
  volunteerFunctionEn: text("volunteer_function_en").notNull(),
  curatorName: text("curator_name").notNull(),
  curatorEmail: text("curator_email").notNull(),
  curatorPhone: text("curator_phone").notNull(),
  images: jsonb("images").notNull().$type<string[]>(),
  videos: jsonb("videos").notNull().$type<string[]>().default([]),
});

export const insertProjectSchema = createInsertSchema(projects);
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// News
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en").notNull(),
  content: text("content").notNull(),
  contentEn: text("content_en").notNull(),
  date: timestamp("date").notNull(),
  category: text("category").notNull().$type<ProjectCategoryType>(),
  image: text("image").notNull(),
});

export const insertNewsSchema = createInsertSchema(news);
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Team members
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  roleEn: text("role_en").notNull(),
  position: text("position").notNull(),
  positionEn: text("position_en").notNull(),
  photo: text("photo").notNull(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers);
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

// Partners
export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  website: text("website").notNull(),
});

export const insertPartnerSchema = createInsertSchema(partners);
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  authorEn: text("author_en").notNull(),
  content: text("content").notNull(),
  contentEn: text("content_en").notNull(),
  type: text("type").notNull(), // volunteer or organization
  avatar: text("avatar").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials);
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Volunteer applications
export const volunteerApplications = pgTable("volunteer_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interestedCategory: text("interested_category").$type<ProjectCategoryType>(),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVolunteerApplicationSchema = createInsertSchema(volunteerApplications).omit({
  createdAt: true
});
export type InsertVolunteerApplication = z.infer<typeof insertVolunteerApplicationSchema>;
export type VolunteerApplication = typeof volunteerApplications.$inferSelect;

// Partner applications
export const partnerApplications = pgTable("partner_applications", {
  id: serial("id").primaryKey(),
  organizationName: text("organization_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  partnershipType: text("partnership_type").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPartnerApplicationSchema = createInsertSchema(partnerApplications).omit({
  createdAt: true
});
export type InsertPartnerApplication = z.infer<typeof insertPartnerApplicationSchema>;
export type PartnerApplication = typeof partnerApplications.$inferSelect;

// Contact Form
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  createdAt: true
});
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
