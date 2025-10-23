import { create } from "zustand";

interface Bike {
  id: string;
  name: string;
  registration_no: string;
  category: string;
  color: string;
  rent_per_hour: number;
  image_url?: string;
  availability?: boolean;
  created_at?: string; // make sure your bikes have created_at from DB
}

interface BikeStore {
  bikes: Bike[];
  setBikes: (bikes: Bike[]) => void;
  addBike: (bike: Bike) => void;
  updateBike: (bike: Bike) => void;
  removeBike: (id: string) => void;
}

function sortBikes(bikes: Bike[]): Bike[] {
  return [...bikes].sort((a, b) => {
    // active bikes first
    if (a.availability === b.availability) {
      // then by created_at ascending
      return new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime();
    }
    return a.availability ? -1 : 1;
  });
}

export const useBikeStore = create<BikeStore>((set) => ({
  bikes: [],
  
  setBikes: (bikes) => set({ bikes: sortBikes(bikes) }),

  addBike: (bike) =>
    set((state) => ({
      bikes: sortBikes([bike, ...state.bikes]),
    })),

  updateBike: (bike) =>
    set((state) => ({
      bikes: sortBikes(
        state.bikes.map((b) => (b.id === bike.id ? bike : b))
      ),
    })),

  removeBike: (id) =>
    set((state) => ({
      bikes: state.bikes.filter((b) => b.id !== id),
    })),
}));
