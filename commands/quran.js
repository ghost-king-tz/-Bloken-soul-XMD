export default {
  name: "quran",
  description: "Search Quran surah or ayah",
  async execute(bot, message, args) {
    if (!args[0]) return message.reply("Please provide Surah or Ayah number.");

    const query = args.join(" ");
    try {
      // Example API call, replace with real Quran API
      const response = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en`);
      const data = await response.json();
      if (!data.data || !data.data.matches.length) return message.reply("No results found.");
      
      const aya = data.data.matches[0].text;
      message.reply(`📖 Quran result for "${query}":\n${aya}`);
    } catch (err) {
      console.log(err);
      message.reply("Error fetching Quran data.");
    }
  }
}
