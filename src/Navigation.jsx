function NavigationHeader({ page, setPage }) {

  return (
    <div class="container-fluid " id="navigation">
      <nav class="navbar navbar-light"id="pageheader">
        <div class="btn-group" id="navbtngroup">
          <button class={"btn" + BtnStyle(page, "dashboard")} onClick={() => setPage("dashboard")}>Dashboard</button>
          <button class={"btn" + BtnStyle(page, "feedback")} onClick={() => setPage("feedback")}>Feedback</button>
          <button class={"btn" + BtnStyle(page, "analysis")} onClick={() => setPage("analysis")}>Analysis</button>
        </div>
              {PageName(page)}
      </nav>
      <nav class="navbar fixed-bottom">
        <h2>
          P3 Prototype - Results PENding - Team 12
        </h2>
      </nav>
    </div>
  );
}

function BtnStyle(page, match) {
  if (page == match) {
    return " btn-light";
  }
  else {
    return " btn-dark";
  }
}

function PageName(page) {
  switch (page) {
    case "dashboard":
      return "Dashboard";
    case "feedback":
      return "Legibility Feedback Submission";
    case "analysis":
      return "Live Handwriting Analysis";
  }

}
export default NavigationHeader;