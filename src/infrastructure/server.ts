import express from "express";
import professionalRouter from "@routes/professional";
import appointmentRouter from "@routes/appointment";
import patientRouter from "@routes/patient";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Turnos App - v1.0.0");
});

app.use("/api/professional", professionalRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/patient", patientRouter);

app.use((_, res) => {
  res.status(404).send("404 Not Found");
});

export default app;
