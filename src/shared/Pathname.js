class Pathname {
  constructor(pathname) {
    this.pathname = pathname;
  }

  matchesLoadingScreen() {
    return this.pathname === "/";
  }

  matchesTeamSelection() {
    return this.pathname === "/teams";
  }

  matchesDashboard() {
    return this.pathname === "/dashboard";
  }

  matchesEstimations() {
    return this.pathname === "/estimations";
  }

  matchesArena() {
    return this.pathname === "/arena";
  }

  matchesDeveloperSelection() {
    return this.pathname === "/developers";
  }

  matchesEstimationSelection() {
    return this.pathname === "/estimations";
  }

  matchesEstimationRevelation() {
    return this.pathname === "/estimation";
  }

  matchesEstimationExplanation() {
    return this.pathname === "/explanation";
  }
}

export default Pathname;
