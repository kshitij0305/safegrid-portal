import app from "./app.js";
import { prisma } from "./config/prismaClient.js";
import cors from "cors";

app.use(cors({
  origin: [
    "http://localhost:3000",            // local frontend
    "https://your-frontend.vercel.app"  // production frontend (replace with real vercel domain)
  ],
  credentials: true,
}));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
