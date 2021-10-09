const {MessageEmbed, CommandInteraction} = require('discord.js')

module.exports = {
    name: 'facts',
    description: 'gives you a fact',

    run: async(client, interaction, args) => {

        let replies = ["Victorians once used leeches to predict the weather", "Your funny bone is actually a nerve.", "The chief translator of the European Parliament speaks 32 languages fluently.", "The most requested funeral song in England is by Monty Python.", "Research shows that all blue-eyed people may be related", "The average person will spend six months of their life waiting for red lights to turn green.", "A bolt of lightning contains enough energy to toast 100,000 slices of bread.", "Nearly 30,000 rubber ducks were lost at sea in 1992 and are still being discovered today.", "Cherophobia is the word for the irrational fear of being happy.", "You can hear a blue whale's heartbeat from two miles away.", "Instead of saying cheese before taking a picture, Victorians said prunes.", "Roosters have built-in earplugs.", "The Netherlands is so safe, it imports criminals to fill jails.", "The world's largest pyramid isn't in Egypt.", "Dolphins have actual names.", "A wild dog is the most successful predator in the animal kingdom.", "Cold water is just as cleansing as hot water.", "A U.S. Park Ranger once got hit by lightning seven times.", "Water bottle expiration dates are for the bottle, not the water.", "NASCAR drivers can lose up to 10 pounds in sweat due to high temperatures during races.", "Indians spend 10+ hours a week reading, more than any other country in the world.", "Pineapples were named after pine cones.", "The IKEA catalog is the most widely printed book in history", "Crocodiles are one of the oldest living species, having survived for more than 200 million years.", "Bacon's saltiness isn't natural—it comes from curing and brining.", "The cracking sound your joints make is the sound of gases being released.", "The largest snowflake on record was 15 inches wide.", "Scotland has more than 400 words for snow", "Someone tried to sell New Zealand on eBay but was stopped once the bid reached $3,000.", "It's illegal to own only one guinea pig in Switzerland.", "If you die alone in the Netherlands, someone will write you a poem and recite it at your funeral.", "Astronaut Alan Shepard hit two golf balls on the moon's surface.", "Beauty and the Beast was written to help girls accept arranged marriages.", "The first rollercoaster was invented at Coney Island as a way to distract people from sinful activities", "More human twins are being born now than ever before.", "A narwhal's tusk reveals its past living conditions.", "New car smell is the scent of dozens of chemicals", "The world wastes about 1 billion metric tons of food each year.", "Hair and nails grow faster during pregnancy.", "The heads on Easter Island have bodies.", "Humans are the only animals that blush.", "The feeling of getting lost inside a mall is known as the Gruen transfer", "The wood frog can hold its pee for up to eight months.", "The hottest spot on the planet is in Libya.", "You lose up to 30 percent of your taste buds during flight.", "Only two mammals like spicy food: humans and the tree shrew.", "The M's in M&Ms stand for Mars and Murrie.", "Cotton candy was invented by a dentist.", "Marie Curie is the only person to earn a Nobel prize in two different sciences.", "Fingernails don't grow after you die.", "Pigeons can tell the difference between a painting by Monet and Picasso.", "Chewing gum boosts concentration.", "Superman didn't always fly.", "The first computer was invented in the 1940s.", "Space smells like seared steak.", "The unicorn is the national animal of Scotland", "Bees sometimes sting other bees.", "Kids ask 300 questions a day.", "E is the most common letter and appears in 11 percent of all english words.", "The healthiest place in the world is in Panama.", "Some people have an extra bone in their knee (and it's getting more common).", "Pringles aren't actually potato chips.", "Water makes different pouring sounds depending on its temperature", "Most laughter isn't because things are funny.", "Dogs actually understand some English.", "Humans are just one of the estimated 8.7 million species on Earth.", "Dinosaurs lived on every continent.", "Sea lions can dance to a beat.", "Rolls-Royce makes the most expensive car in the world.", "The first iPhone wasn't made by Apple.", "For 100 years, maps have shown an island that doesn't exist.", "The man who wrote Dracula never visited Transylvania.", "Tornadoes can cause fish rain.", "Napoleon was once attacked by thousands of rabbits.", "Some planets produce diamond rain.", "Sharks can live for five centuries.", "There's an entire town under a rock.", "You can sneeze faster than a cheetah can run.", "Pluto technically isn't even a year old.", "The majority of Americans choose dogs over love.", "A 70-year-old woman once completed seven marathons in seven days, across all seven continents.", "Most people break up on Mondays.", "Bill Gates has donated nearly half his fortune.", "Sharks existed before trees.", "The Silverback gorilla can lift almost a literal ton.", "Baby blue whales grow 200 pounds per day.", "Cats once delivered mail in Belgium.", "The Twitter bird's official name Is Larry.", "The longest book title contains 1,809 words.", "Astronauts in space are exposed to the same amount of radiation as 150 to 6,000 chest x-rays.", "Jupiter's red spot is getting taller and smaller at the same time."]

        const facts = new MessageEmbed()
        .setTitle('Did you know that ...')
        .setDescription(replies[Math.floor(Math.random() * replies.length)])
        .setTimestamp()
        .setColor('5beb34')

        interaction.followUp({embeds: [facts]})
       
        
    }
}