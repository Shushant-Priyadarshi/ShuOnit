const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ShuOnIt . All rights reserved.</p>
        <p>
          <a href="mailto:profshushant@gmail.com"  target="_blank"  className="text-white hover:underline">
            Contact
          </a>{" "}
          |
          <a href="https://github.com/Shushant-Priyadarshi/ShuOnit" target="_blank" className="text-white hover:underline">
            {" "}
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
