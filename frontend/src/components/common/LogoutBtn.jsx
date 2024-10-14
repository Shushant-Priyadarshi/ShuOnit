const LogoutBtn = () => {
  const handleLogout = () => {
    const response = window.confirm("Jaa raha h bhai🥲?");
    if (!response) {
      return;
    }
    localStorage.setItem("auth", "false");
    localStorage.removeItem("jwt");
    window.location.reload();
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutBtn;
