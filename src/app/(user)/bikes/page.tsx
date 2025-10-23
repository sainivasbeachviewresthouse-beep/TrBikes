"use client";

import React, { useEffect, useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import { supabaseClient } from "@/lib/supabaseClient";
import { useBikeStore } from "@/store/useBikeStore";
import BikeCardClient from "../components/BikeCardClient";
import { Bike } from "@/types/bike";
import Loader from "../components/Loader";

export default function BikesPage() {
  const { bikes, setBikes, addBike, updateBike, removeBike } = useBikeStore();
  const [loading, setLoading] = useState(bikes.length === 0);

  // Fetch bikes initially
  const fetchBikes = useCallback(async () => {
    if (bikes.length > 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bikes");
      const data = await res.json();
      if (data.success) setBikes(data.data);
    } catch (err) {
      console.error("Failed to fetch bikes", err);
    } finally {
      setLoading(false);
    }
  }, [setBikes, bikes.length]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (bikes.length === 0) {
      fetchBikes();
    }

    const channel = supabaseClient
      .channel("bikes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bikes" },
        (payload) => {
          if (payload.eventType === "INSERT") addBike(payload.new as Bike);
          else if (payload.eventType === "UPDATE") updateBike(payload.new as Bike);
          else if (payload.eventType === "DELETE") removeBike(payload.old.id as string);
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [fetchBikes, addBike, updateBike, removeBike, bikes.length]);

  // 🔹 Use custom Loader instead of Spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Loader />
        </div>);
  }

  return (
    <Container className="py-5">
      {bikes.length === 0 ? (
        <p className="text-muted text-center">No bikes available.</p>
      ) : (
        <div className="row g-4">
          {bikes.map((bike) => (
            <div key={bike.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <BikeCardClient bike={bike} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
