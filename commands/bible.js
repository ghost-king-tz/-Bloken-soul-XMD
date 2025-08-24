export default {
  name: "bible",
  description: "Search Bible verse",
  async execute(bot, message, args) {
    if (!args[0]) return message.reply("Please provide book and verse.");

    const query = args.join(" ");
    try {
      // Example API call, replace with real Bible API
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}`);
      const data = await response.json();
      if (!data.text) return message.reply("No results found.");

      message.reply(`📖 Bible result for "${query}":\n${data.text}`);
    } catch (err) {
      console.log(err);
      message.reply("Error fetching Bible data.");
    }
  }
}
