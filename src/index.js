import { input } from "@inquirer/prompts";

(async () => {
  const answer = await input({ message: "Enter your name" });
  console.info(answer);
})();
