import { input, confirm } from "@inquirer/prompts";
import { appendFileSync } from "fs";

const filePath = "./data/resources.csv";

class ResourceEntry {
  constructor(title = "", url = "") {
    this.title = title;
    this.url = url;
  }

  save() {
    const content = `${this.title},${this.url}\n`;
    try {
      appendFileSync(filePath, content);
      console.info(`Data "${this.title}" saved!`);
    } catch (error) {
      console.error(error);
    }
  }
}

const app = async () => {
  let shouldContinue = true;

  while (shouldContinue) {
    try {
      const title = await input({ message: "Title: " });
      const url = await input({ message: "URL: " });

      const resource = new ResourceEntry(title, url);
      resource.save();
    } catch (error) {
      console.error(error);
    }

    shouldContinue = await confirm({ message: "Continue?" });

    if (!shouldContinue) {
      console.info("👋 Bye!");
      break;
    } else {
      console.log("----- Your Next Entry -----");
    }
  }
};

app();
