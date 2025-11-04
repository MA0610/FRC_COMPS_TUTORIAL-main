import express from "express";
import cors from "cors";
import fs from "fs";
import { exec } from "child_process";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/run-code", (req, res) => {
  const { code } = req.body;

  // Use a fixed class name
  const javaFileName = "UserCode";
  const javaFilePath = `${javaFileName}.java`;

  // Wrap code in a class if not already wrapped (STILL NEED TO MAYBE MAKE COMPATABLE WITH WPILIB)
  const fullCode = code.includes(`class ${javaFileName}`)
    ? code
    : `public class ${javaFileName} {\n  public static void main(String[] args) {\n    ${code}\n  }\n}`;

  // Write Java code to file
  fs.writeFileSync(javaFilePath, fullCode);

  // Compile and run
  exec(`javac ${javaFileName}.java && java ${javaFileName}`, (error, stdout, stderr) => {
    // Clean up generated files
    try {
      fs.unlinkSync(`${javaFileName}.java`);
      fs.unlinkSync(`${javaFileName}.class`);
    } catch (_) {}

    if (error) {
      return res.json({ error: stderr || error.message });
    }

    return res.json({ output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Java server running on http://localhost:${PORT}`);
});
