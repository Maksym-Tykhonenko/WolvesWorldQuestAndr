import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialWolfData = [
    {
      name: 'Gray Wolf',
      details: `
      Where they live:
      Gray wolves are native to vast regions of Europe and Asia. They are found in countries ranging from Spain and Italy in the south to Norway and Finland in the north, and eastward to Russia, Mongolia, and parts of China.
      
      Features and differences:
      The Gray Wolf is the most widespread and recognized wolf subspecies. They are characterized by their thick fur, which can vary in color from gray to brown, white, black, or a mix. This subspecies is generally larger than others, with males weighing between 30-80 kg (66-176 lbs) and females slightly smaller. Gray wolves have long legs and large paws, well-adapted for traversing snowy or rugged terrain. Their powerful jaws and sharp teeth allow them to hunt large prey such as deer, elk, and moose, though they are also skilled in bringing down smaller animals when necessary.
      
      Interesting facts:
      - Gray wolves are highly social animals and live in packs that are typically led by an alpha pair.
      - They have a complex communication system that includes vocalizations like howling, body language, and scent marking.
      - The Gray Wolf's howl can be heard over 10 kilometers (6 miles) away.
      - They have one of the most diverse prey ranges of any carnivore, including animals as large as bison.`,
      image: require('./assets/gray_wolf.jpg'),
      photoAlbum: [require('./assets/gray_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Arctic Wolf',
      details: `
      Where they live:
      Arctic wolves inhabit the Arctic regions of North America, particularly the islands and northernmost parts of Canada, including Greenland.
      
      Features and differences:
      Arctic wolves are smaller than their gray cousins, with males weighing between 34-46 kg (75-100 lbs). Their fur is thicker and typically white, providing excellent camouflage in snowy environments. The Arctic wolf's ears are shorter to minimize heat loss, and their paws are larger, aiding in walking on snow. Unlike many other wolf species, they have adapted to survive in one of the most extreme environments on Earth, where temperatures can plummet to -30°C (-22°F) or lower, and food can be scarce.
      
      Interesting facts:
      - Arctic wolves have shorter breeding seasons due to the harsh conditions of their habitat, typically breeding only in March and April.
      - They are the only subspecies of wolf that still occupies their entire original range.
      - Their prey includes muskoxen and Arctic hares, which are adapted to the extreme cold as well.
      - Due to their remote habitat, Arctic wolves have had less contact with humans and are less fearful of them compared to other wolf subspecies.`,
      image: require('./assets/arctic_wolf.jpg'),
      photoAlbum: [require('./assets/arctic_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Eastern Wolf',
      details: `
      Where they live:
      The Eastern Wolf is native to the northeastern United States and southeastern Canada, including the Great Lakes region and parts of Quebec and Ontario.
      
      Features and differences:
      The Eastern Wolf is a medium-sized wolf, smaller than the Gray Wolf but larger than the coyote. They typically weigh between 25-32 kg (55-70 lbs) and have a more slender build. Their fur is often a mix of gray, brown, and reddish tones. This subspecies is genetically distinct but also exhibits signs of hybridization with both Gray Wolves and coyotes, particularly in areas where their ranges overlap. This blending has led to ongoing debates about their classification, with some scientists considering them a unique species (Canis lycaon) rather than a subspecies of the Gray Wolf.
      
      Interesting facts:
      - Eastern wolves primarily hunt white-tailed deer but will also eat beavers, moose, and smaller mammals.
      - They are highly adaptable and can live in both forested areas and more developed regions.
      - The Algonquin Provincial Park in Ontario is a key conservation area for Eastern wolves.- Their hybridization with coyotes has created a unique canid in the eastern U.S. often referred to as the "coywolf."`,
      image: require('./assets/eastern_wolf.jpg'),
      photoAlbum: [require('./assets/eastern_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Mexican Wolf',
      details: `
      Where they live:
      The Mexican Wolf is native to the southwestern United States and northern Mexico, primarily found in forested and mountainous areas.
      
      Features and differences:
      The Mexican Wolf is the smallest and most genetically distinct subspecies of the Gray Wolf in North America. They typically weigh between 25-40 kg (55-88 lbs) and have a shorter, more compact build, which is well-suited to their rugged terrain. Their fur is a blend of gray, black, and brown with a characteristic reddish tint. The Mexican Wolf was nearly driven to extinction by the mid-20th century due to hunting and habitat loss, but concerted conservation efforts, including captive breeding and reintroduction programs, have helped their numbers slowly recover.
      
      Interesting facts:
      - The Mexican Wolf is often referred to as "El Lobo."
      - By the 1970s, only a handful of Mexican Wolves remained in the wild, prompting the start of a captive breeding program in 1977.
      - They are primarily pack hunters, targeting deer, elk, and smaller mammals.
      - The Mexican Wolf is considered one of the most endangered subspecies of wolves, with ongoing efforts to increase its wild population.`,
      image: require('./assets/mexican_wolf.jpg'),
      photoAlbum: [require('./assets/mexican_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Indian Wolf',
      details: `
      Where they live:
      The Indian Wolf is found in the Indian subcontinent, including parts of India, Pakistan, and Iran. They typically inhabit grasslands, semi-desert areas, and scrub forests.
      
      Features and differences:
      The Indian Wolf is smaller and more lightly built than many of its northern relatives, with an average weight of 25-30 kg (55-66 lbs). Their fur is shorter and typically a sandy or reddish color, helping them blend into their arid environments. Unlike the more pack-oriented Gray Wolf, Indian Wolves often live in smaller family units or pairs. This adaptation may be a response to the less abundant prey available in their environment. They are one of the most ancient and distinct wolf subspecies, showing significant genetic differences from other Eurasian wolves.
      
      Interesting facts:
      - Indian Wolves are known for their distinctive, mournful howl, which is often heard at dusk.
      - They have been known to prey on livestock, leading to conflicts with humans.
      - In some regions, Indian Wolves have been observed cooperating with other predators, such as hyenas, to hunt larger prey.
      - They have a high tolerance for hot climates, thriving in environments where few other large carnivores can survive.`,
      image: require('./assets/indian_wolf.jpg'),
      photoAlbum: [require('./assets/indian_wolf.jpg')],
      isStock: true,
    },
   {
      name: 'Eurasian Wolf',
      details: `
      Where they live:
      The Eurasian Wolf is widely distributed across Europe and Asia, from the Iberian Peninsula in the west to the Ural Mountains in Russia. It is found in diverse habitats, including forests, mountains, tundra, and even semi-desert areas.
      
      Features and differences:
      The Eurasian Wolf is one of the largest wolf subspecies, with males typically weighing between 30-50 kg (66-110 lbs). Their fur varies widely in color, from gray and brown to red and black, often reflecting the local environment. The Eurasian Wolf has a more elongated body compared to the North American Gray Wolf, and their skull is narrower. This subspecies is highly adaptable, allowing them to thrive in a variety of ecosystems. Historically, they have been heavily persecuted by humans, leading to fragmented populations in many regions.
      
      Interesting facts:
      - The Eurasian Wolf is known for its endurance and can travel up to 50 kilometers (31 miles) in a single night while hunting.    - They have a diverse diet, feeding on large ungulates like deer and wild boar, as well as smaller animals, carrion, and occasionally, livestock.
      - In folklore, the Eurasian Wolf has been both feared and revered, often appearing in myths and legends across its range.
      - Conservation efforts in recent years have led to the recovery of some Eurasian Wolf populations, especially in parts of Western Europe.`,
      image: require('./assets/eurasian_wolf.jpg'),
      photoAlbum: [require('./assets/eurasian_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Arabian Wolf',
      details: `
      Where they live:
      The Arabian Wolf is native to the Arabian Peninsula, including Saudi Arabia, Oman, Yemen, and parts of Jordan and Israel. They inhabit desert and semi-desert regions, as well as rocky mountainous areas.
      
      Features and differences:
      The Arabian Wolf is one of the smallest wolf subspecies, weighing between 18-20 kg (40-44 lbs). They are slender with long legs, helping them to traverse the harsh desert terrain. Their fur is typically short and light-colored, ranging from gray to sandy brown, which provides effective camouflage in their arid environment. Arabian Wolves are highly adapted to survive with minimal water and food resources, often preying on small mammals, birds, and livestock. Unlike other wolves, they do not form large packs; instead, they live in small groups or as solitary hunters.
      
      Interesting facts:
      - Arabian Wolves have adapted to endure extreme heat and can survive for long periods without water by obtaining moisture from their prey.
      - They are capable of digging deep holes to escape the intense desert heat during the day.
      - Due to their tendency to prey on livestock, Arabian Wolves are often in conflict with humans, leading to declining populations in some areas.
      - Arabian Wolves have a distinctive high-pitched howl, which they use to communicate over the vast desert landscapes.`,
      image: require('./assets/arabian_wolf.jpg'),
      photoAlbum: [require('./assets/arabian_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Tundra Wolf',
      details: `
      Where they live:
      The Tundra Wolf is found in the tundra regions of northern Russia, including Siberia, and extending into parts of Scandinavia and the northern edges of the Arctic Circle.
      
      Features and differences:
      The Tundra Wolf is a large and powerful subspecies, with males weighing up to 50-60 kg (110-132 lbs). They have long, thick fur that is primarily gray or white, helping them blend into the snowy landscapes of their habitat. This fur provides essential insulation against the extreme cold, with temperatures often dropping below -40°C (-40°F). The Tundra Wolf has a stocky build with shorter legs than other subspecies, which helps conserve heat. They are well-adapted to hunting large prey like reindeer and muskoxen, often traveling vast distances in search of food.
      
      Interesting facts:
      - Tundra Wolves are among the most northerly distributed wolf subspecies, living in some of the coldest inhabited regions on Earth.
      - They have a highly developed sense of smell, which allows them to detect prey over long distances, even through deep snow.
      - Tundra Wolves often dig dens in snowbanks or use natural caves to shelter their pups from the harsh climate.
      - They are known for their stamina, capable of chasing prey for hours over the frozen tundra.`,
      image: require('./assets/tundra_wolf.jpg'),
      photoAlbum: [require('./assets/tundra_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Himalayan Wolf',
      details: `
      Where they live:
      The Himalayan Wolf is found in the high-altitude regions of the Himalayas, including northern India, Nepal, Bhutan, and parts of the Tibetan Plateau.
      
      Features and differences:The Himalayan Wolf is adapted to the harsh, high-altitude environments of the Himalayas. They are medium-sized, weighing between 20-30 kg (44-66 lbs), with long, thick fur that is usually gray, brown, or cream-colored, providing excellent insulation against the cold. Their build is more slender than lowland wolves, with longer legs and larger lungs, which help them navigate the mountainous terrain and cope with the lower oxygen levels at high altitudes. The Himalayan Wolf has distinct genetic differences from other wolf subspecies, leading some scientists to classify it as a separate species (Canis himalayensis).
      
      Interesting facts:
      - The Himalayan Wolf is one of the least studied and most enigmatic wolf subspecies, largely due to the remote and difficult terrain it inhabits.
      - They are thought to prey primarily on blue sheep, yaks, and other large mammals native to the Himalayan region.
      - The local people often regard them as spiritual creatures, and they feature prominently in regional folklore.
      - The Himalayan Wolf is critically endangered, with only a few hundred individuals estimated to remain in the wild.`,
      image: require('./assets/himalayan_wolf.jpg'),
      photoAlbum: [require('./assets/himalayan_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Maned Wolf',
      details: `
      Where they live:
      The Maned Wolf is native to South America, primarily found in the grasslands and savannas of Brazil, Argentina, Paraguay, Bolivia, and Peru.
      
      Features and differences:
      Unlike other wolves, the Maned Wolf is not a true member of the genus Canis, but it is often called a wolf due to its similar appearance. It is the largest canid in South America, standing nearly 1 meter (3.3 feet) tall at the shoulder, with long legs and a slender build. The Maned Wolf is easily recognizable by its reddish-brown fur, black legs, and distinctive black mane that stands erect when threatened. Their legs are adapted for running in tall grass, and their diet is omnivorous, including fruits, vegetables, and small animals. Despite their name, Maned Wolves are solitary animals, rarely forming packs.
      
      Interesting facts:
      - The Maned Wolf’s urine has a strong smell similar to that of cannabis, earning it the nickname “skunk wolf.”
      - They play a crucial role in seed dispersal in their ecosystem due to their fruit-heavy diet.
      - Unlike other wolves, the Maned Wolf communicates through high-pitched barks rather than howls.
      - The Maned Wolf is classified as near-threatened, with habitat loss due to agriculture being the primary threat to their survival.`,
      image: require('./assets/maned_wolf.jpg'),
      photoAlbum: [require('./assets/maned_wolf.jpg')],
      isStock: true,
    }, {
      name: 'Red Wolf',
      details: `
      Where they live:
      The Red Wolf is native to the southeastern United States, historically ranging from Texas to Florida and up to the southeastern states like North Carolina. Today, their range is limited primarily to northeastern North Carolina.
      
      Features and differences:
      The Red Wolf is smaller than the Gray Wolf but larger than the coyote, with adults typically weighing between 20-35 kg (44-77 lbs). They have a distinct reddish-brown coat mixed with black along their back and lighter underparts. Their legs and ears are long and slender, which is a trait shared with their close relative, the coyote. The Red Wolf is one of the rarest and most endangered wolf species, with a complex history of hybridization with coyotes, making it genetically unique. They have a narrower and more elongated skull compared to other wolves.
      
      Interesting facts:
      - The Red Wolf was declared extinct in the wild in 1980, but a successful captive breeding and reintroduction program began shortly afterward.
      - They are known for their shy and reclusive nature, often avoiding human contact whenever possible.
      - Red Wolves primarily hunt small mammals such as rabbits, rodents, and occasionally deer. - Despite being critically endangered, conservation efforts have been contentious due to conflicts with local landowners and debates over their taxonomic status.`,
      image: require('./assets/red_wolf.jpg'),
      photoAlbum: [require('./assets/red_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Ethiopian Wolf',
      details: `
      Where they live:
      The Ethiopian Wolf is native to the highlands of Ethiopia, particularly in the Bale Mountains and Simien Mountains. They inhabit alpine meadows and heathlands at elevations ranging from 3,000 to 4,500 meters (9,800 to 14,800 feet).
      
      Features and differences:
      The Ethiopian Wolf is slender and has a distinctive reddish-brown coat with white markings on its face, chest, and underbelly. They are relatively small compared to other wolf species, with adults weighing between 11-19 kg (24-42 lbs). Unlike other wolves that hunt in packs, Ethiopian Wolves are solitary hunters, preying primarily on rodents like the giant molerat, which is abundant in their habitat. They have long legs and a narrow snout, which are adaptations for capturing small, fast-moving prey in open terrain. The Ethiopian Wolf is the most endangered canid in the world, with only a few hundred individuals remaining.
      
      Interesting facts:
      - The Ethiopian Wolf is also known as the "Simien Jackal" or "Abyssinian Wolf."
      - They have a highly social structure and live in extended family groups, but unlike other wolves, they hunt alone.
      - Ethiopian Wolves are highly specialized feeders, with up to 96% of their diet consisting of small rodents.
      - Rabies outbreaks from contact with domestic dogs pose a significant threat to their survival.`,
      image: require('./assets/ethiopian_wolf.jpg'),
      photoAlbum: [require('./assets/ethiopian_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Iberian Wolf',
      details: `
      Where they live:
      The Iberian Wolf is found primarily in the northwestern regions of the Iberian Peninsula, including parts of Spain and Portugal, particularly in mountainous and forested areas.
      
      Features and differences:
      The Iberian Wolf is slightly smaller than the Eurasian Wolf, with adults weighing between 30-40 kg (66-88 lbs). They are distinguished by their lighter fur, which is usually gray with reddish and brownish tones, and distinct black markings on their forelegs and tail, giving them the name "signatus," meaning "marked." Their skull is narrower, and they have a more pointed snout. The Iberian Wolf has adapted to a variety of habitats, from dense forests to open plains, but their populations are fragmented due to human activities. They primarily hunt wild boar, deer, and small mammals.
      
      Interesting facts:
      - The Iberian Wolf is known for its strong territorial behavior and distinctive howling, which is more frequent than in other wolf subspecies.
      - They have a reputation for being elusive and are rarely seen by humans despite their relatively close proximity to human settlements.
      - Conservation efforts in Spain and Portugal have helped stabilize some Iberian Wolf populations, although they remain vulnerable due to habitat loss and illegal hunting.
      - Iberian Wolves play a crucial role in controlling wild boar populations, which can otherwise become agricultural pests.`,
      image: require('./assets/iberian_wolf.jpg'),
      photoAlbum: [require('./assets/iberian_wolf.jpg')],
      isStock: true,
    },
    {
      name: 'Alaskan Interior Wolf',
      details: `
      Where they live:
      The Alaskan Interior Wolf, also known as the Yukon Wolf, is found in the interior regions of Alaska and parts of the Yukon in Canada. They inhabit boreal forests, tundra, and mountainous regions.
      
      Features and differences: The Alaskan Interior Wolf is one of the largest subspecies of the Gray Wolf, with males weighing between 45-60 kg (99-132 lbs) and females slightly smaller. They have thick, dense fur that varies in color from black and gray to white and tan, providing insulation against the cold northern climate. Their bodies are robust, with long legs and large paws that help them move through snow and rough terrain. The Alaskan Interior Wolf is an apex predator, with a diet primarily consisting of large ungulates such as moose, caribou, and Dall sheep.
      
      Interesting facts:
      - Alaskan Interior Wolves are known for their endurance and can cover up to 30 miles in a single night while hunting.
      - Their packs are usually larger than those of other wolf subspecies, often consisting of 7-12 individuals.
      - They are highly territorial, with pack territories ranging from 300 to 1,000 square miles.
      - The Alaskan Interior Wolf's population is considered stable, with ongoing management practices ensuring their survival in the wild, despite occasional conflicts with humans over livestock predation.`,
      image: require('./assets/alaskan_wolf.jpg'),
      photoAlbum: [require('./assets/alaskan_wolf.jpg')],
      isStock: true,
    },];

export const WolfDataContext = createContext();


export const WolfDataProvider = ({ children }) => {
  const [wolfData, setWolfData] = useState([]);

  useEffect(() => {
    const loadWolfData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('wolfData');
        if (storedData) {
          setWolfData([...initialWolfData, ...JSON.parse(storedData).filter(w => !w.isStock)]);
        } else {
          setWolfData(initialWolfData);
        }
      } catch (error) {
        console.error('Error loading wolf data from AsyncStorage:', error);
        setWolfData(initialWolfData);
      }
    };
  
    loadWolfData();
  }, []);
  
  useEffect(() => {
    const saveWolfData = async () => {
      try {
        await AsyncStorage.setItem('wolfData', JSON.stringify(wolfData));
      } catch (error) {
        console.error('Error saving wolf data to AsyncStorage:', error);
      }
    };
  
    if (wolfData.length > 0) {
      saveWolfData();
    }
  }, [wolfData]);

  const updateWolfData = async (name, updatedData) => {
    try {
      setWolfData((prevData) => {
        const updatedWolves = prevData.map((wolf) =>
          wolf.name === name ? { ...wolf, ...updatedData } : wolf
        );
        AsyncStorage.setItem('wolfData', JSON.stringify(updatedWolves)); 
        return updatedWolves;
      });
    } catch (error) {
      console.error('Error updating wolf data:', error);
    }
  };

  const addWolfData = async (newWolf) => {
    try {
      setWolfData((prevData) => {
        const updatedData = [...prevData, newWolf];
        AsyncStorage.setItem('wolfData', JSON.stringify(updatedData)); 
        return updatedData;
      });
    } catch (error) {
      console.error('Error adding new wolf data:', error);
    }
  };

  return (
    <WolfDataContext.Provider value={{ wolfData, updateWolfData, addWolfData }}>
      {children}
    </WolfDataContext.Provider>
  );
};