// data/gallery.ts
export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category?: string; // e.g., "bike", "Lobby", "Pool"
}

export const gallery: GalleryItem[] = [
  { id: '1', src: '/gallery/bike1.webp', alt: 'Deluxe bike', category: 'bike' },
  { id: '2', src: '/gallery/bike2.webp', alt: 'Lobby', category: 'bike' },
  { id: '3', src: '/gallery/bike3.webp', alt: 'Swimming Pool', category: 'bike' },


  // add more gallery
];
