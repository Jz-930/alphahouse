import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  avatar?: string;
};

export type Property = {
  id: string;
  name: string;
  address: string;
  icon?: string;
};

export type WorkOrder = {
  id: string;
  propertyId: string;
  chatThreadId?: string;
  status: "pending" | "in_progress" | "completed";
  totalCost: number;
  title: string;
};

export type LedgerEntry = {
  id: string;
  propertyId: string;
  workOrderId?: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  description: string;
};

interface AppState {
  // Current Auth User
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;

  // Global Property Selection
  activePropertyId: string | null;
  setActivePropertyId: (id: string | null) => void;

  // Mock Data
  properties: Property[];
  workOrders: WorkOrder[];
  ledgers: LedgerEntry[];

  // Actions
  addProperty: (prop: Property) => void;
  addWorkOrder: (wo: WorkOrder) => void;
  updateWorkOrder: (id: string, updates: Partial<WorkOrder>) => void;
  addLedgerEntry: (entry: LedgerEntry) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      login: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null, activePropertyId: null }),

      activePropertyId: null,
      setActivePropertyId: (id) => set({ activePropertyId: id }),

      // Initial Mock Data to help demo building
      properties: [
        { id: "prop-1", name: "128 Maple St.", address: "128 Maple St.", icon: "🏠" },
        { id: "prop-2", name: "56 Oak Ave.", address: "56 Oak Ave.", icon: "🏡" },
        { id: "prop-3", name: "Lakeview Apt 4B", address: "Lakeview Apt 4B", icon: "🏢" }
      ],
      workOrders: [
        { id: "wo-mock-1", propertyId: "prop-1", chatThreadId: "chat-128-repair", status: "completed", totalCost: 180, title: "水管维修" },
        { id: "wo-mock-2", propertyId: "prop-2", chatThreadId: "chat-56-hvac", status: "in_progress", totalCost: 50, title: "暖炉检查" }
      ],
      ledgers: [
        { id: "ledg-1", propertyId: "prop-1", amount: 2100, type: "income", date: "2026-03-01T10:00:00Z", description: "3月租金" },
        { id: "ledg-2", propertyId: "prop-1", workOrderId: "wo-mock-1", amount: 180, type: "expense", date: "2026-03-05T14:30:00Z", description: "修水管人工及材料" },
        { id: "ledg-3", propertyId: "prop-1", amount: 1250, type: "expense", date: "2026-02-28T09:00:00Z", description: "地税 Q1" },
        { id: "ledg-4", propertyId: "prop-2", amount: 1800, type: "income", date: "2026-03-02T11:00:00Z", description: "3月租金" },
        { id: "ledg-5", propertyId: "prop-2", workOrderId: "wo-mock-2", amount: 50, type: "expense", date: "2026-03-10T16:00:00Z", description: "暖炉检查上门费" },
        { id: "ledg-6", propertyId: "prop-3", amount: 2500, type: "income", date: "2026-03-01T08:00:00Z", description: "3月租金" },
        { id: "ledg-7", propertyId: "prop-3", amount: 380, type: "expense", date: "2026-03-03T10:00:00Z", description: "物业管理费" }
      ],

      addProperty: (prop) => set((state) => ({ properties: [...state.properties, prop] })),
      addWorkOrder: (wo) => set((state) => ({ workOrders: [...state.workOrders, wo] })),
      updateWorkOrder: (id, updates) => set((state) => ({
        workOrders: state.workOrders.map((w) => w.id === id ? { ...w, ...updates } : w)
      })),
      addLedgerEntry: (entry) => set((state) => ({ ledgers: [...state.ledgers, entry] })),
    }),
    {
      name: "alphahouse-storage-v2",
    }
  )
);
