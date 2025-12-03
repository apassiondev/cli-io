import { confirm, input } from "@inquirer/prompts";
import { createObjectCsvWriter } from "csv-writer";

const filePath = "./data/resources.csv";

const csvWriter = createObjectCsvWriter({
  path: filePath,
  append: true,
  header: [
    { id: "title", title: "TITLE" },
    { id: "url", title: "URL" },
  ],
});

class ResourceEntry {
  constructor(title = "", url = "") {
    this.title = title;
    this.url = url;
  }

  async save() {
    try {
      const { title, url } = this;
      await csvWriter.writeRecords([{ title, url }]);
    } catch (error) {
      throw new Error(error);
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

      console.log(`"${title}" saved!`);
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
