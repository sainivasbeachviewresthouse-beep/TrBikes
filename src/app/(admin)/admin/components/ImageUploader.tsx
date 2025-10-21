"use client";

import { useState, useEffect } from "react";
import { Form, Button, Modal, InputGroup, Spinner } from "react-bootstrap";

interface ImageUploaderProps {
 value: string; // The current image URL (from the form data)
 onChange: (data: File | string | null) => void; // Single handler for File, URL, or null
}

const UnsplashSearchProxyEndpoint = "/api/unsplash-search"; 

export default function ImageUploader({
 value,
 onChange, // Corrected prop name and type
}: ImageUploaderProps) {
 const [preview, setPreview] = useState(value || "");
 const [localFile, setLocalFile] = useState<File | null>(null); 
 const [dragging, setDragging] = useState(false);
 const [unsplashModal, setUnsplashModal] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [results, setResults] = useState<any[]>([]);
 const [loading, setLoading] = useState(false);
 const [showUrlInput, setShowUrlInput] = useState(false);
 const [imageUrl, setImageUrl] = useState("");

 // 1. Sync preview with external value
 useEffect(() => {
  setPreview(value);
 }, [value]);

 // 2. Cleanup for createObjectURL to prevent memory leaks
 useEffect(() => {
  // Only cleanup if we have a local file and the preview is a blob URL
  if (localFile && preview.startsWith("blob:")) {
   return () => {
    URL.revokeObjectURL(preview);
   };
  }
 }, [localFile, preview]);

 // 3. File selection or camera capture
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selected = e.target.files?.[0];
  if (!selected) return;

  if (selected.size > 1024 * 1024) {
   alert("File must be below 1 MB!");
   return;
  }

  setLocalFile(selected); 
  onChange(selected); // Pass the File object to the parent
  setPreview(URL.createObjectURL(selected));
 };

 // 4. Drag & drop
 const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  setDragging(false);
  const dropped = e.dataTransfer.files[0];
  if (!dropped) return;

  if (dropped.size > 1024 * 1024) {
   alert("File must be below 1 MB!");
   return;
  }

  setLocalFile(dropped); 
  onChange(dropped); // Pass the File object to the parent
  setPreview(URL.createObjectURL(dropped));
 };

 // 5. Unsplash search 
 const searchUnsplash = async () => {
  if (!searchQuery.trim()) return;
  setLoading(true);
  try {
   const res = await fetch(`${UnsplashSearchProxyEndpoint}?query=${encodeURIComponent(searchQuery)}`);
   
   const data = await res.json();
   setResults(data.results || []);
  } catch {
   alert("Failed to fetch from Unsplash");
  } finally {
   setLoading(false);
  }
 };

 const selectUnsplashImage = (url: string) => {
  onChange(url); // Pass the URL string to the parent
  setPreview(url);
  setLocalFile(null); // Clear local file if Unsplash image is selected
  setUnsplashModal(false);
 };

 // 6. Handle manual URL input
 const handleManualUrl = () => {
  if (!imageUrl.startsWith("http")) {
   alert("Please enter a valid image URL");
   return;
  }
  onChange(imageUrl); // Pass the URL string to the parent
  setPreview(imageUrl);
  setLocalFile(null); // Clear local file
  setShowUrlInput(false);
 };

 const clearImage = () => {
  setPreview("");
  setLocalFile(null);
  onChange(null); // Pass null to the parent
 }

 return (
  <div>
   {/* Preview */}
   {preview && (
    <div className="mb-3 text-center">
     <img
      src={preview}
      alt="Preview"
      style={{
       maxWidth: "100%",
       height: "150px",
       objectFit: "cover",
       borderRadius: "6px",
      }}
     />
     <Button variant="danger" size="sm" onClick={clearImage} className="ms-2">Clear</Button>
    </div>
   )}

   {/* Drag-drop zone */}
   <div
    onDragOver={(e) => {
     e.preventDefault();
     setDragging(true);
    }}
    onDragLeave={() => setDragging(false)}
    onDrop={handleDrop}
    className={`p-3 border rounded text-center ${
     dragging ? "bg-light border-primary" : "border-secondary"
    }`}
    style={{ cursor: "pointer" }}
   >
    <Form.Label className="d-block mb-2">
     {localFile ? `File Selected: ${localFile.name}` : "Drag & Drop Image Here"}
    </Form.Label>
    <Form.Control
     type="file"
     accept="image/*"
     capture="environment"
     onChange={handleFileChange}
    />
    <small className="text-muted d-block mt-1">
     JPG/PNG under 1 MB • or take a photo
    </small>
   </div>

   {/* Action buttons (Unsplash & URL) */}
   <div className="d-flex justify-content-between mt-3">
    <Button
     variant="outline-secondary"
     size="sm"
     onClick={() => setUnsplashModal(true)}
    >
     Choose from Unsplash
    </Button>
    <Button
     variant="outline-secondary"
     size="sm"
     onClick={() => setShowUrlInput((v) => !v)}
    >
     Add Image URL
    </Button>
   </div>

   {/* Manual URL input */}
   {showUrlInput && (
    <InputGroup className="mt-3">
     <Form.Control
      placeholder="Paste image URL"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
     />
     <Button onClick={handleManualUrl}>Add</Button>
    </InputGroup>
   )}

   {/* Unsplash Modal */}
   <Modal
    show={unsplashModal}
    onHide={() => setUnsplashModal(false)}
    centered
    size="lg"
   >
    <Modal.Header closeButton>
  <Modal.Title>Select from Unsplash</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <InputGroup className="mb-3">
   <Form.Control
   placeholder="Search bikes, motorcycles, etc."
   value={searchQuery}
   onChange={(e) => setSearchQuery(e.target.value)}
   onKeyDown={(e) => e.key === "Enter" && searchUnsplash()}
   />
   <Button onClick={searchUnsplash}>Search</Button>
  </InputGroup>

  {loading ? (
   <p>Loading...</p>
  ) : results.length > 0 ? (
   <div className="row g-3">
   {results.map((img) => (
    <div
    key={img.id}
    className="col-6 col-md-3"
    style={{ cursor: "pointer" }}
    onClick={() => selectUnsplashImage(img.urls.small)}
    >
    <img
     src={img.urls.small}
     alt={img.alt_description}
     style={{
     width: "100%",
     height: "100px",
     objectFit: "cover",
     borderRadius: "6px",
     }}
    />
    </div>
   ))}
   </div>
  ) : (
   <p className="text-muted text-center">
   Try searching for “bike” or “motorcycle”
   </p>
  )}
  </Modal.Body>
   </Modal>
  </div>
 );
}