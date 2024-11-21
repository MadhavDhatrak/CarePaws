// import Incident from '../models/Incident.js';  // You'll need to create/import these models
// import Notification from '../Models/Notification.js';

import Incident from '../models/Incident.js';
import Notification from '../models/Notification.js';

// Get incident details for volunteer
export const getIncidentDetails = async (req, res) => {
    try {
        const { incident_id } = req.params;
        
        const incident = await Incident.findById(incident_id);
        if (!incident) {
            return res.status(404).json({ message: "Incident not found" });
        }

        // Return information matching your incident model structure
        const volunteerView = {
            animal_info: {
                photo: incident.animalInfo.photo,
                description: incident.animalInfo.description,
                severity: incident.animalInfo.aiSeverityAssessment
            },
            incident_location: incident.location,
            status: incident.status,
            severity_assessment: incident.severityAssessment,
            description: incident.description
        };

        res.status(200).json(volunteerView);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update volunteer status for an incident
export const updateVolunteerStatus = async (req, res) => {
    try {
        const { incident_id } = req.params;
        const { volunteer_status } = req.body;
        const volunteer_id = req.user._id;

        console.log("Updating status for volunteer:", volunteer_id); // Debug log

        const incident = await Incident.findById(incident_id);
        if (!incident) {
            return res.status(404).json({ message: "Incident not found" });
        }

        // Update the incident with volunteer's status
        incident.volunteer_status = volunteer_status;
        incident.volunteer_id = volunteer_id;
        incident.last_updated = new Date();

        await incident.save();

        // Create a notification
        if (volunteer_status === 'accepted') {
            const notification = new Notification({
                recipient: volunteer_id,
                type: 'CASE_UPDATE',
                message: `You have accepted the incident case for ${incident.animalInfo.description}`,
                incident: incident_id,
                createdAt: new Date(),
                isRead: false
            });

            console.log("Creating notification:", notification); // Debug log

            await notification.save();
        }

        res.status(200).json({ 
            message: "Status updated successfully",
            status: volunteer_status 
        });
    } catch (error) {
        console.log("Error updating status:", error); // Debug log
        res.status(500).json({ message: error.message });
    }
};

// Get notifications for volunteer
export const getVolunteerNotifications = async (req, res) => {
    try {
        const volunteer_id = req.user._id;  // Changed from req.user.id to req.user._id

        console.log("Searching notifications for volunteer:", volunteer_id); // Debug log

        const notifications = await Notification.find({
            recipient: volunteer_id  // Changed from recipient_id to recipient
        })
        .sort({ createdAt: -1 })  // Most recent first
        .limit(20);  // Limit to last 20 notifications

        console.log("Found notifications:", notifications); // Debug log

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error fetching notifications:", error); // Debug log
        res.status(500).json({ message: error.message });
    }
};