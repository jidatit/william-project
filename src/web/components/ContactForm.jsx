import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Stack,
  Typography,
  Alert,
} from "@mui/material";

const CarDealershipContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [status, setStatus] = useState({ message: "", isError: false });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Update subject field when form type changes
  useEffect(() => {
    if (formType === "offer") {
      setFormData((prev) => ({
        ...prev,
        subject: "Make an offer - Vehicle name", // You can dynamically replace "Vehicle name" with actual vehicle info
      }));
    } else if (formType === "contact") {
      setFormData((prev) => ({
        ...prev,
        subject: "",
      }));
    }
  }, [formType]);

  function closeModal() {
    setIsOpen(false);
    setStatus({ message: "", isError: false });
  }

  function openModal(type) {
    setFormType(type);
    setIsOpen(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "Sending...", isError: false });
    const emailHeader =
      formType === "offer"
        ? "New Offer Submission"
        : "New Contact Form Submission";
    const email1 = emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID2,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID2,
      {
        to_email: "admin@roseautomotivesales.com",
        to_name: "Admin",
        subject: formData.subject,
        message: formData.message,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        from_name: formData.name,
        email_header: emailHeader, // Pass the email header to the template
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY2
    );

    const email2 = emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID2,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID2,
      {
        to_email: "William.taurice.rose@gmail.com",
        to_name: "William",
        subject: formData.subject,
        message: formData.message,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        from_name: formData.name,
        email_header: emailHeader, // Pass the email header to the template
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY2
    );

    // Send both emails in parallel
    Promise.all([email1, email2])
      .then(() => {
        setStatus({ message: "Message sent successfully!", isError: false });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => {
          closeModal();
        }, 100);
      })
      .catch(() => {
        setStatus({
          message: "Failed to send message. Please try again.",
          isError: true,
        });
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", mt: 2, justifyContent: "flex-start" }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FACC15",
            color: "black",
            fontWeight: "bold",
            py: 1,
            px: 3,
            borderRadius: 2,
            boxShadow: 2,
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "#F59E0B",
              boxShadow: 3,
              transform: "translateY(-2px)",
            },
            "&:focus": {
              outline: "2px solid #F59E0B",
              outlineOffset: "2px",
            },
          }}
          onClick={() => openModal("offer")}
        >
          Make an offer
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FACC15",
            color: "black",
            fontWeight: "bold",
            py: 1,
            px: 3,
            borderRadius: 2,
            boxShadow: 2,
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "#F59E0B",
              boxShadow: 3,
              transform: "translateY(-2px)",
            },
            "&:focus": {
              outline: "2px solid #F59E0B",
              outlineOffset: "2px",
            },
          }}
          onClick={() => openModal("contact")}
        >
          Contact us
        </Button>
      </Stack>

      <Dialog open={isOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            borderBottom: "1px solid #E5E7EB",
            pb: 1,
            fontWeight: 500,
          }}
        >
          {formType === "offer" ? "Make an Offer" : "Contact Us"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText component="div" sx={{ mb: 2 }}>
              <Stack spacing={3} sx={{ mt: 1 }}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  fullWidth
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  label="Subject"
                  name="subject"
                  fullWidth
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={
                    formType === "offer"
                      ? "Tell us about your offer..."
                      : "How can we help you?"
                  }
                  variant="outlined"
                />

                {status.message && (
                  <Alert severity={status.isError ? "error" : "success"}>
                    {status.message}
                  </Alert>
                )}
              </Stack>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={closeModal}
              variant="outlined"
              sx={{
                color: "#6B7280",
                borderColor: "#E5E7EB",
                "&:hover": {
                  bgcolor: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#FACC15",
                color: "black",
                "&:hover": {
                  bgcolor: "#F59E0B",
                },
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CarDealershipContact;
