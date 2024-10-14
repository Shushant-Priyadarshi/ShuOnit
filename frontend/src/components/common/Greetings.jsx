import { useEffect, useState } from "react";
import { SanitizeData } from "../utils/SanitizeData";
import PageLoading from "./PageLoading";

const Greetings = () => {
  const [greet, setGreet] = useState("");
  const [imageSrc, setImage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 6) {
      setGreet("Let Him Cook!! 💪🗿");
      setImage([
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/One%20O’Clock.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Cook.png",
      ]);
    } else if (currentHour < 12) {
      setGreet("Uth gya bhai?? <br/><br/> Remember today's tasks?");
      setImage([
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Eight%20O’Clock.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun%20with%20Face.png",
      ]);
    } else if (currentHour < 17) {
      setGreet("दोपहर Ho gyi!<br/><br/> Juice pila do, मौसंबी Ka!!");
      setImage([
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/One%20O’Clock.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Tropical%20Drink.png",
      ]);
    } else if (currentHour < 20) {
      setGreet("Good Evening! <br/><br/> Have you exercised today?");
      setImage([
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Six-Thirty.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Man%20Lifting%20Weights%20Light%20Skin%20Tone.png" 
        
      ]);
    } else {
      setGreet("So jaa bhai!<br/><br/> Verna Haster aajaega");
      setImage([
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Eleven%20O’Clock.png",
        "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Woman%20Zombie.png" 
      ]);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center hero-section h-[80vh] animate-slide-in">
      {/* Clock Emoji in the Top-Right Corner */}
      <div className="absolute top-4 right-4">
        <img
          src={imageSrc[0]}
          alt="Clock emoji"
          className="w-16 h-16 sm:w-28 sm:h-28"
        />
      </div>

      {/* Greeting Text and Emojis */}
      <div className="flex flex-col items-center text-center px-4 py-20">
        <h1
          className="text-3xl sm:text-5xl font-semibold text-white mb-6 animate-pulse"
          dangerouslySetInnerHTML={{ __html: SanitizeData(greet) }}
        ></h1>

        {/* Emojis below the greeting */}
        <div className="flex justify-center gap-6 flex-wrap">
          {imageSrc.slice(1).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`emoji-${index}`}
              className="w-20 h-20 sm:w-36 sm:h-36 hover:scale-110 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Greetings;
