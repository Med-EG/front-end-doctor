import footer from "../../assets/footer.svg";
function Footer() {
  return (
    <footer className="footer gradient-text secondary-text-bold flex flex-col justify-center items-center py-5 ">
      <hr
        className="w-1/2 border-2 border-blue-100"
        style={{ borderWidth: "1px" }}
      />
      <img src={footer} alt="footer" className="footer-image py-12" />

      <p className="footer-text">&copy; 2023 MedEG. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
