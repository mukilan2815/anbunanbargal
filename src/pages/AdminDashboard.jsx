import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure correct import

import {
  Dashboard,
  Event,
  Book,
  People,
  Settings,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1a237e;
  color: white;
  padding: 20px;
`;

const SidebarItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #3949ab;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled(Typography)`
  margin-bottom: 20px !important;
`;

const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const EventList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const EventCard = styled(Card)`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
  });

  // Fetch events from Firebase
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = await getDocs(collection(db, "events"));
      setEvents(
        eventsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchEvents();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Submit event to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), newEvent);
      setNewEvent({ title: "", date: "", description: "", image: "" });
      alert("Event added successfully");

      // Re-fetch events to update the list
      const eventsCollection = await getDocs(collection(db, "events"));
      setEvents(
        eventsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <AdminContainer>
      <Sidebar>
        <Title variant="h6">நூலக நிர்வாகம்</Title>
        <SidebarItem whileHover={{ scale: 1.05 }}>
          <Dashboard /> <span style={{ marginLeft: "10px" }}>டாஷ்போர்டு</span>
        </SidebarItem>
        <SidebarItem whileHover={{ scale: 1.05 }}>
          <Event /> <span style={{ marginLeft: "10px" }}>நிகழ்வுகள்</span>
        </SidebarItem>
        <SidebarItem whileHover={{ scale: 1.05 }}>
          <Book /> <span style={{ marginLeft: "10px" }}>புத்தகங்கள்</span>
        </SidebarItem>
        <SidebarItem whileHover={{ scale: 1.05 }}>
          <People /> <span style={{ marginLeft: "10px" }}>உறுப்பினர்கள்</span>
        </SidebarItem>
        <SidebarItem whileHover={{ scale: 1.05 }}>
          <Settings /> <span style={{ marginLeft: "10px" }}>அமைப்புகள்</span>
        </SidebarItem>
      </Sidebar>
      <Content>
        <Title variant="h4">Event Dashboard</Title>
        <EventForm onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newEvent.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Image URL"
            name="image"
            type="url"
            value={newEvent.image}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Event
          </Button>
        </EventForm>

        {/* Render the events */}
        <EventList>
          {events.map((event) => (
            <EventCard key={event.id}>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <CalendarIcon style={{ marginRight: "8px" }} /> {event.date}
                </Typography>
                <Typography variant="body1" style={{ marginTop: "16px" }}>
                  {event.description}
                </Typography>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginTop: "16px",
                  }}
                />
              </CardContent>
            </EventCard>
          ))}
        </EventList>
        {events.length === 0 && (
          <Typography
            variant="body1"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            No upcoming events
          </Typography>
        )}
      </Content>
    </AdminContainer>
  );
}
