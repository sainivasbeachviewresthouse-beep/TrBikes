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
}

interface BikeStore {
  bikes: Bike[];
  setBikes: (bikes: Bike[]) => void;
  addBike: (bike: Bike) => void;
  updateBike: (bike: Bike) => void;
  removeBike: (id: string) => void;
}

export const useBikeStore = create<BikeStore>((set) => ({
  bikes: [],
  setBikes: (bikes) => set({ bikes }),
  addBike: (bike) => set((state) => ({ bikes: [bike, ...state.bikes] })),
  updateBike: (bike) =>
    set((state) => ({
      bikes: state.bikes.map((b) => (b.id === bike.id ? bike : b)),
    })),
  removeBike: (id) => set((state) => ({ bikes: state.bikes.filter((b) => b.id !== id) })),
}));
