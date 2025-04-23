"use client";
import React from "react";
import PropTypes from "prop-types";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Box,
  Typography,
  styled,
} from "@mui/material";

const steps = ["Confirmed", "Shipped", "Out for Delivery", "Delivered"];

const StyledConnector = styled(StepConnector)(({ theme }) => ({
  marginLeft: 8,
  "& .MuiStepConnector-line": {
    borderLeftWidth: 2,
    borderColor: theme.palette.grey[400],
    minHeight: 24,
  },
}));

const StyledStepLabel = styled(StepLabel, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})(({ theme, ownerState }) => ({
  "& .MuiStepLabel-label": {
    color:
      ownerState.completed || ownerState.active
        ? theme.palette.success.main
        : theme.palette.text.disabled,
    fontWeight: ownerState.active ? "bold" : "normal",
  },
  "& .MuiStepIcon-root": {
    color:
      ownerState.completed || ownerState.active
        ? theme.palette.success.main
        : theme.palette.grey[400],
  },
}));

const CancelledStatus = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    py={2}
    sx={{
      backgroundColor: "rgba(255, 0, 0, 0.05)",
      border: "1px solid red",
      borderRadius: 2,
    }}
  >
    <Typography variant="body1" color="error" fontWeight="bold">
      ● Order Cancelled
    </Typography>
  </Box>
);

export default function OrderStatusTracker({ status }) {
  if (status === "Canceled") return <CancelledStatus />;

  const activeStep = steps.indexOf(status);
  const isValidStep = activeStep !== -1;

  return (
    <Stepper
      activeStep={isValidStep ? activeStep : 0}
      orientation="vertical"
      connector={<StyledConnector />}
    >
      {steps.map((label, index) => {
        const active = index === activeStep;
        const completed = index < activeStep;

        return (
          <Step key={label} completed={completed} active={active}>
            <StyledStepLabel
              ownerState={{ active, completed }}
              aria-label={label}
            >
              {label}
            </StyledStepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
