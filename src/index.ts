import "dotenv/config";
import app from "./infrastructure/server";
import { connectDB } from "./infrastructure/database";

async function main() {
  await connectDB();
  const PORT = process.env.PORT || 3004;

  app.listen(PORT, () => {
    console.log(`Turnos App Server running on port ${PORT}`);
  });
}

main();
