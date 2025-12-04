import { confirm, input } from "@inquirer/prompts";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";

const filePath = "./data/resources.csv";

const isFileExisted = fs.existsSync(filePath);

const csvWriter = createObjectCsvWriter({
  path: filePath,
  append: isFileExisted,
  header: [
    { id: "name", title: "NAME" },
    { id: "url", title: "URL" },
  ],
});

class ResourceEntry {
  constructor(name = "", url = "") {
    this.name = name;
    this.url = url;
  }

  async save() {
    try {
      const { name, url } = this;
      await csvWriter.writeRecords([{ name, url }]);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const app = async () => {
  let shouldContinue = true;

  while (shouldContinue) {
    try {
      const name = await input({ message: "Title: " });
      const url = await input({ message: "URL: " });

      const resource = new ResourceEntry(name, url);
      await resource.save();

      console.log(`"${name}" saved!`);
    } catch (error) {
      console.error("Error saving content:", error);
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
