import PageTransition from "../animation/PageTransition";
import BackBtn from "../common/BackBtn";
import { motion } from "framer-motion";
const About = () => {
  return (
    <motion.div className="min-h-screen flex flex-col justify-center items-center p-4"
    initial={{ opacity: 0, scale: 0.8 }} // Initial state
    whileInView={{ opacity: 1, scale: 1 }} // Animation on view
    transition={{ duration: 2,type:"spring", stiffness: 100 }}
    >
      {/* Back Button */}
      <BackBtn>Home</BackBtn>

      {/* Main Content */}
      <div className="bg-black rounded-lg shadow-lg p-6 sm:p-8 max-w-full sm:max-w-3xl w-full text-center">
        {/* Profile Section */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#7481FE] mb-4">
          About Me
        </h1>
        <p className="text-base sm:text-lg text-white mb-6">
          Hi, I'm <span className="font-semibold">Shushant Priyadarshi</span>,
          an 18-year-old passionate Full Stack Developer. I love to explore,
          learn, and build things that solve real-world problems. Here on my
          blog, I share my thoughts, learnings, and journey in tech. Whether
          front-end or back-end development, I aim to create seamless,
          user-friendly experiences.
        </p>

        {/* Social Links Section */}
        <h2 className="text-2xl font-bold text-[#7481FE] mb-4">Connect with Me</h2>
        <p className="text-base sm:text-lg text-white mb-6">
          Want to follow my journey or check out my work? Here are some of the ways you can connect with me:
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shushant-priyadarshi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition duration-300"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.787-1.75-1.754 0-.968.784-1.754 1.75-1.754s1.75.786 1.75 1.754c0 .967-.784 1.754-1.75 1.754zm13.5 12.268h-3v-5.597c0-3.378-4-3.125-4 0v5.597h-3v-11h3v1.604c1.396-2.586 7-2.777 7 2.463v6.933z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Shushant-Priyadarshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-gray-500 transition duration-300"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.175c-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.774.418-1.305.763-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.467-2.381 1.236-3.221-.123-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.656 1.649.243 2.873.12 3.176.772.84 1.234 1.911 1.234 3.221 0 4.606-2.807 5.621-5.479 5.92.429.37.823 1.102.823 2.222v3.293c0 .319.216.694.824.576 4.765-1.587 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="https://x.com/ceutical_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.563-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.926 2.205-4.926 4.924 0 .386.044.762.127 1.124-4.094-.205-7.725-2.166-10.15-5.144-.425.729-.667 1.575-.667 2.476 0 1.71.87 3.217 2.188 4.099-.807-.025-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.826-.413.113-.849.174-1.296.174-.318 0-.626-.03-.928-.088.627 1.956 2.445 3.379 4.6 3.419-1.684 1.32-3.809 2.106-6.115 2.106-.398 0-.79-.023-1.177-.069 2.179 1.397 4.768 2.21 7.548 2.21 9.055 0 14.01-7.506 14.01-14.01 0-.213-.005-.425-.014-.637.961-.694 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          
          <a
            href="https://portfolio-0-01.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800 transition duration-300"
          >
            <svg
              className="w-8 h-8 sm:w-8 sm:h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20 6h-4V4c0-1.104-.896-2-2-2h-4c-1.104 0-2 .896-2 2v2H4c-1.104 0-2 .896-2 2v10c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2V8c0-1.104-.896-2-2-2zm-6-2v2h-4V4h4zm6 14H4V8h4v2h8V8h4v10z" />
            </svg>
            <span className="sr-only">Portfolio</span>
          </a>
        </div>
      </div>

      <PageTransition />
    </motion.div>
  );
};

export default About;
