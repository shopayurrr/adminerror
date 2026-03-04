import { users, type User, type InsertUser, type Account } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAccountsByUserId(userId: number): Promise<Account[]>;
  getAllUsers(): Promise<User[]>;
  updateAccountBalance(accountId: number, newBalance: string): Promise<Account | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private accounts: Map<number, Account[]>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.accounts = new Map();
    this.currentId = 1;
    
    // Add a demo user
    const demoUser: User = {
      id: 1,
      username: 'demo',
      password: 'password',
      firstName: 'DALE',
      lastName: 'COOPER',
      email: 'dale.cooper@fbi.gov',
      dateOfBirth: '04/15/1890',
      primaryPhone: '(202) xxx-8573',
      secondaryPhone: '(202) xxx-9876',
      address: '000 MONTIFORE STREET, WASHINGTON, DC 20008',
      permanentEmail: 'dale.cooper@fbi.gov',
      temporaryEmail: 'dale.cooper@yahoo.com',
      socialSecurityNumber: 'xxx-xx-8573',
      lastLoginTime: new Date(),
      lastLoginIp: '127.0.0.1',
      isAdmin: false
    };
    this.users.set(1, demoUser);

    // Add an admin user
    const adminUser: User = {
      id: 2,
      username: 'OPPATHEBEAR',
      password: '55Fp4MUtd22MRFr',
      firstName: 'ADMIN',
      lastName: 'USER',
      email: 'admin@wellsfargo.com',
      dateOfBirth: '01/01/1970',
      primaryPhone: '(000) 000-0000',
      secondaryPhone: '',
      address: 'HEADQUARTERS',
      permanentEmail: 'admin@wellsfargo.com',
      temporaryEmail: '',
      socialSecurityNumber: '000-00-0000',
      lastLoginTime: new Date(),
      lastLoginIp: '127.0.0.1',
      isAdmin: true
    };
    this.users.set(2, adminUser);
    
    // Add demo accounts
    const demoAccounts: Account[] = [
      {
        id: 1,
        userId: 1,
        accountNumber: '12349876',
        accountType: 'Everyday Checking',
        balance: '45382.67'
      },
      {
        id: 2,
        userId: 1,
        accountNumber: '12347654',
        accountType: 'Way2Save Savings',
        balance: '128456.93'
      },
      {
        id: 3,
        userId: 1,
        accountNumber: '12345432',
        accountType: 'Active Cash Card',
        balance: '5000.00'
      }
    ];
    this.accounts.set(1, demoAccounts);
    
    // Update currentId
    this.currentId = 2;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return this.accounts.get(userId) || [];
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateAccountBalance(accountId: number, newBalance: string): Promise<Account | undefined> {
    for (const accounts of this.accounts.values()) {
      const account = accounts.find(a => a.id === accountId);
      if (account) {
        account.balance = newBalance;
        return account;
      }
    }
    return undefined;
  }
}

export const storage = new MemStorage();
