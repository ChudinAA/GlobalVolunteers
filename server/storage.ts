import {
  Project, InsertProject, projects,
  News, InsertNews, news,
  TeamMember, InsertTeamMember, teamMembers,
  Partner, InsertPartner, partners,
  Testimonial, InsertTestimonial, testimonials,
  VolunteerApplication, InsertVolunteerApplication, volunteerApplications,
  PartnerApplication, InsertPartnerApplication, partnerApplications,
  ContactSubmission, InsertContactSubmission, contactSubmissions,
  User, InsertUser, users,
  ProjectCategory, ProjectStatus
} from "@shared/schema";

// Mock data imports (for initial data)
import { mockProjects } from "./mockData/projects";
import { mockNews } from "./mockData/news";
import { mockTeamMembers } from "./mockData/teamMembers";
import { mockPartners } from "./mockData/partners";
import { mockTestimonials } from "./mockData/testimonials";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProjectsByStatus(status: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // News
  getAllNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  getNewsByCategory(category: string): Promise<News[]>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: number, newsItem: Partial<News>): Promise<News | undefined>;
  deleteNews(id: number): Promise<boolean>;

  // Team Members
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, teamMember: Partial<TeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;

  // Partners
  getAllPartners(): Promise<Partner[]>;
  getPartnerById(id: number): Promise<Partner | undefined>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  updatePartner(id: number, partner: Partial<Partner>): Promise<Partner | undefined>;
  deletePartner(id: number): Promise<boolean>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByType(type: string): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<boolean>;

  // Applications
  createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication>;
  getAllVolunteerApplications(): Promise<VolunteerApplication[]>;
  createPartnerApplication(application: InsertPartnerApplication): Promise<PartnerApplication>;
  getAllPartnerApplications(): Promise<PartnerApplication[]>;

  // Contact Form
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private news: Map<number, News>;
  private teamMembers: Map<number, TeamMember>;
  private partners: Map<number, Partner>;
  private testimonials: Map<number, Testimonial>;
  private volunteerApplications: Map<number, VolunteerApplication>;
  private partnerApplications: Map<number, PartnerApplication>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private users: Map<number, User>;

  private projectsId: number;
  private newsId: number;
  private teamMembersId: number;
  private partnersId: number;
  private testimonialsId: number;
  private volunteerApplicationsId: number;
  private partnerApplicationsId: number;
  private contactSubmissionsId: number;
  private usersId: number;

  constructor() {
    this.projects = new Map();
    this.news = new Map();
    this.teamMembers = new Map();
    this.partners = new Map();
    this.testimonials = new Map();
    this.volunteerApplications = new Map();
    this.partnerApplications = new Map();
    this.contactSubmissions = new Map();
    this.users = new Map();

    this.projectsId = 1;
    this.newsId = 1;
    this.teamMembersId = 1;
    this.partnersId = 1;
    this.testimonialsId = 1;
    this.volunteerApplicationsId = 1;
    this.partnerApplicationsId = 1;
    this.contactSubmissionsId = 1;
    this.usersId = 1;

    // Initialize with mock data
    this.initializeData();
  }

  private initializeData() {
    // Initialize projects
    mockProjects.forEach(project => {
      this.projects.set(this.projectsId, { ...project, id: this.projectsId });
      this.projectsId++;
    });

    // Initialize news
    mockNews.forEach(newsItem => {
      this.news.set(this.newsId, { ...newsItem, id: this.newsId });
      this.newsId++;
    });

    // Initialize team members
    mockTeamMembers.forEach(teamMember => {
      this.teamMembers.set(this.teamMembersId, { ...teamMember, id: this.teamMembersId });
      this.teamMembersId++;
    });

    // Initialize partners
    mockPartners.forEach(partner => {
      this.partners.set(this.partnersId, { ...partner, id: this.partnersId });
      this.partnersId++;
    });

    // Initialize testimonials
    mockTestimonials.forEach(testimonial => {
      this.testimonials.set(this.testimonialsId, { ...testimonial, id: this.testimonialsId });
      this.testimonialsId++;
    });
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.category === category);
  }

  async getProjectsByStatus(status: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.status === status);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectsId++;
    const newProject = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<Project>): Promise<Project | undefined> {
    const existingProject = this.projects.get(id);
    if (!existingProject) return undefined;

    const updatedProject = { ...existingProject, ...project };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // News
  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async getNewsByCategory(category: string): Promise<News[]> {
    return Array.from(this.news.values()).filter(newsItem => newsItem.category === category);
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const id = this.newsId++;
    const newNews = { ...newsItem, id };
    this.news.set(id, newNews);
    return newNews;
  }

  async updateNews(id: number, newsItem: Partial<News>): Promise<News | undefined> {
    const existingNews = this.news.get(id);
    if (!existingNews) return undefined;

    const updatedNews = { ...existingNews, ...newsItem };
    this.news.set(id, updatedNews);
    return updatedNews;
  }

  async deleteNews(id: number): Promise<boolean> {
    return this.news.delete(id);
  }

  // Team Members
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.teamMembersId++;
    const newTeamMember = { ...teamMember, id };
    this.teamMembers.set(id, newTeamMember);
    return newTeamMember;
  }

  async updateTeamMember(id: number, teamMember: Partial<TeamMember>): Promise<TeamMember | undefined> {
    const existingTeamMember = this.teamMembers.get(id);
    if (!existingTeamMember) return undefined;

    const updatedTeamMember = { ...existingTeamMember, ...teamMember };
    this.teamMembers.set(id, updatedTeamMember);
    return updatedTeamMember;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  // Partners
  async getAllPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async getPartnerById(id: number): Promise<Partner | undefined> {
    return this.partners.get(id);
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const id = this.partnersId++;
    const newPartner = { ...partner, id };
    this.partners.set(id, newPartner);
    return newPartner;
  }

  async updatePartner(id: number, partner: Partial<Partner>): Promise<Partner | undefined> {
    const existingPartner = this.partners.get(id);
    if (!existingPartner) return undefined;

    const updatedPartner = { ...existingPartner, ...partner };
    this.partners.set(id, updatedPartner);
    return updatedPartner;
  }

  async deletePartner(id: number): Promise<boolean> {
    return this.partners.delete(id);
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialsByType(type: string): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.type === type);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialsId++;
    const newTestimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Applications
  async createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const id = this.volunteerApplicationsId++;
    const newApplication = { ...application, id, createdAt: new Date() };
    this.volunteerApplications.set(id, newApplication);
    return newApplication;
  }

  async getAllVolunteerApplications(): Promise<VolunteerApplication[]> {
    return Array.from(this.volunteerApplications.values());
  }

  async createPartnerApplication(application: InsertPartnerApplication): Promise<PartnerApplication> {
    const id = this.partnerApplicationsId++;
    const newApplication = { ...application, id, createdAt: new Date() };
    this.partnerApplications.set(id, newApplication);
    return newApplication;
  }

  async getAllPartnerApplications(): Promise<PartnerApplication[]> {
    return Array.from(this.partnerApplications.values());
  }

  // Contact Form
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionsId++;
    const newSubmission = { ...submission, id, createdAt: new Date() };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.usersId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
