"use client";

import { useState, useEffect, ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import Image from "next/image";

interface ImageUploaderProps {
  value: string;
  onChange: (data: File | string | null) => void;
}

interface PexelsResult {
  id: number;
  photographer: string;
  src: { medium: string };
}

const PexelsSearchProxyEndpoint = "/api/pexels-search";

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState(value || "");
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pexelsModal, setPexelsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<PexelsResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => setPreview(value), [value]);

  useEffect(() => {
    if (localFile && preview.startsWith("blob:")) {
      return () => URL.revokeObjectURL(preview);
    }
  }, [localFile, preview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.size > 1024 * 1024) return alert("File must be below 1 MB!");
    setLocalFile(selected);
    onChange(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (!dropped) return;
    if (dropped.size > 1024 * 1024) return alert("File must be below 1 MB!");
    setLocalFile(dropped);
    onChange(dropped);
    setPreview(URL.createObjectURL(dropped));
  };

  const searchPexels = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${PexelsSearchProxyEndpoint}?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data.photos || []);
    } catch {
      alert("Failed to fetch from Pexels");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchPexels();
  };

  const selectPexelsImage = (url: string) => {
    onChange(url);
    setPreview(url);
    setLocalFile(null);
    setPexelsModal(false);
  };

  const clearImage = () => {
    setPreview("");
    setLocalFile(null);
    onChange(null);
  };

  return (
    <div>
      {/* ✅ Preview */}
      {preview && (
        <div className="mb-3 text-center">
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={150}
            style={{ maxWidth: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" }}
          />
          <Button variant="danger" size="sm" onClick={clearImage} className="ms-2">
            Clear
          </Button>
        </div>
      )}

      {/* ✅ Drag-drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`p-3 border rounded text-center ${dragging ? "bg-light border-primary" : "border-secondary"}`}
        style={{ cursor: "pointer" }}
      >
        <Form.Label className="d-block mb-2">
          {localFile ? `File Selected: ${localFile.name}` : "Drag & Drop Image Here"}
        </Form.Label>

        {/* ✅ Two buttons: Upload & Take Photo */}
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          {/* Hidden file input for Upload */}
          <input
            id="uploadInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => document.getElementById("uploadInput")?.click()}
          >
            📁 Upload from Folder
          </Button>

          {/* Hidden file input for Camera */}
          <input
            id="cameraInput"
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => document.getElementById("cameraInput")?.click()}
          >
            📸 Take Photo
          </Button>
        </div>

        <small className="text-muted d-block mt-2">JPG/PNG under 1 MB • or use camera</small>
      </div>

      {/* ✅ Choose from Pexels */}
      <div className="d-flex justify-content-start mt-3">
        <Button variant="outline-secondary" size="sm" onClick={() => setPexelsModal(true)}>
          🖼️ Choose from Pexels
        </Button>
      </div>

      {/* ✅ Pexels Modal */}
      <Modal show={pexelsModal} onHide={() => setPexelsModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select from Pexels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search bikes, motorcycles, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <Button onClick={searchPexels} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </InputGroup>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : results.length > 0 ? (
            <div className="row g-3">
              {results.map((img: PexelsResult) => (
                <div
                  key={img.id}
                  className="col-6 col-md-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => selectPexelsImage(img.src.medium)}
                >
                  <Image
                    src={img.src.medium}
                    alt={img.photographer}
                    width={200}
                    height={100}
                    style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center">Try searching for “bike” or “motorcycle”</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
